var $ = require('jquery')
var defaults = require('./defaults')
var i18n = require('./i18n')
var matter = require('gray-matter')
var markdown = require('./markdown')
var md5 = require('md5')
var social = require('./social')
var templates = require('./templates')
var typogr = require('typogr')
var util = require('./util')
var URI = require('urijs')
var Handlebars = require('handlebars')

var document = templates.document
var body = templates.body

function parse (data) {
  // Allow the initial '---' to be omitted.
  // Note: this hack does not allow the block
  // to contain blank lines, although YAML
  // does support such expressions!
  if (!data.match(/^---/) &&
      data.match(/^([\s\S]*)[\r\n]+---/)) {
    data = '---\n' + data
  }
  var view = matter(data)
  var props = view.data
  $.extend(view, props)
  view.content = escape(view.content)
  view.content = markdown(view.content, false)
  view.content = unescape(view.content)
  return view
}

function escape (str) {
  return str.replace(/{{{/g, '\u2222\u2222\u2222')
            .replace(/}}}/g, '\u3333\u3333\u3333')
            .replace(/{{/g, '\u2222\u2222')
            .replace(/}}/g, '\u3333\u3333')
}

function unescape (str) {
  return str.replace(/\u2222\u2222\u2222/g, '{{{')
            .replace(/\u3333\u3333\u3333/g, '}}}')
            .replace(/\u2222\u2222/g, '{{')
            .replace(/\u3333\u3333/g, '}}')
}

function addI18n (view) {
  if (view.lang === undefined || view.lang === '' ||
      i18n[view.lang] === undefined) {
    view.lang = 'no'
  }
  return $.extend({}, i18n[view.lang], view)
}

function dynamic (view, path) {
  view = $.extend({
    facebook: social.facebook.url(path),
    github: social.github.url(path),
    history: social.github.history.url(path),
    linkedin: social.linkedin.url(path),
    twitter: social.twitter.url(path),
    mail: social.mail.url(path)
  }, view)
  if (view.toc !== false) {
    view.toc = '<div id="toc-placeholder"></div>'
  }
  if (view.content.match(/[\\][(]/g)) {
    view.mathjax = true
  }
  if (view.mathjax) {
    // typogr.js doesn't work well with MathJax
    // https://github.com/ekalinin/typogr.js/issues/31
    view.typogr = false
  }
  return view
}

function title (view) {
  if (view.title === undefined || view.title === '') {
    view.content = util.dojQuery(view.content, function (body) {
      var heading = body.find('h1').first()
      if (heading.length > 0) {
        view.title = heading.removeAriaHidden().html().trim()
        heading.remove()
      }
    })
  }
  return view
}

function footnotes (view) {
  if (view.footnotes === undefined || view.footnotes === '') {
    view.content = util.dojQuery(view.content, function (body) {
      var section = body.find('section.footnotes').first()
      if (section.length > 0) {
        var hr = body.find('hr.footnotes-sep')
        view.footnotes = section.html().trim()
        section.remove()
        hr.remove()
      }
    })
  }
  return view
}

function toc (view) {
  if (view.toc !== false) {
    view.content = util.dojQuery(view.content, function (body) {
      var placeholder = body.find('#toc-placeholder')
      var content = body.find('.e-content')
      view.toc = content.tableOfContents()
      if (view.toc !== '') {
        placeholder.replaceWith(view.toc)
      }
    })
  }
  return view
}

function typography (view) {
  if (view.typogr) {
    // typogr.js doesn't understand unescaped quotation marks
    view.content =
      view.content.replace(/\u2018/gi, '&#8216;')
                  .replace(/\u2019/gi, '&#8217;')
                  .replace(/\u201c/gi, '&#8220;')
                  .replace(/\u201d/gi, '&#8221;')
                  // FIXME: this belongs in punctuation.js
                  .replace(/&#8220;&#8216;/gi, '&#8220;&nbsp;&#8216;')
                  .replace(/&#8216;&#8220;/gi, '&#8216;&nbsp;&#8220;')
    view.content = typogr.typogrify(view.content)
  }
  return view
}

function compile (data, path) {
  var file = URI(path).filename()
  if (file === '') {
    file = 'index.txt'
  }

  data = data.trim()

  if (data === '') {
    return document({file: file, url: path})
  }

  var view = $.extend({
    md5: md5(data),
    url: path,
    file: file
  }, defaults, parse(data))

  view = addI18n(view)
  view = dynamic(view, path)
  view = title(view)
  view = footnotes(view)

  if (view.content !== '') {
    view.content = body(view)
  }

  view = toc(view)
  view = typography(view)
  view.content = document(view)
  view.body = Handlebars.compile(view.content)
  // view.content = view.body(view)
  return view.content
}

module.exports = compile

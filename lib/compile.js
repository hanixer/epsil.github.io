var $ = require('jquery')
var defaults = require('./defaults')
var i18n = require('./i18n')
var matter = require('gray-matter')
var markdown = require('./markdown')
var md5 = require('md5')
var social = require('./social')
var templates = require('./templates')
var util = require('./util')

var document = templates.document
var body = templates.body

function parse (data) {
  // Allow the initial '---' to be omitted.
  // Note: this hack does not allow the block
  // to contain blank lines, although YAML
  // does support such expressions!
  if (data.match(/^([\s\S]*)[\r\n]+---/)) {
    data = '---\n' + data
  }
  var view = matter(data)
  var props = view.data
  $.extend(view, props)
  view.content = markdown(view.content, false)
  return view
}

function addI18n (view) {
  if (view.lang === undefined || view.lang === '' ||
      i18n[view.lang] === undefined) {
    view.lang = 'no'
  }
  $.extend(view, i18n[view.lang])
  return view
}

function dynamic (view, path) {
  if (view.toc !== false) {
    view.toc = '<div id="toc-placeholder"></div>'
  }
  view.facebook = social.facebook.url(path)
  view.github = social.github.url(path)
  view.history = social.github.history.url(path)
  view.linkedin = social.linkedin.url(path)
  view.twitter = social.twitter.url(path)
  view.mail = social.mail.url(path)
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
      var toc = content.tableOfContents()
      if (toc !== '') {
        placeholder.replaceWith(toc)
      }
    })
  }
  return view
}

function compile (data, path) {
  data = data.trim()
  var view = $.extend({}, defaults, parse(data))
  view.md5 = md5(data)
  view.url = path
  view = addI18n(view)
  view = dynamic(view, path)
  view = title(view)
  view = footnotes(view)
  view.content = body(view)
  view = toc(view)
  view.content = document(view)
  return view.content
}

module.exports = compile

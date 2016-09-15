var $ = require('jquery')
var S = require('string')
var matter = require('gray-matter')
var md5 = require('md5')
var markdown = require('./markdown')
var templates = require('./templates')

// TODO: merge i18n() into this object
var defaults = {
  author: 'Vegard Øye',
  'author-url': 'https://epsil.github.io/',
  'site-name': 'Vegards blogg',
  lang: 'no',
  toc: true,
  'toc-title': 'Innhold',
  'home-title': 'Gå hjem',
  'facebook-title': 'Del på Facebook',
  'twitter-title': 'Del på Twitter',
  'linkedin-title': 'Del på LinkedIn',
  'mail-title': 'Del på e-post',
  'github-title': 'Rediger på GitHub',
  'history-title': 'Vis historie',
  'markdown-title': 'Vis Markdown-kilde',
  typogr: true
}

var document = templates.document
var body = templates.body

function parse (data) {
  // Allow the initial '---' to be omitted. Note: this hack does not
  // allow the block to contain blank lines, although YAML does
  // support such expressions!
  if (data.match(/^([\s\S]*)[\r\n]+---/)) {
    data = '---\n' + data
  }
  var props = matter(data)
  for (var key in props.data) {
    props[key] = props.data[key]
  }
  props.content = markdown(props.content, false)
  return props
}

function i18n (view) {
  if (view.lang === 'en') {
    view['site-name'] = 'Vegard\u2019s blog'
    view['toc-title'] = 'Contents'
    view['home-title'] = 'Go home'
    view['facebook-title'] = 'Share on Facebook'
    view['twitter-title'] = 'Share on Twitter'
    view['linkedin-title'] = 'Share on LinkedIn'
    view['mail-title'] = 'Share by mail'
    view['github-title'] = 'Edit on GitHub'
    view['history-title'] = 'View history'
    view['markdown-title'] = 'Get Markdown source'
  }
  return view
}

function dynamic (view, path) {
  view.facebook = $.fn.facebook.url(path)
  view.github = $.fn.github.url(path)
  view.history = $.fn.github.history.url(path)
  view.linkedin = $.fn.linkedin.url(path)
  view.twitter = $.fn.twitter.url(path)
  view.mail = $.fn.mail.url(path)
  return view
}

function title (view) {
  if (view.title === undefined || view.title === '') {
    var content = $('<div>').html(view.content)
    var heading = content.find('h1').first()
    if (heading.length > 0) {
      view.title = heading.removeAriaHidden().html().trim()
      heading.remove()
      view.content = content.html()
    }
  }
  return view
}

function footnotes (view) {
  if (view.footnotes === undefined || view.footnotes === '') {
    var content = $('<div>').html(view.content)
    var section = content.find('section.footnotes').first()
    if (section.length > 0) {
      var hr = content.find('hr.footnotes-sep')
      view.footnotes = section.html().trim()
      section.remove()
      hr.remove()
      view.content = content.html()
    }
  }
  return view
}

function tocPlaceholder (view) {
  if (view.toc !== false) {
    view.toc = '<div id="toc-placeholder"></div>'
  }
  return view
}

function toc (view) {
  if (view.toc !== false) {
    var content = $('<div>').html(view.content)
    var body = content.find('.e-content')
    var toc = body.listOfContents()
    if (toc === '') {
      return view
    }
    toc = $('<div id="toc" class="collapse">' + toc + '</div>')
    toc.find('li ul').each(function (i, el) {
      var ul = $(this)
      var a = ul.prev()
      var id = S(a.text().trim()).slugify() + '-link'
      var span = a.wrap('<span class="collapse" id="' + id + '">').parent()
      $.fn.addCollapsibleSections.addButton(span, ul)
    })
    var placeholder = content.find('#toc-placeholder')
    placeholder.replaceWith(toc)
    view.content = content.html()
  }
  return view
}

function compile (data, path) {
  data = data.trim()
  var view = $.extend({}, defaults, parse(data))
  view.md5 = md5(data)
  view.url = path
  view = i18n(view)
  view = dynamic(view, path)
  view = title(view)
  view = footnotes(view)
  view = tocPlaceholder(view)
  view.content = body(view)
  view = toc(view)
  view.content = document(view)
  return view.content
}

module.exports = compile

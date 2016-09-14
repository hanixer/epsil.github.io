var $ = require('jquery')
var S = require('string')
var markdownit = require('markdown-it')
var attr = require('markdown-it-attrs')
var sub = require('markdown-it-sub')
var sup = require('markdown-it-sup')
var footnote = require('markdown-it-footnote')
var figures = require('markdown-it-implicit-figures')
var mathjax = require('markdown-it-mathjax')
var abbr = require('markdown-it-abbr')
var hljs = require('highlight.js')
var matter = require('gray-matter')
var typogr = require('typogr')
var md5 = require('md5')
var abbrev = require('./abbrev')
var templates = require('./templates')
require('./anchor')
require('./collapse')
require('./section')
require('./social')
require('./figure')
require('./punctuation')
require('./toc')
require('./util')

var document = templates.document
var body = templates.body

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

function highlightBlock (str, lang) {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str, true).value
    } catch (__) { }
  }
  return ''
}

function highlightInline (body) {
  body.find('code[class]').each(function () {
    var code = $(this)
    var pre = code.parent()
    if (pre.prop('tagName') === 'PRE') {
      return
    }
    var lang = code.attr('class')
    if (lang && hljs.getLanguage(lang)) {
      try {
        code.removeClass(lang)
        code.addClass('language-' + lang)
        var str = code.text().trim()
        var html = hljs.highlight(lang, str, false).value
        code.html(html)
      } catch (__) { }
    }
  })
}

var md = markdownit({
  html: true,
  typographer: true,
  highlight: highlightBlock
}).use(figures, {figcaption: true})
  .use(attr)
  .use(sub)
  .use(sup)
  .use(footnote)
  .use(mathjax)
  .use(abbr)

function markdown (str, inline) {
  str += '\n\n'
  str += abbrev

  str = md.render(str).trim()

  if (inline && str.match(/^<p>/) && str.match(/<\/p>$/)) {
    str = str.substring(3, str.length - 4)
  }

  return str
}

function parse (data) {
  // Allow the initial '---' to be omitted. Note: this hack does not
  // allow the block to contain blank lines, although YAML does
  // support such expressions!
  if (data.match(/^([\s\S]*)[\r\n]+---/)) {
    data = '---\n' + data
  }
  var props = matter(data)
  if (props.data) {
    for (var key in props.data) {
      var val = props.data[key]
      if (key !== 'css' && key !== 'js' &&
          typeof (val) === 'string') {
        val = markdown(val, true)
      }
      props[key] = val
    }
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

function process (view) {
  var html = view.content
  // typogr.js doesn't work well with MathJax
  // https://github.com/ekalinin/typogr.js/issues/31
  if (html.match(/[\\][(]/g)) {
    view.typogr = false
  }
  if (view.typogr) {
    // typogr.js doesn't understand unescaped quotation marks
    html = html.replace(/\u2018/gi, '&#8216;')
               .replace(/\u2019/gi, '&#8217;')
               .replace(/\u201c/gi, '&#8220;')
               .replace(/\u201d/gi, '&#8221;')
    html = typogr.typogrify(html)
  }
  var body = $('<div>').html(html)
  var content = body.find('.e-content')
  highlightInline(body)
  body.fixWidont()
  body.addAcronyms()
  body.addSmallCaps()
  body.addPullQuotes()
  body.fixFigures()
  body.addPunctuation()
  body.addHotkeys()
  body.addTeXLogos()
  content.addAnchors()
  body.fixBlockquotes()
  content.addCollapsibleSections()
  body.fixFootnotes()
  body.fixTables()
  // body.addTableOfContents()
  body.fixLinks()
  content.addSections()
  html = body.html()
  view.content = html
  return view
}

function compile (data, path) {
  data = data.trim()
  var view = $.extend({}, defaults, parse(data))
  view.md5 = md5(data)
  view = i18n(view)
  view = dynamic(view, path)
  view = title(view)
  view = footnotes(view)
  view = tocPlaceholder(view)
  view.url = path
  if (view.content !== '') {
    view.content = body(view)
    view = process(view)
  }
  view = toc(view)
  view.content = document(view)
  return view.content
}

module.exports = compile

var $ = require('jquery')
var markdownit = require('markdown-it')
var attr = require('markdown-it-attrs')
var sub = require('markdown-it-sub')
var sup = require('markdown-it-sup')
var footnote = require('markdown-it-footnote')
var mathjax = require('markdown-it-mathjax')
var abbr = require('markdown-it-abbr')
var hljs = require('highlight.js')
var jsyaml = require('js-yaml')
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
  lang: 'no',
  toc: true,
  tocTitle: 'Innhold',
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
}).use(attr)
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

// It would be much more elegant to import 'gray-matter' to do this.
// Unfortunately, GitHub eats YAML frontmatter, so we have to roll
// our own, slightly modified frontmatter syntax.
function yaml (data) {
  // Allow the initial '---' to be omitted. Note: this hack does not
  // allow the block to contain blank lines, although YAML does
  // support such expressions!
  var matches = data.match(/^((?:(?:---\r?\n+)?(?:.+\r?\n)+---\r?\n+)?)([\s\S]*)$/, data) // /^((?:(?:---[\r\n]+)?[\s\S]*[\r\n]+---[\r\n]+)?)([\s\S]*)$/
  var props = frontmatter(matches[1])
  props.content = markdown(matches[2], false)
  return props
}

function frontmatter (data) {
  var props = {}
  var matches = data.match(/^(?:---[\r\n]+)?([\s\S]*)[\r\n]+---/, data)
  if (matches) {
    props = jsyaml.safeLoad(matches[1])
    for (var key in props) {
      var val = props[key]
      if (key !== 'css' && key !== 'js' &&
          typeof (val) === 'string') {
        props[key] = markdown(val, true)
      }
    }
  }
  return props
}

function dynamic (view, path) {
  if (view.lang === 'en') {
    view.tocTitle = 'Contents'
  }
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
  body.addFigures()
  body.addPunctuation()
  body.addHotkeys()
  body.addTeXLogos()
  content.addAnchors()
  body.fixBlockquotes()
  content.addCollapsibleSections()
  body.fixFootnotes()
  body.fixTables()
  body.addTableOfContents()
  body.fixLinks()
  content.addSections()
  html = body.html()
  view.content = html
  return view
}

function compile (data, path) {
  data = data.trim()
  var view = $.extend({}, defaults, yaml(data))
  view.md5 = md5(data)
  view = dynamic(view, path)
  view = title(view)
  view.url = path
  if (view.content !== '') {
    view.content = body(view)
    view = process(view)
  }
  var html = document(view)
  return html
}

module.exports = compile

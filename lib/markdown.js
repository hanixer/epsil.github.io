var $ = require('jquery')
var markdownit = require('markdown-it')
var attr = require('markdown-it-attrs')
var sub = require('markdown-it-sub')
var sup = require('markdown-it-sup')
var footnote = require('markdown-it-footnote')
var figures = require('markdown-it-implicit-figures')
var mathjax = require('markdown-it-mathjax')
var abbr = require('markdown-it-abbr')
var hljs = require('highlight.js')
var abbrev = require('./abbrev')

function highlightBlock (str, lang) {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str, true).value
    } catch (__) { }
  }
  return ''
}

function highlightInline (str) {
  var body = $('<div>')
  body.html(str)
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
  return body.html()
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
  str = md.render(str)
  str = highlightInline(str).trim()
  if (inline && str.match(/^<p>/) && str.match(/<\/p>$/)) {
    str = str.substring(3, str.length - 4)
  }
  return str
}

module.exports = markdown

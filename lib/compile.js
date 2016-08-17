var $ = require('jquery')
var markdownit = require('markdown-it')
var attr = require('markdown-it-attrs')
var sub = require('markdown-it-sub')
var sup = require('markdown-it-sup')
var footnote = require('markdown-it-footnote')
var mathjax = require('markdown-it-mathjax')
var tasklists = require('markdown-it-task-lists')
var abbr = require('markdown-it-abbr')
var hljs = require('highlight.js')
var jsyaml = require('js-yaml')
var moment = require('moment')
var Handlebars = require('handlebars')
var URI = require('urijs')
var templates = require('./templates')
var abbrev = require('./abbrev')
require('./anchor')
require('./collapse')
require('./section')
require('./social')
require('./figure')
require('./hanging')
require('./punctuation')
require('./toc')
require('./util')

var document = templates.document
var body = templates.body
var defaults = {lang: 'no', toc: true, tocTitle: 'Innhold'}

function dateFormat (context, block) {
  if (moment) {
    return moment(context).format('YYYY-MM-DD')
  } else {
    return context
  }
}

function urlResolve (base, href) {
  if (!href.match(/^\//)) {
    return href
  }
  var uri = new URI(href)
  var relUri = uri.relativeTo(base)
  return relUri.toString()
}

function text (html) {
  var div = $('<div>')
  div.html(html)
  return div.text().trim()
}

Handlebars.registerHelper('dateFormat', dateFormat)
Handlebars.registerHelper('urlResolve', urlResolve)
Handlebars.registerHelper('text', text)

var md = markdownit({
  html: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) { }
    }
    return ''
  }
}).use(attr)
  .use(sub)
  .use(sup)
  .use(footnote)
  .use(mathjax)
  .use(tasklists)
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

function yaml (data) {
  // GitHub strips YAML blocks, so allow the initial '---' to be
  // omitted. Note: this hack does not allow the block to contain
  // blank lines, although YAML does support such expressions!
  var matches = data.match(/^((?:(?:---[\r\n]+)?[\s\S]*[\r\n]+---[\r\n]+)?)([\s\S]*)$/, data)
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
      if (typeof (val) === 'string') {
        props[key] = markdown(val, true)
      }
    }
  }
  return props
}

function dynamic (view) {
  if (view.lang === 'en') {
    view.tocTitle = 'Contents'
  }
  view.facebook = $.fn.facebook()
  view.github = $.fn.github()
  view.linkedin = $.fn.linkedin()
  view.twitter = $.fn.twitter()
  view.mail = $.fn.mail()
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

function process (document) {
  var body = $('<div>').html(document)
  body.addAcronyms()
  body.addSmallCaps()
  body.addPullQuotes()
  body.addFigures()
  body.addPunctuation()
  body.addHotkeys()
  body.addTeXLogos()
  body.addHangingPunctuation()
  body.addAnchors()
  body.fixBlockquotes()
  body.addCollapsibleSections()
  body.fixFootnotes()
  body.fixTables()
  body.addTableOfContents()
  body.fixLinks()
  body.addSections()
  return body.html()
}

function compile (data, path) {
  var view = $.extend({}, defaults, yaml(data))
  view = dynamic(view)
  view = title(view)
  view.url = path
  view.content = body(view)
  view.content = process(view.content)
  var html = document(view)
  return html
}

module.exports = compile

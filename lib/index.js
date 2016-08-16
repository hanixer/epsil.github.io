/* global MathJax */
var $ = require('jquery')
window.$ = window.jQuery = $
var markdownit = require('markdown-it')
var attr = require('markdown-it-attrs')
var anchor = require('markdown-it-anchor')
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
var abbrev = require('./abbrev')
var compile = require('./compiler')
require('bootstrap')
require('./collapse')
require('./section')
require('./social')
require('./figure')
require('./hanging')
require('./punctuation')
require('./toc')
require('./util')

var defaults = {lang: 'no', toc: true, tocTitle: 'Innhold'}

Handlebars.registerHelper('dateFormat', function (context, block) {
  if (moment) {
    return moment(context).format('YYYY-MM-DD')
  } else {
    return context
  }
})

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
  .use(anchor, {permalink: true, permalinkBefore: true})
  .use(sub)
  .use(sup)
  .use(footnote)
  .use(mathjax)
  .use(tasklists)
  .use(abbr)

function url () {
  var url = window.location.href
  if (URI(url).protocol() === 'file') {
    return url
  }
  return URI(url).resource()
}

function loadIframe (iframe) {
  var deferred = $.Deferred()
  iframe.hide()
  iframe.on('load', function () {
    var contents = iframe.contents().text().trim()
    var div = $('<div style="display: none">')
    div.text(contents)
    div.insertBefore(iframe)
    iframe.remove()
    deferred.resolve(div)
  })
  return deferred.promise()
}

function loadFile (file) {
  var deferred = $.Deferred()
  $.get(file, function (data) {
    deferred.resolve(data)
  }, 'text')
  return deferred.promise()
}

/* eslint-disable no-unused-vars */
function loadAjax (iframe) {
  var deferred = $.Deferred()
  iframe.hide()
  var src = iframe.attr('src')
  var div = $('<div>')
  div.insertBefore(iframe)
  iframe.remove()
  loadFile(src).then(function (data) {
    div.text(data)
    deferred.resolve(div)
  })
  return deferred.promise()
}

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
  // Allow initial '---' to be omitted since GitHub removes
  // YAML blocks. Note: this regexp does not allow the block
  // to contain blank lines!
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

function meta () {
  var props = {}
  $('meta[name]').each(function () {
    var name = $(this).attr('name')
    if (name) {
      var content = $(this).attr('content')
      props[name] = content
    }
  })
  return props
}

// add dynamic elements to view
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

// like convertIt(), but reads from string and replaces <body>
function convert (data) {
  var html = compile(data, url())
  // browser strips <html>, <head> and <body> tags
  html = html.replace('<body>', '<div class="body">')
             .replace('</body>', '</div>')
  var doc = $('<div>').html(html)
  var body = doc.find('div.body')
  $('body').html(body.html())
  return $('html')
}

// replace container element with its contents converted to markdown
function convertIt (container) {
  var data = container.text().trim()
  var view = $.extend({}, defaults, meta(), yaml(data))
  view = dynamic(view)
  var html = compile(data, url())
  // browser strips <html>, <head> and <body> tags
  html = html.replace('<body>', '<div class="body">')
             .replace('</body>', '</div>')
  var doc = $('<div>').html(html)
  var body = doc.find('div.body')
  container.html(body.html())
  return $('html')
}

function typeset (document) {
  MathJax.Hub.Queue(['Typeset', MathJax.Hub])
  return document
}

function loadData () {
  var file = 'index.txt'
  var iframe = $('iframe').first()
  if (iframe.length > 0) {
    // <body> contains <iframe src="index.txt">:
    // replace <iframe> with its converted contents
    loadIframe(iframe).then(convertIt).then(typeset)
  } else {
    // <body> contains no <iframe>: get file from <link> element
    // (or default to index.txt)
    var link = $('link[type="text/markdown"]')
    if (markdown.length > 0) {
      file = link.attr('href')
    }
    // replace <body> with converted data from file
    // loadFile(file).then(convert).then(process).then(typeset)
    loadFile(file).then(convert).then(typeset)
  }
}

$(function () {
  loadData()
})

/* global MathJax */
var $ = require('jquery')
var URI = require('urijs')
var compile = require('./compile')

// address of current page
function url () {
  var url = window.location.href
  if (URI(url).protocol() === 'file') {
    return url
  }
  return URI(url).resource()
}

// enable MathJax rendering
function typeset (document) {
  MathJax.Hub.Queue(['Typeset', MathJax.Hub])
  return document
}

// replace <body> with HTML converted from Markdown
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

// like convert(), but reads contents of element and replaces it
function convertIt (container) {
  var data = container.text().trim()
  var html = compile(data, url())
  // browser strips <html>, <head> and <body> tags
  html = html.replace('<body>', '<div class="body">')
             .replace('</body>', '</div>')
  var doc = $('<div>').html(html)
  var body = doc.find('div.body')
  $('body').html(body.html())
  return $('html')
}

// read contents of <iframe>
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

// read contents of file
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

// read Markdown from <iframe> or file and
// insert the converted HTML into the document
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
    if (link.length > 0) {
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

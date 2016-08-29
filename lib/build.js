#!/usr/bin/env node
/* global document:true, window:true */
var fs = require('fs')
var path = require('path')
var jsdom = require('jsdom').jsdom
document = jsdom()
window = document.defaultView
var compile = require('./compile')
var tidy = require('tidy-html5').tidy_html5

var input = process.argv[2] || 'index.txt'
var output = process.argv[3] ||
    // file.txt -> file.html
    input.substr(0, input.length - path.extname(input).length) + '.html'

// simple filename -> URL mapping
function url (file) {
  file = file.substr(0, file.length - path.basename(file).length)
  file = file.replace(/\\/g, '/')
  file = 'https://epsil.github.io/' + file
  return file
}

function format (html) {
  html = tidy(html, {
    'drop-empty-elements': false,
    'indent': false,
    'indent-attributes': false,
    'input-encoding': 'utf8',
    'numeric-entities': true,
    'new-inline-tags': 'math ' +
      'annotation ' +
      'merror ' +
      'mfrac ' +
      'mi ' +
      'mn ' +
      'mo ' +
      'mover ' +
      'mphantom ' +
      'mrow ' +
      'mspace ' +
      'msqrt ' +
      'mstyle ' +
      'msub ' +
      'msubsup ' +
      'msup ' +
      'mtable ' +
      'mtd ' +
      'mtext ' +
      'mtr ' +
      'munder ' +
      'semantics',
    'output-encoding': 'ascii',
    'quiet': true,
    'show-info': false,
    'show-warnings': false,
    'sort-attributes': 'alpha',
    'tidy-mark': false,
    'vertical-space': true,
    'wrap': 0
  })

  // Since UTF-8 is a superset of raw ASCII, we can substitute 'utf-8'
  // for 'us-ascii' as the declared character encoding (a useful
  // safeguard if any non-ASCII characters should somehow make their
  // way into the page). In general, though, we try to keep things as
  // plain as possible by returning raw ASCII in the range 0-127 and
  // using numeric character references for the rest.
  html = html.replace(/\n<\/code>\n<\/pre>/g, '</code>\n</pre>')
             .replace('<meta content="text/html; charset=us-ascii" http-equiv="Content-Type">',
                      '<meta content="text/html; charset=utf-8" http-equiv="Content-Type">')

  return html
}

fs.readFile(input, function (err, data) {
  if (err) { return }

  if (!data) {
    data = ''
  } else {
    data = data.toString()
  }

  var html = compile(data, url(input))
  html = format(html)
  fs.writeFile(output, html, function (err) {
    if (err) { return }

    console.log('Converted ' + input + ' to ' + output)
  })
})

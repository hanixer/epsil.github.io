#!/usr/bin/env node
/* global document:true, window:true */
var fs = require('fs')
var path = require('path')
var jsdom = require('jsdom').jsdom
document = jsdom()
window = document.defaultView
var compiler = require('./compile')
var tidy = require('tidy-html5').tidy_html5

var input = process.argv[2] || 'index.txt'
var output = process.argv[3] ||
    // file.txt -> file.html
    input.substr(0, input.length - path.extname(input).length) + '.html'

function url (file) {
  return '/' + file
}

function format (html) {
  html = tidy(html,
              {'char-encoding': 'utf8',
               'drop-empty-elements': false,
               'indent': false,
               'indent-attributes': false,
               'quiet': true,
               'show-info': false,
               'show-warnings': false,
               'sort-attributes': 'alpha',
               'tidy-mark': false,
               'vertical-space': true,
               'wrap': 0})
  html = html.replace(/\n<\/code>\n<\/pre>/g, '</code>\n</pre>')
  return html
}

fs.readFile(input, function (err, data) {
  if (err) { return }

  if (!data) {
    data = ''
  } else {
    data = data.toString()
  }

  var html = compiler(data, url(input), true)
  html = format(html)
  fs.writeFile(output, html, function (err) {
    if (err) { return }

    console.log('Converted ' + input + ' to ' + output)
  })
})

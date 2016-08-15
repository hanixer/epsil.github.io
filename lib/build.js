#!/usr/bin/env node

var fs = require('fs')
var path = require('path')
var compiler = require('./compiler')

var input = process.argv[2] || 'index.txt'
var output = process.argv[3] ||
    // file.txt -> file.html
    input.substr(0, input.length - path.extname(input).length) + '.html'

function url (file) {
  return '/' + file
}

fs.readFile(input, function (err, data) {
  if (err) { return }

  if (!data) {
    data = ''
  } else {
    data = data.toString()
  }

  var html = compiler(data, url(input))
  fs.writeFile(output, html, function (err) {
    if (err) { return }

    console.log('Converted ' + input + ' to ' + output)
  })
})

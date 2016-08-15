/* global define, Handlebars */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['handlebars'], factory)
  } else if (typeof exports === 'object') {
    module.exports = factory(require('handlebars'))
  } else {
    factory(Handlebars)
  }
}(function (Handlebars) {
  return Handlebars.compile(
    '<nav class="navbar navbar-default navbar-fixed-top">\n' +
    '<div class="container-fluid">\n' +
    '<ul class="nav nav-pills navbar-left">\n' +
    '<li role="presentation"><a href="/" title="Return home"><i class="fa fa-home"></i></a></li>\n' +
    '</ul>\n' +
    '<ul class="nav nav-pills navbar-right">\n' +
    '<li role="presentation"><a href="{{facebook}}" title="Share on Facebook"><i class="fa fa-facebook-square"></i></a></li>\n' +
    '<li role="presentation"><a href="{{twitter}}" title="Share on Twitter"><i class="fa fa-twitter-square"></i></a></li>\n' +
    // '<li role="presentation"><a href="{{linkedin}}" title="Share on LinkedIn"><i class="fa fa-linkedin-square"></i></a></li>\n' +
    '<li role="presentation"><a href="{{mail}}" title="Share by mail"><i class="fa fa-envelope"></i></a></li>\n' +
    '<li role="presentation"><a href="{{github}}" title="Edit on GitHub"><i class="fa fa-edit"></i></a></li>\n' +
    '<li role="presentation"><a href="index.txt" title="Get Markdown source"><i class="fa fa-download"></i></a></li>\n' +
    '{{#if toc}}' +
    '<li role="presentation"><a href="#toc" data-toggle="collapse" title="Table of contents"><i class="fa fa-bars"></i></a></li>\n' +
    '{{/if}}' +
    '</ul>\n' +
    '</div>\n' +
    '{{#if toc}}' +
    '<div id="toc" class="collapse" title="{{tocTitle}}"></div>\n' +
    '{{/if}}' +
    '</nav>\n' +
    '<div class="container">\n' +
    '<article>\n' +
    '<header>\n' +
    '{{#if title}}' +
    '<h1 class="title">{{{title}}}</h1>\n' +
    '{{#if subtitle}}' +
    '<h2 class="title">{{{subtitle}}}</h2>\n' +
    '{{/if}}' +
    '{{#if date}}' +
    '<p><time><i class="fa fa-calendar-o"></i> {{dateFormat date}}</time></p>\n' +
    '{{/if}}' +
    '{{else}}' +
    '{{#if date}}' +
    '<h1 class="title">{{dateFormat date}}</h1>\n' +
    '{{/if}}' +
    '{{/if}}' +
    '</header>\n' +
    '<section id="content">\n' +
    '{{{content}}}' +
    '</section>\n' +
    '</article>\n' +
    '</div>')
}))

var Handlebars = require('handlebars')

var templates = {}

templates.document = Handlebars.compile(
  '<!DOCTYPE html>\n' +
  '<html{{#if lang}} lang="{{lang}}"{{/if}}>\n' +
  '<head>\n' +
  '<title>{{text title}}</title>\n' +
  '<meta content="text/html; charset=utf-8" http-equiv="Content-Type">\n' +
  '<meta content="text/css" http-equiv="Content-Style-Type">\n' +
  '<meta content="width=device-width, initial-scale=1" name="viewport">\n' +
  '<link href="{{urlResolve url "/favicon.ico"}}" rel="icon" type="image/x-icon">\n' +
  '<link href="{{urlResolve url "/css/markdown-template.css"}}" rel="stylesheet">\n' +
  '<link href="index.txt" rel="alternate" title="Markdown" type="text/markdown">\n' +
  '{{#if css}}' +
  '<link href="{{urlResolve url css}}" rel="stylesheet" type="text/css">\n' +
  '{{/if}}' +
  '{{#if js}}' +
  '<script src="{{urlResolve url js}}" type="text/javascript"></script>\n' +
  '{{/if}}' +
  '{{#if mathjax}}' +
  '<script src="{{urlResolve url mathjax}}" type="text/x-mathjax-config"></script>\n' +
  '{{/if}}' +
  '<script async src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML" type="text/javascript"></script>\n' +
  '<script src="{{urlResolve url "/js/markdown-template.js"}}"></script>\n' +
  '</head>\n' +
  '<body>\n' +
  '{{{content}}}' +
  '</body>\n' +
  '</html>')

templates.body = Handlebars.compile(
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

module.exports = templates

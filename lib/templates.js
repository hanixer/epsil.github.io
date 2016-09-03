var Handlebars = require('handlebars')

var templates = {}

templates.document = Handlebars.compile(
  '<!DOCTYPE html>\n' +
  '<html{{#if lang}} lang="{{lang}}"{{/if}}>\n' +
  '<head>\n' +
  '<title>{{text title}}</title>\n' +
  '<meta content="text/html; charset=utf-8" http-equiv="Content-Type">\n' +
  '{{#if author}}<meta content="{{text author}}" name="author">\n{{/if}}' +
  '{{#if date}}<meta content="{{dateFormat date}}" name="date">\n{{/if}}' +
  '{{#if description}}<meta content="{{text description}}" name="description">\n{{/if}}' +
  '{{#if keywords}}<meta content="{{text keywords}}" name="keywords">\n{{/if}}' +
  '{{#if md5}}<meta content="{{{md5}}}" name="md5">\n{{/if}}' +
  '<meta content="text/css" http-equiv="Content-Style-Type">\n' +
  '<meta content="width=device-width, initial-scale=1" name="viewport">\n' +
  '{{#if icon}}' +
  '<link href="{{urlResolve url icon}}" rel="icon" type="image/x-icon">\n' +
  '{{else}}' +
  '<link href="{{urlResolve url "/favicon.ico"}}" rel="icon" type="image/x-icon">\n' +
  '{{/if}}' +
  '<link href="{{urlResolve url "/css/markdown-template.css"}}" rel="stylesheet">\n' +
  '<link href="index.txt" rel="alternate" title="Markdown" type="text/markdown">\n' +
  '{{#if css}}' +
  '<link href="{{urlResolve url css}}" rel="stylesheet" type="text/css">\n' +
  '{{/if}}' +
  '{{#if js}}' +
  '<script src="{{urlResolve url js}}" type="text/javascript"></script>\n' +
  '{{/if}}' +
  '<script type="text/x-mathjax-config">\n' +
  'MathJax.Hub.Config({\n' +
  'TeX: { equationNumbers: { autoNumber: "all" } }\n' +
  '})\n' +
  '</script>\n' +
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
  '<li role="presentation"><a href="/" title="Go home"><i class="fa fa-home"></i></a></li>\n' +
  '</ul>\n' +
  '<ul class="nav nav-pills navbar-right">\n' +
  '<li role="presentation"><a href="{{facebook}}" title="Share on Facebook"><i class="fa fa-facebook-square"></i></a></li>\n' +
  '<li role="presentation"><a href="{{twitter}}" title="Share on Twitter"><i class="fa fa-twitter-square"></i></a></li>\n' +
  // '<li role="presentation"><a href="{{linkedin}}" title="Share on LinkedIn"><i class="fa fa-linkedin-square"></i></a></li>\n' +
  // '<li role="presentation"><a href="{{mail}}" title="Share by mail"><i class="fa fa-envelope"></i></a></li>\n' +
  '<li role="presentation"><a href="{{github}}" title="Edit on GitHub"><i class="fa fa-edit"></i></a></li>\n' +
  '<li role="presentation"><a href="{{history}}" title="View history"><i class="fa fa-history"></i></a></li>\n' +
  '<li role="presentation"><a href="index.txt" title="Get Markdown source"><i class="fa fa-download"></i></a></li>\n' +
  '{{#if toc}}' +
  '<li role="presentation"><a href="#toc" data-toggle="collapse" title="Table of contents"><i class="fa fa-list"></i></a></li>\n' +
  '{{/if}}' +
  '</ul>\n' +
  '</div>\n' +
  '{{#if toc}}' +
  '<div id="toc" class="collapse" title="{{tocTitle}}"></div>\n' +
  '{{/if}}' +
  '</nav>\n' +
  '<div class="container">\n' +
  '<article class="h-entry">\n' +
  '{{#if include-before}}{{{include-before}}}{{/if}}' +
  '<header>\n' +
  '{{#if title}}' +
  '<h1 class="p-name">{{{title}}}</h1>\n' +
  '{{#if subtitle}}' +
  '<h2>{{{subtitle}}}</h2>\n' +
  '{{/if}}' +
  '{{#if author}}' +
  '<p class="p-author"><i class="fa fa-user"></i> ' +
  '{{author}}' +
  '{{#if date}}' +
  ' <span style="float: right"><time class="dt-published"><i class="fa fa-calendar-o"></i> {{dateFormat date}}</time></span>' +
  '{{/if}}' +
  '</p>\n' +
  '{{else}}' +
  '{{#if date}}' +
  '<p><time class="dt-published"><i class="fa fa-calendar-o"></i> {{dateFormat date}}</time></p>\n' +
  '{{/if}}' +
  '{{/if}}' +
  '{{else}}' +
  '{{#if date}}' +
  '<h1 class="p-name">{{dateFormat date}}</h1>\n' +
  '{{/if}}' +
  '{{/if}}' +
  '{{#if description}}' +
  '<p class="p-summary">{{{description}}}</p>\n' +
  '{{/if}}' +
  '</header>\n' +
  '<section class="e-content">\n' +
  '{{{content}}}' +
  '</section>\n' +
  '{{#if include-after}}{{{include-after}}}{{/if}}' +
  '</article>\n' +
  '</div>')

module.exports = templates

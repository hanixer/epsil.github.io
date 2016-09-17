var Handlebars = require('handlebars')
var $ = require('jquery')
var moment = require('moment')
var URI = require('urijs')
var markdown = require('./markdown')
var typogr = require('typogr')
var util = require('./util')
require('./anchor')
require('./collapse')
require('./section')
require('./social')
require('./figure')
require('./punctuation')
require('./toc')

Handlebars.registerHelper('dateFormat', function (context, block) {
  if (moment) {
    return moment(context).format('YYYY-MM-DD')
  } else {
    return context
  }
})

Handlebars.registerHelper('urlRelative', function (base, href) {
  if (!href.match(/^\//) ||
      (URI(base).is('relative') && !base.match(/^\//))) {
    return href
  }
  base = URI(base).pathname()
  var uri = new URI(href)
  var relUri = uri.relativeTo(base)
  var result = relUri.toString()
  return result
})

Handlebars.registerHelper('urlResolve', function (base, href) {
  return URI(href).absoluteTo(base).toString()
})

Handlebars.registerHelper('markdown', function (str) {
  return markdown(str, true)
})

Handlebars.registerHelper('text', function (str) {
  var html = markdown(str, true)
  var div = $('<div>')
  div.html(html)
  return div.text().trim()
})

Handlebars.registerHelper('process', function (html) {
  // typogr.js doesn't work well with MathJax
  // https://github.com/ekalinin/typogr.js/issues/31
  if (!html.match(/[\\][(]/g)) {
    // typogr.js doesn't understand unescaped quotation marks
    html = html.replace(/\u2018/gi, '&#8216;')
      .replace(/\u2019/gi, '&#8217;')
      .replace(/\u201c/gi, '&#8220;')
      .replace(/\u201d/gi, '&#8221;')
    html = typogr.typogrify(html)
  }

  return util.dojQuery(html, function (body) {
    var content = body.find('.e-content')
    body.fixWidont()
    body.addAcronyms()
    body.addSmallCaps()
    body.addPullQuotes()
    body.fixFigures()
    body.addPunctuation()
    body.addHotkeys()
    body.addTeXLogos()
    content.addAnchors()
    body.fixBlockquotes()
    content.addCollapsibleSections()
    body.fixFootnotes()
    body.fixTables()
    body.fixLinks()
    content.addSections()
  })
})

var templates = {
  document:
    '<!DOCTYPE html>\n' +
    '<html{{#if lang}} lang="{{lang}}"{{/if}} prefix="og: http://ogp.me/ns#">\n' +
    '<head>\n' +
    '<title>{{text title}}{{#if site-name}} &ndash; {{site-name}}{{/if}}</title>\n' +
    '<meta content="text/html; charset=utf-8" http-equiv="Content-Type">\n' +
    '{{#if author}}<meta content="{{text author}}" name="author">\n{{/if}}' +
    '{{#if date}}<meta content="{{dateFormat date}}" name="date">\n{{/if}}' +
    '{{#if description}}<meta content="{{text description}}" name="description">\n{{/if}}' +
    '{{#if keywords}}<meta content="{{text keywords}}" name="keywords">\n{{/if}}' +
    '{{#if md5}}<meta content="{{{md5}}}" name="md5">\n{{/if}}' +
    '<meta content="text/css" http-equiv="Content-Style-Type">\n' +
    '<meta content="width=device-width, initial-scale=1" name="viewport">\n' +
    '<meta name="DC.Title" content="{{text title}}">\n' +
    '{{#if author}}<meta name="DC.Creator" content="{{author}}">\n{{/if}}' +
    '{{#if date}}<meta name="DC.Date" content="{{dateFormat date}}">\n{{/if}}' +
    '{{#if description}}<meta name="DC.Description" content="{{text description}}">\n{{/if}}' +
    '{{#if lang}}<meta name="DC.Language" content="{{lang}}">\n{{/if}}' +
    '<meta name="DC.Format" content="text/html">\n' +
    '<meta property="og:title" content="{{text title}}">\n' +
    '{{#if description}}<meta property="og:description" content="{{text description}}">\n{{/if}}' +
    '{{#if lang}}<meta name="og:locale" content="{{lang}}">\n{{/if}}' +
    '<meta property="og:type" content="article">\n' +
    '<meta property="og:url" content="{{url}}">\n' +
    '{{#if site-name}}<meta property="og:site_name" content="{{site-name}}">\n{{/if}}' +
    '{{#if image}}<meta property="og:image" content="{{urlResolve url image}}">\n{{/if}}' +
    '{{#if video}}<meta property="og:video" content="{{video}}">\n{{/if}}' +
    '<meta name="twitter:card" content="summary">\n' +
    '<meta name="twitter:site" content="@github">\n' +
    '<meta name="twitter:title" content="{{text title}}">\n' +
    '{{#if description}}<meta name="twitter:description" content="{{text description}}">\n{{/if}}' +
    '{{#if image}}<meta name="twitter:image" content="{{urlResolve url image}}">\n{{/if}}' +
    '{{#if icon}}' +
    '<link href="{{urlRelative url icon}}" rel="icon" type="image/x-icon">\n' +
    '{{else}}' +
    '<link href="{{urlRelative url "/favicon.ico"}}" rel="icon" type="image/x-icon">\n' +
    '{{/if}}' +
    '<link href="{{urlRelative url "/css/markdown-template.css"}}" rel="stylesheet">\n' +
    '<link href="{{url}}" rel="canonical">\n' +
    '<link href="index.txt" rel="alternate" title="Markdown" type="text/markdown">\n' +
    '{{#if css}}' +
    '<link href="{{urlRelative url css}}" rel="stylesheet" type="text/css">\n' +
    '{{/if}}' +
    '{{#if js}}' +
    '<script src="{{urlRelative url js}}" type="text/javascript"></script>\n' +
    '{{/if}}' +
    '<script type="text/x-mathjax-config">\n' +
    'MathJax.Hub.Config({\n' +
    'TeX: { equationNumbers: { autoNumber: "all" } }\n' +
    '})\n' +
    '</script>\n' +
    '<script async src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML" type="text/javascript"></script>\n' +
    '<script src="{{urlRelative url "/js/markdown-template.js"}}"></script>\n' +
    '</head>\n' +
    '<body>\n' +
    '{{{process content}}}' +
    '</body>\n' +
    '</html>',
  body:
    '<nav class="navbar navbar-default navbar-fixed-top">\n' +
    '<div class="container-fluid">\n' +
    '<ul class="nav nav-pills navbar-left">\n' +
    '<li role="presentation"><a href="/" title="{{text home-title}}"><i class="fa fa-home"></i></a></li>\n' +
    '</ul>\n' +
    '<ul class="nav nav-pills navbar-right">\n' +
    '<li role="presentation"><a href="{{facebook}}" title="{{text facebook-title}}"><i class="fa fa-facebook-square"></i></a></li>\n' +
    '<li role="presentation"><a href="{{twitter}}" title="{{text twitter-title}}"><i class="fa fa-twitter-square"></i></a></li>\n' +
    // '<li role="presentation"><a href="{{linkedin}}" title="{{text linkedin-title}}"><i class="fa fa-linkedin-square"></i></a></li>\n' +
    // '<li role="presentation"><a href="{{mail}}" title="{{text mail-title}}"><i class="fa fa-envelope"></i></a></li>\n' +
    '<li role="presentation"><a href="{{github}}" title="{{text github-title}}"><i class="fa fa-edit"></i></a></li>\n' +
    '<li role="presentation"><a href="{{history}}" title="{{text history-title}}"><i class="fa fa-history"></i></a></li>\n' +
    '<li role="presentation"><a href="index.txt" title="{{text markdown-title}}"><i class="fa fa-download"></i></a></li>\n' +
    '{{#if toc}}' +
    '<li role="presentation"><a href="#toc" data-toggle="collapse" title="{{text toc-title}}"><i class="fa fa-list"></i></a></li>\n' +
    '{{/if}}' +
    '</ul>\n' +
    '</div>\n' +
    '{{#if toc}}' +
    '{{{toc}}}' +
    '{{/if}}' +
    '</nav>\n' +
    '<article class="h-entry">\n' +
    '{{#if include-before}}' +
    '<section>\n' +
    '{{{markdown include-before}}}' +
    '</section>\n' +
    '{{/if}}' +
    '<header>\n' +
    '{{#if title}}' +
    '<h1 class="p-name"><a class="u-uid u-url" href="{{url}}" title="Permalink">{{{markdown title}}}</a></h1>\n' +
    '{{#if subtitle}}' +
    '<h2>{{{markdown subtitle}}}</h2>\n' +
    '{{/if}}' +
    '{{#if author}}' +
    '<p>' +
    '<a class="p-author h-card" href="{{author-url}}">{{{markdown author}}}</a>' +
    '{{#if date}}' +
    ' <time class="dt-published" datetime="{{dateFormat date}}" datetime="{{dateFormat date}}">{{dateFormat date}}</time>' +
    '{{/if}}' +
    '</p>\n' +
    '{{else}}' +
    '{{#if date}}' +
    '<p><time class="dt-published" datetime="{{dateFormat date}}">{{dateFormat date}}</time></p>\n' +
    '{{/if}}' +
    '{{/if}}' +
    '{{else}}' +
    '{{#if date}}' +
    '<h1 class="p-name"><a class="u-uid u-url" href="{{url}}" title="Permalink">{{dateFormat date}}</a></h1>\n' +
    '{{/if}}' +
    '{{/if}}' +
    '{{#if description}}' +
    '<p class="p-summary">{{{markdown description}}}</p>\n' +
    '{{/if}}' +
    '{{#if image}}' +
    '<figure>\n' +
    '<img alt="{{#if image-alt}}{{image-alt}}{{/if}}" class="u-photo" {{#if image-height}}height="{{image-height}}"{{/if}} {{#if image-width}}width="{{image-width}}"{{/if}} src="{{image}}">\n' +
    '</figure>\n' +
    '{{/if}}' +
    '</header>\n' +
    '<section class="e-content">\n' +
    '{{{content}}}' +
    '{{#if footnotes}}' +
    '{{#if footnotes-title}}' +
    '<h1>{{{markdown footnotes-title}}}</h1>\n' +
    '{{{footnotes}}}' +
    '{{else}}' +
    '<hr class="footnotes-sep">\n' +
    '<section class="footnotes">\n' +
    '{{{footnotes}}}' +
    '</section>\n' +
    '{{/if}}' +
    '{{/if}}' +
    '</section>\n' +
    '{{#if include-after}}' +
    '<section>\n' +
    '{{{markdown include-after}}}' +
    '</section>\n' +
    '{{/if}}' +
    '</article>'
}

// TODO: precompile the templates
templates.document = Handlebars.compile(templates.document)
templates.body = Handlebars.compile(templates.body)

module.exports = templates

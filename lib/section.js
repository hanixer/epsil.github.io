/* global define, jQuery, S */

// Hierarchical sections, based on Pandoc's --section-divs

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory)
    define(['string'], factory)
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'), require('string'))
  } else {
    factory(jQuery, S)
  }
}(function ($, S) {
  $.fn.addSections = function () {
    return this.each(function () {
      var body = $(this)
      // process innermost sections first
      $.each(['h6', 'h5', 'h4', 'h3', 'h2', 'h1'],
             function (i, el) {
               body.find(el).each(function () {
                 var header = $(this)
                 // h1 ends at next h1, h2 ends at next h1 or h2,
                 // h3 ends at next h1, h2 or h3, and so on
                 var stop = []
                 var i = parseInt(header.prop('tagName').match(/\d+/)[0])
                 for (var j = 1; j <= i; j++) {
                   stop.push('h' + j)
                 }
                 var end = stop.join(', ')
                 var section = header.nextUntil(end).addBack()
                 section = section.wrapAll('<section>').parent()
                 var id = header.attr('id')
                 if (id === undefined || id === '') {
                   id = S(header.text().trim()).slugify()
                   header.attr('id', id)
                 }
                 section.attr('id', id)
                 header.removeAttr('id')
               })
             })
    })
  }

  return $.fn.addSections
}))

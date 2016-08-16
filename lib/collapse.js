/* global jQuery:true */
/* exported jQuery */

// Collapsible headers, based on Bootstrap's collapse plugin
//
// TODO:
//
// - Require bootstrap as a dependency: require('bootstrap').
// - Divide code into HTML pass and JavaScript pass:
//   HTML pass should add Bootstrap attributes to headers,
//   JavaScript pass should add click handlers.
//   (perhaps JS could be replaced with CSS' :before/:after?).
// - Should the JavaScript pass be performed automatically?
//   I.e., $(function () { ... }). Or will this cause problems
//   if the code is used as a Node plugin?
// - Does the code style of Bootstrap's plugin provide any clues
//   with regard to best practice?
// - Add code for collapsible lists.
// - Make links to collapsed elements auto-expand them
// - Option like Pandoc's --section-divs
//   (or does this belong in a plugin of its own?)

var $ = require('jquery')
var S = require('string')
jQuery = $ // needed for Bootstrap
require('bootstrap')

$.fn.addCollapsibleSections = function (options) {
  var opts = $.extend({}, $.fn.addCollapsibleSections.defaults, options)
  return this.each(function () {
    var body = $(this)
    // process innermost sections first
    $.each(['h6', 'h5', 'h4', 'h3', 'h2', 'h1'],
           function (i, el) {
             body.find(el).each(function () {
               // add section
               var header = $(this)
               var section = $.fn.addCollapsibleSections.addSection(header)

               // skip top-level headers
               if ($.inArray(el, opts.include) < 0) {
                 return
               }

               // add button to header
               $.fn.addCollapsibleSections.addButton(header, section)
             })
           })
  })
}

// add collapsible content for header
$.fn.addCollapsibleSections.addSection = function (header) {
  // h1 ends at next h1, h2 ends at next h1 or h2,
  // h3 ends at next h1, h2 or h3, and so on
  var stop = []
  var i = parseInt(header.prop('tagName').match(/\d+/)[0])

  for (var j = 1; j <= i; j++) {
    stop.push('h' + j)
  }
  var end = stop.join(', ')
  var section = header.nextUntil(end)
  section = section.wrapAll('<div>').parent()
  $.fn.addCollapsibleSections.sectionId(header, section)
  return section
}

// add button to header
$.fn.addCollapsibleSections.addButton = function (header, section) {
  // add button
  var id = $.fn.addCollapsibleSections.sectionId(header, section)
  var button = $.fn.addCollapsibleSections.button(id)
  header.append(button)

  // add Bootstrap classes
  section.addClass('collapse in')

  // allow pre-collapsed sections
  if (header.hasClass('collapse')) {
    header.removeClass('collapse').addClass('collapsed')
  }
  if (header.hasClass('collapsed')) {
    header.removeClass('collapsed')
    section.removeClass('in')
    button.attr('aria-expanded', 'false')
  }
}

// button
$.fn.addCollapsibleSections.button = function (id) {
  return $('<a aria-hidden="true" aria-expanded="true" role="button" class="collapse-button" data-toggle="collapse" href="#' + id + '" aria-controls="' + id + '"></a>')
}

// header ID (add if missing)
$.fn.addCollapsibleSections.headerId = function (header) {
  var id = header.attr('id')
  if (id === undefined || id === '') {
    id = S(header.text().trim()).slugify()
    header.attr('id', id)
  }
  return id
}

// section ID (based on header ID)
$.fn.addCollapsibleSections.sectionId = function (header, section) {
  var id = section.attr('id')
  if (id === undefined || id === '') {
    var headerId = $.fn.addCollapsibleSections.headerId(header)
    id = headerId ? headerId + '-section' : ''
    section.attr('id', id)
  }
  return id
}

// // click handler
// $.fn.addCollapsibleSections.clickHandler = function (button, header, collapse, expand) {
//   return function () {
//     // change glyph
//     if (header.hasClass('collapsed')) {
//       button.attr('title', collapse)
//       header.removeClass('collapsed')
//     } else {
//       button.attr('title', expand)
//       header.addClass('collapsed')
//     }
//   }
// }

// // add click handler
// $.fn.addCollapsibleClickHandlers = function (options) {
//   return this.each(function () {
//     $(this).find('.collapse-button').each(function () {
//       var button = $(this)
//       var header = button.parent()
//       var collapse = $.fn.addCollapsibleSections.defaults.collapse
//       var expand = $.fn.addCollapsibleSections.defaults.expand
//       var handler = $.fn.addCollapsibleSections.clickHandler(button, header, collapse, expand)
//       button.click(handler)
//     })
//   })
// }

// Default options
$.fn.addCollapsibleSections.defaults = {
  include: ['h2', 'h3', 'h4', 'h5', 'h6'] // skip h1
  // collapse: 'Collapse', // collapse title
  // expand: 'Expand', // expand title
}

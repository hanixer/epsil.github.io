/* global define, jQuery */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory)
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'))
  } else {
    factory(jQuery)
  }
}(function ($) {
  $.fn.addHangingPunctuation = function () {
    return this.each(function () {
      $(this).find('h1, h2, h3, h4, h5, h6, li, p, th, td').each(function () {
        var txt = $(this).text().trim()
        if (txt.match(/^["\u00ab\u201c]/)) {
          $(this).addClass('startsWithDoubleQuote')
        } else if (txt.match(/^['\u00b9\u2018]/)) {
          $(this).addClass('startsWithSingleQuote')
        }
      })
    })
  }

  return $.fn.addHangingPunctuation
}))

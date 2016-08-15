/* global jQuery */
(function ($) {
  $.fn.removeAria = function () {
    return this.map(function () {
      var clone = $(this).clone()
      clone.find('[aria-hidden="true"]').remove()
      return clone
    })
  }

  $.fn.fixAnchors = function () {
    return this.each(function () {
      $(this).find('h1 a[aria-hidden="true"], h2 a[aria-hidden="true"], h3 a[aria-hidden="true"], h4 a[aria-hidden="true"], h5 a[aria-hidden="true"], h6 a[aria-hidden="true"]').each(function () {
        var anchor = $(this)
        var header = anchor.parent()
        var id = header.attr('id')

        // ensure href is correct
        if (id) {
          anchor.attr('href', '#' + id)
        }

        // set title attribute
        if (!anchor.is('[title]')) {
          var title = header.removeAria().text().trim()
          anchor.attr('title', title)
        }

        // remove glyph (provided by CSS)
        anchor.text('')
      })
    })
  }

  $.fn.fixFootnotes = function () {
    return this.each(function () {
      var body = $(this)
      body.find('.footnote-ref a').each(function () {
        var link = $(this)
        var id = link.attr('href')
        var note = body.find(id)
        var text = note.text().replace(/(\s*\u21a9\s*)+$/, '')
        link.attr('title', text)
      })
    })
  }

  $.fn.removeEmptyTableHeaders = function () {
    return this.each(function () {
      $(this).find('thead').filter(function (i) {
        return $(this).text().trim() === ''
      }).remove()
    })
  }

  // http://stackoverflow.com/questions/10206298/jquery-multiple-selectors-order#answer-10206378
  $.fn.coalesce = function (selectors) {
    return this.map(function () {
      var body = $(this)
      var match = body.find([])
      $.each(selectors, function (i, selector) {
        var res = body.find(selector)
        if (res.length > 0) {
          match = res.first()
          return false
        }
      })
      return match
    })
  }

  $.fn.addTitle = function () {
    return this.each(function () {
      var title = $(this).find('title')
      if (title.length === 0) {
        title = $('title')
      }

      var meta = $(this).find('meta[name=title]')
      if (meta.length === 0) {
        meta = $('meta[name=title]')
      }

      if (meta.length !== 0) {
        title.text(meta.attr('content'))
      } else {
        var header = $(this).coalesce(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'b', 'em', 'i', 'p']).first()

        if (header.length > 0) {
          var txt = header.removeAria().text().trim()
          title.html(txt)
        }
      }
    })
  }
}(jQuery))

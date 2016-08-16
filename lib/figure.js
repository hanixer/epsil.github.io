var $ = require('jquery')

$.fn.addFigures = function () {
  return this.each(function () {
    $(this).find('p img').each(function () {
      var img = $(this)
      var alt = img.attr('alt')
      var p = img.parent()
      while (p.prop('tagName') !== 'P') {
        p = p.parent()
      }

      // ignore images without a caption
      if (alt === '') {
        var pclass = (p.attr('class') || '').trim()
        if (pclass === 'center') {
          // ignore
        } else if (pclass === '' &&
            p.text().trim() === '') {
          p.addClass('center')
        } else {
          img.addClass(p.attr('class'))
          p.removeAttr('class')
        }

        if (p.is('[width]')) {
          img.attr('width', p.attr('width'))
          p.removeAttr('width')
        }
      } else {
        // create figure div
        var div = $('<div class="figure"></div>')
        var caption = $('<p class="caption">' + alt + '</p>')
        div.append(img)
        div.append(caption)

        // add classes
        div.addClass(img.attr('class'))
        img.removeAttr('class')
        if (img.is('[width]')) {
          var width = parseInt(img.attr('width'))
          div.css('width', (width + 9) + 'px')
        }

        // insert into DOM
        div.insertBefore(p)
        if (p.is(':empty')) {
          p.remove()
        }
      }
    })
  })
}

var $ = require('jquery')
var S = require('string')

$.fn.addHotkeys = function () {
  return this.map(function () {
    var body = $(this)
    body.find('kbd:contains("Ctrl")').replaceWith('<kbd title="Control">Ctrl</kbd>')
    body.find('kbd:contains("Alt")').replaceWith('<kbd title="Alt">Alt</kbd>')
    body.find('kbd:contains("Esc")').replaceWith('<kbd title="Escape">Esc</kbd>')
    body.find('kbd:contains("Enter")').replaceWith('<kbd title="Enter">\u21b5</kbd>')
    body.find('kbd:contains("Tab")').replaceWith('<kbd title="Tab">\u21b9</kbd>')
    body.find('kbd:contains("Windows")').replaceWith('<kbd title="Windows"><i class="fa fa-windows"></i></kbd>')
    body.find('kbd:contains("Shift"), kbd:contains("\u21e7")').replaceWith('<kbd title="Shift">\u21e7</kbd>')
    body.find('kbd:contains("Cmd"), kbd:contains("Command"), kbd:contains("\u2318")').replaceWith('<kbd title="Command">\u2318</kbd>')
    body.find('kbd:contains("Opt"), kbd:contains("Option"), kbd:contains("\u2325")').replaceWith('<kbd title="Option">\u2325</kbd>')
    body.find('kbd:contains("Fn"), kbd:contains("Function")').replaceWith('<kbd title="Function">Fn</kbd>')
    body.find('kbd:contains("Eject")').replaceWith('<kbd title="Eject">\u23cf</kbd>')
    body.find('kbd:contains("Power")').replaceWith('<kbd title="Power"><i class="fa fa-power-off"></i></kbd>')
    body.find('kbd:contains("Left")').replaceWith('<kbd title="Left">\u2190</kbd>') // \u2b05
    body.find('kbd:contains("Right")').replaceWith('<kbd title="Right">\u2192</kbd>') // \u27a1
    body.find('kbd:contains("Up")').replaceWith('<kbd title="Up">\u2191</kbd>') // \u2b06
    body.find('kbd:contains("Down")').replaceWith('<kbd title="Down">\u2193</kbd>') // \u2b07
  })
}

$.fn.addTeXLogos = function () {
  return this.map(function () {
    var body = $(this)
    // cf. http://edward.oconnor.cx/2007/08/tex-poshlet
    // and http://nitens.org/taraborelli/texlogo
    var xe = 'X<span class="xetex-e">&#398;</span>'
    var la = 'L<span class="latex-a">a</span>'
    var tex = 'T<span class="tex-e">e</span>X'
    body.find('abbr[title=XeTeX]').html(xe + tex)
    body.find('abbr[title=LaTeX]').html(la + tex)
    body.find('abbr[title=LuaTeX]').html('Lua' + tex)
    body.find('abbr[title=ConTeXt]').html('Con' + tex + 't')
    body.find('abbr[title=AUCTeX]').html('AUC' + tex)
    body.find('abbr[title=MiKTeX]').html('MiK' + tex)
    body.find('abbr[title=PCTeX]').html('PC' + tex)
    body.find('abbr[title=MacTeX]').html('Mac' + tex)
    body.find('abbr[title=TeX]').html(tex)
  })
}

$.fn.addAcronyms = function () {
  return this.map(function () {
    $(this).find('abbr').filter(function () {
      var text = $(this).text().trim()
      return text.toUpperCase() === text
    }).addClass('acronym')
  })
}

$.fn.addSmallCaps = function () {
  return this.map(function () {
    $(this).find('sc').replaceWith(function () {
      var span = $('<span class="small-caps"></span>')
      span.html($(this).html())
      return span
    })
  })
}

$.fn.addPullQuotes = function () {
  return this.map(function () {
    $(this).find('p.pull-quote').each(function () {
      var p = $(this)
      var blockquote = p.parent()
      if (blockquote.prop('tagName') !== 'BLOCKQUOTE') {
        blockquote = p.wrap('<blockquote>').parent()
      }
      blockquote.addClass(p.attr('class'))
      p.removeAttr('class')
    })
  })
}

$.fn.removeAria = function () {
  return this.map(function () {
    var clone = $(this).clone()
    clone.find('[aria-hidden="true"]').remove()
    return clone
  })
}

$.fn.fixHeader = function () {
  return this.each(function () {
    var header = $(this)
    var text = header.text().trim()
    var id = header.attr('id')

    if (id === undefined || id === '') {
      id = S(text).slugify()
      header.attr('id', id)
    }
  })
}

$.fn.fixHeaders = function () {
  return this.each(function () {
    var headers = $(this).find('h1, h2, h3, h4, h5, h6')
    headers.fixHeader()
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

$.fn.fixBlockquotes = function () {
  return this.each(function () {
    $(this).find('blockquote > p:last-child').each(function () {
      var p = $(this)
      if (p.text().trim().match(/^[\u2013\u2014]/)) {
        p.find('em, i').replaceWith(function () {
          return $('<cite>' + $(this).html() + '</cite>')
        })
        var html = p.html().substr(1)
        var footer = $('<footer>' + html + '</footer>')
        p.replaceWith(footer)
      }
    })
  })
}

$.fn.fixFootnotes = function () {
  return this.each(function () {
    var body = $(this)
    body.find('.footnote-ref a').each(function () {
      var link = $(this)
      var sup = link.parent()
      var p = sup.parent()
      var id = link.attr('href').replace(/:.*/, '')
      link.attr('href', id)
      var note = body.find(id)
      var backref = note.find('.footnote-backref')
      var text = note.text().trim().replace(/(\s*\u21a9.*\s*)+$/, '')
      var source = p.text().trim()
      link.attr('title', text)
      backref.attr('title', source)
    })
  })
}

$.fn.fixLinks = function () {
  return this.each(function () {
    var body = $(this)
    body.find('a[href^="#"]').each(function () {
      var link = $(this)
      var href = link.attr('href')
      var title = link.attr('title')
      if (link.attr('aria-hidden') === 'true' || href === '#' ||
          (title !== undefined && title !== '')) {
        return
      }
      var target = body.find(href)
      if (target.length <= 0) {
        return
      }
      var text = target.removeAria().text().trim()
      link.attr('title', text)
    })
  })
}

$.fn.fixTables = function () {
  return this.each(function () {
    // add Bootstrap classes
    $(this).find('table').each(function () {
      var table = $(this)

      // add Bootstrap classes
      table.addClass('table table-striped table-bordered table-hover')
      // table.wrap('<div class="table-responsive"></div>')

      // remove empty table headers
      table.find('thead').filter(function (i) {
        return $(this).text().trim() === ''
      }).remove()
    })
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
      // var heading = $(this).coalesce(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'b', 'em', 'i', 'p']).first()
      var heading = $(this).find('h1').first()
      if (heading.length > 0) {
        var txt = heading.removeAria().text().trim()
        title.html(txt)
        var header = $(this).find('header')
        header.prepend(heading)
      }
    }
  })
}

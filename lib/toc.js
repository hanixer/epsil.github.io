var $ = require('jquery')
var S = require('string')

$.fn.addTableOfContents = function () {
  return this.map(function () {
    var body = $(this)
    var placeholder = body.find('#toc')
    var title = placeholder.attr('title')
    var toc = body.tableOfContents(title)
    placeholder.replaceWith(toc)
  })
}

$.fn.tableOfContents = function (title) {
  var body = $(this).find('#content') // FIXME: un-hardcode this
  var toc = body.listOfContents()

  if (toc === '') {
    return $('')
  }

  var block = $('<div id="toc" class="collapse">' + toc + '</div>')
  block.find('li ul').each(function (i, el) {
    var ul = $(this)
    var a = ul.prev()
    var id = S(a.text().trim()).slugify() + '-link'
    var span = a.wrap('<span class="collapse" id="' + id + '">').parent()
    $.fn.addCollapsibleSections.addButton(span, ul)
  })

  return block
}

$.fn.listOfContents = function () {
  var body = $(this)
  var currentLevel = 0
  var str = ''
  var stack = []

  var currentElement = function () {
    var i = stack.length - 1
    if (i < 0) {
      return ''
    } else {
      return stack[i]
    }
  }

  var openTag = function (el, tag) {
    stack.push(el)
    str += tag
  }

  var openElement = function (el) {
    var tag = '<' + el + '>'
    openTag(el, tag)
  }

  var closeElement = function () {
    var el = stack.pop()
    var tag = '</' + el + '>'
    str += tag
    return el
  }

  var openListElement = function () {
    closeListElement() // don't allow li elements to nest
    openElement('li')
  }

  var closeListElement = function () {
    if (currentElement() === 'li') {
      closeElement()
    }
  }

  var addLink = function (id, html) {
    var a = $('<a href="#' + id + '"></a>')
    a.html(html)
    a.find('a').replaceWith(function () {
      return $(this).html()
    })
    a.html(a.html().trim())
    str += a.prop('outerHTML')
  }

  var startList = function (level) {
    while (currentLevel < level) {
      if (currentElement() === 'ul') {
        openListElement()
      }
      openElement('ul')
      currentLevel++
    }
  }

  var endList = function (level) {
    while (currentLevel > level) {
      var el = closeElement()
      if (el === 'ul') {
        currentLevel--
      }
    }
  }

  // generate ID if missing
  var fixHeader = function (header) {
    var id = header.attr('id')
    if (id === undefined || id === '') {
      var clone = header.clone()
      clone.find('[aria-hidden="true"]').remove()
      var title = clone.text().trim()
      id = S(title).slugify()
      header.attr('id', id)
    }
    return header
  }

  var headers = body.find('h1, h2, h3, h4, h5, h6')

  if (headers.length === 0) {
    return ''
  }

  var exclude = '.title' // should be parametrized
  headers = headers.filter(function () {
    return !$(this).is(exclude)
  })
  headers.each(function (i, el) {
    var header = fixHeader($(this))
    var html = header.html()
    var id = header.attr('id')
    var level = parseInt(header.prop('tagName').match(/\d+/)[0])
    endList(level)
    startList(level)
    openListElement()
    addLink(id, html)
  })

  // close all tags
  endList(0)

  // remove superfluous ul elements
  while (str.match(/^<ul><li><ul><li>/) && str.match(/<\/li><\/ul><\/li><\/ul>$/)) {
    str = str.substring(8, str.length - 10)
  }

  return str
}

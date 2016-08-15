/* global jQuery */
(function ($) {
  $.fn.readingList = function (options) {
    var opts = $.extend({},
                        $.fn.readingList.defaults,
                        {body: $(this)},
                        options)

    return this.each(function () {
      if (opts.createLinks) {
        $.fn.readingList.linkifyBooks(opts.body,
                                      opts.useCalibre,
                                      opts.calibreHost,
                                      opts.calibrePort)
      }
      $.fn.readingList.handleTags(opts.body)
      if (opts.createLists) {
        $.fn.readingList.handleTagLists(opts.body)
      }
      if (opts.createAnchors) {
        $.fn.readingList.handleHeaders(opts.body)
      }
    })
  }

  $.fn.readingList.tagId = function (tag) {
    return tag.replace('#', '')
  }

  $.fn.readingList.tagName = function (tag) {
    var id = $.fn.readingList.tagId(tag)
    id = id.replace('-', ' ')
    return id[0].toUpperCase() + id.slice(1)
  }

  $.fn.readingList.findHeader = function (tag, body) {
    var header = body.find(tag)
    if (header.length === 0) {
      header = body.find('h1, h2, h3, h4, h5, h6').filter(function (index) {
        return $(this).text().trim() === $.fn.readingList.tagName(tag)
      })
      if (header.length > 0) {
        header.attr('id', $.fn.readingList.tagId(tag))
      }
    }
    if (header.length === 0) {
      header = $.fn.readingList.createHeader(tag, body)
    }
    return header
  }

  $.fn.readingList.createHeader = function (tag, body) {
    var header = $('<h2 id ="' + $.fn.readingList.tagId(tag) + '">' + $.fn.readingList.tagName(tag) + '</h2>')
    body.append(header)
    return header
  }

  $.fn.readingList.handleHeaders = function (body) {
    body.find('h1, h2, h3, h4, h5, h6').each(function () {
      var header = $(this)
      var title = $.fn.readingList.removeAria(header).text().trim()
      var anchor = header.find('.header-anchor')
      if (anchor.length === 0) {
        $(this).prepend('<a aria-hidden="true" class="header-anchor" href="#' + $(this).attr('id') + '" title="' + title + '">&para;</a>')
      } else {
        anchor.attr('title', title)
      }
    })
    return body
  }

  $.fn.readingList.removeAria = function (el) {
    var clone = el.clone()
    clone.find('[aria-hidden="true"]').remove()
    return clone
  }

  $.fn.readingList.findList = function (tag, body) {
    var header = $.fn.readingList.findHeader(tag, body)
    var ul = header.next()
    if (ul.length === 0 || ul[0].tagName !== 'UL') {
      ul = $.fn.readingList.createList(tag, body)
    }
    return ul
  }

  $.fn.readingList.createList = function (tag, body) {
    var header = $.fn.readingList.findHeader(tag, body)
    var ul = $('<ul>')
    header.after(ul)
    return ul
  }

  $.fn.readingList.linkifyTag = function (tag) {
    tag = tag.trim()
    return ' #<a class="tag" href ="' + tag + '" title="' + $.fn.readingList.tagName(tag) + '">' + $.fn.readingList.tagId(tag) + '</a>'
  }

  $.fn.readingList.handleTagList = function (el, body) {
    var tag = el.attr('href')
    var tagRegEx = /(^|\s|\(|>)#((\w|[-&\u00A1-\uFFFF])+)/gi
    var tagRegEx2 = /(^|\s|\(|>)#<a.+<\/a>/gi
    var li = el.parent()
    var li2 = li.html().replace(tagRegEx, '').replace(tagRegEx2, '')
    li2 = $('<li>' + li2 + '</li>')
    var ul = $.fn.readingList.findList(tag, body)
    if (ul.find('li:contains(' + li2.text().trim() + ')').length === 0) {
      ul.append(li2)
    }
    return body
  }

  $.fn.readingList.handleTagLists = function (body) {
    body.find('.tag').each(function () {
      $.fn.readingList.handleTagList($(this), body)
    })
    return body
  }

  $.fn.readingList.handleTags = function (body) {
    var tagRegEx = /(^|\s|\(|>)#((\w|[-&\u00A1-\uFFFF])+)/gi
    var html = body.html()
    html = html.replace(tagRegEx, $.fn.readingList.linkifyTag)
    body.html(html)
    return body
  }

  $.fn.readingList.handleRating = function (el) {
    var ratingRegEx = /[(]([0-9.]+)(?:\/([0-9.]+))?[)]$/i
    var txt = el.text().trim()
    var matches = txt.match(ratingRegEx)
    if (matches) {
      var rating = parseFloat(matches[1])
      var total = parseFloat(matches[2] || '5.0')
      rating = rating / total * 5.0
      var html = el.html()
      html = html.replace(ratingRegEx,
                          $.fn.readingList.starRating(rating))
      el.html(html)
    }
    return el
  }

  $.fn.readingList.starRating = function (rating) {
    var blackStar = '\u2605'
    var whiteStar = '\u2606'
    var oneHalf = '\u00bd'
    var str = ''
    var i, n
    n = Math.floor(rating)
    for (i = 0; i < n; i++) {
      str += blackStar
    }
    if (rating > 0 && rating - n > 0) {
      str += oneHalf
    }
    n = 5 - str.length
    for (i = 0; i < n; i++) {
      str += whiteStar
    }
    return '<span style="color: rgb(187, 131, 0)" title="' +
      rating + '">' + str + '</span>'
  }

  $.fn.readingList.linkifyBooks = function (body, useCalibre, calibreHost, calibrePort) {
    body.find('li em').each(function () {
      // construct search string for book
      var em = $(this)
      var prev = this.previousSibling
      var author = prev ? prev.nodeValue : ''
      var title = em.text()
      var book = author + title
      // add links
      var search = $.fn.readingList.searchString(book)
      if (!em.find('a').length) {
        if (useCalibre) {
          em.wrapInner($.fn.readingList.calibreUrl(book, search,
                                                   calibreHost, calibrePort))
        } else {
          em.wrapInner($.fn.readingList.amazonUrl(book, search))
        }
      }
      var entry = em.parent().is('del, s, strike') ? em.parent() : em
      entry.after('<sup>' +
                  (useCalibre ? ($.fn.readingList.amazon(title, search) + ' ') : '') +
                  $.fn.readingList.goodreads(title, search) + ' ' +
                  $.fn.readingList.librarything(title, search) + ' ' +
                  $.fn.readingList.worldcat(title, search) + ' ' +
                  $.fn.readingList.google(title, search) + ' ' +
                  $.fn.readingList.reddit(title) + ' ' +
                  $.fn.readingList.hackernews(title) + ' ' +
                  $.fn.readingList.stackexchange(title) + ' ' +
                  $.fn.readingList.medium(title) + ' ' +
                  $.fn.readingList.forum(title) + ' ' +
                  $.fn.readingList.wikipedia(title, search) +
                  '</sup>')

      // Tags
      var li = em.parent().is('del, s, strike') ? em.parent().parent() : em.parent()
      em.replaceWith('<cite>' + em.html() + '</cite>')
      $.fn.readingList.handleRating(li)
    })
    return body
  }

  $.fn.readingList.asciify = function (str) {
    return str.replace(/[\u2018\u2019]/ig, "'")
      .replace(/[\u201c\u201d]/ig, '"')
      .replace(/\u2026/ig, '...')
  }

  $.fn.readingList.searchString = function (search) {
    search = $.fn.readingList.asciify(search)
    search = search.replace(/:/ig, '')
      .replace(/"/ig, '')
      .replace(/[-,:;&!?#]/ig, ' ')
      .replace(/\.\.\./ig, ' ')
      .replace(/\. /ig, ' ')
      .replace(/[ ]+/ig, ' ')
      .toLowerCase()
    return encodeURIComponent(search)
  }

  $.fn.readingList.calibreUrl = function (title, search, calibreHost, calibrePort) {
    var url = 'http://' + calibreHost + ':' + calibrePort + '/browse/search?query=' + search
    return '<a href="' + url + '" title="' + title + '"></a>'
  }

  $.fn.readingList.amazonUrl = function (title, search) {
    var url = 'http://www.amazon.com/s/' + '?field-keywords=' + search
    return '<a href="' + url + '" title="' + title + '"></a>'
  }

  $.fn.readingList.amazon = function (title, search) {
    var url = 'http://www.amazon.com/s/' + '?field-keywords=' + search
    return '<a href="' + url + '" title="Find ' + title + ' on Amazon.com">' + '<img alt="Amazon.com" height="16" src="img/amazon.png">' + '</a>'
  }

  $.fn.readingList.goodreads = function (title, search) {
    var url = 'http://www.goodreads.com/search?query=' + search
    return '<a href="' + url + '" title="Find ' + title + ' on Goodreads">' + '<img alt="Goodreads" height="16" src="img/goodreads.png">' + '</a>'
  }

  $.fn.readingList.librarything = function (title, search) {
    var url = 'http://www.librarything.com/search.php?term=' + search
    return '<a href="' + url + '" title="Find ' + title + ' on LibraryThing">' + '<img alt="LibraryThing" height="14" src="img/librarything.png">' + '</a>'
  }

  $.fn.readingList.google = function (title, search) {
    var url = 'http://www.google.com/?gws_rd=ssl#tbm=bks&q=' + search
    return '<a href="' + url + '" title="Find ' + title + ' on Google Books">' + '<img alt="Google Books" height="16" src="img/google.png">' + '</a>'
  }

  $.fn.readingList.worldcat = function (title, search) {
    var url = 'http://www.worldcat.org/search?q=' + search
    return '<a href="' + url + '" title="Find ' + title + ' on WorldCat">' + '<img alt="WorldCat" height="16" src="img/worldcat.png">' + '</a>'
  }

  $.fn.readingList.reddit = function (title) {
    var search = encodeURIComponent($.fn.readingList.asciify(title).toLowerCase())
    var url = 'http://www.google.com/#q=site:www.reddit.com+' + '&quot;' + search + '&quot;'
    return '<a href="' + url + '" title="Find ' + title + ' on Reddit">' + '<img alt="Reddit" height="16" src="img/reddit.png">' + '</a>'
  }

  $.fn.readingList.hackernews = function (title) {
    var search = encodeURIComponent($.fn.readingList.asciify(title).toLowerCase())
    var url = 'http://www.google.com/#q=site:news.ycombinator.com+' + '&quot;' + search + '&quot;'
    return '<a href="' + url + '" title="Find ' + title + ' on Hacker News">' + '<img alt="Hacker News" height="16" src="img/hackernews.png">' + '</a>'
  }

  $.fn.readingList.stackexchange = function (title) {
    var search = encodeURIComponent($.fn.readingList.asciify(title).toLowerCase())
    var url = 'http://stackexchange.com/search?q=' + '&quot;' + search + '&quot;'
    return '<a href="' + url + '" title="Find ' + title + ' on Stack Exchange">' + '<img alt="Stack Exchange" height="16" src="img/stackexchange.png">' + '</a>'
  }

  $.fn.readingList.medium = function (title) {
    var search = encodeURIComponent($.fn.readingList.asciify(title).toLowerCase())
    var url = 'http://www.google.com/#q=site:medium.com+' + '&quot;' + search + '&quot;'
    return '<a href="' + url + '" title="Find ' + title + ' on Medium">' + '<img alt="Medium" height="16" src="img/medium.png">' + '</a>'
  }

  $.fn.readingList.forum = function (title) {
    var search = encodeURIComponent($.fn.readingList.asciify(title).toLowerCase())
    var url = 'http://www.google.com/#q=forum+' + '&quot;' + search + '&quot;'
    return '<a href="' + url + '" title="Find ' + title + ' on forums">' + '<img alt="Forums" height="16" src="img/disqus.png">' + '</a>'
  }

  $.fn.readingList.wikipedia = function (title, search) {
    var url = 'http://en.wikipedia.org/w/index.php?search=' + search
    return '<a href="' + url + '" title="Find ' + title + ' on Wikipedia">' + '<img alt="Wikipedia" height="16" src="img/wikipedia.png">' + '</a>'
  }

  // Default options
  $.fn.readingList.defaults = {
    // calibre-server host
    calibreHost: window.location.hostname || 'localhost',
    // calibre-server port
    calibrePort: 8080,
    // document body
    body: 'body',
    // whether to use Calibre
    useCalibre: true,
    // whether to create links
    createLinks: true,
    // whether to create lists
    createLists: true,
    // whether to create anchors
    createAnchors: true
  }
}(jQuery))

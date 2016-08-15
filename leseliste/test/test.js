/* global describe, it, $, md */
var markdown = 'Reading List Example\n' +
    '--------------------\n\n' +
    '- Matthew MacDonald: *HTML5: The Missing Manual* #development\n' +
    '- ~~Erich Gamma & Richard Helm & Ralph Johnson & John Vlissides: *Design Patterns*~~ #development\n' +
    '- Steve Krug: *Don\'t Make Me Think!* #design\n' +
    '- Garr Reynolds: *Presentation Zen* #presentation\n'

var html = md.render(markdown)
var div = $('<div>' + html + '</div>')

describe('Fixtures', function () {
  describe('Markdown', function () {
    it('should be a string', function () {
      markdown.should.be.a('string')
    })
  })

  describe('HTML', function () {
    it('should be converted from the Markdown', function () {
      html.should.equal('<h2 id="reading-list-example">' +
                        '<a class="header-anchor" href="#reading-list-example" aria-hidden="true">¶</a> ' +
                        'Reading List Example' +
                        '</h2>\n' +
                        '<ul>\n' +
                        '<li>Matthew MacDonald: <em>HTML5: The Missing Manual</em> #development</li>\n' +
                        '<li><s>Erich Gamma &amp; Richard Helm &amp; Ralph Johnson &amp; John Vlissides: <em>Design Patterns</em></s> #development</li>\n' +
                        '<li>Steve Krug: <em>Don’t Make Me Think!</em> #design</li>\n' +
                        '<li>Garr Reynolds: <em>Presentation Zen</em> #presentation</li>\n' +
                        '</ul>\n')
    })
  })

  describe('jQuery element', function () {
    it('should contain the HTML', function () {
      div.html().should.equal(html)
    })
  })
})

describe('readinglist.js', function () {
  describe('tagId()', function () {
    it('should remove number sign', function () {
      $.fn.readingList.tagId('#tag').should.equal('tag')
    })
  })

  describe('tagName()', function () {
    it('should capitalize the tag name and add spaces', function () {
      $.fn.readingList.tagName('#tag-name').should.equal('Tag name')
    })
  })

  describe('findHeader()', function () {
    it('should find header by ID', function () {
      var body = $('<div><h2 id="tag">Tag</h2></div>')
      var header = $.fn.readingList.findHeader('#tag', body)
      header.prop('outerHTML').should.equal('<h2 id="tag">Tag</h2>')
    })

    it('should find header by name', function () {
      var body = $('<div><h2>Tag</h2></div>')
      var header = $.fn.readingList.findHeader('#tag', body)
      header.prop('outerHTML').should.equal('<h2 id="tag">Tag</h2>')
      body.prop('outerHTML').should.equal('<div><h2 id="tag">Tag</h2></div>')
    })

    it('should create new header if not found', function () {
      var body = $('<div>')
      var header = $.fn.readingList.findHeader('#tag', body)
      header.prop('outerHTML').should.equal('<h2 id="tag">Tag</h2>')
      body.prop('outerHTML').should.equal('<div><h2 id="tag">Tag</h2></div>')
    })
  })

  describe('createHeader()', function () {
    it('should append header to body', function () {
      var body = $('<div><h2 id="header">Header</h2></div>')
      var header = $.fn.readingList.createHeader('#tag', body)
      header.prop('outerHTML').should.equal('<h2 id="tag">Tag</h2>')
      body.prop('outerHTML').should.equal('<div><h2 id="header">Header</h2><h2 id="tag">Tag</h2></div>')
    })
  })

  describe('handleHeaders()', function () {
    it('should add header anchors', function () {
      var body = $('<div><h2 id="header">Header</h2></div>')
      $.fn.readingList.handleHeaders(body).prop('outerHTML').should.equal(
        '<div><h2 id="header"><a aria-hidden="true" class="header-anchor" href="#header" title="Header">¶</a>Header</h2></div>')
    })
  })

  describe('removeAria()', function () {
    it('should remove aria-hidden elements', function () {
      var header = $('<h1><a aria-hidden="true" href="#">¶</a>Header</h1>')
      $.fn.readingList.removeAria(header).prop('outerHTML').should.equal(
        '<h1>Header</h1>')
    })
  })

  describe('findList()', function () {
    it('should find list following header', function () {
      var body = $('<div><h2 id="header">Header</h2><ul><li>List</li></ul></div>')
      var list = $.fn.readingList.findList('#header', body)
      list.prop('outerHTML').should.equal('<ul><li>List</li></ul>')
    })

    it('should create list and header if not found', function () {
      var body = $('<div><h2 id="header">Header</h2></div>')
      var list = $.fn.readingList.findList('#tag', body)
      list.prop('outerHTML').should.equal('<ul></ul>')
      body.prop('outerHTML').should.equal('<div><h2 id="header">Header</h2><h2 id="tag">Tag</h2><ul></ul></div>')
    })
  })

  describe('createList()', function () {
    it('should create list following header', function () {
      var body = $('<div><h2 id="header">Header</h2></div>')
      var list = $.fn.readingList.createList('#header', body)
      list.prop('outerHTML').should.equal('<ul></ul>')
      body.prop('outerHTML').should.equal('<div><h2 id="header">Header</h2><ul></ul></div>')
    })
  })

  describe('linkifyTag()', function () {
    it('should wrap a link around the tag', function () {
      $.fn.readingList.linkifyTag('#tag').should.equal(' #<a class="tag" href ="#tag" title="Tag">tag</a>')
    })

    it('should trim whitespace', function () {
      $.fn.readingList.linkifyTag(' #tag').should.equal(' #<a class="tag" href ="#tag" title="Tag">tag</a>')
    })
  })

  describe('handleTagList()', function () {
    it('should create new sublist for a tag', function () {
      var body = $('<div><h2 id="header">Header</h2><ul><li>Author: Title #<a title="Tag" href="#tag" class="tag">tag</a></li></ul></div>')
      var el = body.find('.tag').first()
      $.fn.readingList.handleTagList(el, body).prop('outerHTML').should.equal(
        '<div><h2 id="header">Header</h2><ul><li>Author: Title #<a title="Tag" href="#tag" class="tag">tag</a></li></ul><h2 id="tag">Tag</h2><ul><li>Author: Title</li></ul></div>')
    })
  })

  describe('handleTagLists()', function () {
    it('should create new sublist for each tag', function () {
      var body = $('<div><h2 id="header">Header</h2><ul><li>Author: Title #<a title="Tag" href="#tag" class="tag">tag</a></li><li>Another Author: Another Title #<a title="Another tag" href="#another-tag" class="tag">another-tag</a></li></ul></div>')
      $.fn.readingList.handleTagLists(body).prop('outerHTML').should.equal(
        '<div><h2 id="header">Header</h2><ul><li>Author: Title #<a title="Tag" href="#tag" class="tag">tag</a></li><li>Another Author: Another Title #<a title="Another tag" href="#another-tag" class="tag">another-tag</a></li></ul><h2 id="tag">Tag</h2><ul><li>Author: Title</li></ul><h2 id="another-tag">Another tag</h2><ul><li>Another Author: Another Title</li></ul></div>')
    })
  })

  describe('handleTags()', function () {
    it('should linkify all tags', function () {
      var body = $('<div><h2 id="header">Header</h2><ul><li>Author: Title #tag</li><li>Another Author: Another Title #another-tag</li></ul></div>')
      $.fn.readingList.handleTags(body).prop('outerHTML').should.equal(
        '<div><h2 id="header">Header</h2><ul><li>Author: Title #<a class="tag" href="#tag" title="Tag">tag</a></li><li>Another Author: Another Title #<a class="tag" href="#another-tag" title="Another tag">another-tag</a></li></ul></div>')
    })
  })

  describe('handleRating()', function () {
    it('should replace number ratings with star ratings', function () {
      var el = $('<li>Author: Title (4.0)</li>')
      $.fn.readingList.handleRating(el).prop('outerHTML').should.equal(
        '<li>Author: Title <span style="color: rgb(187, 131, 0)" title="4">★★★★☆</span></li>')
    })
  })

  describe('starRating()', function () {
    it('should handle zero stars ratings', function () {
      $.fn.readingList.starRating(0).should.equal('<span style="color: rgb(187, 131, 0)" title="0">☆☆☆☆☆</span>')
    })
    it('should handle half star ratings', function () {
      $.fn.readingList.starRating(0.5).should.equal('<span style="color: rgb(187, 131, 0)" title="0.5">½☆☆☆☆</span>')
    })
    it('should handle one star ratings', function () {
      $.fn.readingList.starRating(1).should.equal('<span style="color: rgb(187, 131, 0)" title="1">★☆☆☆☆</span>')
    })
    it('should handle one and one half star ratings', function () {
      $.fn.readingList.starRating(1.5).should.equal('<span style="color: rgb(187, 131, 0)" title="1.5">★½☆☆☆</span>')
    })
    it('should handle four stars ratings', function () {
      $.fn.readingList.starRating(4).should.equal('<span style="color: rgb(187, 131, 0)" title="4">★★★★☆</span>')
    })
    it('should handle four and a half star ratings', function () {
      $.fn.readingList.starRating(4.5).should.equal('<span style="color: rgb(187, 131, 0)" title="4.5">★★★★½</span>')
    })
    it('should handle five star ratings', function () {
      $.fn.readingList.starRating(5).should.equal('<span style="color: rgb(187, 131, 0)" title="5">★★★★★</span>')
    })
  })

  describe('linkifyBooks()', function () {
    it('should add links to book entries', function () {
      var body = $('<div><h2 id="header">Header</h2><ul><li>Author: <em>Title</em> #tag</li><li>Another Author: <em>Another Title</em> #another-tag</li></ul></div>')
      $.fn.readingList.linkifyBooks(body, true, 'localhost', 8080).prop('outerHTML').should.equal(
        '<div><h2 id="header">Header</h2><ul><li>Author: <cite><a href="http://localhost:8080/browse/search?query=author%20title" title="Author: Title">Title</a></cite><sup><a href="http://www.amazon.com/s/?field-keywords=author%20title" title="Find Title on Amazon.com"><img alt="Amazon.com" src="img/amazon.png" height="16"></a> <a href="http://www.goodreads.com/search?query=author%20title" title="Find Title on Goodreads"><img alt="Goodreads" src="img/goodreads.png" height="16"></a> <a href="http://www.librarything.com/search.php?term=author%20title" title="Find Title on LibraryThing"><img alt="LibraryThing" src="img/librarything.png" height="14"></a> <a href="http://www.worldcat.org/search?q=author%20title" title="Find Title on WorldCat"><img alt="WorldCat" src="img/worldcat.png" height="16"></a> <a href="http://www.google.com/?gws_rd=ssl#tbm=bks&amp;q=author%20title" title="Find Title on Google Books"><img alt="Google Books" src="img/google.png" height="16"></a> <a href="http://www.google.com/#q=site:www.reddit.com+&quot;title&quot;" title="Find Title on Reddit"><img alt="Reddit" src="img/reddit.png" height="16"></a> <a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;title&quot;" title="Find Title on Hacker News"><img alt="Hacker News" src="img/hackernews.png" height="16"></a> <a href="http://stackexchange.com/search?q=&quot;title&quot;" title="Find Title on Stack Exchange"><img alt="Stack Exchange" src="img/stackexchange.png" height="16"></a> <a href="http://www.google.com/#q=site:medium.com+&quot;title&quot;" title="Find Title on Medium"><img alt="Medium" src="img/medium.png" height="16"></a> <a href="http://www.google.com/#q=forum+&quot;title&quot;" title="Find Title on forums"><img alt="Forums" src="img/disqus.png" height="16"></a> <a href="http://en.wikipedia.org/w/index.php?search=author%20title" title="Find Title on Wikipedia"><img alt="Wikipedia" src="img/wikipedia.png" height="16"></a></sup> #tag</li><li>Another Author: <cite><a href="http://localhost:8080/browse/search?query=another%20author%20another%20title" title="Another Author: Another Title">Another Title</a></cite><sup><a href="http://www.amazon.com/s/?field-keywords=another%20author%20another%20title" title="Find Another Title on Amazon.com"><img alt="Amazon.com" src="img/amazon.png" height="16"></a> <a href="http://www.goodreads.com/search?query=another%20author%20another%20title" title="Find Another Title on Goodreads"><img alt="Goodreads" src="img/goodreads.png" height="16"></a> <a href="http://www.librarything.com/search.php?term=another%20author%20another%20title" title="Find Another Title on LibraryThing"><img alt="LibraryThing" src="img/librarything.png" height="14"></a> <a href="http://www.worldcat.org/search?q=another%20author%20another%20title" title="Find Another Title on WorldCat"><img alt="WorldCat" src="img/worldcat.png" height="16"></a> <a href="http://www.google.com/?gws_rd=ssl#tbm=bks&amp;q=another%20author%20another%20title" title="Find Another Title on Google Books"><img alt="Google Books" src="img/google.png" height="16"></a> <a href="http://www.google.com/#q=site:www.reddit.com+&quot;another%20title&quot;" title="Find Another Title on Reddit"><img alt="Reddit" src="img/reddit.png" height="16"></a> <a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;another%20title&quot;" title="Find Another Title on Hacker News"><img alt="Hacker News" src="img/hackernews.png" height="16"></a> <a href="http://stackexchange.com/search?q=&quot;another%20title&quot;" title="Find Another Title on Stack Exchange"><img alt="Stack Exchange" src="img/stackexchange.png" height="16"></a> <a href="http://www.google.com/#q=site:medium.com+&quot;another%20title&quot;" title="Find Another Title on Medium"><img alt="Medium" src="img/medium.png" height="16"></a> <a href="http://www.google.com/#q=forum+&quot;another%20title&quot;" title="Find Another Title on forums"><img alt="Forums" src="img/disqus.png" height="16"></a> <a href="http://en.wikipedia.org/w/index.php?search=another%20author%20another%20title" title="Find Another Title on Wikipedia"><img alt="Wikipedia" src="img/wikipedia.png" height="16"></a></sup> #another-tag</li></ul></div>')
    })
  })

  describe('asciify()', function () {
    it('should replace single opening and closing quotation marks', function () {
      $.fn.readingList.asciify('‘Tsk, tsk,’ said the Hatter, ‘what a mess you’ve made.’').should.equal(
        "'Tsk, tsk,' said the Hatter, 'what a mess you've made.'")
    })

    it('should replace double opening and closing quotation marks', function () {
      $.fn.readingList.asciify('“It is perfectly fine,” replied Alice calmly. “I will leave it for the garbage collection service to recover.”').should.equal(
        '"It is perfectly fine," replied Alice calmly. "I will leave it for the garbage collection service to recover."')
    })

    it('should replace horizontal ellipsis', function () {
      $.fn.readingList.asciify('Is that so…?').should.equal(
        'Is that so...?')
    })
  })

  describe('searchString()', function () {
    it('should URL encode spaces', function () {
      $.fn.readingList.searchString('foo bar').should.equal(
        'foo%20bar')
    })

    it('should remove punctuation', function () {
      $.fn.readingList.searchString('Author: Book').should.equal(
        'author%20book')
    })

    it('should convert to lowercase', function () {
      $.fn.readingList.searchString('Book Title').should.equal(
        'book%20title')
    })
  })

  describe('calibreURL()', function () {
    it('should create Calibre link', function () {
      $.fn.readingList.calibreUrl('Title', 'title', 'localhost', 8080).should.equal(
        '<a href="http://localhost:8080/browse/search?query=title" title="Title"></a>')
    })
  })

  describe('amazonURL()', function () {
    it('should create Amazon link', function () {
      $.fn.readingList.amazonUrl('Title', 'title').should.equal(
        '<a href="http://www.amazon.com/s/?field-keywords=title" title="Title"></a>')
    })
  })

  describe('amazon()', function () {
    it('should create Amazon button', function () {
      $.fn.readingList.amazon('Title', 'title').should.equal(
        '<a href="http://www.amazon.com/s/?field-keywords=title" title="Find Title on Amazon.com"><img alt="Amazon.com" height="16" src="img/amazon.png"></a>')
    })
  })

  describe('goodreads()', function () {
    it('should create Goodreads button', function () {
      $.fn.readingList.goodreads('Title', 'title').should.equal(
        '<a href="http://www.goodreads.com/search?query=title" title="Find Title on Goodreads"><img alt="Goodreads" height="16" src="img/goodreads.png"></a>')
    })
  })

  describe('librarything()', function () {
    it('should create LibraryThing button', function () {
      $.fn.readingList.librarything('Title', 'title').should.equal(
        '<a href="http://www.librarything.com/search.php?term=title" title="Find Title on LibraryThing"><img alt="LibraryThing" height="14" src="img/librarything.png"></a>')
    })
  })

  describe('google()', function () {
    it('should create Google Books button', function () {
      $.fn.readingList.google('Title', 'title').should.equal(
        '<a href="http://www.google.com/?gws_rd=ssl#tbm=bks&q=title" title="Find Title on Google Books"><img alt="Google Books" height="16" src="img/google.png"></a>')
    })
  })

  describe('worldcat()', function () {
    it('should create WorldCat button', function () {
      $.fn.readingList.worldcat('Title', 'title').should.equal(
        '<a href="http://www.worldcat.org/search?q=title" title="Find Title on WorldCat"><img alt="WorldCat" height="16" src="img/worldcat.png"></a>')
    })
  })

  describe('reddit()', function () {
    it('should create Reddit button', function () {
      $.fn.readingList.reddit('Title', 'title').should.equal(
        '<a href="http://www.google.com/#q=site:www.reddit.com+&quot;title&quot;" title="Find Title on Reddit"><img alt="Reddit" height="16" src="img/reddit.png"></a>')
    })
  })

  describe('hackernews()', function () {
    it('should create Hacker News button', function () {
      $.fn.readingList.hackernews('Title', 'title').should.equal(
        '<a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;title&quot;" title="Find Title on Hacker News"><img alt="Hacker News" height="16" src="img/hackernews.png"></a>')
    })
  })

  describe('stackexchange()', function () {
    it('should create Stack Exchange button', function () {
      $.fn.readingList.stackexchange('Title', 'title').should.equal(
        '<a href="http://stackexchange.com/search?q=&quot;title&quot;" title="Find Title on Stack Exchange"><img alt="Stack Exchange" height="16" src="img/stackexchange.png"></a>')
    })
  })

  describe('medium()', function () {
    it('should create Medium button', function () {
      $.fn.readingList.medium('Title', 'title').should.equal(
        '<a href="http://www.google.com/#q=site:medium.com+&quot;title&quot;" title="Find Title on Medium"><img alt="Medium" height="16" src="img/medium.png"></a>')
    })
  })

  describe('forum()', function () {
    it('should create Forum button', function () {
      $.fn.readingList.forum('Title', 'title').should.equal(
        '<a href="http://www.google.com/#q=forum+&quot;title&quot;" title="Find Title on forums"><img alt="Forums" height="16" src="img/disqus.png"></a>')
    })
  })

  describe('wikipedia()', function () {
    it('should create Wikipedia button', function () {
      $.fn.readingList.wikipedia('Title', 'title').should.equal(
        '<a href="http://en.wikipedia.org/w/index.php?search=title" title="Find Title on Wikipedia"><img alt="Wikipedia" height="16" src="img/wikipedia.png"></a>')
    })
  })

  describe('readingList()', function () {
    it('should create reading list', function () {
      div.readingList({createLists: false}).html().should.equal(
        '<h2 id="reading-list-example">' +
          '<a title="Reading List Example" class="header-anchor" href="#reading-list-example" aria-hidden="true">¶</a> ' +
          'Reading List Example' +
          '</h2>\n' +
          '<ul>\n' +
          '<li>Matthew MacDonald: ' +
          '<cite>' +
          '<a href="http://localhost:8080/browse/search?query=matthew%20macdonald%20html5%20the%20missing%20manual" title="Matthew MacDonald: HTML5: The Missing Manual">HTML5: The Missing Manual</a>' +
          '</cite>' +
          '<sup>' +
          '<a href="http://www.amazon.com/s/?field-keywords=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on Amazon.com">' +
          '<img alt="Amazon.com" src="img/amazon.png" height="16"></a> ' +
          '<a href="http://www.goodreads.com/search?query=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on Goodreads">' +
          '<img alt="Goodreads" src="img/goodreads.png" height="16"></a> ' +
          '<a href="http://www.librarything.com/search.php?term=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on LibraryThing">' +
          '<img alt="LibraryThing" src="img/librarything.png" height="14"></a> ' +
          '<a href="http://www.worldcat.org/search?q=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on WorldCat">' +
          '<img alt="WorldCat" src="img/worldcat.png" height="16"></a> ' +
          '<a href="http://www.google.com/?gws_rd=ssl#tbm=bks&amp;q=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on Google Books">' +
          '<img alt="Google Books" src="img/google.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:www.reddit.com+&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on Reddit">' +
          '<img alt="Reddit" src="img/reddit.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on Hacker News">' +
          '<img alt="Hacker News" src="img/hackernews.png" height="16"></a> ' +
          '<a href="http://stackexchange.com/search?q=&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on Stack Exchange">' +
          '<img alt="Stack Exchange" src="img/stackexchange.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:medium.com+&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on Medium">' +
          '<img alt="Medium" src="img/medium.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=forum+&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on forums">' +
          '<img alt="Forums" src="img/disqus.png" height="16"></a> ' +
          '<a href="http://en.wikipedia.org/w/index.php?search=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on Wikipedia">' +
          '<img alt="Wikipedia" src="img/wikipedia.png" height="16"></a>' +
          '</sup> #' +
          '<a class="tag" href="#development" title="Development">development</a>' +
          '</li>\n' +
          '<li>' +
          '<s>Erich Gamma &amp; Richard Helm &amp; Ralph Johnson &amp; John Vlissides: ' +
          '<cite>' +
          '<a href="http://localhost:8080/browse/search?query=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Erich Gamma &amp; Richard Helm &amp; Ralph Johnson &amp; John Vlissides: Design Patterns">Design Patterns</a>' +
          '</cite>' +
          '</s>' +
          '<sup>' +
          '<a href="http://www.amazon.com/s/?field-keywords=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on Amazon.com">' +
          '<img alt="Amazon.com" src="img/amazon.png" height="16"></a> ' +
          '<a href="http://www.goodreads.com/search?query=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on Goodreads">' +
          '<img alt="Goodreads" src="img/goodreads.png" height="16"></a> ' +
          '<a href="http://www.librarything.com/search.php?term=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on LibraryThing">' +
          '<img alt="LibraryThing" src="img/librarything.png" height="14"></a> ' +
          '<a href="http://www.worldcat.org/search?q=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on WorldCat">' +
          '<img alt="WorldCat" src="img/worldcat.png" height="16"></a> ' +
          '<a href="http://www.google.com/?gws_rd=ssl#tbm=bks&amp;q=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on Google Books">' +
          '<img alt="Google Books" src="img/google.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:www.reddit.com+&quot;design%20patterns&quot;" title="Find Design Patterns on Reddit">' +
          '<img alt="Reddit" src="img/reddit.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;design%20patterns&quot;" title="Find Design Patterns on Hacker News">' +
          '<img alt="Hacker News" src="img/hackernews.png" height="16"></a> ' +
          '<a href="http://stackexchange.com/search?q=&quot;design%20patterns&quot;" title="Find Design Patterns on Stack Exchange">' +
          '<img alt="Stack Exchange" src="img/stackexchange.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:medium.com+&quot;design%20patterns&quot;" title="Find Design Patterns on Medium">' +
          '<img alt="Medium" src="img/medium.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=forum+&quot;design%20patterns&quot;" title="Find Design Patterns on forums">' +
          '<img alt="Forums" src="img/disqus.png" height="16"></a> ' +
          '<a href="http://en.wikipedia.org/w/index.php?search=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on Wikipedia">' +
          '<img alt="Wikipedia" src="img/wikipedia.png" height="16"></a>' +
          '</sup> #' +
          '<a class="tag" href="#development" title="Development">development</a>' +
          '</li>\n' +
          '<li>Steve Krug: ' +
          '<cite>' +
          '<a href="http://localhost:8080/browse/search?query=steve%20krug%20don\'t%20make%20me%20think%20" title="Steve Krug: Don’t Make Me Think!">Don’t Make Me Think!</a>' +
          '</cite>' +
          '<sup>' +
          '<a href="http://www.amazon.com/s/?field-keywords=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on Amazon.com">' +
          '<img alt="Amazon.com" src="img/amazon.png" height="16"></a> ' +
          '<a href="http://www.goodreads.com/search?query=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on Goodreads">' +
          '<img alt="Goodreads" src="img/goodreads.png" height="16"></a> ' +
          '<a href="http://www.librarything.com/search.php?term=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on LibraryThing">' +
          '<img alt="LibraryThing" src="img/librarything.png" height="14"></a> ' +
          '<a href="http://www.worldcat.org/search?q=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on WorldCat">' +
          '<img alt="WorldCat" src="img/worldcat.png" height="16"></a> ' +
          '<a href="http://www.google.com/?gws_rd=ssl#tbm=bks&amp;q=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on Google Books">' +
          '<img alt="Google Books" src="img/google.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:www.reddit.com+&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on Reddit">' +
          '<img alt="Reddit" src="img/reddit.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on Hacker News">' +
          '<img alt="Hacker News" src="img/hackernews.png" height="16"></a> ' +
          '<a href="http://stackexchange.com/search?q=&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on Stack Exchange">' +
          '<img alt="Stack Exchange" src="img/stackexchange.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:medium.com+&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on Medium">' +
          '<img alt="Medium" src="img/medium.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=forum+&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on forums">' +
          '<img alt="Forums" src="img/disqus.png" height="16"></a> ' +
          '<a href="http://en.wikipedia.org/w/index.php?search=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on Wikipedia">' +
          '<img alt="Wikipedia" src="img/wikipedia.png" height="16"></a>' +
          '</sup> #' +
          '<a class="tag" href="#design" title="Design">design</a>' +
          '</li>\n' +
          '<li>Garr Reynolds: ' +
          '<cite>' +
          '<a href="http://localhost:8080/browse/search?query=garr%20reynolds%20presentation%20zen" title="Garr Reynolds: Presentation Zen">Presentation Zen</a>' +
          '</cite>' +
          '<sup>' +
          '<a href="http://www.amazon.com/s/?field-keywords=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on Amazon.com">' +
          '<img alt="Amazon.com" src="img/amazon.png" height="16"></a> ' +
          '<a href="http://www.goodreads.com/search?query=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on Goodreads">' +
          '<img alt="Goodreads" src="img/goodreads.png" height="16"></a> ' +
          '<a href="http://www.librarything.com/search.php?term=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on LibraryThing">' +
          '<img alt="LibraryThing" src="img/librarything.png" height="14"></a> ' +
          '<a href="http://www.worldcat.org/search?q=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on WorldCat">' +
          '<img alt="WorldCat" src="img/worldcat.png" height="16"></a> ' +
          '<a href="http://www.google.com/?gws_rd=ssl#tbm=bks&amp;q=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on Google Books">' +
          '<img alt="Google Books" src="img/google.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:www.reddit.com+&quot;presentation%20zen&quot;" title="Find Presentation Zen on Reddit">' +
          '<img alt="Reddit" src="img/reddit.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;presentation%20zen&quot;" title="Find Presentation Zen on Hacker News">' +
          '<img alt="Hacker News" src="img/hackernews.png" height="16"></a> ' +
          '<a href="http://stackexchange.com/search?q=&quot;presentation%20zen&quot;" title="Find Presentation Zen on Stack Exchange">' +
          '<img alt="Stack Exchange" src="img/stackexchange.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:medium.com+&quot;presentation%20zen&quot;" title="Find Presentation Zen on Medium">' +
          '<img alt="Medium" src="img/medium.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=forum+&quot;presentation%20zen&quot;" title="Find Presentation Zen on forums">' +
          '<img alt="Forums" src="img/disqus.png" height="16"></a> ' +
          '<a href="http://en.wikipedia.org/w/index.php?search=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on Wikipedia">' +
          '<img alt="Wikipedia" src="img/wikipedia.png" height="16"></a>' +
          '</sup> #' +
          '<a class="tag" href="#presentation" title="Presentation">presentation</a>' +
          '</li>\n' +
          '</ul>\n')
    })

    it('should create sublists', function () {
      div.readingList({createLists: true}).html().trim().should.equal(
        '<h2 id="reading-list-example">' +
          '<a title="Reading List Example" class="header-anchor" href="#reading-list-example" aria-hidden="true">¶</a> ' +
          'Reading List Example' +
          '</h2>\n' +
          '<ul>\n' +
          '<li>Matthew MacDonald: ' +
          '<cite>' +
          '<a href="http://localhost:8080/browse/search?query=matthew%20macdonald%20html5%20the%20missing%20manual" title="Matthew MacDonald: HTML5: The Missing Manual">HTML5: The Missing Manual</a>' +
          '</cite>' +
          '<sup>' +
          '<a href="http://www.amazon.com/s/?field-keywords=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on Amazon.com">' +
          '<img alt="Amazon.com" src="img/amazon.png" height="16"></a> ' +
          '<a href="http://www.goodreads.com/search?query=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on Goodreads">' +
          '<img alt="Goodreads" src="img/goodreads.png" height="16"></a> ' +
          '<a href="http://www.librarything.com/search.php?term=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on LibraryThing">' +
          '<img alt="LibraryThing" src="img/librarything.png" height="14"></a> ' +
          '<a href="http://www.worldcat.org/search?q=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on WorldCat">' +
          '<img alt="WorldCat" src="img/worldcat.png" height="16"></a> ' +
          '<a href="http://www.google.com/?gws_rd=ssl#tbm=bks&amp;q=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on Google Books">' +
          '<img alt="Google Books" src="img/google.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:www.reddit.com+&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on Reddit">' +
          '<img alt="Reddit" src="img/reddit.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on Hacker News">' +
          '<img alt="Hacker News" src="img/hackernews.png" height="16"></a> ' +
          '<a href="http://stackexchange.com/search?q=&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on Stack Exchange">' +
          '<img alt="Stack Exchange" src="img/stackexchange.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:medium.com+&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on Medium">' +
          '<img alt="Medium" src="img/medium.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=forum+&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on forums">' +
          '<img alt="Forums" src="img/disqus.png" height="16"></a> ' +
          '<a href="http://en.wikipedia.org/w/index.php?search=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on Wikipedia">' +
          '<img alt="Wikipedia" src="img/wikipedia.png" height="16"></a>' +
          '</sup> #' +
          '<a class="tag" href="#development" title="Development">development</a>' +
          '</li>\n' +
          '<li>' +
          '<s>Erich Gamma &amp; Richard Helm &amp; Ralph Johnson &amp; John Vlissides: ' +
          '<cite>' +
          '<a href="http://localhost:8080/browse/search?query=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Erich Gamma &amp; Richard Helm &amp; Ralph Johnson &amp; John Vlissides: Design Patterns">Design Patterns</a>' +
          '</cite>' +
          '</s>' +
          '<sup>' +
          '<a href="http://www.amazon.com/s/?field-keywords=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on Amazon.com">' +
          '<img alt="Amazon.com" src="img/amazon.png" height="16"></a> ' +
          '<a href="http://www.goodreads.com/search?query=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on Goodreads">' +
          '<img alt="Goodreads" src="img/goodreads.png" height="16"></a> ' +
          '<a href="http://www.librarything.com/search.php?term=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on LibraryThing">' +
          '<img alt="LibraryThing" src="img/librarything.png" height="14"></a> ' +
          '<a href="http://www.worldcat.org/search?q=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on WorldCat">' +
          '<img alt="WorldCat" src="img/worldcat.png" height="16"></a> ' +
          '<a href="http://www.google.com/?gws_rd=ssl#tbm=bks&amp;q=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on Google Books">' +
          '<img alt="Google Books" src="img/google.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:www.reddit.com+&quot;design%20patterns&quot;" title="Find Design Patterns on Reddit">' +
          '<img alt="Reddit" src="img/reddit.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;design%20patterns&quot;" title="Find Design Patterns on Hacker News">' +
          '<img alt="Hacker News" src="img/hackernews.png" height="16"></a> ' +
          '<a href="http://stackexchange.com/search?q=&quot;design%20patterns&quot;" title="Find Design Patterns on Stack Exchange">' +
          '<img alt="Stack Exchange" src="img/stackexchange.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:medium.com+&quot;design%20patterns&quot;" title="Find Design Patterns on Medium">' +
          '<img alt="Medium" src="img/medium.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=forum+&quot;design%20patterns&quot;" title="Find Design Patterns on forums">' +
          '<img alt="Forums" src="img/disqus.png" height="16"></a> ' +
          '<a href="http://en.wikipedia.org/w/index.php?search=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on Wikipedia">' +
          '<img alt="Wikipedia" src="img/wikipedia.png" height="16"></a>' +
          '</sup> #' +
          '<a class="tag" href="#development" title="Development">development</a>' +
          '</li>\n' +
          '<li>Steve Krug: ' +
          '<cite>' +
          '<a href="http://localhost:8080/browse/search?query=steve%20krug%20don\'t%20make%20me%20think%20" title="Steve Krug: Don’t Make Me Think!">Don’t Make Me Think!</a>' +
          '</cite>' +
          '<sup>' +
          '<a href="http://www.amazon.com/s/?field-keywords=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on Amazon.com">' +
          '<img alt="Amazon.com" src="img/amazon.png" height="16"></a> ' +
          '<a href="http://www.goodreads.com/search?query=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on Goodreads">' +
          '<img alt="Goodreads" src="img/goodreads.png" height="16"></a> ' +
          '<a href="http://www.librarything.com/search.php?term=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on LibraryThing">' +
          '<img alt="LibraryThing" src="img/librarything.png" height="14"></a> ' +
          '<a href="http://www.worldcat.org/search?q=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on WorldCat">' +
          '<img alt="WorldCat" src="img/worldcat.png" height="16"></a> ' +
          '<a href="http://www.google.com/?gws_rd=ssl#tbm=bks&amp;q=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on Google Books">' +
          '<img alt="Google Books" src="img/google.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:www.reddit.com+&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on Reddit">' +
          '<img alt="Reddit" src="img/reddit.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on Hacker News">' +
          '<img alt="Hacker News" src="img/hackernews.png" height="16"></a> ' +
          '<a href="http://stackexchange.com/search?q=&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on Stack Exchange">' +
          '<img alt="Stack Exchange" src="img/stackexchange.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:medium.com+&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on Medium">' +
          '<img alt="Medium" src="img/medium.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=forum+&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on forums">' +
          '<img alt="Forums" src="img/disqus.png" height="16"></a> ' +
          '<a href="http://en.wikipedia.org/w/index.php?search=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on Wikipedia">' +
          '<img alt="Wikipedia" src="img/wikipedia.png" height="16"></a>' +
          '</sup> #' +
          '<a class="tag" href="#design" title="Design">design</a>' +
          '</li>\n' +
          '<li>Garr Reynolds: ' +
          '<cite>' +
          '<a href="http://localhost:8080/browse/search?query=garr%20reynolds%20presentation%20zen" title="Garr Reynolds: Presentation Zen">Presentation Zen</a>' +
          '</cite>' +
          '<sup>' +
          '<a href="http://www.amazon.com/s/?field-keywords=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on Amazon.com">' +
          '<img alt="Amazon.com" src="img/amazon.png" height="16"></a> ' +
          '<a href="http://www.goodreads.com/search?query=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on Goodreads">' +
          '<img alt="Goodreads" src="img/goodreads.png" height="16"></a> ' +
          '<a href="http://www.librarything.com/search.php?term=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on LibraryThing">' +
          '<img alt="LibraryThing" src="img/librarything.png" height="14"></a> ' +
          '<a href="http://www.worldcat.org/search?q=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on WorldCat">' +
          '<img alt="WorldCat" src="img/worldcat.png" height="16"></a> ' +
          '<a href="http://www.google.com/?gws_rd=ssl#tbm=bks&amp;q=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on Google Books">' +
          '<img alt="Google Books" src="img/google.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:www.reddit.com+&quot;presentation%20zen&quot;" title="Find Presentation Zen on Reddit">' +
          '<img alt="Reddit" src="img/reddit.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;presentation%20zen&quot;" title="Find Presentation Zen on Hacker News">' +
          '<img alt="Hacker News" src="img/hackernews.png" height="16"></a> ' +
          '<a href="http://stackexchange.com/search?q=&quot;presentation%20zen&quot;" title="Find Presentation Zen on Stack Exchange">' +
          '<img alt="Stack Exchange" src="img/stackexchange.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:medium.com+&quot;presentation%20zen&quot;" title="Find Presentation Zen on Medium">' +
          '<img alt="Medium" src="img/medium.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=forum+&quot;presentation%20zen&quot;" title="Find Presentation Zen on forums">' +
          '<img alt="Forums" src="img/disqus.png" height="16"></a> ' +
          '<a href="http://en.wikipedia.org/w/index.php?search=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on Wikipedia">' +
          '<img alt="Wikipedia" src="img/wikipedia.png" height="16"></a>' +
          '</sup> #' +
          '<a class="tag" href="#presentation" title="Presentation">presentation</a>' +
          '</li>\n' +
          '</ul>\n' +
          '<h2 id="development">' +
          '<a aria-hidden="true" class="header-anchor" href="#development" title="Development">¶</a>' +
          'Development' +
          '</h2>' +
          '<ul>' +
          '<li>Matthew MacDonald: ' +
          '<cite>' +
          '<a href="http://localhost:8080/browse/search?query=matthew%20macdonald%20html5%20the%20missing%20manual" title="Matthew MacDonald: HTML5: The Missing Manual">HTML5: The Missing Manual</a>' +
          '</cite>' +
          '<sup>' +
          '<a href="http://www.amazon.com/s/?field-keywords=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on Amazon.com">' +
          '<img alt="Amazon.com" src="img/amazon.png" height="16"></a> ' +
          '<a href="http://www.goodreads.com/search?query=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on Goodreads">' +
          '<img alt="Goodreads" src="img/goodreads.png" height="16"></a> ' +
          '<a href="http://www.librarything.com/search.php?term=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on LibraryThing">' +
          '<img alt="LibraryThing" src="img/librarything.png" height="14"></a> ' +
          '<a href="http://www.worldcat.org/search?q=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on WorldCat">' +
          '<img alt="WorldCat" src="img/worldcat.png" height="16"></a> ' +
          '<a href="http://www.google.com/?gws_rd=ssl#tbm=bks&amp;q=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on Google Books">' +
          '<img alt="Google Books" src="img/google.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:www.reddit.com+&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on Reddit">' +
          '<img alt="Reddit" src="img/reddit.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on Hacker News">' +
          '<img alt="Hacker News" src="img/hackernews.png" height="16"></a> ' +
          '<a href="http://stackexchange.com/search?q=&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on Stack Exchange">' +
          '<img alt="Stack Exchange" src="img/stackexchange.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:medium.com+&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on Medium">' +
          '<img alt="Medium" src="img/medium.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=forum+&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on forums">' +
          '<img alt="Forums" src="img/disqus.png" height="16"></a> ' +
          '<a href="http://en.wikipedia.org/w/index.php?search=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on Wikipedia">' +
          '<img alt="Wikipedia" src="img/wikipedia.png" height="16"></a>' +
          '</sup>' +
          '</li>' +
          '<li>' +
          '<s>Erich Gamma &amp; Richard Helm &amp; Ralph Johnson &amp; John Vlissides: ' +
          '<cite>' +
          '<a href="http://localhost:8080/browse/search?query=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Erich Gamma &amp; Richard Helm &amp; Ralph Johnson &amp; John Vlissides: Design Patterns">Design Patterns</a>' +
          '</cite>' +
          '</s>' +
          '<sup>' +
          '<a href="http://www.amazon.com/s/?field-keywords=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on Amazon.com">' +
          '<img alt="Amazon.com" src="img/amazon.png" height="16"></a> ' +
          '<a href="http://www.goodreads.com/search?query=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on Goodreads">' +
          '<img alt="Goodreads" src="img/goodreads.png" height="16"></a> ' +
          '<a href="http://www.librarything.com/search.php?term=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on LibraryThing">' +
          '<img alt="LibraryThing" src="img/librarything.png" height="14"></a> ' +
          '<a href="http://www.worldcat.org/search?q=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on WorldCat">' +
          '<img alt="WorldCat" src="img/worldcat.png" height="16"></a> ' +
          '<a href="http://www.google.com/?gws_rd=ssl#tbm=bks&amp;q=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on Google Books">' +
          '<img alt="Google Books" src="img/google.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:www.reddit.com+&quot;design%20patterns&quot;" title="Find Design Patterns on Reddit">' +
          '<img alt="Reddit" src="img/reddit.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;design%20patterns&quot;" title="Find Design Patterns on Hacker News">' +
          '<img alt="Hacker News" src="img/hackernews.png" height="16"></a> ' +
          '<a href="http://stackexchange.com/search?q=&quot;design%20patterns&quot;" title="Find Design Patterns on Stack Exchange">' +
          '<img alt="Stack Exchange" src="img/stackexchange.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:medium.com+&quot;design%20patterns&quot;" title="Find Design Patterns on Medium">' +
          '<img alt="Medium" src="img/medium.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=forum+&quot;design%20patterns&quot;" title="Find Design Patterns on forums">' +
          '<img alt="Forums" src="img/disqus.png" height="16"></a> ' +
          '<a href="http://en.wikipedia.org/w/index.php?search=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on Wikipedia">' +
          '<img alt="Wikipedia" src="img/wikipedia.png" height="16"></a>' +
          '</sup>' +
          '</li>' +
          '</ul>' +
          '<h2 id="design">' +
          '<a aria-hidden="true" class="header-anchor" href="#design" title="Design">¶</a>' +
          'Design' +
          '</h2>' +
          '<ul>' +
          '<li>Steve Krug: ' +
          '<cite>' +
          '<a href="http://localhost:8080/browse/search?query=steve%20krug%20don\'t%20make%20me%20think%20" title="Steve Krug: Don’t Make Me Think!">Don’t Make Me Think!</a>' +
          '</cite>' +
          '<sup>' +
          '<a href="http://www.amazon.com/s/?field-keywords=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on Amazon.com">' +
          '<img alt="Amazon.com" src="img/amazon.png" height="16"></a> ' +
          '<a href="http://www.goodreads.com/search?query=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on Goodreads">' +
          '<img alt="Goodreads" src="img/goodreads.png" height="16"></a> ' +
          '<a href="http://www.librarything.com/search.php?term=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on LibraryThing">' +
          '<img alt="LibraryThing" src="img/librarything.png" height="14"></a> ' +
          '<a href="http://www.worldcat.org/search?q=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on WorldCat">' +
          '<img alt="WorldCat" src="img/worldcat.png" height="16"></a> ' +
          '<a href="http://www.google.com/?gws_rd=ssl#tbm=bks&amp;q=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on Google Books">' +
          '<img alt="Google Books" src="img/google.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:www.reddit.com+&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on Reddit">' +
          '<img alt="Reddit" src="img/reddit.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on Hacker News">' +
          '<img alt="Hacker News" src="img/hackernews.png" height="16"></a> ' +
          '<a href="http://stackexchange.com/search?q=&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on Stack Exchange">' +
          '<img alt="Stack Exchange" src="img/stackexchange.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:medium.com+&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on Medium">' +
          '<img alt="Medium" src="img/medium.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=forum+&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on forums">' +
          '<img alt="Forums" src="img/disqus.png" height="16"></a> ' +
          '<a href="http://en.wikipedia.org/w/index.php?search=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on Wikipedia">' +
          '<img alt="Wikipedia" src="img/wikipedia.png" height="16"></a>' +
          '</sup>' +
          '</li>' +
          '</ul>' +
          '<h2 id="presentation">' +
          '<a aria-hidden="true" class="header-anchor" href="#presentation" title="Presentation">¶</a>' +
          'Presentation' +
          '</h2>' +
          '<ul>' +
          '<li>Garr Reynolds: ' +
          '<cite>' +
          '<a href="http://localhost:8080/browse/search?query=garr%20reynolds%20presentation%20zen" title="Garr Reynolds: Presentation Zen">Presentation Zen</a>' +
          '</cite>' +
          '<sup>' +
          '<a href="http://www.amazon.com/s/?field-keywords=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on Amazon.com">' +
          '<img alt="Amazon.com" src="img/amazon.png" height="16"></a> ' +
          '<a href="http://www.goodreads.com/search?query=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on Goodreads">' +
          '<img alt="Goodreads" src="img/goodreads.png" height="16"></a> ' +
          '<a href="http://www.librarything.com/search.php?term=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on LibraryThing">' +
          '<img alt="LibraryThing" src="img/librarything.png" height="14"></a> ' +
          '<a href="http://www.worldcat.org/search?q=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on WorldCat">' +
          '<img alt="WorldCat" src="img/worldcat.png" height="16"></a> ' +
          '<a href="http://www.google.com/?gws_rd=ssl#tbm=bks&amp;q=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on Google Books">' +
          '<img alt="Google Books" src="img/google.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:www.reddit.com+&quot;presentation%20zen&quot;" title="Find Presentation Zen on Reddit">' +
          '<img alt="Reddit" src="img/reddit.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;presentation%20zen&quot;" title="Find Presentation Zen on Hacker News">' +
          '<img alt="Hacker News" src="img/hackernews.png" height="16"></a> ' +
          '<a href="http://stackexchange.com/search?q=&quot;presentation%20zen&quot;" title="Find Presentation Zen on Stack Exchange">' +
          '<img alt="Stack Exchange" src="img/stackexchange.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=site:medium.com+&quot;presentation%20zen&quot;" title="Find Presentation Zen on Medium">' +
          '<img alt="Medium" src="img/medium.png" height="16"></a> ' +
          '<a href="http://www.google.com/#q=forum+&quot;presentation%20zen&quot;" title="Find Presentation Zen on forums">' +
          '<img alt="Forums" src="img/disqus.png" height="16"></a> ' +
          '<a href="http://en.wikipedia.org/w/index.php?search=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on Wikipedia">' +
          '<img alt="Wikipedia" src="img/wikipedia.png" height="16"></a>' +
          '</sup>' +
          '</li>' +
          '</ul>')
    })
  })
})

title: Gollum og Pandoc
date: 2015-05-27
---

En oppgradering av Gollum til versjon 4.0.0 skapte visse problemer med Markdown-koden (ingen støtte for gjennomstreking, problemer med underlister). Det ser ut til at denne versjonen bruker Gem-pakken `github-markup` for å håndtere Markdown, ikke `redcarpet` eller `kramdown`.

Martin Wolf har laget en `config.rb`-fil som gjør at Gollum bruker [Pandoc](http://mwolf.net/2014/04/29/adding-pandoc-to-gollum/):

```ruby
require "github/markup"

ci = GitHub::Markup::CommandImplementation.new(
    /md|mkdn?|mdwn|mdown|markdown|litcoffee/,
      "pandoc -f markdown-tex_math_dollars-raw_tex")
# Our command needs to go to the front of the queue, in order to take
# precedence before the stock GitHub::Markup::Markdown implementation
GitHub::Markup::markups.unshift(ci)
```

Dette forutsetter at Gollum startes med opsjonen `--config`.

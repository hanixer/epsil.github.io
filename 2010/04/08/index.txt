title: Skrifter for LaTeX
date: 2010-04-08
---

[Gratis](http://ctan.tug.org/tex-archive/info/Free_Math_Font_Survey/survey.html)
--------------------------------------------------------------------------------

Adobe Utopia ([`fourier`](http://www.ctan.org/tex-archive/help/Catalogue/entries/fourier.html)). Bitstream Charter ([`[charter]{mathdesign}`](http://www.ctan.org/tex-archive/help/Catalogue/entries/mathdesign-charter.html)). URW Garamond ([`[garamond]{mathdesign}`](http://www.ctan.org/tex-archive/help/Catalogue/entries/mathdesign-garamond.html)). Palatino ([`mathpazo`](http://www.ctan.org/tex-archive/help/Catalogue/entries/mathpazo.html)/[`pxfonts`](http://www.ctan.org/tex-archive/help/Catalogue/entries/pxfonts.html)/[`kpfonts`](http://www.ctan.org/tex-archive/help/Catalogue/entries/kpfonts.html)). Times Roman ([`mathptmx`](http://www.ctan.org/tex-archive/help/Catalogue/entries/mathptmx.html)/[`txfonts`](http://www.ctan.org/tex-archive/help/Catalogue/entries/txfonts.html)). New Century Schoolbook ([`fouriernc`](http://www.ctan.org/tex-archive/help/Catalogue/entries/fouriernc.html)).

Times assossieres kanskje med Word, men TeX gir mye, mye bedre resultater med sin støtte for mikrotypografiske funksjoner som [kerningpar](http://en.wikipedia.org/wiki/Kerning), [ligaturer](http://en.wikipedia.org/wiki/Typographic_ligature) og [uniform tekstjustering](http://en.wikipedia.org/wiki/TeX#Hyphenation_and_justification) (*fortsatt* mangelvare i Word). Et Times-dokument produsert med TeX og et Times-dokument laget i Word er så å si to forskjellige verdener. (Når vi er inne på mikrotypografi: inkluder pakken [`microtype`](http://www.ctan.org/tex-archive/help/Catalogue/entries/microtype.html) for [optisk margutjevning](http://huftis.org/artiklar/kerning-i-fri-programvare/#comment-2276).)

En ting man bør være oppmerksom på er forholdet mellom [x-høyde](http://en.wikipedia.org/wiki/X-height) og linjeavstand. En kompakt skrift som Palatino krever mer luft, kanskje opp mot halvannen linjeavstand. Bruk pakken [`setspace`](http://www.ctan.org/tex-archive/help/Catalogue/entries/setspace.html) og skjønn (heller `11pt` og mer luft enn `12pt` og mindre luft). Eksempel på Palatino: [*Introduktion til LaTeX*](http://www.imf.au.dk/system/latex/bog/) (`kpfonts`, som er en variant).

Kommersielle
------------

Minion Pro ([`minionpro`](http://developer.berlios.de/projects/minionpro/)). Lucida ([`lucimatx`](http://www.pctex.com/Lucida_Fonts.html)). Times/MathTime Professional ([`mtpro`](http://www.pctex.com/mtpro2.html)).

Den gratis fysikkboken [*Motion Mountain*](http://www.motionmountain.net/) er et strålende eksempel på Minion. Minion er utvilsomt en av de beste [antikva](http://en.wikipedia.org/wiki/Serif#Old_Style)-skriftene som er laget per dags dato (både teknisk og stilmessig), og passer utmerket i en moderne kontekst. Robert Bringhurst bruker den i «typografibibelen» [*The Elements of Typographic Style*](http://www.amazon.com/dp/0881792063/).

Lucida brukes i [*Guide to LaTeX*](http://www.amazon.com/dp/0321173856/) og [*The LaTeX Companion*](http://www.amazon.com/dp/0201362996/). 'Nuff said.

Den siste, MathTime, er en institusjon hos lærebokforlag som Springer, Wiley og Prentice-Hall. Jeg har også sett den i norske bøker (bl.a. [*Kalkulus*](http://www.bokkilden.no/SamboWeb/produkt.do?produktId=1756297) og [*Statistikk for universiteter og høgskoler*](http://www.bokkilden.no/SamboWeb/produkt.do?produktId=144676)). MathTime-skriftene ble opprinnelig solgt av Y&Y, men nå har [PCTeX](http://www.pctex.com/) tatt over. «[Lite](http://www2.pctex.com/downloads.php?product=MTP2L)»-utgaven kan lastes ned gratis.

Alternativer
------------

Det kan også være verdt å se på [XeTeX](http://tug.org/xetex/), [ConTeXt](http://wiki.contextgarden.net/Main_Page) og [LuaTeX](http://www.luatex.org/), som tilbyr tilleggsfunksjonalitet utover hva som er mulig i LaTeX.

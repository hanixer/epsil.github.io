title: DOM, XPath og jQuery
date: 2012-05-05
---

JavaScript har forandret seg mye de siste årene. Først har man [Document Object Model](https://developer.mozilla.org/en/Gecko_DOM_Reference/Introduction#Core_Interfaces_in_the_DOM) (DOM), som implementeres litt forskjellig av hver nettleser og i grunn er ganske omstendelig:

```javascript
var elmNewContent = document.createElement('a');
elmNewContent.href = 'http://www.example.com/';
elmNewContent.appendChild(document.createTextNode('click here'));
var elmFoo = document.getElementById('foo');
elmFoo.parentNode.insertBefore(elmNewContent, elmFoo);
```

Douglas Crockford vil knapt *nevne* DOM i *JavaScript: The Good Parts*: «I think writing a Good Parts book about the DOM would be extremely challenging.»[^1]

Så har man [XPath](http://en.wikipedia.org/wiki/XPath), som gjør det en del lettere å velge noder i et XML-tre. *Greasemonkey Hacks* gjør mye bruk av XPath. XPath hjelper imidlertid ikke med å manipulere nodene, bare å hente dem ut. Og det er jo det alt det andre som er mest krevende, med XmlHttpRequest og jeg vet ikke hva.

Dermed kommer vi til [jQuery](http://api.jquery.com/). jQuery gjør det lettere både å hente ut noder (CSS-syntaks), og å manipulere dem. Boken *JavaScript & jQuery: The Missing Manual* virker å være en lettlest innføring.

Det må imidlertid påpekes at Greasemonkey ikke nødvendigvis er [kompatibel](http://wiki.greasespot.net/Third-Party_Libraries#jQuery) med siste versjon av jQuery. Versjon 1.3.2 virker, men 1.4.1 gjør det ikke. Anbefalt bruk er:

```javascript
// ==UserScript==
// @name          jQuery Example
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
```

Greasemonkey-utgaven av [Reddit Reveal](http://userscripts.org/scripts/show/66698) gjør f.eks. utstrakt bruk av jQuery. Forresten har Ubuntu en pakke, `libjs-jsquery`, som installerer en utgave av jQuery under `/usr/share/javascript/jquery/jquery.js` (v1.7.1 i skrivende stund).

[^1]: Douglas Crockford: *JavaScript: The Good Parts*, kapittel 1: «Good Parts», s. 2. O'Reilly, 2008.

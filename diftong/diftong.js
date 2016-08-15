/* global angular, $ */

var vocals = {}
vocals['a'] = 'aàá'
vocals['e'] = 'eèéê'
vocals['i'] = 'i'
vocals['o'] = 'oòóô'
vocals['u'] = 'uü'
vocals['y'] = 'y'
vocals['æ'] = 'æ'
vocals['ø'] = 'ø'
vocals['å'] = 'å'

function values (map) {
  var vals = new Array()
  for (var key in map) {
    vals.push(map[key])
  }
  return vals
}

// Finner enkeltstående vokaler
function single (vocal, extension) {
  var othervocals = $.extend({}, vocals)

  if (extension) {
    othervocals[vocal] = ''
  }

  return '(^|[^' + values(othervocals).join('') + '])' +
    '([' + vocals[vocal] + '])' +
    '($|[^' + values(vocals).join('') + '])'
}

function ucfirst(str) {
  if (str === '') {
    return str
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Case-matching
function capitalize(match, replacement) {
  if (match !== match.toLowerCase()) {
    return ucfirst(replacement.toLowerCase())
  }
  else {
    return replacement
  }
}

function htmlspecialchars (str) {
  return $('<div>').text(str).html()
}

// HTML-optimisering
function htmlize (str) {
  return htmlspecialchars(str.trim())
}

function nl2br (str) {
  return str.replace(/\n/g, '<br>');
}

function paragraphize(str) {
  str = nl2br(str)
  str = str.replace(/<br>\s*(<br>\s*)+/g, '</p><p>')
  return '<p>' + str + '</p>'
}

function translate (str) {
  str = str || ''

  // A
  str = str.replace(new RegExp(single('a', false), 'gi'),
                    function (match, p1, p2, p3, offset, string) {
                      return p1 + capitalize(p2, 'åi') + p3
                    })

  // E
  str = str.replace(new RegExp(single('e', false), 'gi'),
                    function (match, p1, p2, p3, offset, string) {
                      return p1 + capitalize(p2, p2 + 'i') + p3
                    })

  str = str.replace(/([-bcdfghjklmnpqrstvwxz]+)(ei)((?:[bcdfghjklmnpqrstvwxz]+ei)+)/gi,
                    function (match, p1, p2, p3, offset, string) {
                      return p1 + capitalize(p2, 'øy') + p3
                    })

  // I
  str = str.replace(new RegExp(single('i', false), 'gi'),
                    function (match, p1, p2, p3, offset, string) {
                      return p1 + capitalize(p2, 'e' + p2) + p3
                    })

  // O
  str = str.replace(new RegExp(single('o', false), 'gi'),
                    function (match, p1, p2, p3, offset, string) {
                      return p1 + capitalize(p2, p2 + 'u') + p3
                    })

  // U
  str = str.replace(new RegExp(single('u', false), 'gi'),
                    function (match, p1, p2, p3, offset, string) {
                      return p1 + capitalize(p2, 'o' + p2) + p3
                    })

  // Y
  str = str.replace(new RegExp(single('y', true), 'gi'),
                    function (match, p1, p2, p3, offset, string) {
                      return p1 + capitalize(p2, 'ø' + p2) + p3
                    })

  // Æ
  str = str.replace(new RegExp(single('æ', false), 'gi'),
                    function (match, p1, p2, p3, offset, string) {
                      return p1 + capitalize(p2, 'åi') + p3
                    })

  // Ø
  str = str.replace(new RegExp(single('ø', false), 'gi'),
                    function (match, p1, p2, p3, offset, string) {
                      return p1 + capitalize(p2, 'au') + p3
                    })

  // Å
  str = str.replace(new RegExp(single('å', false), 'gi'),
                    function (match, p1, p2, p3, offset, string) {
                      return p1 + capitalize(p2, 'ao') + p3
                    })

  return str
}

// function escapeHtml(text) {
//   var map = {
//     '&': '&amp;',
//     '<': '&lt;',
//     '>': '&gt;',
//     '"': '&quot;',
//     "'": '&#039;'
//   };

//   return text.replace(/[&<>"']/g, function(m) { return map[m]; });
// }

// Code defining custom module consisting of a filter
// The module needs to be included as dependency for using the filter, anorsk
angular.module('CustomFilterModule', [])
  .filter('anorsk', function () {
    return translate
  })

// Angular App on this page
// Included CustomFilterModule as dependency
angular.module('DiftongMaskinen', ['CustomFilterModule'])
  .controller('DiftongCtrl', ['$scope', function ($scope) {
    $scope.name = ''
  }])

$(function () {
  $('textarea').focus()
})

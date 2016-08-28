\version "2.12.1"

\header {
  title = "Hallelujah"
  composer = "Jeff Buckley"
  tagline = ""
}

gFretDiagram = \markup {
  \fret-diagram #"6-3-2;5-2-1;4-o;3-o;2-o;1-3-3;"
}

\score {
  <<
  \new Voice = "mel" {
    \relative c' {
      \key a \minor
      \time 6/8

      \partial 8*3 r4. |
      R2. | R2. | R2. | R2.
      R2. | R2. | R2. | R2. |
      R2. | R2. | R2. | R2. |

      R2. | R2. | R2. | R2. |
      R2. | R2. | R2. | R2. |
      R2. | R2. | R2. | R2. |
      R2. | R2. | R2. | r4. r4 e16 f |

      g4 g8 g4 g8 |
      a8 a4 a8 r e |
      g4 g8 g4 g16 g |
      a4 a8 a r g |

      a4 a8 a4 a8 |
      a4 g8 g4 f8 |
      g4 g8 r4. |
      r4. r4 e16 f |

      g4 g8 g4 g8 |
      a4 a8 b4 b8 |
      c4 c8 c4 c16 c |
      c4 c8 d4 r16 c |

      d8 d4 d d8 |
      e4 e8 e4 d8 |
      d4 c8~ c4. |
      r4. e,8 g4

      a4. a |
      r4. a4 g8 |
      e4. e |
      r4. e4 g8 |

      a4. a |
      r4. a4 g8 |
      e4.~( e8 f e |
      d2.) |

      c2. |
      R2. |
      R2. |
      r4. r4 e16 f |

      e2. |
      R2. |
      R2. |
      R2. |

      R2. | R2. | R2. | R2. |
      R2. | R2. | R2. | R2. |
      R2. | R2. | R2. | R2. | R2. |
      %% \override Staff.TimeSignature #'transparent = ##t
      \time 7/8
      R1*7/8 |
      \time 6/8
      %% \override Staff.TimeSignature #'transparent = ##f
      R2. | R2. | R2. | R2. |
      R2. | R2. | R2. | R2. | R2. | R2. |

      g8 g g~ g4 g8 |
      a8 a a r4 r16 e |
      g8 g4 g8 g4 |
      a8 a4 a8 r g8 |

      a4 a8 a4 a8 |
      a8 a4 g f8 |
      a4 e8~ e4. |
      R2. |

      r4. r4 e16 f |
      g8 g g r g g |
      a8 a4 b b8 |
      c4 c8 c c c

      c4 c8 d4 c16 c |
      d4 d8 d d4 |
      e4 e8 e4 d8 |
      d4 c8~ c4. |
      r4. e,8 g4 |

      a4. a |
      r4. a4 g8 |
      e4. e |
      r4. e4 g8 |

      a4. a |
      r4. a4 g8 |
      e4.~( e8 d c) |
      d4. r8 e g |

      a4. a |
      r4. a4 g8 |
      e4. e |
      r4. e4 g8 |

      a4. a |
      r4. a4 g8 |
      e4.~( e8 d c) |
      r4. r8 e' e |
      d8 d4 r4. |

      r4. e4 d8 |
      d8( c) a~ a4. |
      r4. e'4 e8 |
      f8( e d) c4. |
      r4. c4 a16( g) |

      \override Script #'avoid-slur = #'inside
      \override Script #'outside-staff-priority = ##f
      \override Script #'padding = #1
      g16( e'~ e4~\fermata e4.~ |
      e2.~ |
      e2.~ |
      e2.~ |
      e2.~ |

      e2.~ |
      e2.~ |
      \time 4/4
      e1~ |
      e1~ |
      \time 6/8
      e2.~ |
      e4.~ d4.~ |

      d4.) a4.~ |
      a4. r4\fermata c16 d |
      e2.~( |
      e4.~ e4 d16 c) |
      c2. |
      R2.-\fermataMarkup
    }
  }
  \new StaffGroup <<
    \new Staff {
      \relative c' {
        \key a \minor
        \time 6/8
        \tempo 4.=66

        \partial 8*3
        e'4\mp g8 |
        <es a>4. <es a>~ |
        <es a>4. a4 g8 |
        <a, e'>4. <a e'> |
        a,4. e''4 g8 |

        \break

        <es a>4. <es a>4 a,8 |
        e'8 es a, a' a, g' |
        <a, e'>8 c a e' c a |
        a,8 a' c <a e'> a <c e> |

        \break

        es,8 a c es, a c |
        es,8 a c es, a c |
        e,8 a c e, a c |
        e,8\> a c\! e,4\mp g8 |

        \break

        es8 <a es'> <a es'> es <a es'> <a es'> |
        es <a es'> <a es'> es <a dis e> <a dis e> |
        e8 <a c> <a c> <e c'> <f c'> <e c'> |
        d8 <aes' c> <aes c> d, <aes' c> <g c> |

        \break

        c,8 <a' c> <a c f> c, <a' c f> <a c f> |
        c,8\mf <c' f a> <c f a> c, <c' f a> <c f a> |
        c,8 <c' f a> <c f a> c, <c' f a> <c f a> |
        c,4.~ c8 r <g'' b> |

        \break

        <g, c g' c>8 <g c g' c>\> <g c g' c>\! <g c g' c> g b, |
        a8\mp e'' c <c g'> g b, |
        c8 g' c <c g'> g b, |
        a8 e'' g, <c g'> g b, |

        \break

        c8 g' c <g' c> c, b, |
        a8 g' c <g' c> c, b, |
        c8 g' c <g' c> c, b, |
        a8 g' c <g' c> c, b, \bar "||:"

        \break

        \repeat volta 4 {
          c8 g' c <g' c> c, b, |
          a8 g' c <g' c> c, b, |
          c8 g' c <g' c> c, b, |
          a8 g' c <g' c> c, e, |

          \break

          f8 a c <f a>4 c8 |
          a'8 f c b' g d |
          <e, c''>8 g' c, <g c'> g' c, |
          <g a'>16( b') g8 d <g, b'> g' c, |

          \break

          <e, c''>8 g' c, c' g <d, c'> |
          f8 f' c\< <g b'> g' d\! |
          a,8 c' e a e c |
          f,8 c' f <c a'> f c |

          \break

          <g b'>8 g' d <g, b'> g' d |
          <gis, b'>8 e' d <gis, b'>4 e'8\> |
          <a, c'>8 e' c\! e4 c8 |
          a4. <c e c'>8 <d g b>4 \bar "||"

          \break

          <f, f'>8 c' a a' c, a |
          f8 a c a' c, g' |
          <a,, e''>8 c' a e' c a |
          a,8 a' c e a, g'

          \break

          <f, f'>8 c' a <f f'> c' a |
          f8 a c <f, f'> c' e |
          <e, g'>8 c' g c' f,, e |
          d8 g d' <g b>4( c8) |

          \break
        }
        \alternative {
          {
            c,,8 g' c <g' c> c, b, |
            a8 g' c <g' c> c, b, |
            c8 g' c <g' c> c, b, |
            a8 g' c <g' c> c, b, |

            \break
          }
          {
            f'8\mf a c <g' c> a, <g' c> |
          }
        }

        f,8 a c <f, c'> e <d g'> |
        a8 b' c <g' b> b, <g' b> |
        a,,8 b' c <g' a> b, <g' a> |

        \break

        e,8( f) a <c f> f, <f' a> |
        e,8( f) a <c f> f, <c' f> |
        e,8 g <g' c> e, g c |
        d,8 g <g' b> d, d' g \bar "||"

        \break

        c,,8\mp g' c <g' c> c, b, |
        a8 g' c <g' c> c, b, |
        c8 g' c <g' c> c, b, |
        a8 g' c <g' c> c, e |

        \break

        <f, f'>4. <f' a> |
        <f c'>4. <d d'> |
        << { \hideNotes
             \once \override Glissando #'(bound-details left attach-dir) = #-1
             \once \override Glissando #'(bound-details left Y) = #4
             \once \override Glissando #'(bound-details right Y) = #6
             \grace d'8\glissando e2. } \\
           { \stemDown \slurUp
             \override NoteColumn #'ignore-collision = ##t
             \once \override Glissando #'(bound-details left attach-dir) = #-1
             \once \override Glissando #'(bound-details left Y) = #0
             \once \override Glissando #'(bound-details right Y) = #2
             \acciaccatura <d d,>8\glissando <e e,>2.
             \slurNeutral \stemNeutral } >> |
        <d, d'>2. |
        c'8 g e c' g e( |

        \break

        \time 7/8
        \set beatStructure = #'(3 4)
        <f c'>8) f
        \once \override Glissando #'(bound-details left Y) = #2.5
        \once \override Glissando #'(bound-details right Y) = #5
        a\glissando( b) g d' g,(\glissando |
        \time 6/8
        \set beatStructure = #'(3 3)
        a8) e' a, c e a, |
        f'8 f a, f' c
        a(\glissando |
        b8) g' d b g' b,~ |
        b8 d g b, g'
        \once \override Glissando #'(bound-details left Y) = #5.5
        \once \override Glissando #'(bound-details right Y) = #2.5
        b,16(\glissando a)~ |

        \break

        a4. c4 e8 |
        \override Script #'padding = #1
        a2.\fermata |
        <a, f'>4.\p <f c'>~ |
        <f c'>2. |
        <b g'>4. <g d'>~ |
        <g d'>2. \bar "||"

        \break

        <c,, g''>8\mp c' e <e, c''> g' c, |
        a,8 e' a <e a'> e' c |
        c,8 g' g' <e, c''> g' c, |
        <a, e''>8 c' a <a, e''> c' a |

        \break

        <f f'>8 c' a c f c |
        c'8 f, c <g b'> g' d |
        <e, c''>8 g' c, <e, g'> c' g |
        <c a'>16( <d b'>) b'8 d, b' g d |

        \break

        <g, b'>8 g' d g, <g' b>( c) |
        c,,8 <c' e> <c e> c, <c' e c'> <c e c'> |
        f,8 c' f g, <g' b> d |
        a,8 <e'' a> c <a, a''> e'' c |

        \break

        <f, f'>8 c' a <f a'> f' <e, c'> |
        <d b''>8 d' <d, g'> <g b'> d' g, |
        <gis b'>8 e' <gis, d'> <gis b'> <gis e'> <gis d'> |
        <a c'>8 e' c <a c'> e' c |
        <a c'>8 e' c <d, g c e c'> <d g d' e b'>4 \bar "||"

        \break

        <f f'>8 c' a f' c a |
        <f f'>8 c' a <f f'> c' e |
        <a,, e''>8 c' a e' c a |
        <a, a''>8 e'' c <e, c'> a e' |

        \break

        <f, f'>8 c' a a' f c |
        f,8 a c a' f c |
        <e, c''>8 g' c, <c g' c> g' c, |
        d,8 g d' <g b>4. |

        \break

        <f, f'>8 c' a c' f, c |
        b'8 f c a' f c |
        a,8 a' c g' c, a |
        f'8 c a e' c a |

        \break

        <f f'>8 c' a <f f'> c' a |
        c8 a f d' g, c |
        g8 c g <g' c> c, g |
        <g b'>8 g' d b' g c, |
        <f, f'>8 c' a a' f c |

        \break

        f,8 a c <f, a'> f' c |
        e,8 a c <e c'> c a |
        a,8 a' c <e, a'> c' g |
        <f a'>8 f' c a' f c |
        a'8 f c
        \arpeggioArrowUp
        <f, a c f a>4.~\arpeggio |

        \break

        <f a c f a>4.\fermata e8 c' g16 c |
        \textSpannerDown
        \override TextSpanner #'(bound-details left text) =
        \markup { \upright "w/ad lib. arpeggios" }
        <c g' c>2.~ \startTextSpan |
        <c g' c>2. |
        <g d' g b>2.~ |
        <g d' g b>2. |

        \break

        <f c' g' c>2. |
        <e c' g' c>4. <d c' g' c> |
        \time 4/4
        <a e' a c e a>1 |
        <a' c e a>4 <b c e a> <c c e a> <a c e a> |
        \time 6/8
        <f a c f c'>2.~ |
        <f a c f c'>2. |

        \break

        <a, e' a c e a>2. \stopTextSpan |
        a'16 c <e a>4~ <e a>4.\fermata |
        <f, a c f a>2.\arpeggio
        <g d' g b>2. |
        r4. <g c g' c>4.~\arpeggio |
        <g c g' c>2.\fermata

        \bar "|."
      }
    }
    \new TabStaff {
      \relative c {
        \override Stem #'stencil = ##f
        \override Beam #'stencil = ##f
        \override Dots #'stencil = ##f
        \override Rest #'stencil = ##f
        \override TabStaff.TimeSignature #'stencil = ##f
        \key a \major
        \time 6/8

        %% Capo 5th fret
        %% (define-public guitar-tuning '(4 -1 -5 -10 -15 -20))
        % \set TabStaff.stringTunings = #'(9 4 0 -5 -10 -15)

        \partial 8*3
        e'4\2 g8\2 |
        <es\3 a\1>4. <es\3 a\1> |
        s4. a4\1 g8\2 |
        <a,\4 e'\2>4. <a\4 e'\2> |
        a,4.\6 e''4\2 g8\2 |

        \break

        <es\3 a\1>4. <es\3 a\1>4 a,8\4 |
        e'8\2 es\3 a,\4 a'\1 a,\4 g'\2 |
        <a,\4 e'\2>8 c\3 a\4 e'\2 c\3 a\4 |
        a,8\6 a'\4 c\3 <a\4 e'\2> a\4 <c\3 e\2> |

        \break

        es,8\5 a\4 c\3 es,\5 a\4 c\3 |
        es,8\5 a\4 c\3 es,\5 a\4 c\3 |
        e,8\5 a\4 c\3 e,\5 a\4 c\3 |
        e,8\5 a\4 c\3 e,4\5 g8\4 |

        \break

        es8\5 <a\4 es'\3> <a\4 es'\3> es\5 <a\4 es'\3> <a\4 es'\3> |
        es\5 <a\4 es'\3> <a\4 es'\3> es\5 <a\4 dis\3 e\2> <a\4 dis\3 e\2> |
        e8\5 <a\4 c\3> <a\4 c\3> <e\5 c'\3> <f\5 c'\3> <e\5 c'\3> |
        d8\5 <aes'\4 c\3> <aes\4 c\3> d,\5 <aes'\4 c\3> <g\4 c\3> |

        \break

        c,8\6 <a'\4 c\3> <a\4 c\3 f\2> c,\6 <a'\4 c\3 f\2> <a\4 c\3 f\2> |
        c,8\6 <c'\3 f\2 a\1> <c\3 f\2 a\1> c,\6 <c'\3 f\2 a\1> <c\3 f\2 a\1> |
        c,8\6 <c'\3 f\2 a\1> <c\3 f\2 a\1> c,\6 <c'\3 f\2 a\1> <c\3 f\2 a\1> |
        c,4.\6 s8 r <g''\2 b\1> |

        \break

        <g,\4 c\3 g'\2 c\1>8 <g\4 c\3 g'\2 c\1> <g\4 c\3 g'\2 c\1>
        <g\4 c\3 g'\2 c\1> g\4 b,\6 |
        a8\6 e''\2 c\3 <c\3 g'\2> g\4 b,\6 |
        c8\6 g'\4 c\3 <c\3 g'\2> g\4 b,\6 |
        a8\6 e''\2 g,\4 <c\3 g'\2> g\4 b,\6 |

        \break

        c8\6 g'\4 c\3 <g'\2 c\1> c,\3 b,\6 |
        a8\6 g'\4 c\3 <g'\2 c\1> c,\3 b,\6 |
        c8\6 g'\4 c\3 <g'\2 c\1> c,\3 b,\6 |
        a8\6 g'\4 c\3 <g'\2 c\1> c,\3 b,\6 \bar "||:"

        \break

        \repeat volta 4 {
          c8\6 g'\4 c\3 <g'\2 c\1> c,\3 b,\6 |
          a8\6 g'\4 c\3 <g'\2 c\1> c,\3 b,\6 |
          c8\6 g'\4 c\3 <g'\2 c\1> c,\3 b,\6 |
          a8\6 g'\4 c\3 <g'\2 c\1> c,\3 e,\6 |

          \break

          f8\5 a\4 c\3 <f\2 a\1>4 c8\3 |
          a'8\1 f\2 c\3 b'\1 g\2 d\3 |
          <e,\5 c''\1>8 g'\2 c,\3 <g\4 c'\1> g'\2 c,\3 |
          <g\4 a'\1>16( b'\1) g8\2 d\3 <g,\4 b'\1> g'\2 c,\3 |

          \break

          <e,\5 c''\1>8 g'\2 c,\3 c'\1 g\2 <d,\5 c'\3> |
          f8\5 f'\2 c\3 <g\4 b'\1> g'\2 d\3 |
          a,8\6 c'\3 e\2 a\1 e\2 c\3 |
          f,8\5 c'\3 f\2 <c\3 a'\1> f\2 c\3 |

          \break

          <g\4 b'\1>8 g'\2 d\3 <g,\4 b'\1> g'\2 d\3 |
          <gis,\4 b'\1>8 e'\2 d\3 <gis,\4 b'\1>4 e'8\2 |
          <a,\4 c'\1>8 e'\2 c\3 e4\2 c8\3 |
          a4.\4 <c\3 e\2 c'\1>8 <d\3 g\2 b\1>4 \bar "||"

          \break

          <f,\5 f'\2>8 c'\3 a\4 a'\1 c,\3 a\4 |
          f8\5 a\4 c\3 a'\1 c,\3 g'\2 |
          <a,,\6 e''\2>8 c'\3 a\4 e'\2 c\3 a\4 |
          a,8\6 a'\4 c\3 e\2 a,\4 g'\2

          \break

          <f,\5 f'\2>8 c'\3 a\4 <f\5 f'\2> c'\3 a\4 |
          f8\5 a\4 c\3 <f,\5 f'\2> c'\3 e\2 |
          <e,\5 g'\2>8 c'\3 g\4 c'\1 f,,\5 e\5 |
          d8\5 g\4 d'\3 <g\2 b\1>4( c8\1) |

          \break
        }
        \alternative {
          {
            c,,8\6 g'\4 c\3 <g'\2 c\1> c,\3 b,\6 |
            a8\6 g'\4 c\3 <g'\2 c\1> c,\3 b,\6 |
            c8\6 g'\4 c\3 <g'\2 c\1> c,\3 b,\6 |
            a8\6 g'\4 c\3 <g'\2 c\1> c,\3 b,\6 |

            \break
          }
          {
            f'8\5 a\4 c\3 <g'\2 c\1> a,\4 <g'\2 c\1> |
          }
        }

        f,8\5 a\4 c\3 <f,\5 c'\3> e\5 <d\5 g'\2> |
        a8\6 b'\4 c\3 <g'\2 b\1> b,\4 <g'\2 b\1> |
        a,,8\6 b'\4 c\3 <g'\2 a\1> b,\4 <g'\2 a\1> |

        \break

        e,8\5( f\5) a\4 <c\3 f\2> f,\5 <f'\2 a\1> |
        e,8\5( f\5) a\4 <c\3 f\2> f,\5 <c'\3 f\2> |
        e,8\5 g\4 <g'\2 c\1> e,\5 g\4 c\3 |
        d,8\5 g\4 <g'\2 b\1> d,\5 d'\3 g\2 \bar "||"

        \break

        c,,8\6 g'\4 c\3 <g'\2 c\1> c,\3 b,\6 |
        a8\6 g'\4 c\3 <g'\2 c\1> c,\3 b,\6 |
        c8\6 g'\4 c\3 <g'\2 c\1> c,\3 b,\6 |
        a8\6 g'\4 c\3 <g'\2 c\1> c,\3 e\2 |

        \break

        <f,\5 f'\2>4. <f'\2 a\1> |
        <f\2 c'\1>4. <d\3 d'\1> |
        <e\3 e'\1>2. |
        %% << { \hideNotes
        %%      \once \override Glissando #'(bound-details left attach-dir) = #-1
        %%      \once \override Glissando #'(bound-details left Y) = #4
        %%      \once \override Glissando #'(bound-details right Y) = #6
        %%      \grace d'8\glissando e2. } \\
        %%    { \stemDown \slurUp
        %%      \override NoteColumn #'ignore-collision = ##t
        %%      \once \override Glissando #'(bound-details left attach-dir) = #-1
        %%      \once \override Glissando #'(bound-details left Y) = #0
        %%      \once \override Glissando #'(bound-details right Y) = #2
        %%      \acciaccatura <d d,>8\glissando <e e,>2.
        %%      \slurNeutral \stemNeutral } >> |
        <d\3 d'\1>2. |
        c'8\1 g\2 e\3 c'\1 g\2 e\3( |

        \break

        \time 7/8
        \set beatStructure = #'(3 4)
        <f\3 c'\1>8) f\3
        a\2\glissando( b\2) g\3 d'\1 g,\3(\glissando |
        \time 6/8
        \set beatStructure = #'(3 3)
        a8\3) e'\1 a,\3 c\2 e\1 a,\3 |
        f'8\1 f\1 a,\3 f'\1 c\2
        a\3(\glissando |
        b8\3) g'\1 d\2 b\3 g'\1 b,\3 |
        s8 d\2 g\1 b,\3 g'\1
        \once \override Glissando #'(bound-details left Y) = #1.5
        \once \override Glissando #'(bound-details right Y) = #0
        b,16\3(\glissando a\3) |

        \break

        s4. c4\2 e8\1 |
        \override Script #'padding = #1
        a2.\1 |
        <a,\3 f'\1>4. <f\4 c'\2> |
        s2. |
        <b\3 g'\1>4. <g\4 d'\2> |
        s2. \bar "||"

        \break

        <c,,\6 g''\2>8 c'\3 e\2 <e,\5 c''\1> g'\2 c,\3 |
        a,8\6 e'\5 a\4 <e\5 a'\1> e'\2 c\3 |
        c,8\6 g'\4 g'\2 <e,\5 c''\1> g'\2 c,\3 |
        <a,\6 e''\2>8 c'\3 a\4 <a,\6 e''\2> c'\3 a\4 |

        \break

        <f\5 f'\2>8 c'\3 a\4 c\3 f\2 c\3 |
        c'8\1 f,\2 c\3 <g\4 b'\1> g'\2 d\3 |
        <e,\5 c''\1>8 g'\2 c,\3 <e,\5 g'\2> c'\3 g\4 |
        %% \set doubleSlurs = ##t
        <c\3 a'\1>16( <d\3 b'\1>)
        %% \set doubleSlurs = ##f
        b'8\1 d,\3 b'\1 g\2 d\3 |

        \break

        <g,\4 b'\1>8 g'\2 d\3 g,\4 <g'\2 b\1>( c\1) |
        c,,8\6 <c'\3 e\2> <c\3 e\2> c,\6 <c'\3 e\2 c'\1> <c\3 e\2 c'\1> |
        f,8\5 c'\3 f\2 g,\4 <g'\2 b\1> d\3 |
        a,8\6 <e''\2 a\1> c\3 <a,\6 a''\1> e''\2 c\3 |

        \break

        <f,\5 f'\2>8 c'\3 a\4 <f\5 a'\1> f'\2 <e,\5 c'\3> |
        <d\5 b''\1>8 d'\3 <d,\5 g'\2> <g\4 b'\1> d'\3 g,\4 |
        <gis\4 b'\1>8 e'\2 <gis,\4 d'\3> <gis\4 b'\1> <gis\4 e'\2> <gis\4 d'\3> |
        <a\4 c'\1>8 e'\2 c\3 <a\4 c'\1> e'\2 c\3 |
        <a\4 c'\1>8 e'\2 c\3 <d,\5 g\4 c\3 e\2 c'\1> <d\5 g\4 d'\3 e\2 b'\1>4 \bar "||"

        \break

        <f\5 f'\2>8 c'\3 a\4 f'\2 c\3 a\4 |
        <f\5 f'\2>8 c'\3 a\4 <f\5 f'\2> c'\3 e\2 |
        <a,,\6 e''\2>8 c'\3 a\4 e'\2 c\3 a\4 |
        <a,\6 a''\1>8 e''\2 c\3 <e,\5 c'\3> a\4 e'\2 |

        \break

        <f,\5 f'\2>8 c'\3 a\4 a'\1 f\2 c\3 |
        f,8\5 a\4 c\3 a'\1 f\2 c\3 |
        <e,\5 c''\1>8 g'\2 c,\3 <c\3 g'\2 c\1> g'\2 c,\3 |
        d,8\5 g\4 d'\3 <g\2 b\1>4. |

        \break

        <f,\5 f'\2>8 c'\3 a\4 c'\1 f,\2 c\3 |
        b'8\1 f\2 c\3 a'\1 f\2 c\3 |
        a,8\6 a'\4 c\3 g'\2 c,\3 a\4 |
        f'8\2 c\3 a\4 e'\2 c\3 a\4 |

        \break

        <f\5 f'\2>8 c'\3 a\4 <f\5 f'\2> c'\3 a\4 |
        c8\3 a\4 f\5 d'\3 g,\4 c\3 |
        g8\4 c\3 g\4 <g'\2 c\1> c,\3 g\4 |
        <g\4 b'\1>8 g'\2 d\3 b'\1 g\2 c,\3 |
        <f,\5 f'\2>8 c'\3 a\4 a'\1 f\2 c\3 |

        \break

        f,8\5 a\4 c\3 <f,\5 a'\1> f'\2 c\3 |
        e,8\5 a\4 c\3 <e\2 c'\1> c\3 a\4 |
        a,8\6 a'\4 c\3 <e,\5 a'\1> c'\3 g\4 |
        <f\5 a'\1>8 f'\2 c\3 a'\1 f\2 c\3 |
        a'8\1 f\2 c\3
        \arpeggioArrowUp
        <f,\5 a\4 c\3 f\2 a\1>4.~\arpeggio |

        \break

        s4. e8\5 c'\3 g16\4 c\3 |
        <c\3 g'\2 c\1>2. |
        s2. |
        <g\4 d'\3 g\2 b\1>2. |
        s2. |

        \break

        <f\5 c'\3 g'\2 c\1>2. |
        <e\5 c'\3 g'\2 c\1>4. <d\5 c'\3 g'\2 c\1> |
        \time 4/4
        <a\6 e'\5 a\4 c\3 e\2 a\1>1 |
        <a'\4 c\3 e\2 a\1>4 <b\4 c\3 e\2 a\1> <c\4 c\3 e\2 a\1>
        <a\4 c\3 e\2 a\1> |
        \time 6/8
        <f\5 a\4 c\3 f\2 c'\1>2. |
        s |

        \break

        <a,\6 e'\5 a\4 c\3 e\2 a\1>2. |
        a'16\4 c\3 <e\2 a\1>4 s4. |
        <f,\5 a\4 c\3 f\2 a\1>2.\arpeggio
        <g\4 d'\3 g\2 b\1>2. |
        r4. <g\4 c\3 g'\2 c\1>4.\arpeggio |
        s2.

        \bar "|."
      }
    }
  >>
  >>

  \midi { }

  \layout {
    \context {
      \Staff
      \override TimeSignature #'style = #'()
    }
  }
}

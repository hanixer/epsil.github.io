\version "2.10.33"

\header {
  title = "The Nobodies"
  composer = "Marilyn Manson"
  tagline = ""
}

\score {
  \new StaffGroup <<
    \new Staff {
      \relative c' {
        \key a \minor
        \time 4/4
        \override Score.MetronomeMark #'padding = #2
        \tempo 4=80

        \repeat volta 3 {
          a8 c' a c a, c' a c |
          c, c' a c c, c' a c |
          e,, c'' aes e e c' aes e |
          a, c' a c g, c' a c
        }

        \break

        \repeat volta 2 {
          <a, e' a>^\markup { \column { Am \fret-diagram #"f:1;6-o;5-o;4-2-2;3-2-3;2-1-1;1-o;" } }
          <a e' a> <a e' a> <a e' a>
          <a e' a> <a e' a> <a e' a> <a e' a> |
          <c g' c>^\markup { \column { C \fret-diagram #"f:1;6-x;5-3-3;4-2-2;3-o;2-1-1;1-o;" } }
          <c g' c> <c g' c> <c g' c>
          <c g' c> <c g' c> <c g' c> <c g' c> | % \break
          <e, b' e>^\markup { \column { Em \fret-diagram #"f:1;6-o;5-2-2;4-2-3;3-o;2-o;1-o;" } }
          <e b' e> <e b' e> <e b' e>
          <e b' e> <e b' e> <e b' e> <e b' e> |
          <a e' a>^\markup { \column { Am \fret-diagram #"f:1;6-o;5-o;4-2-2;3-2-3;2-1-1;1-o;" } }
          <a e' a> <a e' a> <a e' a>
          <g d' g>^\markup { \column { G \fret-diagram #"f:1;6-3-2;5-2-1;4-o;3-o;2-o;1-3-3;" } }
          <g d' g> <g d' g> <g d' g>
        }

        \break

        \repeat volta 4 {
          <a e' a>^\markup { \column { Am \fret-diagram #"f:1;6-o;5-o;4-2-2;3-2-3;2-1-1;1-o;" } }
          <a e' a> <a e' a> <a e' a>
          <a e' a> <a e' a> <a e' a> <a e' a> |
          <f c' f>^\markup { \column { F \override #'(barre-type . straight) \fret-diagram #"f:1;c:2-1-1;6-x;5-x;4-3-3;3-2-2;2-1-1;1-1-1;" } }
          <f c' f> <f c' f> <f c' f>
          <f c' f> <f c' f> <f c' f> <f c' f>
        }

        <e b' e>2^\markup { \column { Em \fret-diagram #"f:1;6-o;5-2-2;4-2-3;3-o;2-o;1-o;" } }
        d'8 e d c
      }
    }
    \new TabStaff {
      \relative c {
        \override Stem #'stencil = ##f
        \override Beam #'stencil = ##f
        \override Dots #'stencil = ##f
        \override TextScript #'font-size = #-2
        \override TextScript #'staff-padding = #2
        \override TextScript #'extra-offset = #'(0.0 . 1)
        \time 4/4

        \repeat volta 3 {
          a8\5 c'\2_"1" a\3_"2" c\2_"1"
          a,\5 c'\2_"1" a\3_"2" c\2_"1" |
          c,\5_"3" c'\2_"1" a\3_"2" c\2_"1"
          c,\5_"3" c'\2_"1" a\3_"2" c\2_"1" |
          e,,\6 c''\2_"1" aes\3_"2" e\4_"3" e\4_"3"
          c'\2_"1" aes\3_"2" e\4_"3" |
          a,\5 c'\2_"1" a\3_"2" c\2_"1"
          g,\6_"3" c'\2_"1" a\3_"2" c\2_"1"
        }

        \break

        \repeat volta 2 {
          <a,\6 e'\5 a\4> <a\6 e'\5 a\4>
          <a\6 e'\5 a\4> <a\6 e'\5 a\4>
          <a\6 e'\5 a\4> <a\6 e'\5 a\4>
          <a\6 e'\5 a\4> <a\6 e'\5 a\4> |
          <c\5 g'\4 c\3> <c\5 g'\4 c\3>
          <c\5 g'\4 c\3> <c\5 g'\4 c\3>
          <c\5 g'\4 c\3> <c\5 g'\4 c\3>
          <c\5 g'\4 c\3> <c\5 g'\4 c\3> | % \break
          <e,\6 b'\5 e\4> <e\6 b'\5 e\4>
          <e\6 b'\5 e\4> <e\6 b'\5 e\4>
          <e\6 b'\5 e\4> <e\6 b'\5 e\4>
          <e\6 b'\5 e\4> <e\6 b'\5 e\4> |
          <a\6 e'\5 a\4> <a\6 e'\5 a\4>
          <a\6 e'\5 a\4> <a\6 e'\5 a\4>
          <g\6 d'\5 g\4> <g\6 d'\5 g\4>
          <g\6 d'\5 g\4> <g\6 d'\5 g\4>
        }

        \break

        \repeat volta 4 {
          <a\6 e'\5 a\4> <a\6 e'\5 a\4>
          <a\6 e'\5 a\4> <a\6 e'\5 a\4>
          <a\6 e'\5 a\4> <a\6 e'\5 a\4>
          <a\6 e'\5 a\4> <a\6 e'\5 a\4> |
          <f\6 c'\5 f\4> <f\6 c'\5 f\4>
          <f\6 c'\5 f\4> <f\6 c'\5 f\4>
          <f\6 c'\5 f\4> <f\6 c'\5 f\4>
          <f\6 c'\5 f\4> <f\6 c'\5 f\4>
        }

        <e\6 b'\5 e\4>2 d'8\5 e\5 d\5 c\5
      }
    }
  >>

  \midi { }

  \layout {
    \context {
      \Score
      \override BarNumber #'padding = #2
    } 

    \context {
      \Staff
      \override TimeSignature #'style = #'()
    }

    \context {
      \TabStaff
      \override TimeSignature #'style = #'()
    }
  }
}

\paper {
                                % indent = 0\mm
                                % line-width = 130\mm
                                % oddFooterMarkup = ##f
                                % oddHeaderMarkup = ##f
                                % bookTitleMarkup = ##f
                                % scoreTitleMarkup = ##f
}

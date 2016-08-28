\version "2.10.33"

\header {
  title = "The House of the Rising Sun"
  composer = "The Animals"
  tagline = ""
}

#(define (x-tab-format str context event)
  (make-whiteout-markup
   (make-vcenter-markup
    (markup #:musicglyph "noteheads.s2cross"))))

crosshead = \set tablatureFormat = #x-tab-format
uncrosshead = \unset tablatureFormat

\score {
  \new StaffGroup <<
    \new Staff {
      \relative c' {
        \key a \minor
        \time 6/8
        \once \override Score.MetronomeMark #'extra-offset = #'(-5 . 1)
        \tempo 4.=78

%%% Intro

        %% Am
        \once \override TextScript #'extra-offset = #'(7 . 0)
        a8^\markup { \center-align { Am \fret-diagram #"f:1;6-x;5-o;4-2-2;3-2-3;2-1-1;1-o;" } }
        e'16 a
        \afterGrace c8( { \override NoteHead #'style = #'cross e) }
        \revert NoteHead #'style
        e c g |

        %% C
        c,^\markup { \center-align { C \fret-diagram #"f:1;6-x;5-3-3;4-2-2;3-o;2-1-1;1-o;" } }
        e16 g c8 e c g |

        %% D
        d^\markup { \center-align { D \fret-diagram #"f:1;6-x;5-x;4-o;3-2-1;2-3-3;1-2-2;" } }
        a'16 d~ <d \tweak #'style #'cross f>8 fis d g, |

        %% F
        \stemUp
        f^\markup { \center-align { F \override #'(barre-type . straight) \fret-diagram #"f:1;c:2-1-1;6-x;5-x;4-3-3;3-2-2;2-1-1;1-1-1;" } }
        a16 c~ <c \tweak #'style #'cross f>8
        \stemNeutral
        f <c a> g | \break

        %% Am
        a,^\markup { \center-align { Am \fret-diagram #"f:1;6-x;5-o;4-2-2;3-2-3;2-1-1;1-o;" } }
        e'16 a
        \afterGrace c8( { \override NoteHead #'style = #'cross e) }
        \revert NoteHead #'style
        e c \override NoteHead #'style = #'cross a
        \revert NoteHead #'style |

        %% E
        e,^\markup { \center-align { E \fret-diagram #"f:1;6-o;5-2-2;4-2-3;3-1-1;2-o;1-o;" } }
        b'16 e
        \afterGrace gis8( { \override NoteHead #'style = #'cross b) }
        \revert NoteHead #'style
        e b g |

        \mark \markup { \musicglyph #"scripts.segno" }

        %% Am
        a,^\markup { \center-align { Am \fret-diagram #"f:1;6-x;5-o;4-2-2;3-2-3;2-1-1;1-o;" } }
        e'16 a c8 e c g |

        %% E
        e,^\markup { \center-align { E \fret-diagram #"f:1;6-o;5-2-2;4-2-3;3-1-1;2-o;1-o;" } }
        b'16 e
        \afterGrace gis8( { \override NoteHead #'style = #'cross b) }
        \revert NoteHead #'style
        e b g |

%%% Verse

        %% Am
        a,^\markup { \center-align { Am \fret-diagram #"f:1;6-x;5-o;4-2-2;3-2-3;2-1-1;1-o;" } }
        e'16 a c8 e c g |

        %% C
        c,^\markup { \center-align { C \fret-diagram #"f:1;6-x;5-3-3;4-2-2;3-o;2-1-1;1-o;" } }
        e16 g c8 e c g |

        %% D
        d^\markup { \center-align { D \fret-diagram #"f:1;6-x;5-x;4-o;3-2-1;2-3-3;1-2-2;" } }
        a'16 d~ <d \tweak #'style #'cross f>8 fis d g, |

        %% F
        \stemUp
        f^\markup { \center-align { F \override #'(barre-type . straight) \fret-diagram #"f:1;c:2-1-1;6-x;5-x;4-3-3;3-2-2;2-1-1;1-1-1;" } }
        a16 c~ <c \tweak #'style #'cross f>8
        \stemNeutral
        f c g | \break

        %% Am
        a,^\markup { \center-align { Am \fret-diagram #"f:1;6-x;5-o;4-2-2;3-2-3;2-1-1;1-o;" } }
        e'16 a c8 e c g |

        %% C
        c,^\markup { \center-align { C \fret-diagram #"f:1;6-x;5-3-3;4-2-2;3-o;2-1-1;1-o;" } }
        e16 g c8 \override NoteHead #'style = #'cross e
        \revert NoteHead #'style
        g,~ <g d> |

        %% E
        e,^\markup { \center-align { E \fret-diagram #"f:1;6-o;5-2-2;4-2-3;3-1-1;2-o;1-o;" } }
        b'16 e
        \afterGrace gis8( { \override NoteHead #'style = #'cross b) }
        \revert NoteHead #'style
        e gis, e |

        e, b'16 e
        \afterGrace gis8( { \override NoteHead #'style = #'cross b) }
        \revert NoteHead #'style
        e b g |

        %% Am
        a,^\markup { \center-align { Am \fret-diagram #"f:1;6-x;5-o;4-2-2;3-2-3;2-1-1;1-o;" } }
        e'16 a c8 e c g |

        %% C
        c,^\markup { \center-align { C \fret-diagram #"f:1;6-x;5-3-3;4-2-2;3-o;2-1-1;1-o;" } }
        e16 g c8 e c g |

        %% D
        d^\markup { \center-align { D \fret-diagram #"f:1;6-x;5-x;4-o;3-2-1;2-3-3;1-2-2;" } }
        a'16 d~ <d \tweak #'style #'cross f>8 fis d g, |

        %% F
        \stemUp
        f^\markup { \center-align { F \override #'(barre-type . straight) \fret-diagram #"f:1;c:2-1-1;6-x;5-x;4-3-3;3-2-2;2-1-1;1-1-1;" } }
        a16 c~ <c \tweak #'style #'cross f>8
        \stemNeutral
        f c g | \break

        %% Am
        a,^\markup { \center-align { Am \fret-diagram #"f:1;6-x;5-o;4-2-2;3-2-3;2-1-1;1-o;" } }
        e'16 a c8 e a, e |

        %% E
        e,^\markup { \center-align { E \fret-diagram #"f:1;6-o;5-2-2;4-2-3;3-1-1;2-o;1-o;" } }
        b'16 e gis8 e' b g |

        %% Am
        a,^\markup { \center-align { Am \fret-diagram #"f:1;6-x;5-o;4-2-2;3-2-3;2-1-1;1-o;" } }
        e'16 a c8 e c g |

        %% C
        c,^\markup { \center-align { C \fret-diagram #"f:1;6-x;5-3-3;4-2-2;3-o;2-1-1;1-o;" } }
        e16 g c8 e c g | \break

        %% D
        d^\markup { \center-align { D \fret-diagram #"f:1;6-x;5-x;4-o;3-2-1;2-3-3;1-2-2;" } }
        a'16 d~ <d \tweak #'style #'cross f>8 fis d b |

        %% F
        \stemUp
        f^\markup { \center-align { F \override #'(barre-type . straight) \fret-diagram #"f:1;c:2-1-1;6-x;5-x;4-3-3;3-2-2;2-1-1;1-1-1;" } }
        a16 c~ <c \tweak #'style #'cross f>8
        \stemNeutral
        f c b |

        %% Am
        a,^\markup { \center-align { Am \fret-diagram #"f:1;6-x;5-o;4-2-2;3-2-3;2-1-1;1-o;" } }
        e'16 a c8 e c g |

        %% E
        e,^\markup { \center-align { E \fret-diagram #"f:1;6-o;5-2-2;4-2-3;3-1-1;2-o;1-o;" } }
        b'16 e gis8 e' b g

        \override Score.RehearsalMark
        #'break-visibility = #begin-of-line-invisible
        \once \override Score.RehearsalMark #'self-alignment-X = #right
        \mark \markup { \line { "D.S. " \fontsize #-3 \raise #1 \musicglyph #"scripts.segno" } }

        \bar "|."
      }
    }
    \new TabStaff {
      \relative c {
        \override Stem #'stencil = ##f
        \override Beam #'stencil = ##f
        \override Dots #'stencil = ##f
        \key a \major
        \time 6/8

%%% Intro

        %% Am
        a8\5 e'16\4 a\3
        \afterGrace c8\2 { \crosshead <\parenthesize e\1> } \uncrosshead
        e\1 c\2 g\3 |

        %% C
        c,\5 e16\4 g\3 c8\2 e\1 c\2 g\3 |

        %% D
        d\4 a'16\3
        d\2
        \crosshead
        fis8
        \uncrosshead
        fis\1 d\2 g,\3 |

        %% F
        f\4 a16\3
        c\2
        \crosshead
        f8\1
        \uncrosshead
        f\1 <c\2 a\3> g\3 | \break

        %% Am
        a,\5 e'16\4 a\3
        \afterGrace c8\2 { \crosshead <\parenthesize e\1> } \uncrosshead
        e\1 c\2
        \crosshead
        a\3
        \uncrosshead |

        %% E
        e,\6 b'16\5 e\4
        \afterGrace gis8\3 { \crosshead <\parenthesize b\2> } \uncrosshead
        e\1 b\2 g\3 |

        %% Am
        a,\5 e'16\4 a\3 c8\2 e\1 c\2 g\3 |

        %% E
        e,\6 b'16\5 e\4
        \afterGrace gis8\3 { \crosshead <\parenthesize b\2> } \uncrosshead
        e\1 b\2 g\3 |

%%% Verse

        %% Am
        a,\5 e'16\4 a\3 c8\2 e\1 c\2 g\3 |

        %% C
        c,\5 e16\4 g\3 c8\2 e\1 c\2 g\3 |

        %% D
        d\4 a'16\3
        d\2
        \crosshead
        fis8
        \uncrosshead
        fis\1 d\2 g,\3 |

        %% F
        f\4 a16\3
        c\2
        \crosshead
        f8\1
        \uncrosshead
        f\1 c\2 g\3 | \break

        %% Am
        a,\5 e'16\4 a\3 c8\2 e\1 c\2 g\3 |

        %% C
        c,\5 e16\4 g\3 c8\2 \crosshead e\1 \uncrosshead
        g,~\3 d\4 |

        %% E
        e,\6 b'16\5 e\4
        \afterGrace gis8\3 { \crosshead <\parenthesize b\2> } \uncrosshead
        e8\1 gis,\3 e\4 |

        e,\6 b'16\5 e\4
        \afterGrace gis8\3 { \crosshead <\parenthesize b\2> } \uncrosshead
        e\1 b\2 g\3

        %% Am
        a,\5 e'16\4 a\3 c8\2 e\1 c\2 g\3 |

        %% C
        c,\5 e16\4 g\3 c8\2 e\1 c\2 g\3 |

        %% D
        d\4 a'16\3
        d\2
        \crosshead
        fis8
        \uncrosshead
        fis\1 d\2 g,\3 |

        %% F
        f\4 a16\3
        c\2
        \crosshead
        f8\1
        \uncrosshead
        f\1 c\2 g\3 | \break

        %% Am
        a,\5 e'16\4 a\3 c8\2 e\1 a,\3 e\4 |

        %% E
        e,\6 b'16\5 e\4 gis8\3 e'\1 b\2 g\3 |

        %% Am
        a,\5 e'16\4 a\3 c8\2 e\1 c\2 g\3 |

        %% C
        c,\5 e16\4 g\3 c8\2 e\1 c\2 g\3 | \break

        %% D
        d\4 a'16\3
        d\2
        \crosshead
        fis8
        \uncrosshead
        fis\1 d\2 b\2 |

        %% F
        f\4 a16\3
        c\2
        \crosshead
        f8\1
        \uncrosshead
        f\1 c\2 b\2 |

        %% Am
        a,\5 e'16\4 a\3 c8\2 e\1 c\2 g\3 |

        %% E
        e,\6 b'16\5 e\4 gis8\3 e'\1 b\2 g\3

        \bar "|."
      }
    }
  >>

  \midi { }

  \layout {
    \context {
      \Score
      \override BarNumber #'padding = #2
      \override Beam #'damping = #+inf.0
    }

    \context {
      \Staff
      \override TimeSignature #'style = #'()
      \override TextScript #'staff-padding = #3.5
      \override TextScript #'extra-offset = #'(4 . 0)
    }

    \context {
      \TabStaff
      \override TimeSignature #'style = #'()
    }
  }
}

\paper {
  %% indent = 0\mm
  %% line-width = 130\mm
  %% oddFooterMarkup = ##f
  %% oddHeaderMarkup = ##f
  %% bookTitleMarkup = ##f
  %% scoreTitleMarkup = ##f
}

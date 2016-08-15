title: Grenseverdisetningen
date: 2010-11-20
---

$$0 < \lvert x - x_0\rvert < \delta \quad\Rightarrow\quad 0 < \lvert f(x) - L\rvert < \epsilon$$

Vi har en $\delta$, og den bruker vi for å komme nærmere $x_0$, ved å skvise sammen differansen mellom $x$ og $x_0$. (Dvs. $x$ er en fri variabel og kan være hva som helst, men den kan ikke være lengre unna $x_0$ enn $\delta$.) I tillegg har vi en $\epsilon$, og den bruker vi for å komme nærmere grenseverdien $L$, ved å skvise sammen differansen mellom $f(x)$ og $L$. Bokstavene $\delta$ (delta) og $\epsilon$ (epsilon) kan forstås som «differanse» og «feilmargin» («error»), og differansen og feilmarginen henger sammen gjennom implikasjonspilen.

Hvis feilmarginen nå er gitt -- la oss si at $\epsilon = 3$ eller noe annet -- så må vi sørge for at $f(x)$ kommer såpass nærme $L$. Hvordan gjør vi det? Jo, ved å flytte på $x$. Hvis vi reduserer spillerommet til $x$ (differansen), så følger det av implikasjonen at vi også reduserer spillerommet til $f(x)$ (feilmarginen). Det er altså bare å redusere $\delta$ inntil $x$ er så innsnevret at $f(x)$ *må* komme nærme nok $L$, altså inntil $\lvert f(x) - L\rvert < 3$.

Poenget er at grenseverdidefinisjonen sier at vi kan gjøre dette *uansett* hva $\epsilon$ er. Uansett feilmargin, så kan differansen gjøres liten nok:

> Grenseverdien $\lim_{x \to x_0} f(x) = L$ eksisterer hvis og bare hvis det for enhver $\epsilon > 0$ finnes en $\delta > 0$ som oppfyller kriteriene over.

Så uansett hvor tett vi ønsker å skvise sammen $f(x)$ og $L$, er det mulig å skvise sammen $x$ og $x_0$ tilsvarende. Dermed går $f(x)$ mot $L$ når $x$ går mot $x_0$.

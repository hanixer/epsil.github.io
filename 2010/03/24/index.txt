title: Lineære differensialligninger med konstante koeffisienter
date: 2010-03-24
---

1\. ordens lineær differensialligning med konstante koeffisienter
-----------------------------------------------------------------

$$a \cdot y' + b \cdot y = f(t), y(0)\text{ gitt}$$

Her er $a$ og $b$ konstanter, mens $f(t)$ er en ytre kilde (f.eks. en spenningskilde). $y(0)$ er startbetingelsen til differensialligningen.

Når en skal løse en slik differensialligning, kan en følge følgende prosedyre:

### 1\. Bestem den homogene (transiente) løsningen først

Den karakteristiske ligningen er gitt ved $a \cdot \lambda + b = 0$. $y_H = C \cdot e^{\lambda \cdot t}$, der $\lambda$ finnes fra den karakteristiske ligningen. Tidskonstanten til systemet er gitt ved $\lvert 1/\lambda\rvert$.

### 2\. Bestem deretter den partikulære (stasjonære) løsningen

Den partikulære løsningen, $y_P$, vil alltid være av samme funksjonstype som $f(t)$, eventuelt multiplisert med $t$ dersom det er sammenfall mellom den homogene løsningen og $f(t)$.

-   **Konstant:** $y_P = A$
-   **1. grads polynom:** $y_P = A \cdot t + B$
-   **2. grads polynom:** $y_P = A \cdot t2 + B \cdot t + C$
-   **Eksponentialfunksjon ($e^{-b \cdot t}$):** $y_P = A \cdot e^{-b \cdot t}$
-   **Sinus- og/eller cosinusfunksjon med vinkelfrekvens $\omega$:** $y_P = A \cdot \sin(\omega \cdot t) + B \cdot \cos(\omega \cdot t)$

**NB!** Den frie konstanten eller de frie konstantene i den partikulære løsningen finnes ved å sette inn den partikulære løsningen inn i differensialligningen. Ved å sammenligne venstre og høyre side vil konstanten(e) bli bestemt.

### 3\. Den totale løsningen er da summen av den homogene og den partikulære løsningen

$$y(t) = y_H(t) + y_P(t)$$

### 4\. Den frie konstanten i den homogene løsningen bestemmes slik at startbetingelsen oppfylles

2\. ordens lineær differensialligning med konstante koeffisienter
-----------------------------------------------------------------

$$a \cdot y'' + b \cdot y' + c \cdot y = f(t), y(0)\text{ og }y'(0)\text{ gitt}$$

Her er $a$, $b$ og $c$ konstanter, mens $f(t)$ er en ytre kilde (f.eks. en spenningskilde). $y(0)$ og $y'(0)$ er startbetingelsene til differensialligningen.

Når en skal løse en slik differensialligning, kan en følge følgende prosedyre:

### 1\. Bestem den homogene (transiente) løsningen først

Den karakteristiske ligningen er gitt ved $a \cdot \lambda^2 + b \cdot \lambda + c = 0$.

-   **Tilfelle 1, reelle og forskjellige $\lambda$-verdier:** $y_H = C_1 \cdot e^{\lambda_1 \cdot t} + C2 \cdot e^{\lambda_2 \cdot t}$, der $\lambda_1$ og $\lambda_2$ finnes fra den karakteristiske ligningen.
-   **Tilfelle 2, reelle og like $\lambda$-verdier:** $y_H = C_1 \cdot e^{\lambda \cdot t + C_2 \cdot t} \cdot e^{\lambda \cdot t}$, der $\lambda_1 = \lambda_2 = \lambda$ finnes fra den karakteristiske ligningen.
-   **Tilfelle 3, komplekskonjugerte $\lambda$-verdier:** $y_H = e^{\alpha \cdot t} \cdot (A \cdot \cos(\beta \cdot t) + B \cdot \sin(\beta \cdot t))$, der $\lambda = \alpha \pm i\beta$.

### 2\. Bestem deretter den partikulære (stasjonære) løsningen

Den partikulære løsningen, $y_P$, vil alltid være av samme funksjonstype som $f(t)$, eventuelt multiplisert med $t$ eller $t_2$ dersom det er sammenfall mellom den homogene løsningen og $f(t)$.

-   **Konstant:** $y_P = A$
-   **1. grads polynom:** $y_P = A \cdot t + B$
-   **2. grads polynom:** $y_P = A \cdot t_2 + B \cdot t + C$
-   **Eksponentialfunksjon ($e^{-b \cdot t}$):** $y_P = A \cdot e^{-b \cdot t}$
-   **Sinus- og/eller cosinusfunksjon med vinkelfrekvens $\omega$:** $y_P = A \cdot \sin(\omega \cdot t) + B \cdot \cos(\omega \cdot t)$

**NB!** Den frie konstanten eller de frie konstantene i den partikulære løsningen finnes ved å sette inn den partikulære løsningen inn i differensialligningen. Ved å sammenligne venstre og høyre side vil konstanten(e) bli bestemt.

### 3\. Den totale løsningen er da summen av den homogene og den partikulære løsningen

$$y(t) = y_H(t) + y_P(t)$$

### 4\. Den frie konstanten i den homogene løsningen bestemmes slik at startbetingelsen oppfylles

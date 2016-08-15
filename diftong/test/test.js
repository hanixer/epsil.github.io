/* global describe, it */
describe('diftong.js', function () {
  describe('single()', function () {
    it('should produce regexp for matching single vocal', function () {
      single('e', false).should.equal('(^|[^aàáeèéêioòóôuüyæøå])([eèéê])($|[^aàáeèéêioòóôuüyæøå])')
    })
  })

  describe('translate()', function () {
    it('Bytt ut enkeltstående a-er og æ-er med åi.', function () {
      translate('Han har tæl.').should.equal('Håin håir tåil.')
    })

    it('Bytt ut enkeltstående e-er og i-er med ei.', function () {
      translate('Det er veldig lett.').should.equal('Deit eir veildeig leitt.')
    })

    it('Dersom e-stavelsen er den første av to eller flere e-stavelser, skal e-en byttes ut med øy.', function () {
      translate('Dette er lett.').should.equal('Døyttei eir leitt.')
    })

    it('Bytt ut enkeltstående o-er og u-er med ou.', function () {
      translate('Lutefisk er vondt.').should.equal('Louteifeisk eir voundt.')
    })

    it('Bytt ut enkeltstående y-er med øy.', function () {
      translate('Siste nytt.').should.equal('Seistei nøytt.')
    })

    it('Bytt ut enkeltstående å-er med ao.', function () {
      translate('Gå på!').should.equal('Gao pao!')
    })

    it('Dersom vokalen som byttes ut har aksent (eller et annet diakritisk tegn, som cirkumfleks eller tødler), og inngår i diftongen den byttes ut med, skal aksenten beholdes.', function () {
      translate('Jeg har en idé.').should.equal('Jeig håir ein eidéi.')
    })
  })
})

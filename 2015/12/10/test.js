var selenium = require('selenium-webdriver');
var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

before(function() {
  this.timeout(60000);
  this.driver = new selenium.Builder()
    .withCapabilities(selenium.Capabilities.chrome())
    .build();
  return this.driver.getWindowHandle();
});

after(function() {
  return this.driver.quit();
});

describe('Search field', function() {
  it('should clear when selected', function() {
    this.driver.get('http://...');
    var searchField = this.driver.findElement({ css: '#searchField' });
    searchField.click();
    return expect(searchField.getText()).to.eventually.equal('');
  });
});

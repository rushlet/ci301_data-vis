var chai = require('chai');
var functions = require('./functions-to-test.js');
var assert = chai.assert;

describe('Capitalize', function() {
  it('should capitalize the first letter of each word in a string', function() {
    var testString1 = "hello, my name is becky";
    var capitalisedString1 = functions.capitalize(testString1);
    var expectString1 = "Hello, My Name Is Becky";
    assert.equal(capitalisedString1, expectString1);
  });
});

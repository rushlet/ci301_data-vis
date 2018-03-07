var chai = require('chai');
var functions = require('./functions-to-test.js');
var assert = chai.assert;

describe('Capitalize', function() {
  it('should capitalize the first letter of each word in a string', function() {
    var testString = "hello, my name is becky";
    var capitalisedString = functions.capitalize(testString);
    var expectString = "Hello, My Name Is Becky";
    assert.equal(capitalisedString, expectString);
  });
  it('should capitalize the first letter of each word in a string, even if it starts with a bracket', function() {
    var testString = "(hello) my (name) is becky";
    var capitalisedString = functions.capitalize(testString);
    var expectString = "(Hello) My (Name) Is Becky";
    assert.equal(capitalisedString, expectString);
  });
  it('should capitalize the first letter of each word in a string, and the other letters should be lowercase', function() {
    var testString = "hELLo, my NAme Is bECKy";
    var capitalisedString = functions.capitalize(testString);
    var expectString = "Hello, My Name Is Becky";
    assert.equal(capitalisedString, expectString);
  });

});

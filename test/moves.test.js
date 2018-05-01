const makeMoves = require ("../moves");
const assert = require ("assert");
const _ = require ("lodash")

describe("makeMoves", function(){
  it("returns zero results for an empty input string", function(){
    assert.equal (makeMoves("").length, 0);
  });
  it("returns one result if all 9 characters are equal", function(){
    assert.equal (makeMoves("111111111").length, 1);
  });
  it("returns 15120 results if all 9 characters are different", function(){
    assert.equal (makeMoves("123456789").length, 15120);
  });
  it("all results are 5 characters long", function(){
    const result = makeMoves("123lru3rl");
    assert.ok(_.every(result, function(value) {
      return value.length === 5;
    }));
  });
});

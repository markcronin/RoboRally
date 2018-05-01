const _ = require("lodash");


// takes a string of 9 characters and returns all
// possible unique combintions of 5 characters
function makeMoves(avail) {
  let outputArr = [];
  function makeMovesRecursive(avail, moves) {
    if (moves.length === 5) {
      outputArr.push(moves);
      return;
    } else {
      for ( let x = 0; x < avail.length; x++) {
        let newMove = moves + avail[x];
        let newAvail = avail.slice(0,x) + avail.slice(x+1);
        makeMovesRecursive(newAvail, newMove);
      }
    }
  }
  makeMovesRecursive(avail, "");
//  console.log(_.uniq(outputArr).length + " unique combinations");
  return _.uniq(outputArr);
}

 //makeMoves("123456789");

module.exports = makeMoves;

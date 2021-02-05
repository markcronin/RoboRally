const board = require("./blankBoard");
const _ = require("lodash")


// sample input (board, [4,3], "flag1")

const foo = [4,3];
//console.log(foo)

//console.log(board[foo[0],foo[1]])
//console.log (board[foo])



function distToFlag(boardInput, flagPosition, flagElement) {
  let board = _.cloneDeep(boardInput);
  for ( x = 0; x < board.length; x++) {
    for ( y = 0; y < board[x].length; y++) {
      board[x][y][flagElement] = 99;
      if (board[x][y]["type"] === "pit") {
        board[x][y][flagElement] = 0;
      }
    }
  }
  let currentPosition = flagPosition
  let flagDistCounter = 0;
  function distToFlagRecursive(flagDistCounter, currentPosition, flagElement) {
    board[currentPosition[[1]]] [currentPosition[0]][flagElement] = flagDistCounter;
    flagDistCounter = flagDistCounter + 1;
    let northPosition = [currentPosition[[0]], currentPosition[1] - 1]
    if (board[currentPosition[[1]]] [currentPosition[0]]["north"] === false &&
        board[northPosition[[1]]] [northPosition[0]][flagElement] > flagDistCounter) {
      distToFlagRecursive(flagDistCounter, northPosition, flagElement)
    }
    let eastPosition = [currentPosition[[0]] + 1, currentPosition[1]]
    if (board[currentPosition[[1]]] [currentPosition[0]]["east"] === false &&
        board[eastPosition[[1]]] [eastPosition[0]][flagElement] > flagDistCounter) {
      distToFlagRecursive(flagDistCounter, eastPosition, flagElement)
    }
    let southPosition = [currentPosition[[0]], currentPosition[1] + 1]
    if (board[currentPosition[[1]]] [currentPosition[0]]["south"] === false &&
        board[southPosition[[1]]] [southPosition[0]][flagElement] > flagDistCounter) {
      distToFlagRecursive(flagDistCounter, southPosition, flagElement)
    }
    let westPosition = [currentPosition[[0]] - 1, currentPosition[1]]
    if (board[currentPosition[[1]]] [currentPosition[0]]["west"] === false &&
        board[westPosition[[1]]] [westPosition[0]][flagElement] > flagDistCounter) {
      distToFlagRecursive(flagDistCounter, westPosition, flagElement)
    }
  }
  distToFlagRecursive(flagDistCounter, currentPosition, "flag1")
  return board;
}

// console.log (distToFlag(board, [4,3], "flag1"))

const test = distToFlag(board, [9,10], "flag1")

function printBoard(board, field) {
  _.forEach(board, function(row) {
    const result = _.map(row, function(el) {
      return String(el[field]).padStart(2);
    });
    console.log(result.join('  '));
  });
}

printBoard(test, "flag1")

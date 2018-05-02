const _ = require("lodash");
const testBoard = require("./testBoard");
const squashBot = require("./robot");
const fiveSteps = require("./moveRobot5moves");
const makeMoves = require("./moves");

const testInput = "12312rrll"
const inputArr = makeMoves(testInput);

function heatMap(inputArr, robot, board) {
  let output = [];
  for (let x = 0; x < inputArr.length; x++) {
    let result = fiveSteps(robot, inputArr[x], board);
    result["inputLog"] = inputArr[x];
    output.push(result)
  }
  return output;
}

let outputArr = heatMap(inputArr, squashBot, testBoard);

console.log (outputArr)

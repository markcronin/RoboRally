const _ = require("lodash");
const testBoard = require("./testBoard");
const squashBot = require("./robot");
const fiveSteps = require("./moveRobot5moves");
const makeMoves = require("./moves");
const boardHeatMap = [
  [{pos: [0,0], freq: 0}, {pos: [1,0], freq: 0}, {pos: [2,0], freq: 0}, {pos: [3,0], freq: 0}, {pos: [4,0], freq: 0}, {pos: [5,0], freq: 0}],
  [{pos: [0,1], freq: 0}, {pos: [1,1], freq: 0}, {pos: [2,1], freq: 0}, {pos: [3,1], freq: 0}, {pos: [4,1], freq: 0}, {pos: [5,1], freq: 0}],
  [{pos: [0,2], freq: 0}, {pos: [1,2], freq: 0}, {pos: [2,2], freq: 0}, {pos: [3,2], freq: 0}, {pos: [4,2], freq: 0}, {pos: [5,2], freq: 0}],
  [{pos: [0,3], freq: 0}, {pos: [1,3], freq: 0}, {pos: [2,3], freq: 0}, {pos: [3,3], freq: 0}, {pos: [4,3], freq: 0}, {pos: [5,3], freq: 0}],
  [{pos: [0,4], freq: 0}, {pos: [1,4], freq: 0}, {pos: [2,4], freq: 0}, {pos: [3,4], freq: 0}, {pos: [4,4], freq: 0}, {pos: [5,4], freq: 0}],
  [{pos: [0,5], freq: 0}, {pos: [1,5], freq: 0}, {pos: [2,5], freq: 0}, {pos: [3,5], freq: 0}, {pos: [4,5], freq: 0}, {pos: [5,5], freq: 0}]
]

const testInput = "121u23rll"
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
let boardMap = _.cloneDeep(boardHeatMap);
for (x = 0; x < outputArr.length; x++){
  let currentObject = outputArr[x];
  boardMap[currentObject["position"][1]] [currentObject["position"][0]] ["freq"] += 1;
}

console.log (boardMap)



let arrFlag = [];
let arrDamage = [];
let arrDead = [];

for (x = 0; x < outputArr.length; x++){
  let currentObject = outputArr[x];
  if(currentObject.flags.flag1 === true) {
    arrFlag.push(currentObject);
  }
  if (currentObject.damage > 0) {
    arrDamage.push(currentObject);
  }
  if (currentObject.alive === false) {
    arrDead.push(currentObject);
  }
}


console.log(outputArr.length)

console.log(arrFlag.length);
console.log(arrFlag[0]);

console.log(arrDamage.length);
console.log(arrDamage[0]);

console.log(arrDead.length);
console.log(arrDead[0]);

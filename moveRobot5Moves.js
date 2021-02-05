const _ = require("lodash");
const moveRobotOneStep = require("./moveBot");
const testBoard = require("./testBoard");
const squashBot = require("./robot")
const encounterBoard = require("./encounterBoard")

function encounterWrench(robot, board) {
  let newBot = _.cloneDeep(robot);
  let boardPosition = board[ robot.position[1] ][ robot.position[0] ];
  if (boardPosition.wrench === true) {
    newBot.damage = newBot.damage - 1;
  }
  return newBot;
}

//const testInput = "111r1"

function fiveSteps(robot, cards, board) {
  let newBot = _.cloneDeep(robot);
  for ( x = 0; x < 5; x++) {
    if (newBot.alive === true) {
      newBot = moveRobotOneStep(newBot, cards[x], board);
      newBot = encounterBoard(newBot, board);
    } else {
      break;
    }
  }
  return encounterWrench(newBot, board);
}

//console.log (fiveSteps(squashBot, testInput, testBoard))

module.exports = fiveSteps;

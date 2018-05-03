const _ = require("lodash");
const testBoard = require("./testBoard")
const helpers = require("./utils/moveBotHelpers");
const squashBot = require("./robot")

function moveRobotOneStep(robot, move, board) {
  let newBot = _.cloneDeep(robot);
  for (let x = Math.abs(helpers.moveKey[move]); x > 0; x--) {
    if ( move === "l" || move === "r" || move === "u") {
      helpers.changeOrientation (newBot, move);
      continue;
    }
    if (helpers.blockedByWall (newBot, board)) {
      break;
    }
    helpers.changePosition(newBot, move);
    if (helpers.checkPit(newBot, board)) {
      break;
    }
  }
  return newBot;
}

//console.log (squashBot)
//console.log (moveRobotOneStep(squashBot, "l", testBoard))
//console.log (moveRobotOneStep(squashBot, 1, testBoard))

module.exports = moveRobotOneStep;

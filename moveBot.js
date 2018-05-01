const _ = require("lodash");
const testBoard = require("./testBoard")
const helpers = require("./utils/moveBotHelpers");

const squashBot = {
  name: 'Squash Bot',
  position: [0, 0],     // [x, y]
  orientation: 'east',
  flags: [false, false, false, false],
  damage: 0,
  alive: true
};

function moveRobotOneStep(robot, move, board) {
  let newBot = _.cloneDeep(robot);
  if (newBot.alive === false) {
    console.log ("you are dead");
    return newBot;
  }
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

console.log (squashBot)
//console.log (moveRobotOneStep(squashBot, "l", testBoard))
console.log (moveRobotOneStep(squashBot, 3, testBoard))

module.exports = moveRobotOneStep;

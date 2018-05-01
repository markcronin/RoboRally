const _ = require("lodash");
const testBoard = require("./testBoard")

const squashBot = {
  name: 'Squash Bot',
  position: [0, 0],     // [x, y]
  orientation: 'east',
  flags: [false, false, false, false],
  damage: 0,
  alive: true
};

const directions = ['north', 'east', 'south', 'west'];
const moveKey =  {b: -1, 1: 1, 2: 2, 3: 3, l: -1, r: 1, u: 2};
const moveValue = {b: -1, 1: 1, 2: 1, 3: 1, l: -1, r: 1, u: 1};

// changes the orientation of the robot, given the move (l, r, u)
function changeOrientation(robot, move) {
  let orientationIndex = _.indexOf(directions, robot.orientation) + moveValue[move];
  robot.orientation = directions[(orientationIndex + 4) % 4];
}

// changes the position of the robot, given the move (1, 2, 3, b)
function changePosition(robot, move) {
  if (robot.orientation === 'north') {
    robot.position[1] -= moveValue[move];
  } else if (robot.orientation === 'south') {
    robot.position[1] += moveValue[move];
  } else if (robot.orientation === 'east') {
    robot.position[0] += moveValue[move];
  } else {
    robot.position[0] -= moveValue[move];
  }
}

// returns whether or not the robot is blocked by a wall given
// its current position and orientation.
function blockedByWall(robot, board){
  let currentOrientation = robot.orientation;
  let currentSquare = board[ robot.position[1] ][ robot.position[0] ];
  return currentSquare[currentOrientation];
}

function checkPit(robot, board) {
  let currentSquare = board[ robot.position[1] ][ robot.position[0] ]
  if (currentSquare.type === "pit") {
    robot.alive = false;
  }
  //returns true if the robot dies
  return !robot.alive;
}


function moveRobotOneStep(robot, move, board) {
  let newBot = _.cloneDeep(robot);
  if (newBot.alive === false) {
    console.log ("you are dead");
    return newBot;
  }
  for (let x = Math.abs(moveKey[move]); x > 0; x--) {
    if ( move === "l" || move === "r" || move === "u") {
      changeOrientation (newBot, move);
      continue;
    }
    if (blockedByWall (newBot, board)) {
      break;
    }
    changePosition(newBot, move);
    if (checkPit(newBot, board)) {
      break;
    }
  }
  return newBot;
}

console.log (squashBot)
//console.log (moveRobotOneStep(squashBot, "l", testBoard))
console.log (moveRobotOneStep(squashBot, 3, testBoard))

module.exports = moveRobotOneStep;

const _ = require("lodash");
const testBoard = require("./testBoard");
const squashBot = require("./robot");

//handles left and right turners, also rotates bots on converyor belt corners
function encounterTurners(robot, board) {
  const directions = ['north', 'east', 'south', 'west'];
  let boardPosition = board[ robot.position[1]][ robot.position[0]];
  let orientationIndex = _.indexOf(directions, robot.orientation) + boardPosition.turner;
  robot.orientation = directions[(orientationIndex + 4) % 4];
  return robot;
}

// moves bots along bot regular and express belts
// based on hard coded sting input (see function encounterBoard)
function encounterConveyors(robot, board, conveyorType) {
  let boardPosition = board[ robot.position[1]][ robot.position[0]];
  encounterTurners(robot, board);
  robot.position = [robot.position[0] + boardPosition[conveyorType][0], robot.position[1] + boardPosition[conveyorType][1]];
  return robot;
}

function encounterLasers(robot, board) {
  let boardPosition = board[ robot.position[1]][ robot.position[0]];
  if (boardPosition.lasers === true) {
    robot.damage = robot.damage +1;
  }
  return robot;
}

function checkFlag(robot, board) {
  let boardPosition = board[ robot.position[1]][ robot.position[0]];
  if (robot.flags.flag1 === true){
    robot.distToNextFlag = boardPosition.flag2;
    if (robot.distToNextFlag === 0){
      robot.flags.flag2 = true;
    }
  } else {
    robot.distToNextFlag = boardPosition.flag1;
  }
  if (robot.distToNextFlag === 0) {
    robot.flags.flag1 = true;
  }
  return robot;
}

function checkPit(robot, board) {
  let boardPosition = board[ robot.position[1]][ robot.position[0]];
  if (boardPosition.type === "pit") {
    robot.alive = false;
  }
  //returns true if the robot dies
  return !robot.alive;
}

function encounterBoard(robot, board) {
  let newBot = _.cloneDeep(robot);
  if (robot.detect.conveyors === true && robot.errorMargin < Math.random()) {
    newbot = encounterConveyors(newBot, board, "expressConveyor");
    newbot = encounterConveyors(newBot, board, "conveyor");
  }
  if (checkPit(newBot, board) === true) {
    return newBot;
  }
  if (robot.detect.turners === true && robot.errorMargin < Math.random()) {
    newbot = encounterTurners(newBot, board);
  }
  if (robot.detect.lasers === true && robot.errorMargin < Math.random()) {
  newBot = encounterLasers(newBot, board);
  }
  newBot = checkFlag(newBot, board)
  return newBot;
}

module.exports = encounterBoard;

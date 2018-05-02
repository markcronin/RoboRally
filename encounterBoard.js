const _ = require("lodash");
//const moveRobotOneStep = require("./moveBot");
//const moveRobot5Moves = require("./moveRobot5Moves")
const testBoard = require("./testBoard");
const squashBot = require("./robot");

const directions = ['north', 'east', 'south', 'west'];

const robot = {
  name: 'Squash Bot',
  position: [3, 1],     // [x, y]
  orientation: 'east',
  flags: {flag1: false, flag2: false},
  detect: {lasers: true, turners: true, conveyors: true},
  distToNextFlag: 100,
  damage: 5,
  alive: true
};


function encounterExpressConveyors(robot, board) {
  let newBot = _.cloneDeep(robot);
  let boardPosition = board[ newBot.position[1] ][ newBot.position[0] ];
  let orientationIndex = _.indexOf(directions, newBot.orientation) + boardPosition.turner;
  newBot.orientation = directions[(orientationIndex + 4) % 4];
  newBot.position = [newBot.position[0] + boardPosition.expressConveyor[0], newBot.position[1] + boardPosition.expressConveyor[1]];
  return newBot;
}


function encounterConveyors(robot, board) {
  let newBot = _.cloneDeep(robot);
  let boardPosition = board[ newBot.position[1] ][ newBot.position[0] ];
  let orientationIndex = _.indexOf(directions, newBot.orientation) + boardPosition.turner;
  newBot.orientation = directions[(orientationIndex + 4) % 4];
  newBot.position = [newBot.position[0] + boardPosition.conveyor[0], newBot.position[1] + boardPosition.conveyor[1]];
  return newBot;
}


function encounterTurners(robot, board) {
  let newBot = _.cloneDeep(robot);
  let boardPosition = board[ newBot.position[1] ][ newBot.position[0] ];
  let orientationIndex = _.indexOf(directions, newBot.orientation) + boardPosition.turner;
  newBot.orientation = directions[(orientationIndex + 4) % 4];
  return newBot;
}


function encounterWrench(robot, board) {
  let newBot = _.cloneDeep(robot);
  let boardPosition = board[ robot.position[1] ][ robot.position[0] ];
  if (boardPosition.wrench === true) {
    newBot.damage = newBot.damage - 1;
  }
  return newBot;
}

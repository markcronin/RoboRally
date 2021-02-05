const _ = require("lodash");
const testBoard = require("./RoboRallyBoard4");
const helpers = require("./utils/moveBotHelpers");
const encounterBoard = require("./encounterBoard");
const deck = require("./deck");
const dealCards = require("./shuffle")
const playerDamage = [9, 9, 9, 9, 9, 9, 9, 9];

// takes a string of 9 characters and returns all
// possible unique combintions of 5 characters
// locked cards should be a string input of any cards locked in a register
// because of damage sustained by the bot. The string will be added to the end
// of the string created by makeMovesRecursive
function makeMoves(avail, lockedCards) {
  let outputArr = [];
  function makeMovesRecursive(avail, moves) {
    if (moves.length === 5 - lockedCards.length) {
      outputArr.push(moves + lockedCards);
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
  return _.uniq(outputArr);
}

let shuffle = _.shuffle(deck);
let cards = dealCards(shuffle, 1, playerDamage);

let inputArr = makeMoves("11123uulr", "");
//let inputArr = makeMoves(cards[0], "");

const robot = {
  name: 'Squash Bot',
    position: [ 9, 11 ],
    orientation: 'south',
    flags: [ true, true, true, false ],
    detect: { lasers: true, turners: true, conveyors: true },
    errorMargin: 0,
    distToNextFlag: 1,
    damage: 0,
    damageThreshold: 5,
    alive: true,
    inputLog: 'rr131'
};


function checkFlag(robot, board) {
 let boardPosition = board[ robot.position[1]][ robot.position[0]];
 let flagsCrossed = _.indexOf(robot.flags, false);
 if (flagsCrossed === 3) {
   robot.distToNextFlag = boardPosition.flag4;
   if (robot.distToNextFlag === 0){
     robot.flags[flagsCrossed] = true;
   }
 }
 if (flagsCrossed === 2) {
   robot.distToNextFlag = boardPosition.flag3;
   if (robot.distToNextFlag === 0){
     robot.flags[flagsCrossed] = true;
     robot.distToNextFlag = boardPosition.flag4;
   }
 }
 if (flagsCrossed === 1) {
   robot.distToNextFlag = boardPosition.flag2;
   if (robot.distToNextFlag === 0){
     robot.flags[flagsCrossed] = true;
     robot.distToNextFlag = boardPosition.flag3;
   }
 }
 if (flagsCrossed === 0) {
   robot.distToNextFlag = boardPosition.flag1;
   if (robot.distToNextFlag === 0){
     robot.flags[flagsCrossed] = true;
     robot.distToNextFlag = boardPosition.flag2;
   }
 }
 return robot;
}
function encounterWrench(robot, board) {
   let newBot = _.cloneDeep(robot);
   let boardPosition = board[ robot.position[1] ][ robot.position[0] ];
   if (boardPosition.wrench === true && robot.damage > 0) {
     newBot.damage = newBot.damage - 1;
   }
   return newBot;
 }
function moveRobotOneStep(robot, move, board) {
   let newBot = _.cloneDeep(robot);
   for (let x = Math.abs(helpers.moveKey[move]); x > 0; x--) {
     if ( move === "l" || move === "r" || move === "u") {
       helpers.changeOrientation (newBot, move);
       continue;
     }
     if (helpers.blockedByWall (newBot, board, move)) {
       break;
     }
     helpers.changePosition(newBot, move);
     if (helpers.checkPit(newBot, board)) {
       break;
     }
   }
   return newBot;
 }
function fiveSteps(robot, cards, board) {
   let newBot = _.cloneDeep(robot);
   for ( x = 0; x < 5; x++) {
     if (newBot.alive === true) {
       newBot = moveRobotOneStep(newBot, cards[x], board);
       //console.log(newBot.position + "  " + newBot.orientation)
       newBot = encounterBoard(newBot, board);
       //console.log(newBot.position + "  " + newBot.orientation + "\n")
     } else {
       break;
     }
   }
   return newBot;
 }
function heatMap(inputArr, robot, board) {
   let output = [];
   for (let x = 0; x < inputArr.length; x++) {
     let result = fiveSteps(robot, inputArr[x], board);
     result["inputLog"] = inputArr[x];
     output.push(result)
   }
   return output;
 }

let allMovesArr = heatMap(inputArr, robot, testBoard);

function bestMove (inputArr, robot) {
  let arrFlag = [];
  let arrWrench = []
  let arrDead = [];
  let arrRest = []
  for (x = 0; x < inputArr.length; x++){
    let currentSimulation = inputArr[x];
    if(_.indexOf(currentSimulation.flags, false) > _.indexOf(robot.flags, false)) {
      arrFlag.push(currentSimulation);
    }
    if (currentSimulation.damage < robot.damage) {
      arrWrench.push(currentSimulation);
    }
    if (currentSimulation.alive === false) {
      arrDead.push(currentSimulation);
    } else {
      arrRest.push(currentSimulation)
    }
  }
  const sortedFlag = _.sortBy(arrFlag, ["distToNextFlag", "damage"]);
  if (sortedFlag.length > 0) {
    console.log("\n\nI'm going for the flag!\n\n");
    return sortedFlag[0];
  }
  const sortedWrench = _.sortBy(arrWrench, ["damage", "distToNextFlag"]);
  if (robot.damage > robot.damageThreshold && arrWrench.length > 0) {
    console.log ("\n\nI need to repair myself\n\n");
    return arrWrench[0];
  }
  const sortedRest = _.sortBy(arrRest, ["distToNextFlag", "damage"]);
  if (sortedRest.length === 0){
    console.log("\n\nCrap! I think I'm going to die!\n\n");
    return arrDead[0]
  } else {
    console.log ("\n\nThis will have to do\n\n")
    return sortedRest[0];
  }
}

console.log("====================================================")
console.log(bestMove(allMovesArr, robot))
console.log ("\n\n")

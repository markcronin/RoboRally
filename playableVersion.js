const _ = require("lodash");
const testBoard = require("./roboRallyBoard");
const helpers = require("./utils/moveBotHelpers");
const encounterBoard = require("./encounterBoard")

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

let inputArr = makeMoves("11223rlrl", "");

const robot = { name: 'Squash Bot',
  position: [ 8, 4 ],
  orientation: 'west',
  flags: [ true, false, false, false ],
  detect: { lasers: true, turners: true, conveyors: true },
  errorMargin: 0,
  distToNextFlag: 11,
  damage: -1,
  damageThreshold: 3,
  alive: true,
  inputLog: '11223' };


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
   if (boardPosition.wrench === true) {
     newBot.damage = newBot.damage - 1;
     if (newBot.damage < 0) {
       newBot.damage = 0;
     }
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
       console.log(newBot.position + "  " + newBot.orientation)
       newBot = encounterBoard(newBot, board);
       console.log(newBot.position + "  " + newBot.orientation + "\n")
     } else {
       break;
     }
   }
   return encounterWrench(newBot, board);
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
  const sortedRest = _.sortBy(arrRest, ["distToNextFlag", "damage"]);
  const sortedFlag = _.sortBy(arrFlag, ["damage"]);
  if (robot.damage > robot.damageThreshold &&
      arrWrench.length > 0 &&
      Math.random() > (_.indexOf(robot.flags, false) * 0.2) + 0.2) {
    console.log ("\n\nI need to repair myself\n\n");
    return arrWrench[Math.floor(Math.random() * arrWrench.length)];
  }
  if (arrFlag.length > 0) {
    console.log("\n\nI'm going for the flag!\n\n");
    return sortedFlag[0];
  }
  if (sortedRest.length === 0){
    console.log("\n\nCrap! I think I'm going to die!\n\n");
    return arrDead[0]
  } else {
    console.log ("\n\nThis will have to do\n\n")
    return sortedRest[0];
  }
}

console.log("====================================================")
let newPosition = (bestMove(allMovesArr, robot));
console.log(fiveSteps(robot, newPosition.inputLog, testBoard));
console.log ("")
console.log(bestMove(allMovesArr, robot))

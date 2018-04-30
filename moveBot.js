const _ = require("lodash");
const testBoard = require("./testBoard")

const squashBot = {
  name: 'Squash Bot',
  position: [3, 0],     // [x, y]
  orientation: 'east',
  alive: true
};


function moveRobotOneStep(robot, move, board) {
  let newBot = _.cloneDeep(robot);
  const directions = ['north', 'east', 'south', 'west'];
  const moveKey =  {b: -1, 1: 1, 2: 2, 3: 3, l: -1, r: 1, u: 2};
  const moveKey2 = {b: -1, 1: 1, 1: 1, 3: 1, l: -1, r: 1, u: 1};
  // checks to see if the bot is still alive
  if (newBot.alive === false) {
    console.log ("you are dead");
    return newBot;
  } else {
    // for loop steps the bot though each square on the board
    // instead of just teleporting to the final destination
    for (let x = Math.abs(moveKey[move]); x > 0; x--) {
      // "l" and "r" handle left and right rotations
      // "u" handles 180 degree U-turns
      if ( move === "l" || move === "r" || move === "u") {
        let y = _.indexOf(directions, newBot.orientation) + moveKey2[move];
        newBot.orientation = directions[y % 4];
      } else {
        // checks to see if there is a wall blocking the way
        // breaks the loop before moving the bot if there is
        let currentOrientation = newBot.orientation
        let currentSqaure = testBoard[ newBot.position[1] ][ newBot.position[0] ]
        if (currentSqaure[currentOrientation] === true){
          console.log ("you bumped into a wall");
          break;
        } else {
          // steps the bot forward (1,2,3) or backwards (b)
          // based on its orientation
          if (newBot.orientation === 'north') {
            newBot.position[1] -= moveKey2[move];
          } else if (newBot.orientation === 'south') {
            newBot.position[1] += moveKey2[move];
          } else if (newBot.orientation === 'east') {
            newBot.position[0] += moveKey2[move];
          } else {
            newBot.position[0] -= moveKey2[move];
          }
          // checks to see if the new destination square is a position
          // kills the bot and breaks the current loop
          let currentSqaure = testBoard[newBot.position[1]][newBot.position[0]]
          if (currentSqaure.type === "pit") {
            newBot.alive = false;
            console.log ("you died");
            break;
          } else {
            // logs each sqaure the bot encounrters as it travels
            console.log (newBot.position);
          }
        }
      }
    }
  }
  return newBot;
}

console.log (squashBot)
//console.log (moveRobotOneStep(squashBot, "l", testBoard))
console.log (moveRobotOneStep(squashBot, 3, testBoard))

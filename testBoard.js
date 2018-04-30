const testBoard = [
  [
    {position: [0,0], type: "floor",  north: true,  east: false,  south: false, west: true},
    {position: [1,0], type: "floor",  north: true,  east: false,  south: false, west: false},
    {position: [2,0], type: "floor",  north: true,  east: false,  south: false, west: false},
    {position: [3,0], type: "floor",  north: true,  east: false,  south: false, west: false},
    {position: [4,0], type: "floor",  north: true,  east: false,  south: false, west: false},
    {position: [5,0], type: "pit",    north: true,  east: true,   south: false, west: false}
  ], [
    {position: [0,1], type: "floor",  north: false,  east: false,  south: false, west: true},
    {position: [1,1], type: "floor",  north: false,  east: false,  south: false, west: false},
    {position: [2,1], type: "floor",  north: false,  east: false,  south: true,  west: false},
    {position: [3,1], type: "floor",  north: false,  east: false,  south: true,  west: false},
    {position: [4,1], type: "floor",  north: false,  east: false,  south: false, west: false},
    {position: [5,1], type: "floor",  north: false,  east: true,   south: false, west: false}
  ], [
    {position: [0,2], type: "floor",  north: false,  east: false,  south: false, west: true},
    {position: [1,2], type: "floor",  north: false,  east: true,   south: false, west: false},
    {position: [2,2], type: "floor",  north: true,   east: false,  south: false, west: true},
    {position: [3,2], type: "floor",  north: true,   east: false,  south: false, west: false},
    {position: [4,2], type: "floor",  north: false,  east: false,  south: false, west: false},
    {position: [5,2], type: "floor",  north: false,  east: true,   south: false, west: false}
  ], [
    {position: [0,3], type: "floor",  north: false,  east: false,  south: false, west: true},
    {position: [1,3], type: "floor",  north: false,  east: true,   south: false, west: false},
    {position: [2,3], type: "floor",  north: true,   east: false,  south: false, west: true},
    {position: [3,3], type: "floor",  north: true,   east: false,  south: false, west: false},
    {position: [3,3], type: "floor",  north: false,  east: false,  south: false, west: false},
    {position: [5,3], type: "floor",  north: false,  east: true,   south: false, west: false}
  ], [
    {position: [0,4], type: "floor",  north: false,  east: false,  south: false, west: true},
    {position: [1,4], type: "floor",  north: false,  east: false,  south: false, west: false},
    {position: [2,4], type: "floor",  north: false,  east: false,  south: false, west: false},
    {position: [3,4], type: "floor",  north: false,  east: true,   south: false, west: false},
    {position: [4,4], type: "floor",  north: true,   east: false,  south: false, west: true},
    {position: [5,4], type: "floor",  north: false,  east: true,   south: false, west: false}
  ], [
    {position: [0,5], type: "floor",    north: false,  east: false,  south: true, west: true},
    {position: [1,5], type: "floor",  north: false,  east: false,  south: true, west: false},
    {position: [2,5], type: "floor",  north: false,  east: false,  south: true, west: false},
    {position: [3,5], type: "floor",  north: false,  east: false,  south: true, west: false},
    {position: [4,5], type: "floor",  north: false,  east: false,  south: true, west: false},
    {position: [5,5], type: "floor",  north: false,  east: true,   south: true, west: false}
  ]
];

const _ = require("lodash");

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

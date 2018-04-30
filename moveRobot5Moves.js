const _ = require("lodash");
const moveRobotOneStep = require("./moveBot");
const testBoard = require("./testBoard");
const dealCards = require("./shuffle");
const deck = require("./deck");
const makeMoves = require("./moves");

const squashBot = {
  name: 'Squash Bot',
  position: [0, 0],     // [x, y]
  orientation: 'east',
  alive: true
};

const playerDamage = [9, 9, 9, 9, 8, 7, 6, 5]; // amount of cards to be dealt
const shuffledDeck = _.shuffle(deck);

const cardsAvailable = dealCards(shuffledDeck, 1, playerDamage)[0]
//const cardsAvailable = "22l23rr2u"

console.log (cardsAvailable)

const movesTable = makeMoves(cardsAvailable)

console.log (movesTable.length)

const testInput = "1r2l3"

function fiveSteps(robot, cards, board) {
  let newBot = _.cloneDeep(robot);
  for ( x = 1; x < 5; x++) {
    let newBot = moveRobotOneStep(robot, cards[x], board);
    console.log (newBot)
  }
}

console.log (fiveSteps(squashBot, testInput, testBoard))

/*

function fiveSteps(movesTable, robot, board) {
  let output = [];
  let newBot = _.cloneDeep(robot);
  for ( x = 0; x < movesTable.length; x++) {
    for ( y = 0; y < 5; y++) {
      newBot = moveRobotOneStep(newBot, movesTable[0][y], board)
    }
    output.push(newBot)
  }
}

const foo = fiveSteps(movesTable, squashBot, testBoard)

*/

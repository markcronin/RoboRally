const _ = require("lodash");
const moveRobotOneStep = require("./moveBot");
const testBoard = require("./testBoard");
const dealCards = require("./shuffle");
const deck = require("./deck");
const makeMoves = require("./moves");
const squashBot = require("./robot")


const playerDamage = [9, 9, 9, 9, 8, 7, 6, 5]; // amount of cards to be dealt
const shuffledDeck = _.shuffle(deck);

const cardsAvailable = dealCards(shuffledDeck, 1, playerDamage)[0]
//const cardsAvailable = "22l23rr2u"
console.log (cardsAvailable)

const movesTable = makeMoves(cardsAvailable)
console.log (movesTable.length)

const testInput = "23rl1"

function fiveSteps(robot, cards, board) {
  let newBot = _.cloneDeep(robot);
  for ( x = 0; x < 5; x++) {
    newBot = moveRobotOneStep(newBot, cards[x], board);
    console.log (newBot)
  }
  return newBot;
}

console.log (fiveSteps(squashBot, testInput, testBoard))

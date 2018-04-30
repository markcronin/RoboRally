const _ = require("lodash");

const deck = [
  "l", "l", "l", "l", "l", "l", "l", "l", "l",
  "l", "l", "l", "l", "l", "l", "l", "l", "l",
  "r", "r", "r", "r", "r", "r", "r", "r", "r",
  "r", "r", "r", "r", "r", "r", "r", "r", "r",
  "u", "u", "u", "u", "u", "u",
  "1", "1", "1", "1", "1", "1", "1", "1", "1",
  "1", "1", "1", "1", "1", "1", "1", "1", "1",
  "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2", "2",
  "3", "3", "3", "3", "3", "3",
  "b", "b", "b", "b", "b", "b"
];

// Cards in deck (left 18, right 18, uturn 6, move1: 18, move2: 12, move3: 6, back1: 6)


const shuffledDeck = _.shuffle(deck);

const playerDamage = [9, 9, 9, 9, 8, 7, 6, 5]; // amount of cards to be dealt

function dealCards(deck, numPlayers, damage) {
  const players = ["", "", "", "", "", "", "", ""];
  for ( x = 1; x < 10; x++) {
     for ( y = 0; y < numPlayers; y++) {
       if (damage[y] > 0) {
       players[y] += deck[0];
       damage[y] = damage[y] -1;
       deck.shift();
     } else {
       continue;
     }
     }
   }
   return players
}

console.log (dealCards(shuffledDeck, 8, playerDamage));

module.exports = dealCards;

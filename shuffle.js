const _ = require("lodash");
const deck = require("./deck")


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

// console.log (dealCards(shuffledDeck, 8, playerDamage));

module.exports = dealCards;

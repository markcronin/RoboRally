const botPos = [3, 5];
const targetPos = [8, -1];

function manhattenDistance(botCoord, targetCoord) {
  return (Math.abs(botCoord[0] - targetCoord[0])) + (Math.abs(botCoord[1] - targetCoord[1]))
}

console.log(manhattenDistance(botPos,targetPos));

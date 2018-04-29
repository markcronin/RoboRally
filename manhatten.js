const botPos = [3, 5];
const targetPos = [8, -1];

function manhattenDistance(botCoord, targetCoord) {
  return (Math.abs(botPos[0] - targetPos[0])) + (Math.abs(botPos[1] - targetPos[1]))
}

console.log(manhattenDistance(botPos,targetPos))

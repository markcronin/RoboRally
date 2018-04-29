const botPos = [3, 5];
const targetPos = [8, -1];

function manhattenDistance(botCoord, targetCoord) {
  let xAxis = botCoord[0] < targetCoord[0] ?
              (targetCoord[0] - botCoord[0]) : (botCoord[0] - targetCoord[0]);
  let yAxis = botCoord[1] < targetCoord[1] ?
              (targetCoord[1] - botCoord[1]) : (botCoord[1] - targetCoord[1]);
  return xAxis + yAxis
}

console.log(manhattenDistance(botPos,targetPos))

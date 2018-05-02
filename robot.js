const robot = {
  name: 'Squash Bot',
  position: [0, 0],     // [x, y]
  orientation: 'east',
  flags: {flag1: false, flag2: false},
  detect: {lasers: true, turners: true, conveyors: true},
  errorMargin: 0.0,
  distToNextFlag: 100,
  damage: 0,
  alive: true
};

module.exports = robot;


//console.log (Math.random())

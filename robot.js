const robot = {
   name: 'Squash Bot',
   position: [4, 4],     // [x, y]
   orientation: 'east',
   flags: [false, false, false, false],
   detect: {lasers: true, turners: true, conveyors: true},
   errorMargin: 0.0,
   distToNextFlag: 100,
   damage: 0,
   damageThreshold: 3,
   lockedCards: "",
   alive: true
};

module.exports = robot;

const helpers = require('../utils/moveBotHelpers');
const testBoard = require('../testBoard');
const _ = require('lodash');
const assert = require('assert');

const testBot = {
  name: 'Test Bot',
  position: [3, 4],     // [x, y]
  orientation: 'east',
  flags: [false, false, false, false],
  damage: 0,
  alive: true
};

describe('moveBotHelpers', function() {
  describe('changeOrientation', function() {
    it('moves the robot clockwise on move "l"', function() {
      const cloneBot = _.cloneDeep(testBot);
      helpers.changeOrientation(cloneBot, 'l');
      assert.equal(cloneBot.orientation, 'north');
    });
    it('moves the robot counter-clockwise on move "r"', function() {
      const cloneBot = _.cloneDeep(testBot);
      helpers.changeOrientation(cloneBot, 'r');
      assert.equal(cloneBot.orientation, 'south');
    });
    it('move the robot counter-clockwise on move "u"', function() {
      const cloneBot = _.cloneDeep(testBot);
      helpers.changeOrientation(cloneBot, 'u');
      assert.equal(cloneBot.orientation, 'south');
    });

    it('makes a u-turn when calling it twice with move "u"', function() {
      const cloneBot = _.cloneDeep(testBot);
      helpers.changeOrientation(cloneBot, 'u');
      helpers.changeOrientation(cloneBot, 'u');
      assert.equal(cloneBot.orientation, 'west');
    });
  });
  describe('changePosition', function() {
    it('does the right thing when ...');
  });
});

const Grid = require('../Grid');

describe('Grid', function() {

  it('should initialize with proper arguments', function() {
    let states = [[]];
    let values = [[]];
    let run = function() {
      new Grid(states, values);
    };
    expect(run).not.toThrow();
  });

});


// module.exports = (function() {
//
//   try {
//
//     let grid = new Grid([[]], [[]]);
//     if (!grid.states) throw new Error('states does not get initialized');
//     if (!grid.values) throw new Error('values does not get initialized');
//
//   } catch (e) {
//     console.error('FAIL:', e);
//   } finally {
//     console.info('YES - Grid Construction');
//   }
//
//
//
//   try {
//
//     let grid = new Grid([[]], [[]]);
//     if (!grid.states) throw new Error('states does not get initialized');
//     if (!grid.values) throw new Error('values does not get initialized');
//
//   } catch (e) {
//     console.error('FAIL:', e);
//   } finally {
//     console.info('YES - Grid Construction');
//   }
//
// });

const {Game, CellDisplay, CellState, MINE, calculateCellValues} = require('../Game'),
  {Coords} = require('../Coords'),
  {Grid, seedMatrix} = require('../Grid');


describe('Game', function() {
  let game, gameState;
  let values_mtx, states_mtx;
  let values, states;

  // PASSING
  xdescribe('is constructed with a GameState object', function() {
    beforeEach(function() {
      values_mtx = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ];
      let C = CellState.Covered;
      states_mtx = seedMatrix({width: values_mtx[0].length, height: values_mtx.length}, CellState.Covered);
      values = new Grid(values_mtx);
      states = new Grid(states_mtx);
      gameState = {values, states};
      game = new Game(gameState);
    });
    it('should have a width', function() {
      expect(game.width).toEqual(values_mtx[0].length);
    });
    it('should have a height', function() {
      expect(game.height).toEqual(values_mtx.length);
    });
    it('should have a display grid', function () {
      expect(game.displayGrid instanceof Grid).toBe(true);
    });

    it('should be able to be initialized with flags', function() {
      pending('Need to implement tests for different constructions of Game');
    });
    it('should not be able to be initialized with incorrect values', function() {
      pending('Need to implement tests for different constructions of Game');
    });

    // only when .generate()'d
    it('should have a display grid with each cell initialized `Covered`', function() {
      pending('This test should be moved to Game.generate()');
      game.displayGrid.forEach((cell, x, y) => {
        expect(cell).toEqual(CellDisplay.Covered);
      });
    });
  });

  describe('allows user to uncover cells', function() {
    
    beforeEach(function() {
      values_mtx = [
        [0, 0, 1, MINE],
        [1, 1, 2, 1],
        [1, MINE, 1, 0],
        [1, 1, 1, 0]
      ];
      values = new Grid(values_mtx);
      states_mtx = seedMatrix({width: values.width, height: values.height}, CellState.Covered);
      states = new Grid(states_mtx);
      game = new Game({values, states});
    });

    xdescribe('when the cell is already uncovered', function() {
      xit('should not update display grid', function() {

      });
    });


    describe('when not uncovering mine', function() {
      let expected_display;
      beforeEach(function() {
        let C = CellDisplay.Covered;
        let U = CellDisplay.Uncovered;
        // uncover a non-mine cell
        game.uncover(1,0);
        // expect display grid to look like:
        expected_display = new Grid([
          [U, U, 1, C],
          [1, 1, 2, C],
          [C, C, C, C],
          [C, C, C, C]
        ]);
      });

      it('should uncover appropriate cells', function() {
        expect(Grid.equal(game.displayGrid, expected_display)).toBe(true);
      });
    });
    describe('when uncovering mine', function() {
      let expected_display;
      beforeEach(function() {
        let C = CellDisplay.Covered;
        let U = CellDisplay.Uncovered;
        let T = CellDisplay.Triggered;
        let M = CellDisplay.Mine;
        // uncover a non-mine cell
        game.uncover(3,0);
        // expect display grid to look like:
        expected_display = new Grid([
          [C, C, C, T],
          [C, C, C, C],
          [C, M, C, C],
          [C, C, C, C]
        ]);
      });
      it('should uncover appropriate cells', function() {
        expect(Grid.equal(game.displayGrid, expected_display)).toBe(true);
      });
    });
  });





  describe('allows user to flag cells', function() {

    let beforeFlagCount;

    beforeEach(function() {
      values_mtx = [
        [1, 1],
        [1, MINE]
      ];
      values = new Grid(values_mtx);
      states_mtx = seedMatrix({width: values.width, height: values.height}, CellState.Covered);
      states = new Grid(states_mtx);
      game = new Game({values, states});
    });
    it('should keep a count of remaining flags', function() {
      expect(game.remainingFlags).toBeDefined();
    });
    describe('when a cell is not yet flagged', function() {

      beforeEach(function() {
        beforeFlagCount = game.remainingFlags;
        // flag a covered cell
        game.flag(0,0);
      });
      it('should set cell state to Flagged', function() {
        expect(game.displayGrid.get(0,0)).toEqual(CellDisplay.Flagged);
      });
      it('should decrement count of remaining flags', function() {
        expect(game.remainingFlags).toEqual(beforeFlagCount - 1);
      });
    });
    describe('when a cell is already flagged', function() {
      beforeEach(function() {
        // flag a covered cell
        game.flag(0,0);
        beforeFlagCount = game.remainingFlags;
        // re-flag that same cell
        game.flag(0,0);
      });
      it('should set cell state to Covered', function() {
        expect(game.displayGrid.get(0,0)).toEqual(CellDisplay.Covered);
      });
      it('should increment count of remaining flags', function() {
        expect(game.remainingFlags).toEqual(beforeFlagCount + 1);
      });
    });
    describe('when a cell is uncovered', function() {
      let beforeDisplay;
      beforeEach(function() {
        // uncover a cell
        game.uncover(0,0);
        beforeDisplay = game.displayGrid.get(0,0);
        beforeFlagCount = game.remainingFlags;
        // re-flag that same cell
        game.flag(0,0);
      });
      it('should not update display grid', function() {
        expect(game.displayGrid.get(0,0)).toEqual(beforeDisplay);
      });
      it('should not change count of remaining flags', function() {
        expect(game.remainingFlags).toEqual(beforeFlagCount);
      });
    });
  });

});


describe('calculateCellValues()', () => {

  let values;
  let grid;

  describe('should not throw when updating edge cells', () => {
    let size = {width: 3, height: 3};

    it('x less than 0', () => {
      expect(() => calculateCellValues(size, [new Coords(0,1)])).not.toThrow();
    });
    it('x greather than width of grid', () => {
      expect(() => calculateCellValues(size, [new Coords(size.width-1, 1)])).not.toThrow();
    });
    it('y less than 0', () => {
      expect(() => calculateCellValues(size, [new Coords(1,0)])).not.toThrow();
    });
    it('y greather than height of grid', () => {
      expect(() => calculateCellValues(size, [new Coords(1, size.height-1)])).not.toThrow();
    });
  });



  describe('should increment the cells adjacent to mine', () => {
    let size = {width: 3, height: 3};
    let expected, result;

    beforeEach(() => {
      expected = [
        [MINE, 2, 0],
        [MINE, 3, 1],
        [1, 2, MINE]
      ];
      result = calculateCellValues(size, [
        new Coords(0,0), new Coords(0,1), new Coords(2,2)]);
    });

    it('by 1', () => {
      for (let i = 0; i < expected.length; i++) {
        let row = expected[i];
        for (let j = 0; i < row.length; i++) {
          expect(result[i][j]).toEqual(expected[i][j]);
        }
      }
    });
  });

});

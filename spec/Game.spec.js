const {Game, CellDisplay, CellState, MINE, calculateCellValues} = require('../Game'),
  {Coords} = require('../Coords'),
  {Grid, seedMatrix} = require('../Grid');


describe('Game', function() {
  let game, gameState;
  let values_mtx, states_mtx;
  let values, states;

  describe('is constructed with a GameState object', function() {
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
    it('should have a display grid with each cell initialized `Covered`', function() {
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

    describe('when the cell is already uncovered', function() {
      xit('should not update display grid', function() {

      });
    });
    describe('when not uncovering mine', function() {
      let expected_display;
      beforeEach(function() {
        let C = CellDisplay.Covered;
        let U = CellDisplay.Uncovered;
        // uncover a non-mine cell
        game.uncover(0,1);
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
    xit('should keep a count of remaining flags', function() {

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
        // flag a covered cell
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




xdescribe('Game', () => {

  let width, height, num_mines, game;
  beforeEach(() => {
    width = 10,
    height = 10,
    num_mines = 10;
    game = new Game(width, height, num_mines);
  });

  describe('starts', () => {
    it('given the width, height, and number of mines to generate', () => {
      expect(game).toBeDefined();
    });
  });

  it('should return number of mines', () => {
    expect(game.numMines).toEqual(num_mines);
  });
  it('should return width', () => {
    expect(game.width).toEqual(width);
  });
  it('should return height', () => {
    expect(game.height).toEqual(height);
  });

  describe('tracks flags', () => {
    describe('when game is initialized', () => {
      it('should have number of flags remaining equal to number of mines', () => {
        expect(game.flagsRemaining).toEqual(num_mines)
      });
      it('should have 0 flags', () => {
        expect(game.flags.length).toBe(0);
      });
    });

    describe('after a cell is flagged', () => {
      let before, x = 0, y = 0;
      beforeEach(() => {
        // store before value
        before = game.flagsRemaining;
        // flag cell
        game.flagCell(x, y);
      });
      it('should decrement value', () => {
        expect(game.flagsRemaining).toEqual(before - 1);
      });
    });

    describe('after a cell is unflagged', () => {
      let before, x = 0, y = 0;
      beforeEach(() => {
        // flag cell first
        game.flagCell(x, y);
        // store before value
        before = game.flagsRemaining;
        // unflag same cell
        game.flagCell(x, y);
      });
      it('should increment value', () => {
        expect(game.flagsRemaining).toEqual(before + 1);
      });
    });

    xdescribe('when attempting to flag an unflagged cell with 0 flags remaining', () => {
      xit('should not decrement value', () => {});
    });
  });

  describe('maintains cell display matrix', () => {
    describe('when game initialized', () => {
      it('should be the correct size', () => {
        // expect correct height
        expect(game.cellDisplays.length).toEqual(height);
        game.cellDisplays.forEach((row) => {
          // expect corrrent width
          expect(row.length).toEqual(width);
        });
      });
    });
  });

  describe('toString()', () => {
    let rowSeparator = '\n';
    let itemSeparator = ' ';
    let result, result_values;
    beforeEach(() => {
      result = game.toString();
      result_values = result.split(rowSeparator).map((row_str) => row_str.split(itemSeparator));
    });

    it('should output each row separated by a new-line character', () => {
      // expect length array returned when split result string by '\n' to equal height of grid
      expect(result_values.length).toEqual(game.height);
    });

    it('should output each item in a row separated by a space', () => {
      // for each row of output string
      result_values.forEach((row) => {
        // expect the number of items separated by the `itemSeparator` to equal the width of the grid
        expect(row.length).toEqual(game.width);
      });
    });

    it('should output the correct items in their respective coordinates', () => {
      // for each row of output string
      result_values.forEach((row) => {
        // for each item in the row
        row.forEach((item) => {
          let c = new Coords(row.indexOf(item), result_values.indexOf(row));
          // expect the items value to equal the value at the given grid coordinate
          let expected = game.getCell(c);
          expect(item).toEqual(expected.toString());
        });
      });
    });
  });
});

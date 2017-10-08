const {Game, CellDisplay} = require('../Game'),
  {Grid} = require('../Grid');


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
      states_mtx = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ];
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
    describe('when the cell is already uncovered', function() {
      xit('should not update display grid', function() {

      });
    });
    describe('when not uncovering mine', function() {
      xit('should uncover appropriate cells', function() {

      });
      xit('should update display grid', function() {

      });
    });
    describe('when uncovering mine', function() {
      xit('should set all states to Uncovered', function() {

      });
      xit('should set triggered mine to Triggered state', function() {

      });
      xit('should keep all flags as Flagged', function() {

      });
      xit('should update display grid', function() {

      });
      xit('should throw error', function() {

      });
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

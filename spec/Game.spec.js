const {Game, CellDisplay, CellState, MINE, calculateCellValues} = require('../Game'),
  {Coords} = require('../Coords'),
  {Grid, seedMatrix} = require('../Grid');

const {expectGridsEqual} = require('./helpers/Grid-helpers');
const M = MINE;

describe('Game', function() {
  let game, gameState;
  let values_mtx, states_mtx;
  let values, states;

  // PASSING
  describe('is constructed with a GameState object', function() {
    beforeEach(function() {
      values_mtx = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ];
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
      expect(game.getCellDisplayGrid() instanceof Grid).toBe(true);
    });

    it('should be able to be initialized with flags', function() {
      pending('Need to implement tests for different constructions of Game');
    });
    it('should not be able to be initialized with incorrect values', function() {
      pending('Need to implement tests for different constructions of Game');
    });
  });

  // PASSING
  describe('allows user to uncover cells', function() {

    beforeEach(function() {
      values_mtx = [
        [0, 0, 1, MINE],
        [1, 1, 2, 1],
        [2, MINE, 1, 0],
        [MINE, 2, 1, 0]
      ];
      values = new Grid(values_mtx);
      states_mtx = seedMatrix({width: values.width, height: values.height}, CellState.Covered);
      states = new Grid(states_mtx);
      game = new Game({values, states});
    });

    // PASSING
    describe('when the cell is already uncovered', function() {
      xit('should not update display grid', function() {

      });
    });


    // PASSING
    describe('when not uncovering mine', function() {

      let expected_display;

      beforeEach(function() {
        let C = CellState.Covered;
        // uncover a non-mine cell
        game.uncover(1,0);
        // expect display grid to look like:
        expected_display = new Grid([
          ['0', '0', '1', C],
          ['1', '1', '2', C],
          [C, C, C, C],
          [C, C, C, C]
        ]);
      });

      // it('should uncover appropriate cells', function() {
      //   expectGridsEqual(game.getCellDisplayGrid(), expected_display);
      // });
    });


    // PASSING
    describe('when uncovering mine', function() {

      beforeEach(function() {
        game = new Game({values, states});
        // uncover a mine
        game.uncover(3,0);
      });

      it('should show the triggered mine', function() {
        expect(game.getCellDisplay(3,0)).toEqual(CellState.Triggered);
      });

      it('should uncover the rest of the mines', function () {
        expect(game.getCellDisplay(1, 2)).toEqual(MINE);
        expect(game.getCellDisplay(0, 3)).toEqual(MINE);
      });
    });
  });


  // PASSING
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
        expect(game.getCellDisplay(0,0)).toEqual(CellState.Flagged);
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
        expect(game.getCellDisplay(0,0)).toEqual(CellState.Covered);
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
        beforeDisplay = game.getCellDisplay(0,0);
        beforeFlagCount = game.remainingFlags;
        // re-flag that same cell
        game.flag(0,0);
      });

      it('should not update display grid', function() {
        expect(game.getCellDisplay(0,0)).toEqual(beforeDisplay);
      });

      it('should not change count of remaining flags', function() {
        expect(game.remainingFlags).toEqual(beforeFlagCount);
      });
    });
  });



  // PASSING
  describe('- getCellDisplay() -', function () {
    const C = CellState.Covered,
      U = CellState.Uncovered,
      F = CellState.Flagged,
      M = MINE,
      T = CellState.Triggered;

    beforeEach(function() {
      states_mtx = [
        [C, F, T, U, U, U]
      ];
      values_mtx = [
        [0, 0, 1, 2, 0, M]
      ];
      states = new Grid(states_mtx);
      values = new Grid(values_mtx);
      game = new Game({values, states});
    });

    describe('retrieves information about a Cell', function() {

      describe('when cell is Covered', function() {
        it('should return Covered', function() {
          expect(game.getCellDisplay(0,0)).toEqual(C);
        });
      });

      describe('when cell is Flagged', function() {
        it('should return Flagged', function() {
          expect(game.getCellDisplay(1,0)).toEqual(F);
        });
      });

      describe('when cell is Triggered', function() {
        it('should return Triggered', function() {
          expect(game.getCellDisplay(2,0)).toEqual(T);
        });
      });

      describe('when cell is Uncovered', function() {
        describe('and cell value is greater than 0', function() {
          it('should return cell value', function() {
            expect(game.getCellDisplay(3,0)).toEqual('2');
          });
        });
        describe('and cell value is 0', function() {
          it('should return 0', function() {
            expect(game.getCellDisplay(4,0)).toEqual('0');
          });
        });
        describe('and cell value is MINE', function() {
          it('should return MINE', function() {
            expect(game.getCellDisplay(5,0)).toEqual(M);
          });
        });
      });
    });
  });

  // PASSING
  describe('- gameOver()', function() {

    describe('should be called', function() {

      beforeEach(function() {
        // M 3
        // M M
        values_mtx = [
          [M,3],
          [M,M]
        ];
        // let C = CellState.Covered;
        states_mtx = seedMatrix({width: values_mtx[0].length, height: values_mtx.length}, CellState.Covered);
        values = new Grid(values_mtx);
        states = new Grid(states_mtx);
        gameState = {values, states};
        game = new Game(gameState);


        spyOn(game, '_gameOver');
      });
      it('when a mine is uncovered', function () {
        // uncover mine
        game.uncover(0,0);
        // expect game over to be called
        expect(game._gameOver).toHaveBeenCalled();
      });
      it('when the last non-mine is uncovered', function() {
        // uncover mine
        game.uncover(1,0);
        // expect game over to be called
        expect(game._gameOver).toHaveBeenCalled();
      });
      it('when the last non-mine is uncovered indirectly', function() {
        // M 3
        // M M
        values_mtx = [
          [M,1,0],
          [1,1,0],
          [0,0,0]
        ];
        // let C = CellState.Covered;
        states_mtx = seedMatrix({width: values_mtx[0].length, height: values_mtx.length}, CellState.Covered);
        values = new Grid(values_mtx);
        states = new Grid(states_mtx);
        gameState = {values, states};
        game = new Game(gameState);


        spyOn(game, '_gameOver');

        // uncover cell that will lead to all non-mine cells being uncovered
        game.uncover(2,2);
        // expect game over to be called
        expect(game._gameOver).toHaveBeenCalled();
      });
      it('when the last flag is correctly placed', function () {
        // flag all mines
        game.flag(0,0);
        game.flag(0,1);
        game.flag(1,1);
        // expect game over to be called
        expect(game._gameOver).toHaveBeenCalled();
      });
    });
  });


  describe('- generate()', function () {
    beforeEach(function() {
      values_mtx = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ];
      states_mtx = seedMatrix({width: values_mtx[0].length, height: values_mtx.length}, CellState.Covered);
      values = new Grid(values_mtx);
      states = new Grid(states_mtx);
      gameState = {values, states};
      game = new Game(gameState);
    });

    it('should have a display grid with each cell initialized `Covered`', function() {
      // pending('This test should be moved to Game.generate()');
      let displayGrid = game.getCellDisplayGrid();
      displayGrid.forEach((cell, x, y) => {
        expect(cell).toEqual(CellState.Covered);
      });
    });
  })
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

const {Grid, CellState, CellValue, calculateCellValues, seedMatrix} = require('../Grid');
const {Coords} = require('../Coords');
const M = CellValue.Mine;


describe('Grid', () => {

  let states;
  let values;
  let m, n, mines;
  let grid;

  describe('initialized with mines', () => {

    beforeEach(() => {
      m = 8;
      n = 12;
      mines = Grid.generateMines(8, 12, 10);
      grid = new Grid(m, n, mines);
    });

    it('should have a size equal to (m x n)', () => {
      let {width, height} = grid.size;
      expect(width).toEqual(m);
      expect(height).toEqual(n)
    });

    it('should have the correct number of mines', () => {
      expect(grid.mines.length).toEqual(mines.length);
    });

    it('should place mines properly', () => {
      mines.forEach((mine_coords) => {
        expect(grid.isCellMine(mine_coords)).toBe(true);
      });
    });

    it('should initialize state of all cells to covered', () => {
      for(let i = 0; i < m; i++) {
        for(let j = 0; j < n; j++) {
          expect(grid.getCellState({x: i, y: j})).toBeDefined();
        }
      }
    });

    it('should calculate a CellValue for each cell', () => {
      for(let i = 0; i < m; i++) {
        for(let j = 0; j < n; j++) {
          expect(grid.getCellValue({x: i, y: j})).toBeDefined();
        }
      }
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
        [M, 2, 0],
        [M, 3, 1],
        [1, 2, M]
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

const {Coords} = require('./Coords');

const CellState = {
  Swept: 0,
  Covered: 1,
  Flagged: 2,
};

// Value of a Mine in a grid
const MINE = 'M';

// Seeds a two-dimensional array
// @param {width, height} size - size of the matrix
// @param {T} val - OPTIONAL - any value repeat throughout arrays
// @return {T[height][width]} - array of type <T> with size equal to `size`
const seedMatrix = (size, val) => {
  let st = [];
  for (let i = 0; i < size.height; i++) {
    let row = new Array(size.width);
    for (let j = 0; j < size.width; j++) {
      row[j] = val;
    }
    st.push(row);
  }
  return st;
}



//
class Grid {

  // @param { T[][] } matrix
  constructor(matrix) {
    if (!matrix) throw new Error('Cannot construct Grid with undefined constructor property.');
    if (!matrix.length) throw new Error('Cannot construct Grid with no rows');
    if (!Array.isArray(matrix[0])) throw new Error('Cannot construct Grid without two-dimensional array');
    this._matrix = matrix;
  }

  // @return { number }
  get width() {
    return this._matrix[0].length;
  }

  // @return { number }
  get height() {
    return this._matrix.length;
  }

  get count() {
    return width * height;
  }

  // UNTESTED
  // @return { number }
  countValue(val) {
    let count = 0;
    this.forEach((el) => {
      if (el === val) count++;
    });
    return count;
  }

  // @param { number } x
  // @param { number } y
  // @return { T }
  get(x, y) {
    return this._matrix[y][x];
  }

  // @param { number } x
  // @param { number } y
  // @param { T } val
  set(x, y, val) {
    this._matrix[y][x] = val;
  }

  // @param { string } rowSeparator
  // @param { string } itemSeparator
  // @return {string} - representation of the grid
  toString(rowSeparator, itemSeparator) {
    if (rowSeparator === undefined) rowSeparator = '\n';
    if (itemSeparator === undefined) itemSeparator = ' ';
    return this._matrix
      .map((row) => row.join(itemSeparator))
      .join(rowSeparator);
  }



  // [UNTESTED]
  // @param { (el, x, y) => void } el - element at position (x, y)
  forEach(fn) {
    for(let i = 0; i < this.height; i++) {
      for(let j = 0; j < this.width; j++) {
        fn(this.get(j,i), j, i);
      }
    }
  }


  // STATIC METHODS

  // [UNTESTED]
  // @param { number } width
  // @param { number } height
  // @param { T } val
  // @return { Grid<T> }
  static generate(width, height, val) {
    let matrix = seedMatrix({width, height}, val);
    return new Grid(matrix);
  }

  // [UNTESTED]
  // @param { Grid<T> } a
  // @param { Grid<T> } b
  // @param { (T, T) => T }
  static reduce(a, b, fn) {
    let n = Grid.generate(a.width, a.height, null);
    a.forEach((a_el, x, y) => {
      let b_el = b.get(x, y);
      n.set(x, y, fn(a_el, b_el));
    });
    return n;
  }

  // [UNTESTED]
  // @param { Grid<T> } a
  // @param { Grid<T> } b
  // @return { boolean }
  static equal(a, b) {
    for(let i = 0; i < a.height; i++) {
      for(let j = 0; j < a.width; j++) {
        let a_el = a.get(j, i);
        let b_el = b.get(j, i);
        if (a_el !== b_el) return false;
      }
    }
    return true;
  }

}

module.exports = {Grid, CellState, MINE, seedMatrix};

// A base class for building and interacting with a two-dimensional array
export class GridHelper<T> {

  constructor(private matrix: T[][]) {
    // if (!matrix) throw new Error('Cannot construct Grid with undefined constructor property.');
    // if (!matrix.length) throw new Error('Cannot construct Grid with no rows');
    // if (!Array.isArray(matrix[0])) throw new Error('Cannot construct Grid without two-dimensional array');
  }

  public get width() {
    return this.matrix[0].length;
  }

  public get height() {
    return this.matrix.length;
  }

  // @param { number } x
  // @param { number } y
  // @return { T }
  public get(x: number, y: number): T {
    return this.matrix[y][x];
  }

  // @param { number } x
  // @param { number } y
  // @param { T } val
  public set(x: number, y: number, val: T) {
    this.matrix[y][x] = val;
  }
}

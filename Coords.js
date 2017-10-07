class Coords {

  static equal(coord_a, coord_b) {
    return coord_a.x === coord_b.x && coord_a.y === coord_b.y;
  }

  static generate(xmax, ymax) {
    const gen = (lim) => Math.floor(Math.random()*lim);
    return new Coords(gen(xmax), gen(ymax));
  }

  // - should be unique
  static generateMany(xmax, ymax, num) {
    let ret = [];
    while (ret.length < num) {
      let c = Coords.generate(xmax, ymax);
      if ( !ret.length ||
        !ret.find((el) => Coords.equal(el, c))
      ) {
        ret.push(c);
      }
    }
    return ret;
  }

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

module.exports = {Coords};

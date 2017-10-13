const expectGridsEqual = function (a, b) {
  for(let y = 0; y < a.height; y++) {
    for(let x = 0; x < a.width; x++) {
      expect(a.get(x,y)).toEqual(b.get(x,y));
    }
  }
}

module.exports = { expectGridsEqual };

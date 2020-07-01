import React from 'react';
import { buildGame, buildCellValues } from './build-game';


describe('buildCellValues', () => {
  it('builds a matrix with the correct width', () => {
    const mines = [[0, 0], [1, 2], [4, 1]];
    const width = 5;
    const height = 7;
    const result = buildCellValues(width, height, mines);

    expect(result.width).toEqual(width);
  });
  it('builds a matrix with the correct height', () => {
    const mines = [[0, 0], [1, 2], [2, 3], [4, 1]];
    const width = 5;
    const height = 7;
    const result = buildCellValues(width, height, mines);

    console.log(result.rows);
    expect(result.height).toEqual(height);
  });
  it('places mines', () => {
    const mines = [[0,0], [1,2], [4,1]];
    const width = 5;
    const height = 7;

    
  });
});
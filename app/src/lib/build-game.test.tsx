import React from 'react';
import { buildGame, buildCellValues } from './build-game';
import { MINE } from '../types/cell';


describe('buildCellValues', () => {
  it('builds a matrix with the correct width', () => {
    const mines = [[0, 0], [1, 2], [4, 1]];
    const width = 5;
    const height = 7;
    const result = buildCellValues(width, height, mines);

    expect(result.width).toEqual(width);
  });

  it('builds a matrix with the correct height', () => {
    const mines = [[0, 0], [1, 2], [2, 3], [3, 1]];
    const width = 5;
    const height = 7;
    const result = buildCellValues(width, height, mines);

    expect(result.height).toEqual(height);
  });

  it('places mines', () => {
    const mines = [[0, 0], [1, 2], [2, 3], [3, 1]];
    const width = 5;
    const height = 7;
    const result = buildCellValues(width, height, mines);
    
    mines.forEach((mine) => {
      expect(result.get(mine[0], mine[1]).value).toEqual(MINE);
    });
  });

  it('calculates correct values', () => {
    const mines = [[0,0], [1,2], [2,3], [3,1]];
    const width = 5;
    const height = 7;
    const result = buildCellValues(width, height, mines);
    
    expect(result.get(2,2).value).toEqual(3);
    expect(result.get(1,1).value).toEqual(2);
    expect(result.get(1,0).value).toEqual(1);
  });
});

describe('buildGame', () => {
  it('places mines correctly', () => {
    const mines = [[0, 0], [1, 2], [2, 3], [3, 1]];
    const width = 5;
    const height = 7;

    const result = buildGame(width, height, mines);

    expect(result.get(0,0).value).toEqual(MINE);
    expect(result.get(1,2).value).toEqual(MINE);
    expect(result.get(2,3).value).toEqual(MINE);
    expect(result.get(3,1).value).toEqual(MINE);
  });
});
import React from 'react';
import { Game } from './game';

describe('Game', () => {
  it('does not throw', () => {
    expect(() => <Game />).not.toThrow();
  });
});

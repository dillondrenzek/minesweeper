import React, { useEffect, useState } from 'react';
import { GridHelper } from '../../lib/grid-helper';
import { buildGame, generateMines } from '../../lib/build-game';
import { ICell, CellState } from '../../types/cell';
import { Grid } from '../grid/grid';
import { uncover } from '../../lib/game-helper';

function start(numMines: number, width: number, height: number): GridHelper<ICell> {
  const mines = generateMines(numMines, width, height);
  return buildGame(width, height, mines);
}

export interface GameProps {
  height: number;
  width: number;
  numMines: number;
}

export const Game: React.FunctionComponent<GameProps> = (props) => {
  const { numMines, width, height } = props;
  
  const [grid, setGrid] = useState<GridHelper<ICell>>(start(numMines, width, height));

  const handleClickReset = () => {
    setGrid(start(numMines, width, height));
  };

  const clickHandler = (cellX: number, cellY: number)  => {
    uncover(grid, cellX, cellY);
    setGrid(GridHelper.copy(grid));
  };

  const shiftClickHandler = (cellX: number, cellY: number) => {
    const currentCell = grid.get(cellX, cellY);
    grid.set(cellX, cellY, {
      ...currentCell,
      state: (currentCell.state === CellState.Covered) 
        ? CellState.Flagged 
        : (currentCell.state === CellState.Flagged) 
          ? CellState.Covered 
          : currentCell.state
    });
    setGrid(GridHelper.copy(grid));
  };

  return (
    <>
      <Grid 
        grid={grid}
        onClickCell={clickHandler}
        onShiftClickCell={shiftClickHandler}    
      />
      <button onClick={handleClickReset}>Reset</button>
    </>
  );
}
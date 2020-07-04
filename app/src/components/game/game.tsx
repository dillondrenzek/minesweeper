import React, { useState } from 'react';
import { GridHelper } from '../../lib/grid-helper';
import { ICell, CellState } from '../../types/cell';
import { Grid } from '../grid/grid';


export interface GameProps {
  height?: number;
  width?: number;
}

export const Game: React.FunctionComponent<GameProps> = (props) => {
  const { width, height } = props;
  const [grid, setGrid] = useState<GridHelper<ICell>>(GridHelper.build(width, height, () => ({ state: CellState.Covered, value: 0 })));

  const clickHandler = (cellX: number, cellY: number)  => {
    const currentCell = grid.get(cellX, cellY);
    grid.set(cellX, cellY, {
      ...currentCell,
      state: CellState.Uncovered
    });
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
    <Grid 
      grid={grid}
      onClickCell={clickHandler}
      onShiftClickCell={shiftClickHandler}    
    />
  );
}
import React, { useCallback, useEffect, useState } from "react";
import { GridHelper } from "../../lib/grid-helper";
import { buildGame, generateMines } from "../../lib/build-game";
import { ICell, CellState } from "../../types/cell";
import { Grid } from "../grid/grid";
import { uncover } from "../../lib/game-helper";
import { GameConfig } from "../../types/game";

function start(config: GameConfig): GridHelper<ICell> {
  const { numMines, width, height } = config;
  const mines = generateMines(numMines, width, height);
  return buildGame(width, height, mines);
}

export interface GameProps {
  config: GameConfig;
}

export const Game: React.FunctionComponent<GameProps> = (props) => {
  const { config } = props;

  const [grid, setGrid] = useState<GridHelper<ICell>>(start(config));

  const handleClickReset = useCallback(() => {
    setGrid(start(config));
  }, [config]);

  const clickHandler = (cellX: number, cellY: number) => {
    uncover(grid, cellX, cellY);
    setGrid(GridHelper.copy(grid));
  };

  const shiftClickHandler = (cellX: number, cellY: number) => {
    const currentCell = grid.get(cellX, cellY);
    grid.set(cellX, cellY, {
      ...currentCell,
      state:
        currentCell.state === CellState.Covered
          ? CellState.Flagged
          : currentCell.state === CellState.Flagged
          ? CellState.Covered
          : currentCell.state,
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
};

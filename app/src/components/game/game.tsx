import React, { useCallback, useMemo, useReducer, useState } from "react";
import { GridHelper } from "../../lib/grid-helper";
import { buildGame, generateMines } from "../../lib/build-game";
import { ICell, CellState } from "../../types/cell";
import { Grid } from "../grid/grid";
import { uncover } from "../../lib/game-helper";

function start(
  numMines: number,
  width: number,
  height: number
): GridHelper<ICell> {
  const mines = generateMines(numMines, width, height);
  return buildGame(width, height, mines);
}

interface GameState {
  // grid: GridHelper<ICell>;
  grid: ICell[][];
}

type GameAction =
  | {
      type: "RESET_GAME";
    }
  | {
      type: "UNCOVER_CELL" | "FLAG_CELL";
      data: {
        cellX: number;
        cellY: number;
      };
    };

function useGame(grid: ICell[][]) {
  // const reducer: React.Reducer<, > = ;

  const initialState = {
    grid,
  };

  return useReducer((prevState: GameState, action: GameAction) => {
    console.log("prevState", JSON.stringify(prevState.grid[0]));
    console.log("action", action);
    switch (action.type) {
      case "UNCOVER_CELL": {
        const helper = new GridHelper(prevState.grid);
        const { cellX, cellY } = action.data;

        console.log("uncover:", cellX, cellY);

        uncover(helper, cellX, cellY);

        return {
          ...prevState,
          grid: GridHelper.copy(helper).rows,
        };
      }
      case "FLAG_CELL": {
        const helper = new GridHelper(prevState.grid);
        const { cellX, cellY } = action.data;
        const currentCell = helper.get(cellX, cellY);

        console.log("flag:", cellX, cellY);

        helper.set(cellX, cellY, {
          ...currentCell,
          state:
            currentCell.state === CellState.Covered
              ? CellState.Flagged
              : currentCell.state === CellState.Flagged
              ? CellState.Covered
              : currentCell.state,
        });

        console.log("after:", helper.get(cellX, cellY));

        return {
          ...prevState,
          grid: GridHelper.copy(helper).rows,
        };
      }
      case "RESET_GAME":
        return {
          ...prevState,
          // grid: start(numMines, width, height).rows,
        };
      default:
        return prevState;
    }
  }, initialState);
}

export interface GameProps {
  height: number;
  width: number;
  numMines: number;
}

let storedGrid: ICell[][] = null;

export const Game: React.FunctionComponent<GameProps> = (props) => {
  const { numMines, width, height } = props;

  const initialGrid = useMemo(() => {
    return start(numMines, width, height).rows;
  }, [numMines, width, height]);

  const [state, dispatch] = useGame(initialGrid);

  const handleClickReset = () => {
    dispatch({ type: "RESET_GAME" });
  };

  const clickHandler = (cellX: number, cellY: number) => {
    console.log("click handler");
    dispatch({ type: "UNCOVER_CELL", data: { cellX, cellY } });
  };

  const shiftClickHandler = useCallback(
    (cellX: number, cellY: number) => {
      dispatch({ type: "FLAG_CELL", data: { cellX, cellY } });
    },
    [dispatch]
  );

  console.log("render grid", state.grid, storedGrid === state.grid);

  return (
    <>
      <Grid
        grid={state.grid}
        onClickCell={clickHandler}
        onShiftClickCell={shiftClickHandler}
      />
      <button onClick={handleClickReset}>Reset</button>
    </>
  );
};

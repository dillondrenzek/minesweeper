import React from 'react';

export type CellValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'M';

export enum CellState {
  Uncovered,
  Covered,
  Flagged
}

export interface CellProps {
  onClick: () => void;
  onRightClick: () => void;
  state: CellState;
  value: CellValue;
}

export const Cell: React.FunctionComponent<CellProps> = (props) => {
  const { state, value } = props;
  return (
    <div>
      {state === CellState.Uncovered ? (
        <div>{value}</div>
      ) : null}
    </div>
  );
}
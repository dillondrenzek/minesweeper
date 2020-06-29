import React from 'react';
import './cell.scss';

export type CellValue = number;

export enum CellState {
  Uncovered = 'uncovered',
  Covered = 'covered',
  Flagged = 'flagged'
}

export interface ICell {
  state: CellState;
  value: CellValue;
}

export const cell = () => {
  let _state = CellState.Covered;
  let _value = 0;

  return {
    get state() {
      return _state;
    },
    get value() {
      return _value;
    },
    incrementValue: () => {
      _value += 1;
    },
    toggleFlag: () => {
      if (_state === CellState.Covered) {
        _state = CellState.Flagged;
      } else if (_state === CellState.Flagged) {
        _state = CellState.Covered;
      }
    }
  }
};


export interface CellProps {
  onClick: (ev?: React.MouseEvent) => void;
  onShiftClick: (ev?: React.MouseEvent) => void;
  state: CellState;
  value: CellValue;
}

export const Cell: React.FunctionComponent<CellProps> = (props) => {
  const { onClick, onShiftClick, state, value } = props;

  const handleClick = (ev: React.MouseEvent) => {
    if (typeof onShiftClick === 'function' && ev.shiftKey) {
      onShiftClick(ev);
    } else if (typeof onClick === 'function') {
      onClick(ev);
    }
  };

  const cellStateClassName = (() => {
    switch (state) {
      case CellState.Covered:
        return 'covered';
      case CellState.Flagged:
        return 'flagged';
      case CellState.Uncovered:
        return 'uncovered';
    }
  })();

  return (
    <div className={`Cell ${cellStateClassName}`} onClick={handleClick}>
      {state === CellState.Uncovered ? (
        <div>{value}</div>
      ) : null}
    </div>
  );
}
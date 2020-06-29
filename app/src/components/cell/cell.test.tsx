import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, RenderResult, fireEvent } from '@testing-library/react';
import { Cell, CellState } from './cell';

describe('Cell', () => {
  let result: RenderResult;

  afterEach(() => {
    result.unmount();
    result = null;
  })

  it('doesn\'t show the cell value when Covered', () => {
    act(() => {
      result = render(<Cell state={CellState.Covered} value={3} onClick={null} onShiftClick={() => null} />);
    });
    expect(result.baseElement.textContent).not.toContain('3');
  });

  it('does show the cell value when Uncovered', () => {
    act(() => {
      result = render(<Cell state={CellState.Uncovered} value={3} onClick={null} onShiftClick={() => null} />);
    });
    expect(result.baseElement.textContent).toContain('3');
  });

  it('emits a click event', () => {
    const clickHandler = jest.fn();
    result = render(<Cell state={CellState.Uncovered} value={3} onClick={clickHandler} onShiftClick={() => null} />);
    fireEvent.click(result.container.firstChild);
    expect(clickHandler).toHaveBeenCalled();
  });

  it('emits a shift-click event', () => {
    const shiftClickHandler = jest.fn();
    result = render(<Cell state={CellState.Uncovered} value={3} onClick={null} onShiftClick={shiftClickHandler} />);
    fireEvent.click(result.container.firstChild, { shiftKey: true });
    expect(shiftClickHandler).toHaveBeenCalled();
  });

});
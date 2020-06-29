import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, RenderResult, fireEvent } from '@testing-library/react';
import { renderHook, act as actHook } from '@testing-library/react-hooks';
import { Cell, CellState, useCell } from './cell';

describe('Cell', () => {
  let result: RenderResult;

  afterEach(() => {
    result.unmount();
    result = null;
  })

  it('doesn\'t show the cell value when Covered', () => {
    act(() => {
      result = render(<Cell state={CellState.Covered} value={3} onClick={null} onRightClick={null}/>);
    });
    expect(result.baseElement.textContent).not.toContain('3');
  });

  it('does show the cell value when Uncovered', () => {
    act(() => {
      result = render(<Cell state={CellState.Uncovered} value={3} onClick={null} onRightClick={null}/>);
    });
    expect(result.baseElement.textContent).toContain('3');
  });

  it('emits a click event', async () => {
    const clickHandler = jest.fn();
    result = render(<Cell state={CellState.Uncovered} value={3} onClick={clickHandler} onRightClick={null}/>);
    fireEvent.click(result.container.firstChild);
    expect(clickHandler).toHaveBeenCalled();
  });

  it('emits a right-click event', () => {
    const rightClickHandler = jest.fn();
    result = render(<Cell state={CellState.Uncovered} value={3} onClick={null} onRightClick={rightClickHandler}/>);
    fireEvent.contextMenu(result.container.firstChild);
    expect(rightClickHandler).toHaveBeenCalled();
  });

});

describe('useCell', () => {
  describe('incrementValue', () => {

    it('increments the value by 1', () => {
      const { result } = renderHook(() => useCell());
      const initialValue = result.current.value;

      actHook(() => {
        result.current.incrementValue();
      });

      expect(typeof result.current.value).toBe('number');
      expect(result.current.value).toBe(initialValue + 1);
    });
  });
});
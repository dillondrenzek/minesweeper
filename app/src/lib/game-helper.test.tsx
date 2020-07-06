import { GameHelper, uncover } from './game-helper';
import { GridHelper } from './grid-helper';
import { ICell, CellState, MINE } from '../types/cell';

describe('uncover', () => {

  it('uncovers no value, then uncovers until values found', () => {
    let helper: GameHelper = new GridHelper<ICell>([
      [{ value: 0, state: CellState.Covered },{ value: 0, state: CellState.Covered },{ value: 1, state: CellState.Covered },{ value: MINE, state: CellState.Covered }],
      [{ value: 1, state: CellState.Covered },{ value: 1, state: CellState.Covered },{ value: 2, state: CellState.Covered },{ value: 1, state: CellState.Covered }],
      [{ value: 1, state: CellState.Covered },{ value: MINE, state: CellState.Covered },{ value: 1, state: CellState.Covered },{ value: 0, state: CellState.Covered }],
      [{ value: 1, state: CellState.Covered },{ value: 1, state: CellState.Covered },{ value: 1, state: CellState.Covered },{ value: 0, state: CellState.Covered }]
    ]);

    uncover(helper, 0, 0);

    expect(helper.get(0,0).state).toEqual(CellState.Uncovered);
    expect(helper.get(1,0).state).toEqual(CellState.Uncovered);
    expect(helper.get(2,0).state).toEqual(CellState.Uncovered);
    expect(helper.get(3,0).state).toEqual(CellState.Covered);
    expect(helper.get(0,1).state).toEqual(CellState.Uncovered);
    expect(helper.get(1,1).state).toEqual(CellState.Uncovered);
    expect(helper.get(2,1).state).toEqual(CellState.Uncovered);
    expect(helper.get(3,1).state).toEqual(CellState.Covered);
    expect(helper.get(0,2).state).toEqual(CellState.Covered);
    expect(helper.get(1,2).state).toEqual(CellState.Covered);
    expect(helper.get(2,2).state).toEqual(CellState.Covered);
    expect(helper.get(3,2).state).toEqual(CellState.Uncovered);

  });

  it('uncovers a value, does not uncover additional cells', () => {
    let helper: GameHelper = new GridHelper<ICell>([
      [{ value: 0, state: CellState.Covered },{ value: 0, state: CellState.Covered },{ value: 1, state: CellState.Covered },{ value: MINE, state: CellState.Covered }],
      [{ value: 1, state: CellState.Covered },{ value: 1, state: CellState.Covered },{ value: 2, state: CellState.Covered },{ value: 1, state: CellState.Covered }],
      [{ value: 1, state: CellState.Covered },{ value: MINE, state: CellState.Covered },{ value: 1, state: CellState.Covered },{ value: 0, state: CellState.Covered }],
      [{ value: 1, state: CellState.Covered },{ value: 1, state: CellState.Covered },{ value: 1, state: CellState.Covered },{ value: 0, state: CellState.Covered }]
    ]);

    uncover(helper, 2, 2);

    expect(helper.get(2,2).state).toEqual(CellState.Uncovered);
    expect(helper.get(2,1).state).toEqual(CellState.Covered);
    expect(helper.get(2,3).state).toEqual(CellState.Covered);
    expect(helper.get(1,2).state).toEqual(CellState.Covered);
    expect(helper.get(3,2).state).toEqual(CellState.Covered);

  });

});

describe('setCellState', () => {

});
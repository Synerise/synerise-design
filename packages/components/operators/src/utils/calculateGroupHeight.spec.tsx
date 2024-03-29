
import { OPERATORS_ITEMS, OPERATORS_GROUPS } from '../__specs__/data/Operators.data';
import { calculateGroupHeight } from './calculateGroupHeight';

const TEST_CASES = [
  {
    groupIndex: 0,
    expectedHeight: 288
  },
  {
    groupIndex: 1,
    expectedHeight: 160
  },
  {
    groupIndex: 2,
    expectedHeight: 288
  },
  {
    groupIndex: 3,
    expectedHeight: 64
  },
  {
    groupIndex: 4,
    expectedHeight: 224
  }
]

describe('calculateGroupHeight', () => {
  
  test.each(TEST_CASES)('Should calculate correct height', ({groupIndex, expectedHeight }: { groupIndex: number; expectedHeight: number}) => {
    const result = calculateGroupHeight(OPERATORS_GROUPS[groupIndex], OPERATORS_ITEMS);
    expect(result).toBe(expectedHeight);
  });

});


import { OPERATORS_ITEMS } from '../__specs__/data/Operators.data';
import { groupByGroupName } from './groupByGroupName';

describe('groupByGroupName', () => {
  test('Should group operators by group name', () => {
    const groupedItems = groupByGroupName(OPERATORS_ITEMS);
    const groupNames = OPERATORS_ITEMS.map(item => item.groupName).filter((value, index, array) => array.indexOf(value) === index);
    expect(Object.keys(groupedItems).length).toBe(groupNames.length);
  });

});

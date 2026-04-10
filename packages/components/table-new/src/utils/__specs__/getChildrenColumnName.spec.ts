import { getChildrenColumnName } from '../getChildrenColumnName';

describe('getChildrenColumnName', () => {
  it('should return "children" when no argument provided', () => {
    expect(getChildrenColumnName()).toBe('children');
  });

  it('should return "children" for undefined', () => {
    expect(getChildrenColumnName(undefined)).toBe('children');
  });

  it('should return custom column name', () => {
    expect(getChildrenColumnName('subItems' as keyof { subItems: unknown })).toBe('subItems');
  });
});

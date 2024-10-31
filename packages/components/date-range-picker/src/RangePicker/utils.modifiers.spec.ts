import { getModifiers } from './utils';

describe('DateRangePicker modifiers', () => {
  it('should calculate start and end modifiers', () => {
    const fromDate = new Date(1980, 6, 31);
    const toDate = new Date(1990, 3, 3);
    const modifiers = getModifiers(fromDate, toDate, null);
    expect(modifiers['start']).toBe(fromDate);
    expect(modifiers['end']).toBe(toDate);
  });
  it('should preserve default "outside" modifier ', () => {
    const fromDate = new Date(1980, 6, 31);
    const toDate = new Date(1990, 3, 3);
    const modifiers = getModifiers(fromDate, toDate, null);
    expect(modifiers['outside']).toStrictEqual(undefined);
  });
  it('should handle entered-end modifier when endDate is falsy ', () => {
    const fromDate = new Date(1980, 6, 31);
    const toDate = undefined;
    const enteredTo = new Date(1990, 3, 3);
    const modifiers = getModifiers(fromDate, toDate, enteredTo);
    expect(modifiers['entered-start']).toStrictEqual(fromDate);
    expect(modifiers['entered-end']).toStrictEqual(enteredTo);
  });
  it('should handle entered-start modifier when endDate is falsy ', () => {
    const fromDate = new Date(1980, 6, 31);
    const toDate = undefined;
    const enteredTo = new Date(1950, 3, 3);
    const modifiers = getModifiers(fromDate, toDate, enteredTo);
    expect(modifiers['entered-start']).toStrictEqual(enteredTo);
    expect(modifiers['entered-end']).toStrictEqual(fromDate);
  });
});

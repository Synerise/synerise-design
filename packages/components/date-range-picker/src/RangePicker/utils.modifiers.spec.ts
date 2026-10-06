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
  it('should preserve default "today" modifier', () => {
    const modifiers = getModifiers(new Date(1980, 6, 31), new Date(1990, 3, 3), null);
    expect(modifiers['today']).toBeInstanceOf(Date);
  });
  it('should mark the anchor as initial while no end and no hover exist', () => {
    const fromDate = new Date(1980, 6, 31);
    const modifiers = getModifiers(fromDate, null, null);
    expect(modifiers['initial']).toStrictEqual(fromDate);
    expect(modifiers['initial-entered']).toStrictEqual(fromDate);
    expect(modifiers['end']).toBeFalsy();
  });
  it('should drop the initial modifier once the range has an end', () => {
    const fromDate = new Date(1980, 6, 31);
    const toDate = new Date(1990, 3, 3);
    const modifiers = getModifiers(fromDate, toDate, null);
    expect(modifiers['initial']).toStrictEqual(undefined);
    expect(modifiers['initial-entered']).toStrictEqual(undefined);
  });
  it('should expose "entered" as a predicate covering the hovered span', () => {
    const fromDate = new Date(1980, 6, 10);
    const enteredTo = new Date(1980, 6, 20);
    const entered = getModifiers(fromDate, undefined, enteredTo)['entered'];
    expect(typeof entered).toBe('function');
    const matches = entered as unknown as (day: Date) => boolean;
    expect(matches(new Date(1980, 6, 15))).toBe(true);
    expect(matches(new Date(1980, 6, 25))).toBe(false);
  });
  it('should swap start and end when hovering before the anchor', () => {
    const fromDate = new Date(1980, 6, 20);
    const enteredTo = new Date(1980, 6, 10);
    const modifiers = getModifiers(fromDate, undefined, enteredTo);
    expect(modifiers['start']).toStrictEqual(undefined);
    expect(modifiers['end']).toStrictEqual(fromDate);
  });
});

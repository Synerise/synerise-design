import { FILTER_ADAPTERS } from '.';

describe('filter adapters', () => {
  it.each(Object.values(FILTER_ADAPTERS))(
    'returns a fresh default value on every call',
    (adapter) => {
      const first = adapter.defaultValue();
      const second = adapter.defaultValue();

      expect(second).toStrictEqual(first);
      expect(second.definition).not.toBe(first.definition);
    },
  );

  it('treats only the daily default as ready to apply', () => {
    expect(FILTER_ADAPTERS.DAILY.isValid(FILTER_ADAPTERS.DAILY.defaultValue())).toBe(true);
    expect(FILTER_ADAPTERS.WEEKLY.isValid(FILTER_ADAPTERS.WEEKLY.defaultValue())).toBe(false);
    expect(FILTER_ADAPTERS.MONTHLY.isValid(FILTER_ADAPTERS.MONTHLY.defaultValue())).toBe(false);
  });
});

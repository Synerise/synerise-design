import localeUtils from '../localeUtils';

/**
 * `localeUtils` is a public export of `@synerise/ds-date-picker` and is also re-used by
 * `@synerise/ds-date-range-picker`. Today it is a `react-day-picker` v7 `LocaleUtils` object built
 * by spreading `react-day-picker/moment`. The v10 upgrade replaces the library-facing part with
 * `locale` / `formatters` / `labels`, so these tests pin what the strings actually are — the day
 * labels and weekday headers have to come out identical afterwards.
 */

const DATE = new Date('1996-10-27T03:24:00');

describe('localeUtils', () => {
  describe('formatDay (accessible name of a day cell)', () => {
    it('formats an English day', () => {
      expect(localeUtils.formatDay(DATE, undefined, 'en')).toBe(
        'Sunday, 27 Oct 1996',
      );
    });

    it('formats a Polish day', () => {
      expect(localeUtils.formatDay(DATE, undefined, 'pl')).toBe(
        'Niedziela, 27 Paź 1996',
      );
    });

    it('falls back to English for an unsupported locale', () => {
      expect(localeUtils.formatDay(DATE, undefined, 'de')).toBe(
        'Sunday, 27 Oct 1996',
      );
    });
  });

  describe('formatMonthTitle', () => {
    it('formats month and year', () => {
      expect(localeUtils.formatMonthTitle(DATE, 'en')).toBe('Oct 1996');
      expect(localeUtils.formatMonthTitle(DATE, 'pl')).toBe('Paź 1996');
    });
  });

  describe('weekday names', () => {
    it('returns the short weekday name used in the column headers', () => {
      expect(localeUtils.formatWeekdayShort(0, 'en')).toBe('Su');
      expect(localeUtils.formatWeekdayShort(3, 'en')).toBe('We');
      expect(localeUtils.formatWeekdayShort(3, 'pl')).toBe('Śr');
    });

    // Known quirk: formatWeekdayLong reads the SHORT table. Pinned as-is so the upgrade
    // reproduces current output rather than accidentally "fixing" a user-visible string.
    it('returns the short name from formatWeekdayLong as well', () => {
      expect(localeUtils.formatWeekdayLong(3, 'en')).toBe('We');
    });
  });

  describe('getFirstDayOfWeek', () => {
    // Note: the calendar grid does not use this — `DayPicker.tsx` passes `firstDayOfWeek` from
    // `useDataFormat()`, which wins. It stays part of the published surface regardless.
    it('is Sunday for English and Monday for Polish', () => {
      expect(localeUtils.getFirstDayOfWeek('en')).toBe(0);
      expect(localeUtils.getFirstDayOfWeek('pl')).toBe(1);
      expect(localeUtils.getFirstDayOfWeek('de')).toBe(0);
    });
  });

  describe('published surface', () => {
    it('exposes the five design-system formatters', () => {
      expect(Object.keys(localeUtils)).toEqual(
        expect.arrayContaining([
          'formatDay',
          'formatMonthTitle',
          'formatWeekdayShort',
          'formatWeekdayLong',
          'getFirstDayOfWeek',
        ]),
      );
    });

    // `formatDate`, `parseDate` and `getMonths` used to come from `react-day-picker/moment`,
    // which is the only reason `moment` was in this package's (undeclared) dependency graph.
    // v10 has no such subpath and nothing consumed them, so they are gone by design.
    it('no longer inherits the moment-derived helpers', () => {
      expect(Object.keys(localeUtils)).not.toEqual(
        expect.arrayContaining(['formatDate', 'parseDate', 'getMonths']),
      );
    });
  });
});

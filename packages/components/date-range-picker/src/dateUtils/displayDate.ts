import { type DateToFormatOptions, toIsoString } from '@synerise/ds-core';

/**
 * Inside the picker a `Date` holds the wall clock of the provider timezone in its
 * local fields — `toIsoString` is the encoder of that convention, `getLocalDateInTimeZone`
 * the decoder. To display one, it has to be re-anchored to a real instant first.
 *
 * Without a provider timezone the date is already in the timezone it will be rendered in,
 * so it is passed through: `toIsoString` falls back to `'UTC'` for a missing timezone and
 * would stamp `+00:00` onto local fields, shifting the value by the browser offset.
 */
export const getDateToDisplay = (date: Date, timeZone?: string): Date =>
  timeZone ? new Date(toIsoString(date, timeZone)) : date;

/**
 * Counterpart of `getDateToDisplay`: `formatValue` only projects an instant into the
 * provider timezone when `applyTimeZoneOffset` is set, and it defaults to `false` in
 * `DataFormatConfig`. The re-anchoring above is only correct together with that projection,
 * so the flag is forced here rather than inherited from the consumer's config — otherwise
 * the rendered value drifts by the browser-to-provider timezone delta.
 */
export const getFormatOptionsToDisplay = <T extends DateToFormatOptions>(
  options: T,
  timeZone?: string,
): T => (timeZone ? { ...options, applyTimeZoneOffset: true } : options);

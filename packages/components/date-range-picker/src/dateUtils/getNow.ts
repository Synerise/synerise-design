import { currentTimeInTimezone } from '@synerise/ds-core';

/**
 * "Now" on the provider's clock, as a wall-clock date — the convention the panel keeps its
 * dates in (see `dateUtils/displayDate`). Read per call rather than captured once per module,
 * so relative ranges, the circled day and the SINCE anchor keep following the clock past
 * midnight, and resolve on the provider's day rather than the browser's.
 *
 * Takes the zone the `timeZone` prop resolved to rather than reading `intl` itself: without
 * that prop there is no zone, and this has to stay the browser's `new Date()` that every
 * current consumer already gets.
 */
export const getNow = (timeZone?: string): Date =>
  timeZone ? currentTimeInTimezone(timeZone) : new Date();

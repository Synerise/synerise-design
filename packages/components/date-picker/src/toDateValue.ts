import { parseISO } from 'date-fns';

/**
 * Normalises the loosely-typed date values this package accepts into a `Date`.
 *
 * Replaces `legacyParse` from `@date-fns/upgrade`, a shim reimplementing date-fns v1's `parse()`,
 * and reproduces its branches exactly — verified identical across every input kind the call sites
 * reach, including the two that surprise:
 *
 * - `null` yields the **epoch**, which `isValid` reports as a valid date, not a rejected one.
 * - `undefined`, `''` and unparseable strings yield an `Invalid Date`.
 *
 * The string branch is load-bearing. `legacyParse` reads a naive string as *local* time, including
 * date-only forms where the ECMAScript spec says UTC. `parseISO` agrees; `toDate` and `new Date`
 * do not, and would shift `'2024-01-15'` by the local offset — a whole day either side of UTC.
 */
export const toDateValue = (
  value: Date | string | number | null | undefined,
): Date => {
  if (value instanceof Date) {
    return new Date(value.getTime());
  }
  if (typeof value === 'string') {
    return parseISO(value);
  }

  return new Date(value as number);
};

export default toDateValue;

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { RELATIVE_PRESETS } from '../../constants';
import type { RelativeDateRange } from '../../date.types';
import { normalizeRange } from '../../utils';
import relativeToAbsolute from '../relativeToAbsolute';

/**
 * `relativeToAbsolute` backs `forceAbsolute`, so what a consumer stores must be the range the panel
 * showed — which `normalizeRange` computes. Named `TimezoneTesting` so the UTC / New York / Warsaw
 * runs of `pnpm test` cover it too; every expectation is on local fields, which is the convention
 * both functions work in.
 */

const localFields = (date: Date): string => {
  const pad = (value: number, length = 2) => String(value).padStart(length, '0');

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${pad(date.getMilliseconds(), 3)}`;
};

const getPreset = (key: string) => {
  const preset = RELATIVE_PRESETS.find((candidate) => candidate.key === key);
  if (!preset) {
    throw new Error(`No relative preset ${key}`);
  }
  return preset;
};

const resolve = (range: RelativeDateRange, timeZone?: string) => {
  const { from, to } = relativeToAbsolute(range, timeZone);
  return [localFields(from as Date), localFields(to as Date)];
};

// Month ends with 31, 30, 29 and 28 days, and a year boundary.
const NOW_CASES = [
  new Date(2026, 0, 31, 13, 0, 0),
  new Date(2026, 3, 15, 13, 0, 0),
  new Date(2026, 3, 30, 13, 0, 0),
  new Date(2024, 1, 29, 13, 0, 0),
  new Date(2026, 1, 28, 13, 0, 0),
  new Date(2026, 11, 31, 13, 0, 0),
];

describe('relativeToAbsolute TimezoneTesting', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each([
    ['LAST_MONTH', new Date(2026, 3, 15, 13), ['2026-03-01T00:00:00.000', '2026-03-31T23:59:59.999']],
    ['LAST_MONTH', new Date(2026, 2, 31, 13), ['2026-02-01T00:00:00.000', '2026-02-28T23:59:59.999']],
    ['LAST_3_MONTHS', new Date(2026, 3, 15, 13), ['2026-01-01T00:00:00.000', '2026-03-31T23:59:59.999']],
    ['NEXT_3_MONTHS', new Date(2026, 0, 15, 13), ['2026-02-01T00:00:00.000', '2026-04-30T23:59:59.999']],
    ['NEXT_MONTH', new Date(2026, 0, 31, 13), ['2026-02-01T00:00:00.000', '2026-02-28T23:59:59.999']],
  ])('resolves %s on %s to whole calendar months', (key, now, expected) => {
    vi.setSystemTime(now);

    expect(resolve(getPreset(key))).toEqual(expected);
  });

  it.each(NOW_CASES)('agrees with normalizeRange for every relative preset on %s', (now) => {
    vi.setSystemTime(now);

    RELATIVE_PRESETS.forEach((preset) => {
      const normalized = normalizeRange(preset) as RelativeDateRange;

      expect(resolve(preset), preset.key).toEqual([
        localFields(normalized.from as Date),
        localFields(normalized.to as Date),
      ]);
    });
  });

  it('resolves "now" on the provider clock when given a timeZone', () => {
    vi.setSystemTime(new Date('2026-04-30T22:30:00Z'));
    const preset = getPreset('LAST_MONTH');
    const normalized = normalizeRange(preset, 'Asia/Tokyo') as RelativeDateRange;

    expect(resolve(preset, 'Asia/Tokyo')).toEqual([
      localFields(normalized.from as Date),
      localFields(normalized.to as Date),
    ]);
    // Already May 1st in Tokyo, so the previous month is April.
    expect(resolve(preset, 'Asia/Tokyo')[0]).toBe('2026-04-01T00:00:00.000');
  });

  it('resolves a SINCE range instead of throwing', () => {
    vi.setSystemTime(new Date(2026, 3, 15, 13));
    const since = {
      type: 'RELATIVE',
      future: false,
      offset: { type: 'SINCE', value: new Date(2026, 3, 10, 8) },
      duration: { type: 'DAYS', value: 3 },
    } as unknown as RelativeDateRange;

    expect(resolve(since)).toEqual(['2026-04-07T08:00:00.000', '2026-04-10T08:00:00.000']);
  });

  it('returns an ABSOLUTE range', () => {
    vi.setSystemTime(new Date(2026, 3, 15, 13));

    expect(relativeToAbsolute(getPreset('LAST_7_DAYS')).type).toBe('ABSOLUTE');
  });
});

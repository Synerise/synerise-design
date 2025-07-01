import {
  type RelativeDateUnit,
  type RelativeTimeRelation,
} from '../../Factors.types';

export const INTERVALS: RelativeDateUnit[] = [
  'SECONDS',
  'MINUTES',
  'HOURS',
  'DAYS',
  'WEEKS',
  'MONTHS',
  'YEARS',
];
export const BEFORE: RelativeTimeRelation = 'BEFORE';
export const AFTER: RelativeTimeRelation = 'AFTER';
export const TIME_RELATIONS = [BEFORE, AFTER];
export const DEFAULT_VALUE = 1;

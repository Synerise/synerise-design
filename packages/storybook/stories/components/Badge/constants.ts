import { controlFromOptionsArray } from '../../utils';

export const STATUSES = [
  'active',
  'inactive',
  'blocked',
  'processing',
  'warning',
] as const;

export const AVATAR_ARG_TYPES = {
  size: {
    defaultValue: 'default',
    ...controlFromOptionsArray('select', [
      'extraLarge',
      'large',
      'default',
      'small',
    ]),
  },
  shape: {
    defaultValue: 'circle',
    ...controlFromOptionsArray('select', ['circle', 'square']),
  },
};

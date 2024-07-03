import { controlFromOptionsArray } from "../../utils";

export const STATUSES = ['active', 'inactive', 'blocked', 'processing', 'warning'] as const;
// export const SIZES = ['small', 'medium', 'large', 'extraLarge'] as const
// export const SHAPES = ['circle', 'square'] as const;
export const BACKGROUND_COLORS = [
  'auto',
  'red',
  'green',
  'grey',
  'yellow',
  'blue',
  'pink',
  'mars',
  'orange',
  'fern',
  'cyan',
  'purple',
  'violet',
] as const;

export const ICON_COLORS = [
  'red-600',
  'green-600',
  'grey-600',
  'yellow-600',
  'blue-600',
  'pink-600',
  'mars-600',
  'orange-600',
  'fern-600',
  'cyan-600',
  'purple-600',
  'violet-600',
  'white',
] as const;

export const BACKGROUND_COLOR_HUE = [
  '900',
  '800',
  '700',
  '600',
  '500',
  '400',
  '300',
  '200',
  '100',
  '050',
] as const;

export const AVATAR_ARG_TYPES = {
  size: {
    defaultValue: 'default',
    ...controlFromOptionsArray('select', ['extraLarge', 'large', 'default', 'small']),
  },
  shape: {
    defaultValue: 'circle',
    ...controlFromOptionsArray('select', ['circle', 'square']),
  },}
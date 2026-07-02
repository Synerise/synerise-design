import {
  type AspectRatio,
  type ThumbnailSize,
} from '../shared/Image.shared.types';

/** Fixed thumbnail heights (px) per size token. `custom` defers to `height`. */
export const SIZE_MAP: Record<Exclude<ThumbnailSize, 'custom'>, number> = {
  xxs: 40,
  xs: 80,
  s: 120,
  m: 180,
  l: 240,
  xl: 360,
  xxl: 540,
};

/** CSS `aspect-ratio` values per fixed ratio. `source` keeps intrinsic ratio. */
export const ASPECT_RATIO_MAP: Record<
  Exclude<AspectRatio, 'source'>,
  string
> = {
  '1:1': '1 / 1',
  '4:3': '4 / 3',
  '16:9': '16 / 9',
};

export const DEFAULT_ASPECT_RATIO: AspectRatio = '1:1';
export const DEFAULT_SIZE = 'm';

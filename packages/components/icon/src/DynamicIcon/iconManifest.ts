import type * as large from '../icons/L';
import type * as medium from '../icons/M';
import type * as xlarge from '../icons/XL';
import type * as additional from '../icons/additional';
import type * as color from '../icons/colorIcons';

/**
 * Union of every icon name across all sets.
 *
 * These are `import type * as` on purpose: the union has to be derived from the generated barrels,
 * but a value import of them is what used to pull all 1195 icons into every consumer bundle. Type
 * imports are erased, so this module emits no runtime imports at all.
 *
 * The module deliberately stays at this path — `@synerise/ds-icon/dist/DynamicIcon/iconManifest` is
 * deep-imported for `AllIconNames` by consumers. Prefer `import type { IconName } from '@synerise/ds-icon'`.
 */
export type AllIconNames =
  | keyof typeof medium
  | keyof typeof large
  | keyof typeof xlarge
  | keyof typeof additional
  | keyof typeof color;

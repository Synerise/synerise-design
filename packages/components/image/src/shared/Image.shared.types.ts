import { type ReactNode } from 'react';

/** One image in a gallery or preview set. */
export type ImageSource = {
  /** Image source URL. */
  src: string;
  /** Alternative text — required for accessibility. */
  alt: string;
  /** Per-image override for the broken-image fallback. */
  fallback?: ReactNode;
};

/**
 * Aspect ratio applied to a thumbnail. `source` keeps the image's intrinsic
 * ratio; the rest force a fixed box.
 */
export type AspectRatio = '1:1' | '4:3' | '16:9' | 'source';

/**
 * Thumbnail height token. `custom` defers to the `height` prop; the rest map to
 * fixed pixel heights (see `SIZE_MAP`).
 */
export type ThumbnailSize =
  | 'custom'
  | 'xxs'
  | 'xs'
  | 's'
  | 'm'
  | 'l'
  | 'xl'
  | 'xxl';

/** Thumbnail backdrop — transparent (`none`) or a subtle grey fill. */
export type ThumbnailBackground = 'none' | 'subtle-grey';

/** How the image fills the thumbnail box. */
export type ObjectFit = 'contain' | 'cover';

/**
 * Preview zoom start. `fit` downscales to the working area only when the image
 * is larger than it; `real-size` starts at the image's natural size (100%).
 */
export type InitialZoom = 'real-size' | 'fit';

/**
 * Tooltip / accessible labels for the image controls. DS provides translated
 * defaults; pass a subset via the `texts` prop to override.
 */
export type ImageTexts = {
  zoomIn: string;
  zoomOut: string;
  nextImage: string;
  previousImage: string;
  download: string;
  close: string;
  delete: string;
};

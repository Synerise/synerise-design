import { type ReactNode } from 'react';

import {
  type AspectRatio,
  type ImageSource,
  type ImageTexts,
  type InitialZoom,
  type ObjectFit,
  type ThumbnailBackground,
  type ThumbnailSize,
} from '../shared/Image.shared.types';

export type GalleryProps = {
  /** Images rendered as thumbnails and paged through in the preview. */
  images: ImageSource[];
  /** Aspect ratio applied to every thumbnail. Defaults to `1:1`. */
  aspectRatio?: AspectRatio;
  /** Height token applied to every thumbnail. Defaults to `m`. */
  size?: ThumbnailSize;
  /** Explicit height in px, used when `size` is `custom`. */
  height?: number;
  /** Backdrop applied to every thumbnail. Defaults to `none`. */
  background?: ThumbnailBackground;
  /** How images fill their tiles. Defaults to `contain`. */
  objectFit?: ObjectFit;
  /** Native loading hint applied to every thumbnail. Defaults to `lazy`. */
  loading?: 'lazy' | 'eager';
  /** Fallback for any broken image (thumbnails and preview). */
  fallback?: ReactNode;
  /** Show a delete affordance on each thumbnail. */
  deletable?: boolean;
  /** Called with the index of the thumbnail whose delete affordance fired. */
  onDelete?: (index: number) => void;
  /** Whether clicking a thumbnail opens the preview. Defaults to true. */
  openZoom?: boolean;
  /** Preview pass-through — enable zoom/pan. */
  zoomable?: boolean;
  /** Preview pass-through — per-click zoom multiplier. */
  zoomStep?: number;
  /** Preview pass-through — max zoom relative to natural size. */
  maxZoom?: number;
  /** Preview pass-through — where zoom starts. */
  initialZoom?: InitialZoom;
  /** Preview pass-through — portal target. */
  getContainer?: () => HTMLElement;
  /** Override tooltip / accessible labels for thumbnails and the preview. */
  texts?: Partial<ImageTexts>;
  className?: string;
};

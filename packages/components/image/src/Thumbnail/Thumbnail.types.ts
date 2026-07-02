import { type MouseEvent, type ReactNode } from 'react';

import {
  type AspectRatio,
  type ImageTexts,
  type ObjectFit,
  type ThumbnailBackground,
  type ThumbnailSize,
} from '../shared/Image.shared.types';

export type ThumbnailProps = {
  /** Image source URL. Omit (or leave empty) to render the Empty state. */
  src?: string;
  /** Alternative text — required for accessibility. */
  alt: string;
  /** Aspect ratio of the tile. Defaults to gallery context, else `1:1`. */
  aspectRatio?: AspectRatio;
  /** Height token. Defaults to gallery context, else `m`. */
  size?: ThumbnailSize;
  /** Explicit height in px, used when `size` is `custom`. */
  height?: number;
  /** Tile backdrop. Defaults to gallery context, else `none` (transparent). */
  background?: ThumbnailBackground;
  /** How the image fills the tile. Defaults to gallery context, else `contain`. */
  objectFit?: ObjectFit;
  /** Native loading hint. Defaults to gallery context, else `lazy`. */
  loading?: 'lazy' | 'eager';
  /** Show a delete affordance on hover/focus. */
  deletable?: boolean;
  /** Called when the delete affordance is activated. */
  onDelete?: () => void;
  /** Render the tile as an interactive trigger (e.g. opens a preview). */
  openZoom?: boolean;
  /** Click handler — fired for mouse and keyboard (Enter/Space) activation. */
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  /** Fallback rendered when the image fails to load. Defaults to gallery context. */
  fallback?: ReactNode;
  /** Override tooltip / accessible labels (uses `delete`). Defaults to gallery context. */
  texts?: Partial<ImageTexts>;
  className?: string;
  'data-testid'?: string;
};

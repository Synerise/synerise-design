import { type ReactNode } from 'react';

import {
  type ImageSource,
  type ImageTexts,
  type InitialZoom,
} from '../shared/Image.shared.types';

export type ImagePreviewProps = {
  /** Controls visibility of the viewer. */
  open: boolean;
  /** Images to page through. Navigation is shown only when there is more than one. */
  images: ImageSource[];
  /** Controlled index of the currently shown image. */
  index: number;
  /** Called when navigation (arrows / keyboard) requests a different image. */
  onIndexChange: (index: number) => void;
  /** Called when the viewer requests to close (Escape, backdrop click, close button). */
  onClose: () => void;
  /**
   * Whether zoom and pan are enabled. Defaults to true. Zoom runs from the
   * fitted view up to `maxZoom` × the image's natural size.
   */
  zoomable?: boolean;
  /** Per-click zoom multiplier. Defaults to 1.4. */
  zoomStep?: number;
  /** Maximum zoom relative to natural size. Defaults to 3 (300%). */
  maxZoom?: number;
  /** Where zoom starts. Defaults to `fit`. */
  initialZoom?: InitialZoom;
  /** Whether to render the close button and allow Escape to close. Defaults to true. */
  closable?: boolean;
  /** Whether clicking the dimmed backdrop closes the viewer. Defaults to true. */
  maskClosable?: boolean;
  /** Fallback rendered when an image fails to load (per-image override via `ImageSource.fallback`). */
  fallback?: ReactNode;
  /** Portal target. Defaults to `document.body`. */
  getContainer?: () => HTMLElement;
  /** Unmount the viewer (and reset zoom state) when closed. Defaults to false. */
  destroyOnClose?: boolean;
  /** Called with the current scale whenever the zoom transform changes. */
  onZoom?: (scale: number) => void;
  /** Override the default tooltip / accessible labels for the controls. */
  texts?: Partial<ImageTexts>;
};

import { createContext, type ReactNode, useContext } from 'react';

import type {
  AspectRatio,
  ImageTexts,
  ObjectFit,
  ThumbnailBackground,
  ThumbnailSize,
} from '../shared/Image.shared.types';

/** Visual settings a `Gallery` broadcasts to every `Thumbnail` it renders. */
export type ImageGalleryContextValue = {
  aspectRatio?: AspectRatio;
  size?: ThumbnailSize;
  height?: number;
  background?: ThumbnailBackground;
  objectFit?: ObjectFit;
  loading?: 'lazy' | 'eager';
  fallback?: ReactNode;
  texts?: Partial<ImageTexts>;
};

export const ImageGalleryContext = createContext<
  ImageGalleryContextValue | undefined
>(undefined);

/** Reads gallery-level defaults; returns `undefined` for a standalone `Thumbnail`. */
export const useImageGalleryContext = ():
  | ImageGalleryContextValue
  | undefined => useContext(ImageGalleryContext);

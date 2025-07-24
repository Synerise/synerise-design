import { previewableMimeTypes } from './FileViewAvatar.const';
import { type PreviewableMimeType } from './FileViewAvatar.types';

export const isPreviewableMimeType = (
  mimeType: string,
): mimeType is PreviewableMimeType => {
  return (previewableMimeTypes as string[]).includes(mimeType);
};

import React from 'react';

import { FileTypeTextM } from '@synerise/ds-icon';

type PreviewableMimeType =
  | 'image/png'
  | 'image/gif'
  | 'image/jpeg'
  | 'image/svg+xml'
  | 'text/csv';

export const isPreviewableMimeType = (
  mimeType: string,
): mimeType is PreviewableMimeType => {
  return previewableMimeTypes.includes(mimeType as PreviewableMimeType);
};

export const previewableMimeTypes: PreviewableMimeType[] = [
  'image/png',
  'image/gif',
  'image/jpeg',
  'image/svg+xml',
  'text/csv',
];
export const ICON_MAP: Record<PreviewableMimeType, JSX.Element> = {
  'image/png': <FileTypeTextM />,
  'image/gif': <FileTypeTextM />,
  'image/jpeg': <FileTypeTextM />,
  'image/svg+xml': <FileTypeTextM />,
  'text/csv': <FileTypeTextM />,
};

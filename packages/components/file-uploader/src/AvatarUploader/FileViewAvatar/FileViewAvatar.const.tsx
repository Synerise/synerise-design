import React from 'react';

import { FileTypeImageM } from '@synerise/ds-icon';

import { type PreviewableMimeType } from './FileViewAvatar.types';

export const previewableMimeTypes: PreviewableMimeType[] = [
  'image/png',
  'image/gif',
  'image/jpeg',
  'image/svg+xml',
  'text/csv',
];

export const ICON_MAP: Record<PreviewableMimeType, JSX.Element> = {
  'image/png': <FileTypeImageM />,
  'image/gif': <FileTypeImageM />,
  'image/jpeg': <FileTypeImageM />,
  'image/svg+xml': <FileTypeImageM />,
  'text/csv': <FileTypeImageM />,
};

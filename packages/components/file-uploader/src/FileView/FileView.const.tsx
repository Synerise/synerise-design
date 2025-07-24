import React from 'react';

import {
  FileTypeHtml,
  FileTypeImage,
  FileTypeMp3,
  FileTypePdf,
  FileTypePptx,
  FileTypeSvg,
  FileTypeTxt,
  FileTypeVideo,
  FileTypeXls,
  FileTypeZip,
} from '@synerise/ds-icon';

export const isPreviewableMimeType = (type: string): type is FileType => {
  return previewableMimeTypes.includes(type as FileType);
};

type FileType =
  | 'image/png'
  | 'image/gif'
  | 'image/jpeg'
  | 'image/svg+xml'
  | 'text/plain'
  | 'text/html'
  | 'video/quicktime'
  | 'application/pdf'
  | 'application/zip'
  | 'audio/mpeg'
  | 'application/vnd.ms-excel'
  | 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  | 'text/csv';

export const previewableMimeTypes: FileType[] = [
  'image/png',
  'image/gif',
  'image/jpeg',
  'image/svg+xml',
  'text/plain',
  'text/html',
  'video/quicktime',
  'application/pdf',
  'application/zip',
  'audio/mpeg',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/csv',
];
export const ICON_MAP: Record<FileType, React.ReactNode> = {
  'image/png': <FileTypeImage />,
  'image/gif': <FileTypePdf />,
  'image/jpeg': <FileTypeImage />,
  'image/svg+xml': <FileTypeSvg />,
  'application/pdf': <FileTypePdf />,
  'application/zip': <FileTypeZip />,
  'text/plain': <FileTypeTxt />,
  'text/html': <FileTypeHtml />,
  'video/quicktime': <FileTypeVideo />,
  'audio/mpeg': <FileTypeMp3 />,
  'application/vnd.ms-excel': <FileTypeXls />,
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': (
    <FileTypePptx />
  ),
  'text/csv': <FileTypeTxt />,
};

import type { ComponentType, SVGProps } from 'react';

import FileActionM from '../icons/M/FileActionM';
import FileArchiveM from '../icons/M/FileArchiveM';
import FileCodeM from '../icons/M/FileCodeM';
import FileM from '../icons/M/FileM';
import FileTypeImageM from '../icons/M/FileTypeImageM';
import FileTypePlainM from '../icons/M/FileTypePlainM';
import FileTypeTableM from '../icons/M/FileTypeTableM';
import FileTypeTextM from '../icons/M/FileTypeTextM';
import type { IconName } from '../useIconComponent';

// Per-icon imports rather than the './icons/M' barrel: this is a closed set of eight, and importing
// them directly keeps MimeTypeIcon synchronous while retaining only those eight in a consumer bundle.
const MIME_TYPE_ICONS = {
  FileActionM,
  FileArchiveM,
  FileCodeM,
  FileM,
  FileTypeImageM,
  FileTypePlainM,
  FileTypeTableM,
  FileTypeTextM,
} satisfies Record<string, ComponentType<SVGProps<SVGSVGElement>>>;

export const mapMimeTypeToIconName = (mimeType: string): IconName => {
  switch (mimeType) {
    case 'text/csv':
      return 'FileTypeTableM';
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return 'FileTypeTextM';
    case 'text/html':
      return 'FileCodeM';
    case 'audio/mp3':
    case 'audio/mpeg3':
      return 'FileActionM';
    case 'application/pdf':
      return 'FileTypeImageM';
    case 'application/mspowerpoint':
    case 'application/vnd.ms-powerpoint':
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      return 'FileTypePlainM';
    case 'image/svg':
      return 'FileTypeImageM';
    case 'text/plain':
      return 'FileTypeTextM';
    case 'video/avi':
    case 'video/quicktime':
    case 'video/mpeg':
      return 'FileActionM';
    case 'application/excel':
    case 'application/vnd.ms-excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return 'FileTypeTableM';
    case 'application/zip':
    case 'multipart/x-zip':
    case 'application/x-compressed':
    case 'application/x-zip-compressed':
      return 'FileArchiveM';
    default:
      return 'FileM';
  }
};

export const mapMimeTypeToIconComponent = (
  mimeType: string,
): ComponentType<SVGProps<SVGSVGElement>> =>
  MIME_TYPE_ICONS[
    mapMimeTypeToIconName(mimeType) as keyof typeof MIME_TYPE_ICONS
  ] ?? FileM;

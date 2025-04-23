import React from 'react';
import {
  FileActionM,
  FileArchiveM,
  FileCodeM,
  FileM,
  FileTypeImageM,
  FileTypePlainM,
  FileTypeTableM,
  FileTypeTextM,
} from '../icons';

export const mapMimeTypeToIcon = (mimeType: string) => {
  switch (mimeType) {
    case 'text/csv':
      return <FileTypeTableM />;
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return <FileTypeTextM />;
    case 'text/html':
      return <FileCodeM />;
    case 'audio/mp3':
    case 'audio/mpeg3':
      return <FileActionM />;
    case 'application/pdf':
      return <FileTypeImageM />;
    case 'application/mspowerpoint':
    case 'application/vnd.ms-powerpoint':
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      return <FileTypePlainM />;
    case 'image/svg':
      return <FileTypeImageM />;
    case 'text/plain':
      return <FileTypeTextM />;
    case 'video/avi':
    case 'video/quicktime':
    case 'video/mpeg':
      return <FileActionM />;
    case 'application/excel':
    case 'application/vnd.ms-excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return <FileTypeTableM />;
    case 'application/zip':
    case 'multipart/x-zip':
    case 'application/x-compressed':
    case 'application/x-zip-compressed':
      return <FileArchiveM />;
    default:
      return <FileM />;
  }
};

import React from 'react';
import filesize from 'filesize.js';
import Icon from '@synerise/ds-icon';
import FileM from '@synerise/ds-icon/dist/icons/FileM';

import * as S from './FileView.styles';

export interface FileViewTexts {
  size: string;
}

interface FileViewProps {
  file: File;
  texts: FileViewTexts;
  onRemove: () => void;
}

const FileView: React.FC<FileViewProps> = ({ file, texts, onRemove }) => {
  const previewableMimeTypes = ['image/png', 'image/gif', 'image/jpeg', 'image/svg+xml'];

  const getFriendlySize = (size: number) => {
    if (!size) {
      size = 0;
    }

    return filesize(size, { round: 0 });
  };

  const fileSource = URL.createObjectURL(file);

  return (
    <S.FileViewContainer>
      {previewableMimeTypes.indexOf(file.type) > -1 ? (
        <S.PreviewImage source={fileSource} />
      ) : (
        <S.PlaceholderImage>
          <Icon component={<FileM />} size={24} />
        </S.PlaceholderImage>
      )}

      <S.Info>
        <S.Name>{file.name}</S.Name>
        <S.Size>
          {texts.size} {getFriendlySize(file.size)}
        </S.Size>
      </S.Info>
    </S.FileViewContainer>
  );
};

export default FileView;

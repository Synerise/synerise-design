import * as React from 'react';
import filesize from 'filesize.js';
import Icon from '@synerise/ds-icon';
import FileM from '@synerise/ds-icon/dist/icons/FileM';
import ProgressBar from '@synerise/ds-progress-bar';

import { ExtendedFile } from '../FileUploader';
import * as S from './FileView.styles';

export interface FileViewTexts {
  size: string;
  uploading: string;
}

interface FileViewProps {
  data: ExtendedFile;
  texts: FileViewTexts;
  onRemove: () => void;
}

const FileView: React.FC<FileViewProps> = ({ data, texts, onRemove }) => {
  const previewableMimeTypes = ['image/png', 'image/gif', 'image/jpeg', 'image/svg+xml'];

  const getFriendlySize = (size?: number): string => filesize(size || 0, { round: 0 });

  const { disabled, error, file, progress } = data;
  const fileSource = URL.createObjectURL(data.file);

  const hasError = !!error;
  const hasProgress = typeof progress === 'number';

  return (
    <S.FileViewContainer disabled={disabled} error={hasError}>
      {previewableMimeTypes.indexOf(file.type) > -1 ? (
        <S.PreviewImage source={fileSource} />
      ) : (
        <S.PlaceholderImage>
          <Icon component={<FileM />} size={24} />
        </S.PlaceholderImage>
      )}

      <S.Info>
        {hasProgress ? (
          <>
            <S.Name>{texts.uploading}</S.Name>
            <ProgressBar amount={100} percent={50} />
          </>
        ) : (
          <>
            <S.Name>{file.name}</S.Name>

            <S.SizeOrError>
              {error || (
                <>
                  {texts.size} {getFriendlySize(file.size)}
                </>
              )}
            </S.SizeOrError>
          </>
        )}
      </S.Info>
    </S.FileViewContainer>
  );
};

export default FileView;

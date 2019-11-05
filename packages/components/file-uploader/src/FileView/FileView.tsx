import * as React from 'react';
import filesize from 'filesize.js';
import Icon from '@synerise/ds-icon';
import FileM from '@synerise/ds-icon/dist/icons/FileM';
import Close3M from '@synerise/ds-icon/dist/icons/Close3M';
import ProgressBar from '@synerise/ds-progress-bar';

import { ExtendedFile } from '../FileUploader.types';
import * as S from './FileView.styles';

export interface FileViewTexts {
  size: string;
  uploading: string;
}

interface FileViewProps {
  data: ExtendedFile;
  texts: FileViewTexts;
  removable?: boolean;
  onRemove?: () => void;
}

const FileView: React.FC<FileViewProps> = ({ data, texts, onRemove, removable }) => {
  const previewableMimeTypes = ['image/png', 'image/gif', 'image/jpeg', 'image/svg+xml'];

  const getFriendlySize = (size?: number): string => filesize(size || 0, { round: 0 });

  const { disabled, error, file, progress } = data;
  const fileSource = URL.createObjectURL(data.file);

  const hasError = !!error;
  const hasProgress = typeof progress === 'number';

  return (
    <S.FileViewContainer disabled={disabled} error={hasError} removable={removable}>
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

      {removable && (
        <S.RemoveButtonWrapper onClick={onRemove}>
          <Icon component={<Close3M />} size={24} />
        </S.RemoveButtonWrapper>
      )}
    </S.FileViewContainer>
  );
};

export default FileView;

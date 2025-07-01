import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Icon, {
  Close3M,
  FileM,
  FileTypeTextM,
  RepeatM,
} from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import { type FileViewAvatarProps } from '../../AvatarUploader/FileViewAvatar/FileViewAvatar.types';
import * as S from './FileViewItem.styles';

const previewableMimeTypes = [
  'image/png',
  'image/gif',
  'image/jpeg',
  'image/svg+xml',
  'text/csv',
];
const mapperOfIcons = {
  'image/png': <FileTypeTextM />,
  'image/gif': <FileTypeTextM />,
  'image/jpeg': <FileTypeTextM />,
  'image/svg+xml': <FileTypeTextM />,
  'text/csv': <FileTypeTextM />,
};

const FileViewItem = ({
  data,
  texts,
  onRemove,
  removable,
}: FileViewAvatarProps) => {
  const { disabled, error, file, progress } = data;

  const finalTexts = {
    retryTooltip: (
      <FormattedMessage
        id="DS.FILE-UPLOADER.RETRY-TOOLTIP"
        defaultMessage="Retry"
      />
    ),
    removeTooltip: (
      <FormattedMessage
        id="DS.FILE-UPLOADER.REMOVE-TOOLTIP"
        defaultMessage="Remove"
      />
    ),
    ...texts,
  };

  const hasError = !!error;
  const hasProgress = typeof progress === 'number';
  const [removeButtonPressed, removeButtonSetPressed] = useState(false);
  const handleRemove = (): void => {
    onRemove && onRemove();
    removeButtonSetPressed(false);
  };

  return (
    <S.FileViewContainer>
      <Tooltip overlayStyle={{ maxWidth: '350px' }} title={file.name}>
        <S.FileView
          progress={hasProgress}
          disabled={disabled}
          error={hasError}
          removable={removable}
          type="button"
        >
          {previewableMimeTypes.indexOf(file.type) > -1 ? (
            <S.PreviewImage>
              <Icon component={mapperOfIcons[file.type]} size={20} />
            </S.PreviewImage>
          ) : (
            <S.PlaceholderImage>
              <Icon component={<FileM />} size={24} />
            </S.PlaceholderImage>
          )}
          <S.Info>
            <>
              <S.Name>{file.name}</S.Name>
            </>
          </S.Info>
          {hasProgress && (
            <S.LoaderIcon>
              <S.SmallLoader color="blue" size="S" />
            </S.LoaderIcon>
          )}
          {error && (
            <Tooltip title={finalTexts.retryTooltip}>
              <S.RepeatIcon>
                <Icon component={<RepeatM />} />
              </S.RepeatIcon>
            </Tooltip>
          )}
          {removable && !disabled && !error && !hasProgress && (
            <S.RemoveButtonWrapper
              onClick={handleRemove}
              onMouseDown={(): void => removeButtonSetPressed(true)}
              pressed={removeButtonPressed}
              data-testid="fileview-remove"
            >
              <Tooltip title={finalTexts.removeTooltip}>
                <Icon component={<Close3M />} size={16} />
              </Tooltip>
            </S.RemoveButtonWrapper>
          )}
        </S.FileView>
      </Tooltip>
    </S.FileViewContainer>
  );
};

export default FileViewItem;

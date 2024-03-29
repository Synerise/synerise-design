import * as React from 'react';

import Tooltip from '@synerise/ds-tooltip';
import Icon, { RepeatM, FileTypeTextM, Close3M, FileM } from '@synerise/ds-icon';

import * as S from './FileViewItem.styles';
import { FileViewAvatarProps } from '../../AvatarUploader/FileViewAvatar/FileViewAvatar.types';

const previewableMimeTypes = ['image/png', 'image/gif', 'image/jpeg', 'image/svg+xml', 'text/csv'];
const mapperOfIcons = {
  'image/png': <FileTypeTextM />,
  'image/gif': <FileTypeTextM />,
  'image/jpeg': <FileTypeTextM />,
  'image/svg+xml': <FileTypeTextM />,
  'text/csv': <FileTypeTextM />,
};

const FileViewItem: React.FC<FileViewAvatarProps> = ({ data, texts, onRemove, removable }) => {
  const { disabled, error, file, progress } = data;

  const hasError = !!error;
  const hasProgress = typeof progress === 'number';
  const [removeButtonPressed, removeButtonSetPressed] = React.useState<boolean>(false);
  const handleRemove = (): void => {
    onRemove && onRemove();
    removeButtonSetPressed(false);
  };

  return (
    <S.FileViewContainer>
      <Tooltip overlayStyle={{ maxWidth: '350px' }} title={file.name}>
        <S.FileView progress={hasProgress} disabled={disabled} error={hasError} removable={removable} type="button">
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
            <Tooltip title={texts.retryTooltip}>
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
              <Tooltip title={texts.removeTooltip}>
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

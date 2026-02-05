import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Icon, { Close3M, FileM, RepeatM } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import { ICON_MAP } from './FileViewAvatar.const';
import * as S from './FileViewAvatar.styles';
import { type FileViewAvatarProps } from './FileViewAvatar.types';
import { isPreviewableMimeType } from './FileViewAvatar.util';

const FileViewAvatar = ({
  data,
  texts,
  onRemove,
  removable,
  description,
}: FileViewAvatarProps) => {
  const { disabled, error, file, progress } = data;
  const fileSource = URL.createObjectURL(data.file);
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
  const [pressed, setPressed] = useState(false);
  const handleRemoveAvatar = (): void => {
    onRemove && onRemove();
    setPressed(false);
  };
  const [removeButtonPressed, removeButtonSetPressed] = useState(false);
  const handleRemove = (): void => {
    onRemove && onRemove();
    removeButtonSetPressed(false);
  };

  return (
    <S.FileAvatarContainer>
      <S.AvatarContainer
        removable={removable}
        disabled={disabled}
        source={fileSource}
      >
        {removable && !disabled && !error && !hasProgress && (
          <S.RemoveWrapper
            onClick={handleRemoveAvatar}
            onMouseDown={(): void => setPressed(true)}
            pressed={pressed}
            data-testid="file-view-avatar-remove"
          >
            <Tooltip title={finalTexts.removeTooltip}>
              <Icon component={<Close3M />} size={24} />
            </Tooltip>
          </S.RemoveWrapper>
        )}
      </S.AvatarContainer>
      <S.FileViewContainer>
        <Tooltip title={file.name}>
          <S.FileView
            progress={hasProgress}
            disabled={disabled}
            error={hasError}
            removable={removable}
            type="button"
          >
            {isPreviewableMimeType(file.type) ? (
              <S.PreviewImage>
                <Icon component={ICON_MAP[file.type]} size={24} />
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
        <S.DescriptionUploader>{description}</S.DescriptionUploader>
      </S.FileViewContainer>
    </S.FileAvatarContainer>
  );
};

export default FileViewAvatar;

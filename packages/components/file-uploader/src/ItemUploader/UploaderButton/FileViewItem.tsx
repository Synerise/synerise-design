import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Icon, { Close3M, FileM, RepeatM } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import { type FileViewAvatarProps } from '../../AvatarUploader/FileViewAvatar/FileViewAvatar.types';
import { ICON_MAP, isPreviewableMimeType } from './FileViewItem.const';
import * as S from './FileViewItem.styles';

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
  const handleRemove = () => {
    onRemove && onRemove();
    removeButtonSetPressed(false);
  };

  return (
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
              <Icon component={ICON_MAP[file.type]} size={20} />
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

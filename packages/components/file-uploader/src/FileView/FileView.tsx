import filesize from 'filesize.js';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Button from '@synerise/ds-button';
import { theme } from '@synerise/ds-core';
import Icon, {
  Check3M,
  Close3M,
  FileM,
  RepeatM,
  WarningFillM,
} from '@synerise/ds-icon';
import ProgressBar from '@synerise/ds-progress-bar';
import Tooltip from '@synerise/ds-tooltip';

import { ICON_MAP, isPreviewableMimeType } from './FileView.const';
import * as S from './FileView.styles';
import { type FileViewProps } from './FileView.types';

const FileView = ({
  data,
  texts,
  onRemove,
  removable,
  retry,
  retryButtonProps,
}: FileViewProps) => {
  const getFriendlySize = (size?: number): string => filesize(size || 0);

  const { disabled, error, file, progress, success } = data;

  const finalTexts = {
    size: <FormattedMessage id="DS.FILE-UPLOADER.SIZE" defaultMessage="Size" />,
    removeTooltip: (
      <FormattedMessage
        id="DS.FILE-UPLOADER.REMOVE-TOOLTIP"
        defaultMessage="Remove"
      />
    ),
    cancelText: (
      <FormattedMessage
        id="DS.FILE-UPLOADER.FILE-VIEW.CANCEL"
        defaultMessage="Cancel"
      />
    ),
    okText: (
      <FormattedMessage
        id="DS.FILE-UPLOADER.FILE-VIEW.OK"
        defaultMessage="OK"
      />
    ),
    removeConfirmTitle: (
      <FormattedMessage
        id="DS.FILE-UPLOADER.FILE-VIEW.REMOVE-CONFIRM-TITLE"
        defaultMessage="Remove"
      />
    ),
    fileWeight: (
      <FormattedMessage
        id="DS.FILE-UPLOADER.FILE-VIEW.FILE-WEIGHT"
        defaultMessage="File weight"
      />
    ),
    buttonLabel: (
      <FormattedMessage
        id="DS.FILE-UPLOADER.FILE-VIEW.BUTTON-LABEL"
        defaultMessage="Upload a file"
      />
    ),
    buttonDescription: (
      <FormattedMessage
        id="DS.FILE-UPLOADER.FILE-VIEW.BUTTON-DESCRIPTION"
        defaultMessage="or drop one here"
      />
    ),
    retryLabel: (
      <FormattedMessage
        id="DS.FILE-UPLOADER.FILE-VIEW.RETRY-BUTTON-LABEL"
        defaultMessage="Retry"
      />
    ),
    ...texts,
  };

  const hasError = !!error;
  const hasProgress = typeof progress === 'number';
  const [pressed, setPressed] = useState<boolean>(false);
  const handleRemove = (): void => {
    onRemove && onRemove();
    setPressed(false);
  };
  return (
    <S.FileViewContainer
      success={success}
      pressed={pressed}
      progress={hasProgress}
      disabled={disabled}
      error={hasError}
      removable={removable}
      type="button"
    >
      {isPreviewableMimeType(file.type) ? (
        <S.PreviewImage>
          <Icon component={ICON_MAP[file.type]} size={40} />
        </S.PreviewImage>
      ) : (
        <S.PlaceholderImage>
          <Icon component={<FileM />} size={24} />
        </S.PlaceholderImage>
      )}

      <S.Info progress={hasProgress}>
        {hasProgress ? (
          <>
            <S.Name>
              {file.name} <S.FileWeight>{finalTexts.fileWeight}</S.FileWeight>
            </S.Name>
            <div style={{ display: 'flex' }}>
              <ProgressBar amount={100} percent={finalTexts.percent} />
              <S.RemoveWrapper onClick={onRemove} data-testid="fileview-remove">
                <Tooltip title={finalTexts.removeTooltip}>
                  <Icon component={<Close3M />} size={20} />
                </Tooltip>
              </S.RemoveWrapper>
            </div>
          </>
        ) : (
          <>
            <S.Name>{file.name}</S.Name>

            <S.SizeOrError>
              {error || (
                <>
                  {finalTexts.size} {getFriendlySize(file.size)}
                </>
              )}
            </S.SizeOrError>
          </>
        )}
      </S.Info>
      {error && retry && !hasProgress && (
        <Button
          onClick={(event): void => {
            onRemove && onRemove();
            if (retryButtonProps?.onClick) {
              retryButtonProps.onClick(event);
            }
          }}
          mode="icon-label"
          type="ghost-primary"
        >
          <Icon component={<RepeatM />} />
          {finalTexts.retryLabel}
        </Button>
      )}
      {!error && !disabled && !hasProgress && (
        <S.CheckButtonWrapper data-testid="fileview-check">
          <Icon component={<Check3M />} size={20} />
        </S.CheckButtonWrapper>
      )}
      {removable && !disabled && !error && !hasProgress && (
        <S.PopconfirmOnRemove
          onConfirm={handleRemove}
          onCancel={(): void => setPressed(false)}
          icon={
            <Icon
              component={<WarningFillM />}
              color={theme.palette['yellow-600']}
            />
          }
          cancelText={finalTexts.cancelText}
          okText={finalTexts.okText}
          okType="primary"
          title={finalTexts.removeConfirmTitle}
          placement="top"
          mouseEnterDelay={250}
          mouseLeaveDelay={250}
          trigger="click"
        >
          <S.RemoveButtonWrapper
            onMouseDown={(): void => setPressed(true)}
            pressed={pressed}
            data-testid="fileview-remove"
          >
            <Tooltip title={finalTexts.removeTooltip}>
              <Icon component={<Close3M />} size={20} />
            </Tooltip>
          </S.RemoveButtonWrapper>
        </S.PopconfirmOnRemove>
      )}
    </S.FileViewContainer>
  );
};

export default FileView;

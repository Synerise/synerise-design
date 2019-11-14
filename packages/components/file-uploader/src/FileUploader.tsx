import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDropzone } from 'react-dropzone';

import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import AddM from '@synerise/ds-icon/dist/icons/AddM';
import ArrowDownCircleM from '@synerise/ds-icon/dist/icons/ArrowDownCircleM';
import InfoM from '@synerise/ds-icon/dist/icons/InfoM';

import FileView from './FileView/FileView';
import { FileUploaderProps } from './FileUploader.types';
import * as S from './FileUploader.styles';

const FileUploader: React.FC<FileUploaderProps> = ({
  onUpload,
  disabled,
  accept,
  error,
  label,
  onRemove,
  description,
  infoTooltip,
  mode = 'single',
  removable = true,
  files = [],
  texts = {
    buttonLabel: <FormattedMessage id="DS.FILE-UPLOADER.BUTTON-LABEL" />,
    buttonDescription: <FormattedMessage id="DS.FILE-UPLOADER.BUTTON-DESC" />,
    size: <FormattedMessage id="DS.FILE-UPLOADER.SIZE" />,
    uploading: <FormattedMessage id="DS.FILE-UPLOADER.UPLOADING" />,
  },
}) => {
  const onDrop = React.useCallback((acceptedFiles: File[]) => onUpload && onUpload(acceptedFiles), [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: accept ? accept.join(',') : undefined,
    multiple: mode !== 'single',
    onDrop,
    disabled,
  });

  const hasError = !!error;

  return (
    <S.Container>
      {label && (
        <S.Label>
          <span>{label}</span>

          {infoTooltip && (
            <Tooltip trigger="hover" placement="top" title={infoTooltip}>
              <span data-testid="tooltip-info">
                <Icon component={<InfoM />} size={24} />
              </span>
            </Tooltip>
          )}
        </S.Label>
      )}

      {files.length > 0 &&
        files.map((file, index) => (
          <FileView
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            texts={texts}
            removable={removable}
            onRemove={(): void => onRemove && onRemove(file.file, index)}
            data={file}
          />
        ))}

      {(mode !== 'single' || files.length === 0) && (
        <>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <S.DropAreaContainer {...getRootProps()} canUploadMore={mode !== 'single' && files.length > 0}>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <input {...getInputProps()} data-testid="droparea-input" />

            <S.DropAreaButton
              mode={mode}
              disabled={disabled}
              isDropping={isDragActive}
              hasError={hasError}
              data-testid="droparea"
            >
              {mode === 'multi-large' ? (
                <>
                  <Icon component={<ArrowDownCircleM />} size={24} />
                  <S.LargeDropAreaLabel>{texts.buttonLabel}</S.LargeDropAreaLabel>
                  <S.LargeDropAreaDescription>{texts.buttonDescription}</S.LargeDropAreaDescription>
                </>
              ) : (
                <>
                  <Icon component={<AddM />} size={24} />
                  <S.DropAreaLabel>{texts.buttonLabel}</S.DropAreaLabel>
                </>
              )}
            </S.DropAreaButton>
          </S.DropAreaContainer>
        </>
      )}

      {hasError && <S.ErrorMessage>{error}</S.ErrorMessage>}
      {description && <S.Description hasError={hasError}>{description}</S.Description>}
    </S.Container>
  );
};

export default FileUploader;

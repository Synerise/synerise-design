import * as React from 'react';
import { useDropzone } from 'react-dropzone';

import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import Add1M from '@synerise/ds-icon/dist/icons/Add1M';
import ArrowDownCircleM from '@synerise/ds-icon/dist/icons/ArrowDownCircleM';
import InfoM from '@synerise/ds-icon/dist/icons/InfoM';

import FileView from './FileView/FileView';
import { FileUploaderOwnProps } from './FileUploader.types';
import * as S from './FileUploader.styles';

const FileUploader: React.FC = ({
  mode,
  onUpload,
  disabled,
  accept,
  files,
  error,
  label,
  removable,
  onRemove,
  description,
  texts,
  infoTooltip,
}: FileUploaderOwnProps) => {
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
            <input {...getInputProps()} />

            <S.DropAreaButton mode={mode} disabled={disabled} isDropping={isDragActive} hasError={hasError}>
              {mode === 'multi-large' ? (
                <>
                  <Icon component={<ArrowDownCircleM />} size={24} />
                  <S.LargeDropAreaLabel>{texts.buttonLabel}</S.LargeDropAreaLabel>
                  <S.LargeDropAreaDescription>{texts.buttonDescription}</S.LargeDropAreaDescription>
                </>
              ) : (
                <>
                  <Icon component={<Add1M />} size={24} />
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

export const defaultTexts = {
  buttonLabel: 'Upload a new file or drag one here',
  buttonDescription: '',
  size: 'Size:',
  uploading: 'Uploading...',
};

FileUploader.defaultProps = {
  mode: 'single',
  files: [],
  removable: true,
  texts: defaultTexts,
};

export default FileUploader;

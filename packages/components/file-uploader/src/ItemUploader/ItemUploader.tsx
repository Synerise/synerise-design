import React from 'react';
import { useDropzone } from 'react-dropzone';

import Button from '@synerise/ds-button';
import Icon, { Add3M, InfoFillS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import { type FileViewAvatarTexts } from '../AvatarUploader/FileViewAvatar/FileViewAvatar.types';
import {
  type FileContent,
  type ItemUploaderProps,
} from '../FileUploader.types';
import * as S from './ItemUploader.styles';
import FileViewItem from './UploaderButton/FileViewItem';

function readAsText(file: File): Promise<FileContent> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    file.type !== 'text/plain' && resolve(null);
    reader.onerror = (): void => resolve(null);
    reader.onload = (): void => resolve(reader.result);

    reader.readAsText(file);
  });
}

const ItemUploader: React.FC<ItemUploaderProps> = ({
  className,
  onUpload,
  disabled,
  accept,
  label,
  onRemove,
  description,
  tooltip,
  filesAmount,
  error,
  mode = 'single',
  removable = true,
  files = [],
  texts,
}) => {
  const [uploadSuccess, setUploadSuccess] = React.useState(true);

  const readFilesContent = React.useCallback(
    (addedFiles: File[]) => {
      const readerPromises = addedFiles.map((file): Promise<FileContent> => {
        return readAsText(file);
      });
      Promise.all(readerPromises).then((filesContent: FileContent[]): void => {
        const filesWithContent = addedFiles.map((file, index) => {
          return Object.assign(file, { content: filesContent[index] });
        });
        onUpload && onUpload(filesWithContent);
      });
    },
    [onUpload],
  );

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      let possibleUpload = 0;
      if (filesAmount) {
        possibleUpload = filesAmount - files.length;
      }
      if (possibleUpload !== 0 && acceptedFiles.length > possibleUpload) {
        setUploadSuccess(false);
      } else {
        setUploadSuccess(true);
        readFilesContent(acceptedFiles);
      }
    },
    [filesAmount, files, setUploadSuccess, readFilesContent],
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: accept ? accept.join(',') : undefined,
    multiple: mode !== 'single',
    onDrop,
    disabled,
  });

  if (filesAmount && filesAmount < 1) {
    filesAmount = 1;
    throw new Error('Invalid value of property "filesAmount" ');
  }
  const hasError = Boolean(error) || !uploadSuccess;
  const errors =
    hasError && !uploadSuccess
      ? [error].concat('To many files uploaded')
      : [error];

  return (
    <S.Container className={`ds-file-avatar-uploader ${className || ''}`}>
      {label && (
        <S.Label>
          <span>{label}</span>
          {tooltip && (
            <Tooltip trigger="hover" placement="top" title={tooltip}>
              <span data-testid="tooltip-info">
                <Icon component={<InfoFillS />} size={24} />
              </span>
            </Tooltip>
          )}
        </S.Label>
      )}
      {((mode !== 'single' &&
        (filesAmount ? files.length < filesAmount : true)) ||
        files.length === 0) && (
        <S.UploaderContainer>
          {}
          <S.DropAreaContainer
            canUploadMore={mode !== 'single' && files.length > 0}
          >
            {}
            <input {...getInputProps()} data-testid="drop-area-input" />
            <>
              <Button
                {...getRootProps()}
                disabled={disabled}
                type="ghost-primary"
                mode="icon-label"
              >
                <Icon component={<Add3M />} size={24} />
                Add file
              </Button>
            </>
          </S.DropAreaContainer>
        </S.UploaderContainer>
      )}
      {files.length > 0 &&
        files.map((file, index) => (
          <FileViewItem
            key={file.file.lastModified}
            texts={texts as FileViewAvatarTexts}
            removable={removable}
            onRemove={(): void => onRemove && onRemove(file.file, index)}
            data={file}
            description={description}
          />
        ))}
      {hasError &&
        errors &&
        errors.map((errorText, index) => (
          <S.ErrorMessage key={index}>{errorText}</S.ErrorMessage>
        ))}
      {description && (
        <S.Description hasError={hasError}>{description}</S.Description>
      )}
    </S.Container>
  );
};

export default ItemUploader;

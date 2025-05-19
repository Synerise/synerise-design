import React from 'react';
import { useDropzone } from 'react-dropzone';

import Tooltip from '@synerise/ds-tooltip';
import Icon, { InfoFillS, Add3M, FileTypePictureL } from '@synerise/ds-icon';
import Button from '@synerise/ds-button';
import { useTheme } from '@synerise/ds-core';

import FileViewAvatar from './FileViewAvatar/FileViewAvatar';

import * as S from './AvatarUploader.styles';
import { FileViewAvatarTexts } from './FileViewAvatar/FileViewAvatar.types';
import { FileUploaderProps, FileContent } from '../FileUploader.types';

function readAsText(file: File): Promise<FileContent> {
  return new Promise(resolve => {
    // eslint-disable-next-line no-undef
    const reader = new FileReader();
    file.type !== 'text/plain' && resolve(null);
    reader.onerror = (): void => resolve(null);
    reader.onload = (): void => resolve(reader.result);

    reader.readAsText(file);
  });
}

const AvatarUploader = ({
  className,
  onUpload,
  disabled,
  accept,
  error,
  label,
  onRemove,
  description,
  tooltip,
  filesAmount,
  mode = 'single',
  removable = true,
  files = [],
  texts,
}: FileUploaderProps) => {
  const [uploadSuccess, setUploadSuccess] = React.useState(true);

  const theme = useTheme();

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
    [onUpload]
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
    [filesAmount, files, setUploadSuccess, readFilesContent]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: accept ? accept.join(',') : undefined,
    multiple: mode !== 'single',
    onDrop,
    disabled,
  });

  if (filesAmount && filesAmount < 1) {
    // eslint-disable-next-line no-param-reassign
    filesAmount = 1;
    throw new Error('Invalid value of property "filesAmount" ');
  }

  const hasError = Boolean(error) || !uploadSuccess;
  const [pressed, setPressed] = React.useState<boolean>(false);
  return (
    <S.Container className={`ds-file-avatar-uploader ${className || ''}`}>
      {label && (
        <S.Label>
          <span>{label}</span>
          {tooltip && (
            <Tooltip trigger="hover" placement="top" title={tooltip}>
              <span data-testid="tooltip-info">
                <Icon component={<InfoFillS />} color={theme.palette['grey-400']} size={24} />
              </span>
            </Tooltip>
          )}
        </S.Label>
      )}
      {files.length > 0 &&
        files.map((file, index) => (
          <FileViewAvatar
            key={file.file.lastModified}
            texts={texts as FileViewAvatarTexts}
            removable={removable}
            onRemove={(): void => onRemove && onRemove(file.file, index)}
            data={file}
            description={description}
          />
        ))}
      {((mode !== 'single' && (filesAmount ? files.length < filesAmount : true)) || files.length === 0) && (
        <S.UploaderContainer>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <S.DropAreaContainer {...getRootProps()} canUploadMore={mode !== 'single' && files.length > 0}>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <input {...getInputProps()} data-testid="drop-area-input" />

            <S.DropAreaButton
              type="button"
              mode={mode}
              disabled={disabled}
              isDropping={isDragActive}
              hasError={hasError}
              onMouseDown={(): void => setPressed(true)}
              onMouseUp={(): void => setPressed(false)}
              pressed={pressed}
              data-testid="drop-area"
              filesLength={files.length}
            >
              <>
                <Icon component={<FileTypePictureL />} size={48} />
              </>
            </S.DropAreaButton>
          </S.DropAreaContainer>
        </S.UploaderContainer>
      )}
      <div>
        {((mode !== 'single' && (filesAmount ? files.length < filesAmount : true)) || files.length === 0) && (
          <>
            <Button {...getRootProps()} disabled={disabled} type="secondary" mode="icon-label">
              <Icon component={<Add3M />} size={24} />
              Add file
            </Button>
            {description && <S.Description hasError={hasError}>{description}</S.Description>}
          </>
        )}
      </div>
    </S.Container>
  );
};

export default AvatarUploader;

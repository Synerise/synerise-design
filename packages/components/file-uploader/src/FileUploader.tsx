import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDropzone } from 'react-dropzone';

import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import AddM from '@synerise/ds-icon/dist/icons/AddM';
import ArrowDownCircleM from '@synerise/ds-icon/dist/icons/ArrowDownCircleM';
import InfoFillS from '@synerise/ds-icon/dist/icons/InfoFillS';

import FileView from './FileView/FileView';
import { FileContent, FileUploaderProps } from './FileUploader.types';
import * as S from './FileUploader.styles';

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

const FileUploader: React.FC<FileUploaderProps> = ({
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
  texts = {
    buttonLabel: <FormattedMessage id="DS.FILE-UPLOADER.BUTTON-LABEL" />,
    buttonDescription: <FormattedMessage id="DS.FILE-UPLOADER.BUTTON-DESC" />,
    size: <FormattedMessage id="DS.FILE-UPLOADER.SIZE" />,
    uploading: <FormattedMessage id="DS.FILE-UPLOADER.UPLOADING" />,
  },
}) => {
  const [uploadSuccess, setUploadSuccess] = React.useState(true);

  const readFilesContent = React.useCallback(
    (addedFiles: File[]) => {
      const readerPromises = addedFiles.map(
        (file): Promise<FileContent> => {
          return readAsText(file);
        }
      );
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
    [onUpload, filesAmount, files, setUploadSuccess, readFilesContent]
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
  const errors = hasError && !uploadSuccess ? [error].concat('To many files uploaded') : [error];
  return (
    <S.Container className={`ds-file-uploader ${className || ''}`}>
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
      {((mode !== 'single' && (filesAmount ? files.length < filesAmount : true)) || files.length === 0) && (
        <>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <S.DropAreaContainer {...getRootProps()} canUploadMore={mode !== 'single' && files.length > 0}>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <input {...getInputProps()} data-testid="droparea-input" />

            <S.DropAreaButton
              type="button"
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
      {hasError &&
        errors &&
        errors.map((errorText, index) => (
          <S.ErrorMessage
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          >
            {errorText}
          </S.ErrorMessage>
        ))}
      {description && <S.Description hasError={hasError}>{description}</S.Description>}
    </S.Container>
  );
};

export default FileUploader;

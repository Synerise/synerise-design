import * as React from 'react';
import { useDropzone } from 'react-dropzone';

import Icon from '@synerise/ds-icon';
import Add1M from '@synerise/ds-icon/dist/icons/Add1M';

import FileView, { FileViewTexts } from './FileView/FileView';
import * as S from './FileUploader.styles';

export interface FileUploaderProps {
  mode: 'single' | 'multi';
  description?: string;
  disabled?: boolean;
  label?: string;
  error?: string;
  files?: File[];
  accept?: string[];
  onChange?: (files: File[]) => void;
  texts: FileViewTexts & {
    buttonLabel: string;
  };
}

const FileUploader: React.FC<FileUploaderProps> = ({
  mode,
  onChange,
  disabled,
  accept,
  files,
  error,
  label,
  description,
  texts,
}) => {
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);

    onChange && onChange(acceptedFiles);
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: accept ? accept.join(',') : undefined,
    onDrop,
  });

  const hasError = !!error;

  return (
    <S.Container>
      {label && <S.Label>{label}</S.Label>}

      {files.length > 0 && files.map((file, index) => <FileView key={index} texts={texts} file={file} />)}

      {mode === 'single' && files.length === 0 && (
        <S.DropAreaContainer {...getRootProps()}>
          <input {...getInputProps()} />

          <S.DropAreaButton disabled={disabled} isDropping={isDragActive} hasError={hasError}>
            <Icon component={<Add1M />} size={24} />
            <S.DropAreaLabel>{texts.buttonLabel}</S.DropAreaLabel>
          </S.DropAreaButton>
        </S.DropAreaContainer>
      )}

      {hasError && <S.ErrorMessage>{error}</S.ErrorMessage>}
      {description && <S.Description hasError={hasError}>{description}</S.Description>}
    </S.Container>
  );
};

FileUploader.defaultProps = {
  mode: 'single',
  files: [],
  texts: {
    buttonLabel: 'Upload a new file or drag one here',
    size: 'Size:',
  },
};

export default FileUploader;

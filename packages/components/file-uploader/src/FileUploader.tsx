import * as React from 'react';
import { useDropzone } from 'react-dropzone';

import Icon from '@synerise/ds-icon';
import Add1M from '@synerise/ds-icon/dist/icons/Add1M';

import * as S from './FileUploader.styles';

export interface FileUploaderProps {
  mode: 'single' | 'multi';
  description?: string;
  disabled?: boolean;
  label?: string;
  error?: string;
  texts: {
    buttonLabel: string;
  };
}

const FileUploader: React.FC<FileUploaderProps> = ({ mode, disabled, error, label, description, texts }) => {
  const onDrop = React.useCallback((acceptedFiles: any[]) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <S.Container>
      {label && <S.Label>{label}</S.Label>}

      <S.DropAreaContainer {...getRootProps()}>
        <input {...getInputProps()} />

        <S.DropArea disabled={disabled} isDropping={isDragActive} hasError={!!error}>
          <Icon component={<Add1M />} size={24} />
          <S.DropAreaLabel>{texts.buttonLabel}</S.DropAreaLabel>
        </S.DropArea>
      </S.DropAreaContainer>

      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      {description && <S.Description hasError={!!error}>{description}</S.Description>}
    </S.Container>
  );
};

FileUploader.defaultProps = {
  mode: 'single',
  texts: {
    buttonLabel: 'Upload a new file or drag one here',
  },
};

export default FileUploader;

import * as React from 'react';
import { useDropzone } from 'react-dropzone';

import Typography from '@synerise/ds-typography';
import Icon from '@synerise/ds-icon';
import Add1M from '@synerise/ds-icon/dist/icons/Add1M';

import * as S from './FileUploader.styles';

export interface FileUploaderProps {
  mode: 'single' | 'multi';
  description?: string;
  label?: string;
  texts: {
    buttonLabel: string;
  };
}

const FileUploader: React.FC<FileUploaderProps> = ({ mode, label, description, texts }) => {
  const onDrop = React.useCallback((acceptedFiles: any[]) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <S.Container>
      {label && <S.Label>{label}</S.Label>}

      <S.DropAreaContainer {...getRootProps()}>
        <input {...getInputProps()} />

        {isDragActive ? (
          <span>Drop those</span>
        ) : (
          <S.DropArea>
            <Icon component={<Add1M />} size={24} color="#000" />
            <Typography.Text>{texts.buttonLabel}</Typography.Text>
          </S.DropArea>
        )}
      </S.DropAreaContainer>

      {description && <S.Description>{description}</S.Description>}
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

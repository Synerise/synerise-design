import * as React from 'react';
import * as S from './FileUploader.styles';

export interface FileUploaderProps {
  mode: 'single' | 'multiple';
  description?: string;
  label?: string;
  texts: {
    buttonLabel: string;
  };
}

const FileUploader: React.FC<FileUploaderProps> = ({ mode, label, description, texts }) => {
  return (
    <S.Container>
      {label && <S.Label>{label}</S.Label>}

      <div>
        <S.UploadButton type="ghost">{texts.buttonLabel}</S.UploadButton>
      </div>

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

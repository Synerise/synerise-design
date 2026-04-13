import React from 'react';

type MockFileUploaderProps = {
  children?: React.ReactNode;
  className?: string;
  onUpload?: (files: File[]) => void;
  accept?: string;
  disabled?: boolean;
  'data-testid'?: string;
};

type MockAvatarUploaderProps = {
  onUpload?: (files: File[]) => void;
  accept?: string;
  disabled?: boolean;
  'data-testid'?: string;
};

type MockItemUploaderProps = {
  onUpload?: (files: File[]) => void;
  accept?: string;
  disabled?: boolean;
  'data-testid'?: string;
};

export const mockFileUploader = () => {
  jest.mock('@synerise/ds-file-uploader', () => {
    const FileUploader = jest.fn(
      ({
        children,
        className,
        onUpload: _onUpload,
        accept,
        disabled,
        'data-testid': dataTestId,
      }: MockFileUploaderProps) => {
        const testId = dataTestId || 'ds-file-uploader';
        return (
          <div
            data-testid={testId}
            className={`ds-file-uploader ${className || ''}`}
            data-accept={accept}
            data-disabled={disabled}
          >
            {children}
          </div>
        );
      },
    );

    const AvatarUploader = jest.fn(
      ({
        onUpload: _onUpload,
        accept,
        disabled,
        'data-testid': dataTestId,
      }: MockAvatarUploaderProps) => {
        const testId = dataTestId || 'ds-avatar-uploader';
        return (
          <div
            data-testid={testId}
            className="ds-avatar-uploader"
            data-accept={accept}
            data-disabled={disabled}
          />
        );
      },
    );

    const ItemUploader = jest.fn(
      ({
        onUpload: _onUpload,
        accept,
        disabled,
        'data-testid': dataTestId,
      }: MockItemUploaderProps) => {
        const testId = dataTestId || 'ds-item-uploader';
        return (
          <div
            data-testid={testId}
            className="ds-item-uploader"
            data-accept={accept}
            data-disabled={disabled}
          />
        );
      },
    );

    return {
      __esModule: true,
      default: FileUploader,
      AvatarUploader,
      ItemUploader,
      FileUploaderStyles: {},
    };
  });
};

export const mockFileUploaderMinimal = () => {
  jest.mock('@synerise/ds-file-uploader', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    AvatarUploader: jest.fn(() => null),
    ItemUploader: jest.fn(() => null),
    FileUploaderStyles: {},
  }));
};

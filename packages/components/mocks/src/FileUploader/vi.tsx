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

/**
 * Factory function for FileUploader mock.
 * Mocks the entire @synerise/ds-file-uploader package including FileUploader, AvatarUploader, ItemUploader, and FileUploaderStyles.
 *
 * @example
 * ```typescript
 * import { fileUploaderMockFactory } from '@synerise/ds-mocks/FileUploader/vi';
 *
 * vi.mock('@synerise/ds-file-uploader', fileUploaderMockFactory);
 * ```
 */
export const fileUploaderMockFactory = () => {
  const FileUploader = vi.fn(
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

  const AvatarUploader = vi.fn(
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

  const ItemUploader = vi.fn(
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
    default: FileUploader,
    AvatarUploader,
    ItemUploader,
    FileUploaderStyles: {},
  };
};

/**
 * Factory function for minimal FileUploader mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-file-uploader', fileUploaderMinimalMockFactory);
 * ```
 */
export const fileUploaderMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  AvatarUploader: vi.fn(() => null),
  ItemUploader: vi.fn(() => null),
  FileUploaderStyles: {},
});

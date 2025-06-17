import React, { useState } from 'react';
import random from 'lodash/random';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { AvatarUploader, FileUploaderProps, FileWithContent, ExtendedFile } from '@synerise/ds-file-uploader';

import FileUploaderMeta from './FileUploader.stories';

type StoryProps = FileUploaderProps & {
  disabledFiles?: boolean;
  uploadError?: boolean;
};
type Story = StoryObj<StoryProps>;

const getFiles = (files: ExtendedFile[], options?: { error?: string; disabled?: boolean }) => {
  return files.map(file => ({ ...file, error: options?.error || undefined, disabled: options?.disabled || undefined }));
};
export default {
  ...FileUploaderMeta,
  title: 'Components/FileUploader/AvatarUploader',
  component: AvatarUploader,
  render: ({ disabledFiles, uploadError, ...args }) => {
    const [files, setFiles] = useState<Array<ExtendedFile>>([]);
    const clearProgress = newFiles => {
      setTimeout(() => {
        setFiles([...files, ...newFiles.map((file, index) => ({ file }))]);
      }, 4000);
    };
    const onUpload = (newFiles: FileWithContent[]) => {
      setFiles([]);
      const uploadedFiles: ExtendedFile[] = [
        ...files,
        ...newFiles.map((file, index) => ({ file, error: args.error, progress: random(0, 100) } as ExtendedFile)),
      ];
      setFiles(uploadedFiles);
      clearProgress(newFiles);
    };
    const onRemove = (_file: FileWithContent, fileIndex: number) => setFiles(files.filter((_file, index) => index !== fileIndex));
    const fileOptions = {
      disabled: disabledFiles,
      error: uploadError ? 'Error notification' : undefined,
    };
    return <AvatarUploader {...args} files={getFiles(files, fileOptions)} onRemove={onRemove} onUpload={onUpload} />;
  },
} as Meta<StoryProps>;

export const AvatarUploaderStory: Story = {
  name: 'AvatarUploader',
};

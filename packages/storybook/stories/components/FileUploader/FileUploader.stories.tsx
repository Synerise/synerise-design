import React, { useState } from 'react';
import random from 'lodash/random';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import FileUploader, { FileUploaderProps, ExtendedFile, FileWithContent } from '@synerise/ds-file-uploader';
import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  fixedWrapper300,
  NUMBER_CONTROL,
  REACT_NODE_AS_STRING,
  STRING_CONTROL,
} from '../../utils';

type StoryProps = FileUploaderProps & {
  disabledFiles?: boolean;
  uploadError?: boolean;
};
type Story = StoryObj<StoryProps>;

const getFiles = (files: ExtendedFile[], options?: { error?: string; disabled?: boolean }) => {
  return files.map(file => ({ ...file, error: options?.error || undefined, disabled: options?.disabled || undefined }));
};
export default {
  component: FileUploader,
  title: 'Components/FileUploader/FileUploader',
  tags: ['autodocs'],
  decorators: [fixedWrapper300],
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
    return <FileUploader {...args} files={getFiles(files, fileOptions)} onRemove={onRemove} onUpload={onUpload} />;
  },
  argTypes: {
    accept: STRING_CONTROL,
    className: CLASSNAME_ARG_CONTROL,
    disabled: BOOLEAN_CONTROL,
    error: STRING_CONTROL,
    description: STRING_CONTROL,
    label: STRING_CONTROL,
    files: { control: false },
    filesAmount: NUMBER_CONTROL,
    removable: BOOLEAN_CONTROL,
    removeTooltip: REACT_NODE_AS_STRING,
    retry: BOOLEAN_CONTROL,
    tooltip: STRING_CONTROL,

    disabledFiles: {
      table: {
        category: 'Preview only',
      },
      ...BOOLEAN_CONTROL,
    },
    uploadError: {
      table: {
        category: 'Preview only',
      },
      ...BOOLEAN_CONTROL,
    },
  },
  args: {},
} as Meta<StoryProps>;

export const Default: Story = {};
export const LabelAndDescription: Story = {
  args: {
    label: 'Label',
    description: 'Description',
    tooltip: 'Tooltip text'
  },
};
export const WithError: Story = {
  args: {
    label: 'Label',
    description: 'Description',
    error: 'Error text',
  },
};
export const MultipleMedium: Story = {
  args: {
    mode: 'multi-medium',
  },
};
export const MultipleLarge: Story = {
  args: {
    mode: 'multi-large',
  },
};

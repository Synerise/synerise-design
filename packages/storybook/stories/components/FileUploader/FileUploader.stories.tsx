import random from 'lodash/random';
import React, { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import FileUploader, {
  ExtendedFile,
  FileUploaderProps,
  FileWithContent,
} from '@synerise/ds-file-uploader';

import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  NUMBER_CONTROL,
  REACT_NODE_AS_STRING,
  STRING_CONTROL,
  fixedWrapper300,
} from '../../utils';

type StoryProps = FileUploaderProps & {
  disabledFiles?: boolean;
  uploadError?: boolean;
};
type Story = StoryObj<StoryProps>;

const getFiles = (
  files: ExtendedFile[],
  options?: { error?: string; disabled?: boolean },
) => {
  return files.map((file) => ({
    ...file,
    error: options?.error || undefined,
    disabled: options?.disabled || undefined,
  }));
};
export default {
  component: FileUploader,
  title: 'Components/FileUploader/FileUploader',
  tags: ['autodocs'],
  decorators: [fixedWrapper300],
  render: ({ disabledFiles, uploadError, ...args }) => {
    const [files, setFiles] = useState<Array<ExtendedFile>>([]);
    const clearProgress = (newFiles) => {
      setTimeout(() => {
        setFiles([...files, ...newFiles.map((file, index) => ({ file }))]);
      }, 4000);
    };
    const onUpload = (newFiles: FileWithContent[]) => {
      setFiles([]);
      const uploadedFiles: ExtendedFile[] = [
        ...files,
        ...newFiles.map(
          (file, index) =>
            ({
              file,
              error: args.error,
              progress: random(0, 100),
            }) as ExtendedFile,
        ),
      ];
      setFiles(uploadedFiles);
      clearProgress(newFiles);
    };
    const onRemove = (_file: FileWithContent, fileIndex: number) =>
      setFiles(files.filter((_file, index) => index !== fileIndex));
    const fileOptions = {
      disabled: disabledFiles,
      error: uploadError ? 'Error notification' : undefined,
    };
    return (
      <FileUploader
        {...args}
        files={getFiles(files, fileOptions)}
        onRemove={onRemove}
        onUpload={onUpload}
      />
    );
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
    hideSize: BOOLEAN_CONTROL,
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
    tooltip: 'Tooltip text',
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
// Inline so the Chromatic baseline does not depend on a third-party host.
const STORED_ICON_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E" +
  "%3Crect width='64' height='64' fill='%234a90d9'/%3E" +
  "%3Ccircle cx='32' cy='24' r='10' fill='%23fff'/%3E" +
  "%3Cpath d='M12 60c4-12 12-18 20-18s16 6 20 18z' fill='%23fff'/%3E%3C/svg%3E";

// A file already stored elsewhere: the consumer has its url but not its bytes, so `file` is just a
// named placeholder and `previewUrl` supplies the thumbnail. `hideSize` keeps the row from
// reporting 0 B.
export const StoredFile: Story = {
  args: {
    label: 'Integration icon',
    hideSize: true,
  },
  render: (args) => (
    <FileUploader
      {...args}
      mode="single"
      files={[
        {
          file: new File([], 'stored-icon.png', { type: 'image/png' }),
          previewUrl: STORED_ICON_URL,
        },
      ]}
    />
  ),
};

// The mixed case: one stored file and one the user just picked. The thumbnail is sized to the
// glyph footprint of each variant, so both rows should read as one list rather than two shapes.
export const StoredAndLocalFile: Story = {
  args: {
    label: 'Integration icons',
    hideSize: true,
  },
  render: (args) => (
    <FileUploader
      {...args}
      mode="multi-medium"
      files={[
        {
          file: new File([], 'stored-icon.png', { type: 'image/png' }),
          previewUrl: STORED_ICON_URL,
        },
        { file: new File(['local'], 'picked-icon.png', { type: 'image/png' }) },
      ]}
    />
  ),
};

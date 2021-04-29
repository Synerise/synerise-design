import * as React from 'react';
import random from 'lodash/random';
import { boolean, text, select, number, array } from '@storybook/addon-knobs';

import FileUploader from '@synerise/ds-file-uploader';

const getDefaultProps = () => ({
  label: text('Label', 'Label'),
  description: text('Description', 'Description'),
  tooltip: text('Informational tooltip text', 'Test Tooltip'),
  removeTooltip: text('Remove tooltip', 'Clear'),
  buttonLabel: text('Button label', 'Upload a new file or drop one here'),
  buttonDescription: text('Button description', 'Drag and drop your files here, or browses'),
  size: text('Preview size label', 'Size:'),
  okText: 'Yes',
  cancelText: 'No',
  removeConfirmTitle: 'Are you sure to remove this file ?',
  fileWeight: '1.3MB/2.3MB',
  percent: '60',
  disabled: boolean('disabled', false),
  mode: select(
    'Mode',
    {
      single: 'single',
      'multi-medium': 'multi-medium',
      'multi-large': 'multi-large',
    },
    'single'
  ),
  filesAmount: number('Uploading files amount', 1),
  removable: boolean('Allow to remove uploaded files', true),
  error: text('Error message', undefined),
  accept: array('Accepted mime types (comma separated)', ['image/png, image/svg+xml, text/plain']),
  testFileError: boolean('Display preview error example', false),
  testFileDisable: boolean('Display disabled preview example', false),
  testFileProgress: boolean('Display upload progress bar example', false),
  testFileSuccess: boolean('Display upload success example', false),
});

const stories = {
  Uploader: () => {
    const [files, setFiles] = React.useState([]);
    const {
      testFileError,
      testFileProgress,
      testFileDisable,
      testFileSuccess,
      okText,
      cancelText,
      removeConfirmTitle,
      fileWeight,
      percent,
      disabled,
      buttonLabel,
      buttonDescription,
      size,
      removeTooltip,
      ...rest
    } = getDefaultProps();

    const texts = {
      buttonLabel,
      buttonDescription,
      size,
      okText,
      cancelText,
      fileWeight,
      percent,
      removeConfirmTitle,
      removeTooltip,
    };

    const getFiles = () => {
      if (testFileError) {
        return files.map(f => ({ ...f, error: 'Error notification' }));
      }

      if (testFileDisable) {
        return files.map(f => ({ ...f, disabled: true }));
      }

      if (testFileProgress) {
        return files.map(f => ({ ...f, progress: random(0, 100) }));
      }
      if (testFileSuccess) {
        return files.map(f => ({ ...f, success: true }));
      }
      return files;
    };

    return (
      <div style={{ margin: 24, width: 540, padding: 24, backgroundColor: 'white' }}>
        <FileUploader
          {...rest}
          files={getFiles()}
          texts={texts}
          onUpload={newFiles => {
            setFiles([...files, ...newFiles.map((file, index) => ({ file }))]);
          }}
          onRemove={(rf, rfi) => setFiles(files.filter((f, i) => i !== rfi))}
        />
      </div>
    );
  },
};

export default {
  name: 'Uploader/Uploader',
  stories,
  Component: FileUploader,
};

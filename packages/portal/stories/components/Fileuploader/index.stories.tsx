import * as React from 'react';
import random from 'lodash/random';
import { boolean, text, select, number, array } from '@storybook/addon-knobs';

import { DSProvider } from '@synerise/ds-core';
import FileUploader from '@synerise/ds-file-uploader';

const getDefaultProps = () => ({
  label: text('Label', 'File upload'),
  description: text('Description', 'Only pictures of cats are allowed'),
  infoTooltip: text('Informational tooltip text', ''),
  buttonLabel: text('Button label', 'Upload a new file or drop one here'),
  buttonDescription: text('Button description', 'Upload button description'),
  size: text('Preview size label', 'Size:'),
  uploading: text('Uploading label', 'Uploading...'),
  mode: select('Mode', {
    single: 'single',
    'multi-medium': 'multi-medium',
    'multi-large': 'multi-large'
  }, 'multi-large'),
  disabled: boolean('Disabled', false),
  removable: boolean('Allow to remove uploaded files', true),
  error: text('Error message', ''),
  accept: array('Accepted mime types (comma seperated)', ['image/png, image/svg+xml']),
  testFileError: boolean('Display preview error example', false),
  testFileDisable: boolean('Display disabled preview example', false),
  testFileProgress: boolean('Display upload progress bar example', false),
});

const stories = {
  single: () => {
    const [files, setFiles] = React.useState([]);
    const { testFileError, testFileProgress, testFileDisable, uploading, buttonLabel, buttonDescription, size, ...rest } = getDefaultProps();

    const texts = {
      buttonLabel,
      buttonDescription,
      size,
      uploading,
    };

    const getFiles = () => {
      if (testFileError) {
        return files.map(f => ({ ...f, error: 'Our AI could not detect the cat' }));
      }

      if (testFileDisable) {
        return files.map(f => ({ ...f, disabled: true }));
      }

      if (testFileProgress) {
        return files.map(f => ({ ...f, progress: random(0, 100) }));
      }

      return files;
    };

    return (
      <DSProvider code="en_GB">
        <div style={{ margin: 24, width: 340 }}>
          <FileUploader
            {...rest}
            files={getFiles()}
            texts={texts}
            onUpload={newFiles => setFiles([...files, ...newFiles.map(file => ({ file }))])}
            onRemove={(rf, rfi) => setFiles(files.filter((f, i) => i !== rfi))}
          />
        </div>
      </DSProvider>
    );
  }
}

export default {
  name: 'Components|FileUploader',
  stories,
  Component: FileUploader,
};
  
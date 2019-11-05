import * as React from 'react';
import { boolean, text, select, number, array } from '@storybook/addon-knobs';

import { DSProvider } from '@synerise/ds-core';
import FileUploader from '@synerise/ds-file-uploader';

const getDefaultProps = () => ({
  label: text('Label', 'File upload'),
  description: text('Description', 'Only pictures of cats are allowed'),
  buttonLabel: text('Button label', 'Upload a new file or drop one here'),
  size: text('Preview size label', 'Size:'),
  mode: select('Mode', {
    single: 'single',
    multi: 'multi'
  }, 'single'),
  disabled: boolean('Disabled', false),
  error: text('Error message', ''),
  accept: array('Accepted mime types (comma seperated)', ['image/png, image/svg+xml']),
  testFileError: boolean('Display preview error example', false),
  testFileDisable: boolean('Display disabled preview example', false),
});

const stories = {
  single: () => {
    const [files, setFiles] = React.useState([]);
    const { testFileError, testFileDisable, buttonLabel, size, ...rest } = getDefaultProps();

    const texts = {
      buttonLabel,
      size,
    };

    const getFiles = () => {
      if (testFileError) {
        return files.map(f => ({ ...f, error: 'Our AI could not detect the cat' }));
      }

      if (testFileDisable) {
        return files.map(f => ({ ...f, disabled: true }));
      }

      return files;
    };

    console.dir(getFiles())

    return (
      <DSProvider code="en_GB">
        <div style={{ margin: 24, width: 340 }}>
          <FileUploader {...rest} files={getFiles()} onChange={newFiles => setFiles(newFiles.map(file => ({ file })))} texts={texts} />
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
  
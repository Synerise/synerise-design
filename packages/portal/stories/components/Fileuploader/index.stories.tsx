import * as React from 'react';
import { boolean, text, select, number } from '@storybook/addon-knobs';

import { DSProvider } from '@synerise/ds-core';
import FileUploader from '@synerise/ds-file-uploader';

const getDefaultProps = () => ({
  label: text('Label', 'File upload'),
  description: text('Description', 'Only pictures of cats are allowed'),
  buttonLabel: text('Button label', 'Upload a new file or drop one here'),
  mode: select('Mode', {
    single: 'single',
    multi: 'multi'
  }, 'single'),
  disabled: boolean('Disabled', false),
  error: text('Error message', ''),
});

const stories = {
  single: () => {
    const { buttonLabel, ...rest } = getDefaultProps();

    const texts = {
      buttonLabel,
    };

    return (
      <DSProvider code="en_GB">
        <div style={{ margin: 24, width: 340 }}>
          <FileUploader {...rest} texts={texts} />
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
  
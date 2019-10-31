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
});

const stories = {
  single: () => {
    const props = getDefaultProps();

    const texts = {
      buttonLabel: props.buttonLabel,
    };

    return (
      <DSProvider code="en_GB">
        <div style={{ margin: 24 }}>
          <FileUploader {...props} texts={texts} />
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
  
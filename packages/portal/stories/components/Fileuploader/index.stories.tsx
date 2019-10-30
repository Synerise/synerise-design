import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select, number } from '@storybook/addon-knobs';

import { DSProvider } from '@synerise/ds-core';
import FileUploader from '@synerise/ds-file-uploader';

storiesOf('Components|FileUploader', module)
  .add('default', () => {
    const label = text('Label', 'File upload');
    const description = text('Description', 'Only pictures of cats are allowed');
    const buttonLabel = text('Button label', 'Upload a new file or drop one here');

    const mode = select('Mode', {
      single: 'single',
      multi: 'multi'
    }, 'single');

    const texts = {
      buttonLabel,
    };

    return (
      <DSProvider code="en_GB">
        <div style={{ margin: 24 }}>
          <FileUploader mode={mode} label={label} description={description} texts={texts} />
        </div>
      </DSProvider>
    );
  });
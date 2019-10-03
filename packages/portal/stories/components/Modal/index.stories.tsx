import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text, number } from '@storybook/addon-knobs';
import { DSProvider } from '@synerise/ds-core';
import Button from '@synerise/ds-button';
import Modal from '@synerise/ds-modal';

const props = () => ({
  wrapClassName: 'custom-class',
  visible: boolean('Open', true),
  title: text('Title text', 'Modal heading'),
  description: text('Description text', 'Modal description'),
  cancelText: text('Cancel text', 'Cancel'),
  okText: text('OK text', 'OK'),
  width: number('Width', 600),
  okType: text('OK style type', 'primary'),
  zIndex: number('zIndex', 1),
  closable: boolean('(x) button is visible on top right', true),
  confirmLoading: boolean('Loading visual effect', false),

  onOk: action('onOk CLICK'),
  onCancel: action('onCancel CLICK'),
  showHeaderAction: boolean('Show example of an additional header button', false),
});

storiesOf('Components|Modal', module)
  .add('default', () => {
    return (
      <DSProvider code="en_GB">
        <Modal
          {...props()}
          headerActions={
            props().showHeaderAction &&
              <Button type="ghost" onClick={() => window.alert('You just clicked on an additional header button')}>
                Additional Button
              </Button>
          }
        >
          Some contents...
        </Modal>
      </DSProvider>
    )
});

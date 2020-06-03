import Modal from '@synerise/ds-modal/dist/Modal';
import { action } from '@storybook/addon-actions';
import * as React from 'react';

const blank = () => (
  <Modal closable={true} visible={true} size={'small'} footer={null} blank onCancel={action('Cancel')}>
    <div style={{ height: 362 }}></div>
  </Modal>
);
export default blank;
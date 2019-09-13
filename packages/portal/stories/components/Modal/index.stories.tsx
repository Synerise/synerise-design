import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text, number } from '@storybook/addon-knobs';
import Modal from '@synerise/ds-modal';

import { Welcome } from '@storybook/react/demo';

const props = () => ({
    wrapClassName: 'custom-class',
    visible: boolean('Open', true),
    title: text('Title text', 'Modal heading'),
    cancelText: text('Cancel text', 'Cancel'),
    okText: text('OK text', 'OK'),
    width: number('Width', 600),
    okType: text('OK style type', 'primary'),
    zIndex: number('zIndex', 1),
    closable: boolean('(x) button is visible on top right', true),
    confirmLoading: boolean('Loading visual effect', false),

    onOk: action('onOk CLICK'),
    onCancel: action('onCancel CLICK'),
});

storiesOf('Components|Modal', module)
    .add('default', () => {
    return (
        <Modal {...props()}>
            <p>Some contents...</p>
        </Modal>
    )
});

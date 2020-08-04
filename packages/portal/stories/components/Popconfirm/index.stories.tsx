import * as React from 'react';
import { text, boolean, select, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Popconfirm from '@synerise/ds-popconfirm';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { WarningFillM } from '@synerise/ds-icon/dist/icons';

const decorator = storyFn => <div style={{ padding: 40 }}>{storyFn()}</div>;

const typeOptions = ['default', 'primary', 'ghost', 'dashed', 'danger', 'link', 'success', 'flat', 'warning'] as const;

const placements = [
  'top',
  'left',
  'right',
  'bottom',
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
  'leftTop',
  'leftBottom',
  'rightTop',
  'rightBottom',
] as const;

const triggers = ['hover', 'focus', 'click', 'contextMenu'] as const;

const getDefaultProps = () => ({
  cancelText: text('cancelText', 'No'),
  okText: text('okText', 'Yes'),
  okType: select('Set type', typeOptions, 'primary'),
  title: text('Set title', 'Are you sure to delete this item and move to the next category'),
  onCancel: action('onCancel Clicked'),
  onConfirm: action('onConfirm Clicked'),
  disabled: boolean('disabled', false),
  placement: select('placement', placements, 'top'),
  onVisibleChange: action('onVisibilityChange'),
  mouseEnterDelay: number('mouseEnterDelay', 250),
  mouseLeaveDelay: number('mouseLeaveDelay', 250),
  trigger: select('trigger', triggers, 'click'),
});

const stories = {
  default: () => {
    return (
      <>
        <Popconfirm
          {...getDefaultProps()}
          icon={<Icon component={<WarningFillM />} color='#ffc300' />}
        >
          <Button>Click me</Button>
        </Popconfirm>
      </>
    );
  },
  withDescription: () => {
    return (
      <>
        <Popconfirm
          {...getDefaultProps()}
          description={text('Set description', 'This is popconfirm modal example with simple body text here')}
          icon={<Icon component={<WarningFillM />} color='#ffc300' />}
        >
          <Button>Click me</Button>
        </Popconfirm>
      </>
    );
  },
  withImages: () => {
    return (
      <>
        <Popconfirm
          {...getDefaultProps()}
          description={text('Set description', 'This is popconfirm modal example with simple body text here')}
          icon={<Icon component={<WarningFillM />} color='#ffc300' />}
          images={['https://cdn.pixabay.com/photo/2013/11/28/10/36/road-220058_960_720.jpg', 'https://cdn.pixabay.com/photo/2015/07/09/22/45/tree-838667_960_720.jpg', 'https://cdn.pixabay.com/photo/2015/07/05/10/18/tree-832079_960_720.jpg']}
        >
          <Button>Click me</Button>
        </Popconfirm>
      </>
    );
  },
  confirmMessage: () => {
    return (
      <Popconfirm.ConfirmMessage
        title='Copied! Keep it somewhere safe.'
        icon={<Icon component={<WarningFillM />} color={'#ffc300'} />}
        displayDuration={number('Set confirm message display time', 2000)}
        placement={select('Placement', placements, 'topLeft')}
        onClick={(showMessage) => {showMessage()}}
      >
        <Button>
          Click to show ConfirmMessage!
        </Button>
      </Popconfirm.ConfirmMessage>
    )
  }
};

export default {
  name: 'Components|Popconfirm',
  decorator,
  stories,
  Component: Popconfirm,
};

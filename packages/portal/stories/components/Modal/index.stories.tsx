import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, text, select, number } from '@storybook/addon-knobs';
import Modal from '@synerise/ds-modal';
import blank from './blank/blank';
import defaultStory from './defaultStory/defaultStory';
import withHeaders from './withHeaders/withHeaders';

export const sizes = {
  Auto: null,
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
  'Extra Large': 'extraLarge',
  'Full size':'fullSize'
};

export const bodyBackgroundColors = {
  White: 'white',
  Grey: 'grey',
};

export const propsWithKnobs = () => ({
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
  onClose: action('onClose CLICK'),
  onOk: action('onOk CLICK'),
  onCancel: action('onCancel CLICK'),
  showHeaderAction: boolean('Show example of an additional header button', true),
  renderCustomFooter: boolean('Render custom footer', true),
  removeFooter: boolean('Render without footer', false),
  size: select('Size', sizes, null),
  bodyBackground: select('Body background color', bodyBackgroundColors, bodyBackgroundColors.White),
});

const stories = {
  default:defaultStory,
  blank,
  withHeaders,
};

export default {
  name: 'Components|Modal',
  stories,
  Component: Modal,
};

import * as React from 'react';
import { text, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import InputNumber from "@synerise/ds-input-number";

const stories = {
  default: () => ({
    min: number('min', 1),
    max: number('max', 10),
    defaultValue: number('defaultValue', 3),
    onChange: action('onChange'),
    label: text('label', 'Label'),
    description: text('description', 'Description'),
    errorText: text('errorText', 'Error'),
  }),
};

export default {
  name: 'Components|InputNumber',
  stories,
  Component: InputNumber,
};

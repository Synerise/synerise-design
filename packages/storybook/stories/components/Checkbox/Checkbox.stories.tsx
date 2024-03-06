import * as React from 'react';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Checkbox from '@synerise/ds-checkbox';
import CheckboxSkeleton from '@synerise/ds-skeleton/dist/CheckboxSkeleton/CheckboxSkeleton';
import { CheckboxProps } from '@synerise/ds-checkbox/dist/Checkbox.types';

export default {
  title: 'Components/Checkbox/Checkbox',
  component: Checkbox,
};

export const Default = (args: JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<Checkbox> & Readonly<CheckboxProps> & Readonly<{ children?: React.ReactNode; }>) => <Checkbox {...args} />;
Default.args = {
  onChange: action('changed'),
  disabled: boolean('Disabled', false),
  indeterminate: boolean('Set indeterminate state of checkbox', false),
  description: text('Set description', ''),
  errorText: text('Set error message', ''),
  hasError: boolean('Has error', false),
  children: text('Set checkbox label', 'Label'),
};

export const Solo = (args: JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<Checkbox> & Readonly<CheckboxProps> & Readonly<{ children?: React.ReactNode; }>) => <Checkbox {...args} />;
Solo.args = {
  onChange: action('changed'),
  disabled: boolean('Disabled', false),
  hasError: boolean('Has error', false),
  indeterminate: boolean('Set indeterminate state of checkbox', false),
};

export const Group = (args: []) => (
  <Checkbox.Group {...args}>
    <Checkbox
      disabled={boolean('Disabled', false)}
      hasError={boolean('Has error', false)}
      indeterminate={boolean('Set indeterminate state of checkbox', false)}
      description={text('Set description', 'Description')}
      errorText={text('Set error message', '')}
      value="A"
    >
      {text('children', 'Label')}
    </Checkbox>
    <Checkbox
      disabled={boolean('Disabled', false)}
      hasError={boolean('Has error', false)}
      indeterminate={boolean('Set indeterminate state of checkbox', false)}
      description={text('Set description', 'Description')}
      errorText={text('Set error message', '')}
      value="B"
    >
      {text('Set checkbox label', 'Label')}
    </Checkbox>
  </Checkbox.Group>
);

export const CheckboxSkeletonStory = () => <CheckboxSkeleton size='M'/>;
CheckboxSkeletonStory.storyName = 'Checkbox Skeleton';
{
  import * as React from 'react';
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import {
    SubtleFieldProps,
    SubtleFormSubComponents
  } from './SubtleForm.types';
  import {
    SubtleTextAreaProps
  } from './Elements/TextArea/TextArea.types';
  import {
    SubtleSelectProps
  } from './Elements/Select/Select.types';
  import {
    SubtleDatePickerProps
  } from './Elements/DatePicker/DatePicker.types';
  import SubtleTextArea from './Elements/TextArea/TextArea';
  import SubtleSelect from './Elements/Select/Select';
  import SubtleDatePicker from './Elements/DatePicker/DatePicker';
  import SubtleField from './Elements/Field/Field';
  import SubtleInput from './Elements/Input/Input';
  import {
    SubtleInputProps
  } from './Elements/Input/Input.types';
  const meta: Meta < React.FC & SubtleFormSubComponents > = {
    title: 'SubtleForm',
    component: SubtleForm
  };
  export default meta;
  const excludedProps = [];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < React.FC & SubtleFormSubComponents > ;
  const StoryTemplate: Story = {
    render: (args) => SubtleForm(args)
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      //add component's props
    }
  }
}
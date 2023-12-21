{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import React, {
    Children
  } from 'react';
  import Input from 'antd/lib/input';
  import * as InputStyles from './Input.styles';
  import * as S from './InputGroup.styles';
  import Label from './Label/Label';
  import {
    Props
  } from './InputGroup.types';
  const meta: Meta < Props > = {
    title: 'InputGroup',
    component: InputGroup,
  };
  export default meta;
  const excludedProps = [];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < Props > ;
  const StoryTemplate: Story = {
    render: (args) => <InputGroup {...args} />,
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      children: [<Input key="1" placeholder="Input 1" />, <Input key="2" placeholder="Input 2" />, <Input key="3" placeholder="Input 3" />, ],
      label: 'InputGroup',
      errors: ['Error 1', 'Error 2'],
      description: 'Some description',
      resetMargin: false,
      tooltip: 'Tooltip text',
    },
  };
}
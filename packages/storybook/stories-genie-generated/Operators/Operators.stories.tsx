import type {
  Meta,
  StoryObj
} from '@storybook/react';
import React from 'react';
import Operators, {
  OperatorsProps
} from './Operators';
const meta: Meta < OperatorsProps > = {
  title: 'Components/Operators',
  component: Operators,
};
export default meta;
const excludedProps = ['onChange'];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < OperatorsProps > ;
const StoryTemplate: Story = {
  render: (args) => (<div style={{ padding: '24px 16px', background: '#fff' }}>
      <Operators {...args} />
    </div>),
};
export const Primary = {
  ...StoryTemplate,
  args: {},
};
import type {
  Meta,
  StoryObj
} from '@storybook/react';
import Condition, {
  ConditionProps
} from './Condition';
const meta: Meta < ConditionProps > = {
  title: 'Components/Condition',
  component: Condition,
};
export default meta;
const excludedProps = [
  // add any excluded props here
];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < ConditionProps > ;
const StoryTemplate: Story = {
  render: (args) => <Condition {...args} />,
};
export const Primary = {
  ...StoryTemplate,
  args: {
    // add props here
  },
};
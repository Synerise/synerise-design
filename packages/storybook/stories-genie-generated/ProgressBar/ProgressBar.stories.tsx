import type {
  Meta,
  StoryObj
} from '@storybook/react';
import ProgressBar from './ProgressBar';
const meta: Meta = {
  title: 'ProgressBar',
  component: ProgressBar,
};
export default meta;
const excludedProps = ['className', 'containerStyles', 'labelFormatter'];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < typeof ProgressBar > ;
const StoryTemplate: Story = {
  render: (args) => <ProgressBar {...args} />,
};
export const Primary = {
  ...StoryTemplate,
  args: {
    showLabel: true,
    description: 'Progress',
    amount: 50,
    percent: 50,
    type: 'line',
    status: 'normal',
    strokeColor: '#76dc25',
    strokeLinecap: 'round',
    className: '',
    thick: false,
    labelFormatter: undefined,
    containerStyles: undefined,
    maxPercent: true,
  },
};
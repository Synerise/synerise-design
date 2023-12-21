import type {
  Meta,
  StoryObj
} from '@storybook/react';
import Tooltip, {
  TooltipProps
} from './Tooltip';
const meta: Meta < TooltipProps > = {
  title: 'Tooltip',
  component: Tooltip,
};
export default meta;
const excludedProps = ['render'];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < TooltipProps > ;
const StoryTemplate: Story = {
  render: (args) => <Tooltip {...args} />,
};
export const Default = {
  ...StoryTemplate,
  args: {
    type: 'default',
    title: 'Default Tooltip',
    status: 'In Progress',
    description: 'This is a default tooltip',
  },
};
export const Icon = {
  ...StoryTemplate,
  args: {
    type: 'icon',
    title: 'Icon Tooltip',
    status: 'Completed',
    description: 'This is a tooltip with an icon',
  },
};
export const Button = {
  ...StoryTemplate,
  args: {
    type: 'button',
    title: 'Button Tooltip',
    status: 'Pending',
    description: 'This is a tooltip with a button',
    button: {
      label: 'Click Me',
      onClick: () => alert('Button clicked'),
    },
  },
};
export const Tutorial = {
  ...StoryTemplate,
  args: {
    type: 'tutorial',
    title: 'Tutorial Tooltip',
    tutorials: [{
      title: 'Step 1',
      description: 'This is tutorial step 1',
    }, {
      title: 'Step 2',
      description: 'This is tutorial step 2',
    }, ],
  },
};
export const LargeScrollable = {
  ...StoryTemplate,
  args: {
    type: 'largeScrollable',
    title: 'Large Scrollable Tooltip',
    description: 'This is a large scrollable tooltip',
  },
};
export const LargeSimple = {
  ...StoryTemplate,
  args: {
    type: 'largeSimple',
    title: 'Large Simple Tooltip',
    description: 'This is a large simple tooltip',
  },
};
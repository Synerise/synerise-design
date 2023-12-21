import type {
  Meta,
  StoryObj
} from '@storybook/react';
import ColumnManager from './ColumnManager';
const meta: Meta < ColumnManagerProps > = {
  title: 'ColumnManager',
  component: ColumnManager,
};
export default meta;
const excludedProps = ['intl'];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < ColumnManagerProps > ;
const StoryTemplate: Story = {
  render: (args) => <ColumnManager {...args} />,
};
export const Primary = {
  ...StoryTemplate,
  args: {
    visible: true,
    hide: () => {},
    itemFilterConfig: {},
    savedViewsVisible: true,
    columns: [],
  }
}
import type {
  Meta,
  StoryObj
} from '@storybook/react';
import List, {
  ListPropsType
} from './List'; //import component
const meta: Meta < ListPropsType < T >> = {
  title: 'List',
  component: List,
};
export default meta;
const excludedProps = ['dataSource', 'radio', 'options', 'dashed'];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < ListPropsType < T >> ;
const StoryTemplate: Story = {
  render: (args) => <List {...args} />, //render component
};
export const Primary = {
  ...StoryTemplate,
  args: {
    dataSource: [
      ['Item 1', 'Item 2', 'Item 3'],
      ['Item 4', 'Item 5', 'Item 6'],
    ],
    radio: true,
    options: {
      defaultValue: 'Item 1',
    },
    dashed: true,
  },
};
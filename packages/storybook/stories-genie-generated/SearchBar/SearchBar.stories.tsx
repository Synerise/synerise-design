import type {
  Meta,
  StoryObj
} from '@storybook/react';
import SearchBar, {
  SearchBarProps
} from './SearchBar';
const meta: Meta < SearchBarProps > = {
  title: 'SearchBar',
  component: SearchBar,
};
export default meta;
const excludedProps = ['className', 'borderRadius', 'handleInputRef', 'autofocusDelay'];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < SearchBarProps > ;
const StoryTemplate: Story = {
  render: (args) => <SearchBar {...args} />,
};
export const Primary = {
  ...StoryTemplate,
  args: {
    value: 'search term',
    onSearchChange: () => {},
    onClearInput: () => {},
    placeholder: 'Search',
    iconLeft: null,
    autofocus: false,
    clearTooltip: 'Clear',
    disabled: false,
    borderRadius: '4px',
    handleInputRef: () => {},
    autofocusDelay: false,
  },
};
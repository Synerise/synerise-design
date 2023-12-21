import React from 'react';
import ContextSelector from './ContextSelector';
import type {
  Meta,
  Story
} from '@storybook/react';
const meta: Meta = {
  title: 'Storybook/ContextSelector',
  component: ContextSelector,
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type StoryProps = React.ComponentProps < typeof ContextSelector > ;
type ContextSelectorStory = Story < StoryProps > ;
const Template: ContextSelectorStory = (args) => <ContextSelector {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  defaultDropdownVisibility: false,
  selectedItem: null,
  onSelectItem: () => {},
  onSetGroup: null,
  groups: [],
  items: [],
  texts: {},
  opened: false,
  addMode: false,
  loading: false,
  customTriggerComponent: null,
  trigger: ['click'],
  menuItemHeight: 0,
  dropdownWrapperStyles: {},
  onClickOutsideEvents: [],
  onClickOutside: () => {},
  onSearch: () => {},
  hasMoreItems: false,
  onFetchData: () => {},
  onActivate: () => {},
  onDeactivate: () => {},
  onOpen: () => {},
  getPopupContainerOverride: null,
  type: '',
  dropdownProps: {},
  disabled: false,
  errorText: '',
  readOnly: false,
  getMenuEntryProps: null,
};
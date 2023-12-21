{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import ItemsRoll from '../ItemsRoll';
  const meta: Meta = {
    title: 'Components/ItemsRoll',
    component: ItemsRoll,
  };
  export default meta;
  const excludedProps = [];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < typeof ItemsRoll > ;
  const StoryTemplate: Story = {
    render: (args) => <ItemsRoll {...args} />,
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      actions: [],
      changeSelectionIcon: 'icon',
      changeSelectionDropdownProps: [],
      className: '',
      customSidebarActions: [],
      groups: [],
      hideSearch: false,
      items: [],
      maxToShowItems: 10,
      onClearAll: () => {},
      onChangeSelection: () => {},
      onItemClick: () => {},
      onItemRemove: () => {},
      onSearchClear: () => {},
      onSearch: () => {},
      searchValue: '',
      searchPlaceholder: '',
      showMoreStep: 10,
      style: {},
      texts: null,
      useFooter: true,
      useVirtualizedList: false,
      virtualizedRowWidth: 0,
      virtualizedRowHeight: 0,
    },
  };
}
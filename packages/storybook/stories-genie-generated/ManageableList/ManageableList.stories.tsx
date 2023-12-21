import type {
  Meta,
  StoryObj
} from '@storybook/react';
import ManageableList, {
  ManageableListProps
} from './ManageableList';
const meta: Meta < ManageableListProps > = {
  title: 'Manageable List',
  component: ManageableList,
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < ManageableListProps > ;
const StoryTemplate: Story = {
  render: (args) => <ManageableList {...args} />,
};
export const Primary = {
  ...StoryTemplate,
  args: {
    className: 'storybook-manageable-list',
    onItemAdd: () => {},
    onItemSelect: () => {},
    onItemDuplicate: () => {},
    onItemRemove: () => {},
    onItemEdit: () => {},
    onChangeOrder: () => {},
    items: [],
    maxToShowItems: 5,
    loading: false,
    type: ListType.DEFAULT,
    addButtonDisabled: false,
    changeOrderDisabled: false,
    greyBackground: false,
    placeholder: 'Add an item',
    selectedItemId: '',
    searchQuery: '',
    expanderDisabled: false,
    onExpand: () => {},
    expandedIds: [],
    texts: {},
    changeOrderByButtons: false,
    additionalActions: [],
    style: {},
  },
};
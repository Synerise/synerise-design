import type {
  Meta,
  StoryObj
} from '@storybook/react';
import Cascader from './Cascader';
const meta: Meta < typeof Cascader > = {
  title: "Cascader",
  component: Cascader
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < typeof Cascader > ;
const StoryTemplate: Story = {
  render: (args) => <Cascader {...args} />
};
export const Primary = {
  ...StoryTemplate,
  args: {
    rootCategory: {
      id: "1",
      name: "Synerise"
    },
    searchClearTooltip: "Clear search query",
    searchInputPlaceholder: "Search for a category",
    onCategorySelect: (item, isSelected) => console.log(`Item ${item.name} was ${isSelected ? "selected" : "deselected"}`),
    categorySuffix: [{
      id: '3',
      name: 'QA'
    }, {
      id: '4',
      name: 'DevOps'
    }],
    maxHeight: 400,
    contentStyles: {
      height: "100px"
    },
    selectedCategoriesIds: [2]
  }
}
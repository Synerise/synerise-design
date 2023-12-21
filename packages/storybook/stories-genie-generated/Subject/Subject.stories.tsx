{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import Subject from '../Subject';
  const meta: Meta = {
    title: 'Subject',
    component: Subject,
  };
  export default meta;
  const excludedProps = ['onActivate', 'onDeactivate'];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < typeof Subject > ;
  const StoryTemplate: Story = {
    render: (args) => <Subject {...args} />,
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      selectedItem: 'item 1',
      iconPlaceholder: 'icon',
      items: ['item 1', 'item 2', 'item 3'],
      placeholder: 'Select item',
      onSelectItem: (item: string) => console.log(`Selected item: ${item}`),
      onShowPreview: () => console.log('Show preview clicked'),
      type: 'parameter',
      getPopupContainerOverride: () => document.body,
      texts: {
        noResults: 'No results found',
        showAll: 'Show all',
      },
      opened: true,
    },
  };
}
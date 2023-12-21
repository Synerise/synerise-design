{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import ItemFilter, {
    ItemFilterProps
  } from './ItemFilter';
  const categories = [{
    id: '1',
    name: 'Category 1',
    items: [{
      id: '1',
      name: 'Item 1',
    }, {
      id: '2',
      name: 'Item 2',
    }, {
      id: '3',
      name: 'Item 3',
    }, ],
  }, {
    id: '2',
    name: 'Category 2',
    items: [{
      id: '4',
      name: 'Item 4',
    }, {
      id: '5',
      name: 'Item 5',
    }, ],
  }, ];
  const fetchData = (category: any) => {
    console.log(`Fetching data for category ${category.name}`);
  };
  const removeItem = (item: any) => {
    console.log(`Removing item ${item.name}`);
  };
  const editItem = (item: any) => {
    console.log(`Editing item ${item.name}`);
  };
  const duplicateItem = (item: any) => {
    console.log(`Duplicating item ${item.name}`);
  };
  const selectItem = (item: any) => {
    console.log(`Selecting item ${item.name}`);
  };
  const search = {
    value: '',
    onChange: (value: string) => {},
    onClear: () => {},
  };
  const Primary = () => (<ItemFilter
      visible
      hide={() => {}}
      fetchData={fetchData}
      removeItem={removeItem}
      editItem={editItem}
      duplicateItem={duplicateItem}
      selectItem={selectItem}
      selectedItemId="1"
      texts={{
        title: 'Item Filter',
        searchPlaceholder: 'Search',
        noResults: 'No results found',
        searchClearTooltip: 'Clear search',
        itemActionRename: 'Rename',
        itemActionDuplicate: 'Duplicate',
        itemActionDelete: 'Delete',
      }}
      categories={categories}
      search={search}
    />
  );

  const meta: Meta<ItemFilterProps> = {
    title: 'Storybook Item Filter',
    component: ItemFilter,
  };

  export default meta;

  export { Primary };
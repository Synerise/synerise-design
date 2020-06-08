import * as React from 'react';
import faker from 'faker';
import ItemFilter from '@synerise/ds-item-filter';
import { boolean, text } from '@storybook/addon-knobs';
import { withState } from '@dump247/storybook-state';
import Button from '@synerise/ds-button';
import randomDate from '../../utils/randomDate';
import { action } from '@storybook/addon-actions';

const getTexts = () => ({
  activateItemTitle: text('Activate item', 'By activating this filter, you will cancel your unsaved filter settings'),
  activate: text('Activate', 'Activate'),
  cancel: text('Cancel', 'Cancel'),
  deleteConfirmationTitle: text('Delete confirmation title', 'Delete view'),
  deleteConfirmationDescription: text(
    'Delete confirmation description',
    'Deleting this template will permanently remove it from templates library. All tables using this template will be reset to the default template.'
  ),
  deleteConfirmationYes: text('Delete confirm', 'Yes, delete view'),
  deleteConfirmationNo: text('Delete cancel', 'No, Keep it'),
  noResults: text('No results', 'No results'),
  searchPlaceholder: text('Search placeholder', 'Search'),
  title: text('Drawer title', 'Filter'),
  searchClearTooltip: text('Clear tooltip', 'Clear'),
  itemActionRename: text('Rename label', 'Rename'),
  itemActionDuplicate: text('Duplicate label', 'Duplicate'),
  itemActionDelete: text('Delete label', 'Delete'),
});

const CATEGORIES = [
  {
    label: 'All filters',
    hasMore: true,
    items: [
      {
        id: '0000',
        name: 'Filter #1',
        description: 'Lorem Ipsum...',
        created: randomDate(),
        canUpdate: true,
        canDelete: true,
        canDuplicate: true,
        categories: ['All filters'],
      },
      {
        id: '0001',
        name: 'Filter #2',
        description: 'Lorem Ipsum...',
        created: randomDate(),
        canUpdate: false,
        canDelete: false,
        canDuplicate: true,
        categories: ['All filters'],
        user: {
          firstname: 'Kamil',
          lastname: 'Kowalski',
        },
      },
      {
        id: '0002',
        name: 'Filter #3',
        created: randomDate(),
        canUpdate: false,
        canDelete: false,
        canDuplicate: true,
        categories: ['All filters'],
        user: {
          avatar_url: 'https://www.w3schools.com/howto/img_avatar.png',
          firstname: 'Kamil',
          lastname: 'Kowalski',
        },
      },
      {
        id: '0003',
        name: 'Filter #4',
        description: 'Lorem Ipsum...',
        created: randomDate(),
        canUpdate: true,
        canDelete: true,
        canDuplicate: true,
        categories: ['My filters', 'All filters'],
        user: {
          firstname: 'Jan',
          lastname: 'Nowak',
        },
      },
      {
        id: '0004',
        name: 'Filter #5',
        description: 'Lorem Ipsum...',
        created: randomDate(),
        canUpdate: true,
        canDelete: true,
        canDuplicate: true,
        categories: ['My filters', 'All filters'],
        user: {
          firstname: 'Jan',
          lastname: 'Nowak',
        },
      },
      {
        id: '0005',
        name: 'Filter #6',
        description: 'Lorem Ipsum...',
        created: randomDate(),
        canUpdate: false,
        canDelete: false,
        canDuplicate: true,
        categories: ['All filters'],
        user: {
          firstname: 'Kamil',
          lastname: 'Kowalski',
        },
      },
      {
        id: '0006',
        name: 'Filter #7',
        created: randomDate(),
        canUpdate: false,
        canDelete: false,
        canDuplicate: true,
        categories: ['All filters'],
        user: {
          avatar_url: 'https://www.w3schools.com/howto/img_avatar.png',
          firstname: 'Kamil',
          lastname: 'Kowalski',
        },
      },
      {
        id: '0007',
        name: 'Filter #8',
        description: 'Lorem Ipsum...',
        created: randomDate(),
        canUpdate: true,
        canDelete: true,
        canDuplicate: true,
        categories: ['My filters', 'All filters'],
        user: {
          firstname: 'Jan',
          lastname: 'Nowak',
        },
      },
      {
        id: '0008',
        name: 'Filter #9',
        description: 'Lorem Ipsum...',
        created: randomDate(),
        canUpdate: false,
        canDelete: false,
        canDuplicate: true,
        categories: ['All filters'],
        user: {
          firstname: 'Kamil',
          lastname: 'Kowalski',
        },
      },
      {
        id: '0009',
        name: 'Filter #10',
        created: randomDate(),
        canUpdate: false,
        canDelete: false,
        canDuplicate: true,
        categories: ['All filters'],
        user: {
          avatar_url: 'https://www.w3schools.com/howto/img_avatar.png',
          firstname: 'Kamil',
          lastname: 'Kowalski',
        },
      },
      {
        id: '0010',
        name: 'Filter #11',
        description: 'Lorem Ipsum...',
        created: randomDate(),
        canUpdate: true,
        canDelete: true,
        canDuplicate: true,
        categories: ['My filters', 'All filters'],
        user: {
          firstname: 'Jan',
          lastname: 'Nowak',
        },
      },
      {
        id: '0011',
        name: 'Filter #12',
        description: 'Lorem Ipsum...',
        created: randomDate(),
        canUpdate: true,
        canDelete: true,
        canDuplicate: true,
        categories: ['My filters', 'All filters'],
        user: {
          firstname: 'Jan',
          lastname: 'Nowak',
        },
      },
      {
        id: '00012',
        name: 'Filter #13',
        description: 'Lorem Ipsum...',
        created: randomDate(),
        canUpdate: false,
        canDelete: false,
        canDuplicate: true,
        categories: ['All filters'],
        user: {
          firstname: 'Kamil',
          lastname: 'Kowalski',
        },
      },
    ]
  },
  {
    label: 'My filters',
    hasMore: false,
    items: [
      {
        id: '0000',
        name: 'Filter #1',
        description: 'Lorem Ipsum...',
        created: randomDate(),
        canUpdate: true,
        canDelete: true,
        canDuplicate: true,
        categories: ['My filters', 'All filters'],
        user: {
          firstname: 'Jan',
          lastname: 'Nowak',
        },
      },
      {
        id: '0001',
        name: 'Filter #2',
        description: 'Lorem Ipsum...',
        created: randomDate(),
        canUpdate: false,
        canDelete: false,
        canDuplicate: true,
        categories: ['My filters', 'All filters'],
        user: {
          firstname: 'Kamil',
          lastname: 'Kowalski',
        },
      },
      {
        id: '0002',
        name: 'Filter #3',
        created: randomDate(),
        canUpdate: false,
        canDelete: false,
        canDuplicate: true,
        categories: ['My filters', 'All filters'],
        user: {
          avatar_url: 'https://www.w3schools.com/howto/img_avatar.png',
          firstname: 'Kamil',
          lastname: 'Kowalski',
        },
      },
      {
        id: '0003',
        name: 'Filter #4',
        description: 'Lorem Ipsum...',
        created: randomDate(),
        canUpdate: true,
        canDelete: true,
        canDuplicate: true,
        categories: ['My filters', 'All filters'],
        user: {
          firstname: 'Jan',
          lastname: 'Nowak',
        },
      },
    ]
  },
];

const removeItem = (props, store): void => {
  store.set({
    items: store.state.items.filter(item => item.id !== props.id),
  });
};

const editItem = (props, store): void => {
  store.set({
    items: store.state.items.map(item => {
      if (item.id === props.id) {
        item.name = props.name;
      }
      return item;
    }),
  });
};

const setSelectedItem = (props, store): void => {
  store.set({
    selectedItemId: props.id,
  });
};

const stories = {
  default: withState({
    categories: CATEGORIES,
    filteredCategories: CATEGORIES,
    selectedItemId: undefined,
    itemFilterVisible: false,
    loading: false,
    searchValue: '',
  })(({ store }) => {
    const duplicateItem = (props): void => {
      action('duplicate Item');
    };

    const addItems = (category) => {
      store.set({loading: true});
      setTimeout(() => {
        const nextItemsArray = new Array(20);
        const nextItems = [...nextItemsArray].map((item, index) => {
          const myItem = category.label === 'My filters';
          const withDescription = faker.random.boolean();
          const withUser = faker.random.boolean();
          return ({
            id: faker.random.uuid(),
            name: faker.random.word(),
            description: withDescription && faker.lorem.sentence(),
            created: randomDate(),
            canUpdate: myItem,
            canDelete: myItem,
            canDuplicate: true,
            categories: [`${category.label}`],
            user: withUser && {
              firstname: faker.name.firstName(),
              lastname: faker.name.lastName(),
              email: faker.internet.email(),
            },
          })
        });
        const res = store.state.categories.map(cat => {
          if(cat.label === category.label) {
            return {
              ...cat,
              items: [...cat.items, ...nextItems],
            }
          }else{
            return cat
          }
        });
        store.set({categories: res, loading: false});
        updateFilteredCategories();
      }, 2000);
    };

    const toggleItemFilterVisible = (): void => {
      store.set({ itemFilterVisible: !store.state.itemFilterVisible });
    };

    const updateFilteredCategories = () => {
      const categories = store.state.categories.map(category => {
        return {
          ...category,
          items: category.items.filter((item) => {
            return item.name.toLowerCase().includes(store.state.searchValue.toLowerCase())
          })
        }
      });
      store.set({
        filteredCategories: categories,
      });
    };

    const setSearchValue = (value: string): void => {
      store.set({
        searchValue: value,
      });
      updateFilteredCategories();
    };

    return (
      <>
        <Button onClick={toggleItemFilterVisible} type="primary">
          Show item filter
        </Button>
        <ItemFilter
          fetchData={addItems}
          loading={store.state.loading}
          visible={store.state.itemFilterVisible}
          hide={toggleItemFilterVisible}
          texts={getTexts()}
          removeItem={props => removeItem(props, store)}
          editItem={props => editItem(props, store)}
          selectItem={props => setSelectedItem(props, store)}
          duplicateItem={props => duplicateItem(props)}
          selectedItemId={store.state.selectedItemId}
          categories={store.state.filteredCategories}
          search={boolean('With search', false) && {
            onChange: setSearchValue,
            value: store.state.searchValue,
            onClear: () => store.set({searchValue: '', filteredCategories: store.state.categories})
          }}
        />
      </>
    );
  }),
};

export default {
  name: 'Filter|Filter Manager',
  config: {},
  stories,
  Component: ItemFilter,
};

import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent } from '@testing-library/react';

import ItemFilter from '../ItemFilter';

const TEXTS = {
  activateItemTitle:
    'By activating this filter, you will cancel your unsaved filter settings',
  activate: 'Activate',
  cancel: 'Cancel',
  deleteConfirmationTitle: 'Delete filter',
  deleteConfirmationDescription:
    'Deleting this filter will permanently remove it from templates library. All tables using this filter will be reset.',
  deleteConfirmationNo: 'Cancel',
  deleteConfirmationYes: 'Delete',
  noResults: 'No results',
  searchPlaceholder: 'Search',
  title: 'Filter',
  more: 'more',
  less: 'less',
  searchClearTooltip: 'Clear',
};

const CATEGORIES = [
  {
    label: 'All filters',
    hasMore: true,
    items: [
      {
        id: '0000',
        name: 'Filter #1',
        description: 'Lorem Ipsum...',
        created: '01-05-2020 12:02',
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
        created: '01-12-2019 12:02',
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
        created: '01-12-2019 12:02',
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
        created: '08-22-2018 12:02',
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
        created: '01-05-2020 12:02',
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
        created: '01-12-2019 12:02',
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
        created: '01-12-2019 12:02',
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
        created: '08-22-2018 12:02',
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
        created: '01-12-2019 12:02',
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
        created: '01-12-2019 12:02',
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
        created: '08-22-2018 12:02',
        canUpdate: true,
        canDelete: true,
        canDuplicate: true,
        categories: ['My filters', 'All filters'],
        user: {
          firstname: 'Jan',
          lastname: 'Nowak',
        },
      },
    ],
  },
  {
    label: 'My filters',
    hasMore: false,
    items: [
      {
        id: '0000',
        name: 'Filter #1',
        description: 'Lorem Ipsum...',
        created: '01-05-2020 12:02',
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
        created: '01-12-2019 12:02',
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
        created: '01-12-2019 12:02',
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
        created: '08-22-2018 12:02',
        canUpdate: true,
        canDelete: true,
        canDuplicate: true,
        categories: ['My filters', 'All filters'],
        user: {
          firstname: 'Jan',
          lastname: 'Nowak',
        },
      },
    ],
  },
];

const NOOP = () => {};

const ITEM_FILTER = (
  visible: boolean,
  hide: () => void,
  selectedItemId?: string,
) => (
  <ItemFilter
    visible={visible}
    hide={hide}
    texts={TEXTS}
    removeItem={NOOP}
    editItem={NOOP}
    selectItem={NOOP}
    duplicateItem={NOOP}
    selectedItemId={selectedItemId}
    categories={CATEGORIES}
    fetchData={NOOP}
  />
);

describe('Drawer component', () => {
  it('should render selected item on first position', () => {
    // ARRANGE
    const hideFn = jest.fn();
    const { queryAllByTestId } = renderWithProvider(
      ITEM_FILTER(true, hideFn, '0008'),
    );

    const items = queryAllByTestId('filter-item');

    // ASSERT
    expect(items[0].querySelector('.selected-item-icon')).toBeTruthy();
  });

  it('should render title from props', () => {
    // ARRANGE
    const { queryAllByText } = renderWithProvider(ITEM_FILTER(true, () => {}));
    const title = queryAllByText(TEXTS.title);

    // ASSERT
    expect(title.length).toBe(1);
  });

  it('should hide after close button has been clicked', () => {
    // ARRANGE
    const hideFn = jest.fn();
    const { getByTestId } = renderWithProvider(ITEM_FILTER(true, hideFn));
    const closeButton = getByTestId('ds-item-filter-close-button');

    //ACT
    fireEvent.click(closeButton);

    // ASSERT
    expect(hideFn).toBeCalled();
  });
});

describe('category list items order', () => {
  it('should show list with non changed order by default', () => {
    const { getAllByText } = renderWithProvider(ITEM_FILTER(true, NOOP));

    const categoryItems = getAllByText(/^Filter #/);

    categoryItems.forEach((item, index) => {
      expect(item.textContent).toEqual(CATEGORIES[0].items[index].name);
    });
  });

  it('should show items sorted by selected element', () => {
    const secondItemId = '0001';
    const { getAllByText } = renderWithProvider(
      ITEM_FILTER(true, NOOP, secondItemId),
    );

    const [firstItem, secondItem, ...restItems] = CATEGORIES[0].items;
    const itemsByExpectedOrder = [secondItem, firstItem, ...restItems];

    const categoryItems = getAllByText(/^Filter #/);

    categoryItems.forEach((item, index) => {
      expect(item.textContent).toEqual(itemsByExpectedOrder[index].name);
    });
  });
});

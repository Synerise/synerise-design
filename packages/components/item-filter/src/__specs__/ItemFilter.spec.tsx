import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';
import { fireEvent } from '@testing-library/react';
import ItemFilter from '../ItemFilter';

const TEXTS = {
  activateItemTitle: 'By activating this filter, you will cancel your unsaved filter settings',
  activate: 'Activate',
  cancel: 'Cancel',
  deleteConfirmationTitle: 'Detele filter',
  deleteConfirmationDescription: 'Deleting this filter will permanently remove it from templates library. All tables using this filter will be reset.',
  deleteLabel: 'Delete',
  noResults: 'No results',
  searchPlaceholder: 'Search',
  title: 'Filter',
};

const CATEGORIES = [
  {
    label: 'All filters',
  },
  {
    label: 'My filters',
  },
];

const ITEMS = [
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  },
];


const ITEM_FILTER = (visible: boolean, hide: () => void, selectedItemId?: string) => (
  <ItemFilter
    visible={visible}
    hide={hide}
    texts={TEXTS}
    removeItem={() => {}}
    editItem={() => {}}
    selectItem={() => {}}
    duplicateItem={() => {}}
    selectedItemId={selectedItemId}
    categories={CATEGORIES}
    items={ITEMS}
  />
);

describe('Drawer component', () => {
  it('should render selected item on first position', () => {
    // ARRANGE
    const hideFn = jest.fn();
    const { queryAllByTestId } = renderWithProvider(ITEM_FILTER(true, hideFn, '0008'));

    const items = queryAllByTestId('filter-item');

    // ASSERT
    expect(items[0].querySelector('.selected-item-icon')).toBeTruthy();
  });

  it('should render all filters', () => {
    // ARRANGE
    const { queryAllByTestId } = renderWithProvider(ITEM_FILTER(true, () => {}));
    const items = queryAllByTestId('filter-item');

    // ASSERT
    expect(items.length).toBe(11);
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
    const {getByTestId} = renderWithProvider(ITEM_FILTER(true, hideFn));
    const closeButton = getByTestId('ds-item-filter-close-button');

    //ACT
    fireEvent.click(closeButton);

    // ASSERT
    expect(hideFn).toBeCalled();
  });
});

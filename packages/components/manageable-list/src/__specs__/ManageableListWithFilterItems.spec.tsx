import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';
import ManageableList from '../ManageableList';

const FILTER_LIST_ITEMS = [{
  id: "00000000-0000-0000-0000-000000000000",
  name: "Position 0",
  description: 'The last 10 days of all customers sales ',
  canAdd: true,
  canUpdate: true,
  canDelete: true,
  user: {
    avatar_url: 'https://www.w3schools.com/howto/img_avatar.png'
  },
  created: '2020-02-14T08:50:05+00:00',
},
  {
    id: "00000000-0000-0000-0000-000000000002",
    name: "Position 1",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    user: {
      firstname: 'Jan',
      lastname: 'Nowak',
    },
    created: '2020-02-12T08:50:05+00:00',
  }
];

describe('ManageableList with filter items', () => {
  it('should render with 2 items', () => {
    // ARRANGE
    const remove = jest.fn();
    const edit = jest.fn();
    const select = jest.fn();
    const duplicate = jest.fn();
    const { queryAllByTestId } = renderWithProvider(
      <ManageableList
        addItemLabel="Add position"
        showMoreLabel="show all"
        showLessLabel="show less"
        more="more"
        less="less"
        maxToShowItems={5}
        onItemRemove={remove}
        onItemEdit={edit}
        onItemSelect={select}
        onItemDuplicate={duplicate}
        type='filter'
        items={FILTER_LIST_ITEMS}
        loading={false}
        addButtonDisabled={false}
        changeOrderDisabled={false}
        greyBackground={false}
        selectedItemId={undefined}
      />);

    // ASSERT
    expect(queryAllByTestId('filter-item').length).toBe(2);
  });

  it('should render empty list', () => {
    // ARRANGE
    const remove = jest.fn();
    const edit = jest.fn();
    const select = jest.fn();
    const duplicate = jest.fn();
    const { queryByTestId } = renderWithProvider(
      <ManageableList
        addItemLabel="Add position"
        showMoreLabel="show all"
        showLessLabel="show less"
        more="more"
        less="less"
        maxToShowItems={5}
        onItemRemove={remove}
        onItemEdit={edit}
        onItemSelect={select}
        onItemDuplicate={duplicate}
        type='filter'
        items={[]}
        loading={false}
        addButtonDisabled={false}
        changeOrderDisabled={false}
        greyBackground={false}
        selectedItemId={undefined}
      />);

    // ASSERT
    expect(queryByTestId('filter-item')).toBeFalsy();
  });

  it('should render with selected item', () => {
    // ARRANGE
    const remove = jest.fn();
    const edit = jest.fn();
    const select = jest.fn();
    const duplicate = jest.fn();
    const { queryByTestId } = renderWithProvider(
      <ManageableList
        addItemLabel="Add position"
        showMoreLabel="show all"
        showLessLabel="show less"
        more="more"
        less="less"
        maxToShowItems={5}
        onItemRemove={remove}
        onItemEdit={edit}
        onItemSelect={select}
        onItemDuplicate={duplicate}
        type='filter'
        items={FILTER_LIST_ITEMS}
        loading={false}
        addButtonDisabled={false}
        changeOrderDisabled={false}
        greyBackground={false}
        selectedItemId={'00000000-0000-0000-0000-000000000000'}
      />);

    // ASSERT
    expect(queryByTestId('filter-item-selected')).toBeTruthy();
  });

  it('should render with item with description icon', () => {
    // ARRANGE
    const remove = jest.fn();
    const edit = jest.fn();
    const select = jest.fn();
    const duplicate = jest.fn();
    const { queryByTestId } = renderWithProvider(
      <ManageableList
        addItemLabel="Add position"
        showMoreLabel="show all"
        showLessLabel="show less"
        more="more"
        less="less"
        maxToShowItems={5}
        onItemRemove={remove}
        onItemEdit={edit}
        onItemSelect={select}
        onItemDuplicate={duplicate}
        type='filter'
        items={FILTER_LIST_ITEMS}
        loading={false}
        addButtonDisabled={false}
        changeOrderDisabled={false}
        greyBackground={false}
        selectedItemId={'00000000-0000-0000-0000-000000000000'}
      />);

    // ASSERT
    expect(queryByTestId('item-description-icon')).toBeTruthy();
  });

});

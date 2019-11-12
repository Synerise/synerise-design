import Tag, { TagShape } from '@synerise/ds-tags/dist/Tag/Tag';
import FileM from '@synerise/ds-icon/dist/icons/FileM';
import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';
import ManageableList from '../ManageableList';
import { fireEvent } from '@testing-library/react';

const CONTENT_ITEMS: any = [
  {
    id: "00000000-0000-0000-0000-000000000000",
    name: "Position 0",
    canAdd: true,
    canUpdate: false,
    canDelete: false,
    tag: <Tag name={"A"} shape={TagShape.SINGLE_CHARACTER_ROUND} color={"red"} />,
    content: <div>content</div>,
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    name: "Position 1",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    tag: <Tag name={"1"} shape={TagShape.SINGLE_CHARACTER_SQUARE} color={"#f3f5f6"} textColor={"#949ea6"} />,
    content: <div>content</div>,
  },
  {
    id: "00000000-0000-0000-0000-000000000001",
    name: "Position 2",
    canAdd: true,
    canUpdate: true,
    canDuplicate: true,
    canDelete: true,
    icon: <FileM />,
  }
];


describe('ManageableList with content items', () => {
  it('should render empty list', () => {
    // ARRANGE
    const { queryByTestId, getByTestId } = renderWithProvider(
      <ManageableList
        items={[]}
        showMoreLabel="Show all"
        showLessLabel="Show less"
        addItemLabel="Add folder"
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => {}}
        onItemEdit={() => {}}
        onItemSelect={() => {}}
        onItemRemove={() => {}}
        type='content'
        more="more"
        less="less"
      />);

    // ASSERT
    expect(getByTestId('add-item-button')).toBeTruthy();
    expect(queryByTestId('show-more-button')).toBeNull();
    expect(queryByTestId('list-item-name')).toBeNull();
  });

  it('should render', () => {
    // ARRANGE
    const { queryByTestId, queryAllByTestId, getByTestId } = renderWithProvider(
      <ManageableList
        items={CONTENT_ITEMS}
        showMoreLabel="Show all"
        showLessLabel="Show less"
        addItemLabel="Add folder"
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => {}}
        onItemEdit={() => {}}
        onItemSelect={() => {}}
        onItemRemove={() => {}}
        onItemDuplicate={() => {}}
        type='content'
        more="more"
        less="less"
      />);

    // ASSERT
    expect(getByTestId('add-item-button')).toBeTruthy();
    expect(queryByTestId('show-more-button')).toBeNull();
    expect(queryAllByTestId('item-with-content').length).toBe(3);
  });

  it('should call onItemAdd', () => {
    // ARRANGE
    const onItemAdd = jest.fn();
    const { getByTestId } = renderWithProvider(
      <ManageableList
        items={CONTENT_ITEMS}
        showMoreLabel="Show all"
        showLessLabel="Show less"
        addItemLabel="Add folder"
        loading={false}
        maxToShowItems={5}
        onItemAdd={onItemAdd}
        onItemEdit={() => {}}
        onItemSelect={() => {}}
        onItemRemove={() => {}}
        onItemDuplicate={() => {}}
        type='content'
        more="more"
        less="less"
      />);
    const addItemButton = getByTestId('add-item-button').querySelector('button');

    // ASSERT
    expect(getByTestId('add-item-button')).toBeTruthy();

    // ACT
    addItemButton && fireEvent.click(addItemButton);

    // ASSERT
    expect(onItemAdd).toBeCalled();
  });

  it('should render with toggle content button', () => {
    // ARRANGE
    const { queryAllByTestId } = renderWithProvider(
      <ManageableList
        items={CONTENT_ITEMS}
        showMoreLabel="Show all"
        showLessLabel="Show less"
        addItemLabel="Add folder"
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => {}}
        onItemEdit={() => {}}
        onItemSelect={() => {}}
        onItemRemove={() => {}}
        onItemDuplicate={() => {}}
        type='content'
        more="more"
        less="less"
      />);

    // ASSERT
    expect(queryAllByTestId('item-content-wrapper').length).toBe(2);
    expect(queryAllByTestId('item-toggle-content-wrapper').length).toBe(2);
  });

  it('should render with action icons', () => {
    // ARRANGE
    const onItemDuplicate = jest.fn();
    const onItemRemove = jest.fn();
    const { queryAllByTestId } = renderWithProvider(
      <ManageableList
        items={CONTENT_ITEMS}
        showMoreLabel="Show all"
        showLessLabel="Show less"
        addItemLabel="Add folder"
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => {}}
        onItemEdit={() => {}}
        onItemSelect={() => {}}
        onItemRemove={onItemRemove}
        onItemDuplicate={onItemDuplicate}
        type='content'
        more="more"
        less="less"
      />);

    const removeIcon = queryAllByTestId('list-item-remove')[0].querySelector('svg');
    const duplicateIcon = queryAllByTestId('list-item-duplicate')[0].querySelector('svg');

    // ACT
    removeIcon && fireEvent.click(removeIcon);
    duplicateIcon && fireEvent.click(duplicateIcon);

    // ASSERT
    expect(onItemDuplicate).toBeCalled();
    expect(onItemRemove).toBeCalled();
    expect(queryAllByTestId('list-item-remove').length).toBe(2);
    expect(queryAllByTestId('list-item-edit').length).toBe(2);
    expect(queryAllByTestId('list-item-duplicate').length).toBe(1);
  });

});
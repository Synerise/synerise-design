import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import Tag, { TagShape } from '@synerise/ds-tag';
import FileM from '@synerise/ds-icon';
import { renderWithProvider } from '@synerise/ds-core';

import ManageableList from '../ManageableList';

const CONTENT_ITEMS = [
  {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Position 0',
    canAdd: true,
    canUpdate: false,
    canDelete: false,
    tag: (
      <Tag name={'A'} shape={TagShape.SINGLE_CHARACTER_ROUND} color={'red'} />
    ),
    content: <div>content</div>,
    additionalSuffix: 'additionalSuffix',
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Position 1',
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    tag: (
      <Tag
        name={'1'}
        shape={TagShape.SINGLE_CHARACTER_SQUARE}
        color={'#f3f5f6'}
        textColor={'#949ea6'}
      />
    ),
    content: <div>content</div>,
  },
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Position 2',
    canAdd: true,
    canUpdate: true,
    canDuplicate: true,
    canDelete: true,
    icon: <FileM />,
  },
];

const texts = {
  addItemLabel: 'Add folder',
  showMoreLabel: 'Show all',
  showLessLabel: 'show less',
  more: 'more',
  less: 'less',
  activateItemTitle:
    'By activating this filter, you will cancel your unsaved filter settings',
  activate: 'Activate',
  cancel: 'Cancel',
  deleteConfirmationTitle: 'Delete filter',
  deleteConfirmationDescription:
    'Deleting this filter will permanently remove it from templates library. All tables using this filter will be reset.',
  deleteLabel: 'Delete',
};

describe('ManageableList with content items', () => {
  it('should render empty list', () => {
    renderWithProvider(
      <ManageableList
        items={[]}
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => { }}
        onItemEdit={() => { }}
        onItemSelect={() => { }}
        onItemRemove={() => { }}
        type="content"
        texts={texts}
      />,
    );

    expect(screen.getByTestId('add-item-button')).toBeTruthy();
    expect(screen.queryByTestId('show-more-button')).toBeNull();
    expect(screen.queryByTestId('list-item-name')).toBeNull();
  });

  it('should render', () => {
    renderWithProvider(
      <ManageableList
        items={CONTENT_ITEMS}
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => { }}
        onItemEdit={() => { }}
        onItemSelect={() => { }}
        onItemRemove={() => { }}
        onItemDuplicate={() => { }}
        type="content"
        texts={texts}
      />,
    );

    expect(screen.getByTestId('add-item-button')).toBeTruthy();
    expect(screen.queryByTestId('show-more-button')).toBeNull();
    expect(screen.queryAllByTestId('item-with-content').length).toBe(3);
  });

  it('should call onItemAdd', () => {
    const onItemAdd = jest.fn();
    renderWithProvider(
      <ManageableList
        items={CONTENT_ITEMS}
        loading={false}
        maxToShowItems={5}
        onItemAdd={onItemAdd}
        onItemEdit={() => { }}
        onItemSelect={() => { }}
        onItemRemove={() => { }}
        onItemDuplicate={() => { }}
        type="content"
        texts={texts}
      />,
    );
    const addItemButton = screen
      .getByTestId('add-item-button')
      .querySelector('button');

    expect(screen.getByTestId('add-item-button')).toBeTruthy();

    addItemButton && fireEvent.click(addItemButton);

    expect(onItemAdd).toBeCalled();
  });

  it('should render handle expandedIds props', () => {
    renderWithProvider(
      <ManageableList
        items={CONTENT_ITEMS}
        expandedIds={['00000000-0000-0000-0000-000000000000']}
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => { }}
        onItemEdit={() => { }}
        onItemSelect={() => { }}
        onItemRemove={() => { }}
        onItemDuplicate={() => { }}
        type="content"
        texts={texts}
      />,
    );

    expect(screen.queryAllByTestId('item-content-wrapper').length).toBe(2);
    expect(screen.queryAllByTestId('item-toggle-content-wrapper').length).toBe(
      2,
    );
  });

  it('should fire onExpand ', () => {
    const onExpand = jest.fn();
    const clickedIndex = 1;
    const clickedItem = CONTENT_ITEMS[clickedIndex];
    renderWithProvider(
      <ManageableList
        items={CONTENT_ITEMS}
        onExpand={onExpand}
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => { }}
        onItemEdit={() => { }}
        onItemSelect={() => { }}
        onItemRemove={() => { }}
        onItemDuplicate={() => { }}
        type="content"
        texts={texts}
      />,
    );
    const item = screen.getByText(clickedItem.name);
    fireEvent.click(item);
    expect(onExpand).toHaveBeenCalledTimes(1);
    expect(onExpand).toHaveBeenCalledWith(clickedItem.id, true);
  });

  it('should render item.expanded props', () => {
    const itemsExpanded = CONTENT_ITEMS.map((item) => ({
      ...item,
      expanded: true,
    }));
    renderWithProvider(
      <ManageableList
        items={itemsExpanded}
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => { }}
        onItemEdit={() => { }}
        onItemSelect={() => { }}
        onItemRemove={() => { }}
        onItemDuplicate={() => { }}
        type="content"
        texts={texts}
      />,
    );

    const animationWrappers = screen.queryAllByTestId('item-content-wrapper');
    animationWrappers.forEach(element => {
      expect(element).toBeVisible();
    });
  });

  it('should render items collapsed by default', () => {
    renderWithProvider(
      <ManageableList
        items={CONTENT_ITEMS}
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => { }}
        onItemEdit={() => { }}
        onItemSelect={() => { }}
        onItemRemove={() => { }}
        onItemDuplicate={() => { }}
        type="content"
        texts={texts}
      />,
    );

    const animationWrappers = screen.queryAllByTestId('item-content-wrapper');
    animationWrappers.forEach(element => {
      expect(element).not.toBeVisible();
    });
  });

  it('should render with action icons', () => {
    const onItemDuplicate = jest.fn();
    const onItemRemove = jest.fn();
    renderWithProvider(
      <ManageableList
        items={CONTENT_ITEMS}
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => { }}
        onItemEdit={() => { }}
        onItemSelect={() => { }}
        onItemRemove={onItemRemove}
        onItemDuplicate={onItemDuplicate}
        type="content"
        texts={texts}
      />,
    );

    const removeIcon = screen
      .queryAllByTestId('list-item-remove')[0]
      .querySelector('svg');
    const duplicateIcon = screen
      .queryAllByTestId('list-item-duplicate')[0]
      .querySelector('svg');

    removeIcon && fireEvent.click(removeIcon);
    duplicateIcon && fireEvent.click(duplicateIcon);

    expect(onItemDuplicate).toBeCalled();
    expect(onItemRemove).toBeCalled();
    expect(screen.queryAllByTestId('list-item-remove').length).toBe(2);
    expect(screen.queryAllByTestId('list-item-edit').length).toBe(2);
    expect(screen.queryAllByTestId('list-item-duplicate').length).toBe(1);
  });

  it('should render with change position buttons', () => {
    const onItemDuplicate = jest.fn();
    const onItemRemove = jest.fn();
    const onChangeOrder = jest.fn();
    renderWithProvider(
      <ManageableList
        items={CONTENT_ITEMS}
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => { }}
        onItemEdit={() => { }}
        onItemSelect={() => { }}
        onItemRemove={onItemRemove}
        onItemDuplicate={onItemDuplicate}
        onChangeOrder={onChangeOrder}
        changeOrderByButtons={true}
        type="content"
        texts={texts}
      />,
    );

    const items = screen.queryAllByTestId('item-with-content');
    expect(items[0].querySelector('.angle-bottom-s')).toBeTruthy();
    expect(items[0].querySelector('.angle-top-s')).toBeFalsy();
    expect(items[1].querySelector('.angle-bottom-s')).toBeTruthy();
    expect(items[1].querySelector('.angle-top-s')).toBeTruthy();
    expect(items[2].querySelector('.angle-bottom-s')).toBeFalsy();
    expect(items[2].querySelector('.angle-top-s')).toBeTruthy();
  });

  it('should change order of list on click on moveToTopButton', () => {
    const onItemDuplicate = jest.fn();
    const onItemRemove = jest.fn();
    const onChangeOrder = jest.fn();
    renderWithProvider(
      <ManageableList
        items={CONTENT_ITEMS}
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => { }}
        onItemEdit={() => { }}
        onItemSelect={() => { }}
        onItemRemove={onItemRemove}
        onItemDuplicate={onItemDuplicate}
        onChangeOrder={onChangeOrder}
        changeOrderByButtons={true}
        type="content"
        texts={texts}
      />,
    );

    const items = screen.queryAllByTestId('item-with-content');
    expect(items[1].querySelector('.angle-top-s')).toBeTruthy();
    expect(items[2].querySelector('.angle-top-s')).toBeTruthy();

    fireEvent.click(items[1].querySelector('.angle-top-s') as HTMLElement);

    expect(onChangeOrder).toBeCalledWith([
      CONTENT_ITEMS[1],
      CONTENT_ITEMS[0],
      CONTENT_ITEMS[2],
    ]);

    fireEvent.click(items[2].querySelector('.angle-top-s') as HTMLElement);

    expect(onChangeOrder).toBeCalledWith([
      CONTENT_ITEMS[2],
      CONTENT_ITEMS[0],
      CONTENT_ITEMS[1],
    ]);
  });
  it('should change order of list on click on moveToTopButton', () => {
    const onItemDuplicate = jest.fn();
    const onItemRemove = jest.fn();
    const onChangeOrder = jest.fn();
    renderWithProvider(
      <ManageableList
        items={CONTENT_ITEMS}
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => { }}
        onItemEdit={() => { }}
        onItemSelect={() => { }}
        onItemRemove={onItemRemove}
        onItemDuplicate={onItemDuplicate}
        onChangeOrder={onChangeOrder}
        changeOrderByButtons={true}
        type="content"
        texts={texts}
      />,
    );

    const items = screen.queryAllByTestId('item-with-content');
    expect(items[0].querySelector('.angle-bottom-s')).toBeTruthy();
    expect(items[1].querySelector('.angle-bottom-s')).toBeTruthy();

    fireEvent.click(items[0].querySelector('.angle-bottom-s') as HTMLElement);

    expect(onChangeOrder).toBeCalledWith([
      CONTENT_ITEMS[1],
      CONTENT_ITEMS[2],
      CONTENT_ITEMS[0],
    ]);

    fireEvent.click(items[1].querySelector('.angle-bottom-s') as HTMLElement);

    expect(onChangeOrder).toBeCalledWith([
      CONTENT_ITEMS[0],
      CONTENT_ITEMS[2],
      CONTENT_ITEMS[1],
    ]);
  });
  it('should toggle content on click on header', async () => {
    renderWithProvider(
      <ManageableList
        items={CONTENT_ITEMS}
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => { }}
        onItemEdit={() => { }}
        onItemSelect={() => { }}
        type="content"
        texts={texts}
      />,
    );

    const headers = screen.queryAllByTestId('list-item-name');
    const content = screen.queryAllByTestId('item-content-wrapper');

    expect(headers.length).toBe(CONTENT_ITEMS.length);

    fireEvent.click(headers[0]);

    waitFor(() => { expect(content[0].parentElement).not.toHaveStyle({ display: 'none' }); }, { timeout: 100 });

    fireEvent.click(headers[0]);

    waitFor(() => { expect(content[0].parentElement).toHaveStyle({ display: 'none' }); }, { timeout: 100 });

    fireEvent.click(headers[0]);

    waitFor(
      () => {
        expect(content[0].parentElement).toHaveStyle({ display: 'none' });
      },
      { timeout: 100 },
    );
  });
  it('should render additionalSuffix', () => {
    renderWithProvider(
      <ManageableList
        items={CONTENT_ITEMS}
        loading={false}
        maxToShowItems={5}
        onItemAdd={() => { }}
        onItemEdit={() => { }}
        onItemSelect={() => { }}
        type="content"
        texts={texts}
      />,
    );
    const additionalSuffix = screen.getByText('additionalSuffix');
    expect(additionalSuffix).toBeInTheDocument();
  });
  it.todo('should hide headerSuffix on hover');
});

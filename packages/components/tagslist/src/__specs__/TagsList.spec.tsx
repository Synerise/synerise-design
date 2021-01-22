import * as React from 'react';
import Folders from '../Folders';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent, waitFor } from '@testing-library/react';
import { FolderItem } from '../Folders.types';

const FOLDERS: FolderItem[] = [
  { name: 'Bangkok', id: '1', canDelete: true, canUpdate: true },
  { name: 'Paris', id: '2', canDelete: true },
  { name: 'Alaska', id: '3', canDelete: true },
  { name: 'Zaragoza', id: '4', canDelete: true },
];
describe('Folders', () => {
  it('should render passed folder names', () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();
    const onAdd = jest.fn();
    const onFavourite = jest.fn();
    const { getByText } = renderWithProvider(
      <Folders
        actionsDisplay={'inline'}
        dataSource={FOLDERS}
        onDelete={onDelete}
        onEdit={onEdit}
        onAdd={onAdd}
        onFavourite={onFavourite}
        //@ts-ignore
        texts={{}}
      />
    );
    expect(getByText('Bangkok')).toBeTruthy();
    expect(getByText('Paris')).toBeTruthy();
    expect(getByText('Alaska')).toBeTruthy();
    expect(getByText('Zaragoza')).toBeTruthy();
  }),
    it('should render actions on hover', () => {
      const onDelete = jest.fn();
      const onEdit = jest.fn();
      const onAdd = jest.fn();
      const onFavourite = jest.fn();
      const { getByText, container } = renderWithProvider(
        <Folders
          actionsDisplay={'inline'}
          dataSource={FOLDERS}
          onDelete={onDelete}
          onEdit={onEdit}
          onAdd={onAdd}
          onFavourite={onFavourite}
          //@ts-ignore
          texts={{}}
        />
      );
      const folder = getByText('Bangkok');
      fireEvent.mouseOver(folder);
      const deleteIcon = container.querySelector('.delete');
      expect(deleteIcon).toBeTruthy();
    }),
    it('should trigger actions on click', () => {
      const onDelete = jest.fn();
      const onEdit = jest.fn();
      const onAdd = jest.fn();
      const onFavourite = jest.fn();
      const { getByText, container } = renderWithProvider(
        <Folders
          actionsDisplay={'inline'}
          dataSource={FOLDERS}
          onDelete={onDelete}
          onEdit={onEdit}
          onAdd={onAdd}
          onFavourite={onFavourite}
          //@ts-ignore
          texts={{}}
        />
      );
      const folder = getByText('Bangkok');
      fireEvent.mouseOver(folder);
      const favouriteIcon = container.querySelector('.favourite');
      !!favouriteIcon && fireEvent.click(favouriteIcon);
      expect(onFavourite).toBeCalled();
    }),
    it('should render modal when deleting', async () => {
      const onDelete = jest.fn();
      const onEdit = jest.fn();
      const onAdd = jest.fn();
      const onFavourite = jest.fn();
      const { getByText, container } = renderWithProvider(
        <Folders
          actionsDisplay={'inline'}
          dataSource={FOLDERS}
          onDelete={onDelete}
          onEdit={onEdit}
          onAdd={onAdd}
          onFavourite={onFavourite}
          //@ts-ignore
          texts={{
            deleteFolderDescription:'Folder is going to be deleted',
            deleteFolderLabel: 'Remove folder',
          }}
        />
      );
      const folder = getByText('Bangkok');
      fireEvent.mouseOver(folder);
      const deleteIcon = container.querySelector('.delete');
      !!deleteIcon && fireEvent.click(deleteIcon);
      await waitFor(
        () => {
          expect(getByText('Folder is going to be deleted')).toBeTruthy();
        },
        { timeout: 300 }
      );
    });
  it('should render modal when adding item', async () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();
    const onAdd = jest.fn();
    const onFavourite = jest.fn();
    const { getByText, container } = renderWithProvider(
      <Folders
        actionsDisplay={'inline'}
        dataSource={FOLDERS}
        onDelete={onDelete}
        onEdit={onEdit}
        onAdd={onAdd}
        onFavourite={onFavourite}
        //@ts-ignore
        texts={{
          addItemLabel: 'Add folder',
        }}
      />
    );
    fireEvent.click(getByText('Add folder'));
    expect(container.querySelector('.ds-folders-add')).toBeTruthy();
  });
  it('should render input when editing item', async () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();
    const onAdd = jest.fn();
    const onFavourite = jest.fn();
    const { getByText, container } = renderWithProvider(
      <Folders
        actionsDisplay={'inline'}
        dataSource={FOLDERS}
        onDelete={onDelete}
        onEdit={onEdit}
        onAdd={onAdd}
        onFavourite={onFavourite}
        //@ts-ignore
        texts={{
          addItemLabel: 'Add folder',
          showLessLabel: 'Hide',
          showMoreLabel: 'Show',
        }}
      />
    );
    const folder = getByText('Bangkok');
    fireEvent.mouseOver(folder);
    const editIcon = container.querySelector('.edit');
    expect(editIcon).toBeTruthy();
    !!editIcon && fireEvent.click(editIcon);
    expect(container.querySelector('input')).toBeTruthy();
  });
  it('should handle visible count limit ', async () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();
    const onAdd = jest.fn();
    const onFavourite = jest.fn();
    const { getByText, queryByText } = renderWithProvider(
      <Folders
        actionsDisplay={'inline'}
        dataSource={FOLDERS}
        onDelete={onDelete}
        onEdit={onEdit}
        onAdd={onAdd}
        onFavourite={onFavourite}
        maxItemsVisible={2}
        //@ts-ignore
        texts={{
          addItemLabel: 'Add folder',
          showLessLabel: 'Hide',
          showMoreLabel: 'Show',
        }}
      />
    );
    const folder = getByText('Bangkok');
    expect(folder).toBeTruthy();
    expect(queryByText('Zaragoza')).toBeNull();
  });
  it('should sort by favourite ', async () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();
    const onAdd = jest.fn();
    const onFavourite = jest.fn();
    const newItems: FolderItem[] = [...FOLDERS, { name: 'Zanzibar', id: '7', favourite: true }];
    const { getByText } = renderWithProvider(
      <Folders
        actionsDisplay={'inline'}
        dataSource={newItems}
        onDelete={onDelete}
        onEdit={onEdit}
        onAdd={onAdd}
        onFavourite={onFavourite}
        visibleItemsCount={2}
        //@ts-ignore
        texts={{
          addItemLabel: 'Add folder',
          showLessLabel: 'Hide',
          showMoreLabel: 'Show',
        }}
      />
    );
    expect(getByText('Zanzibar')).toBeTruthy();
  });
  it('should sort alphabetically ', async () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();
    const onAdd = jest.fn();
    const onFavourite = jest.fn();
    const { getByText, queryByText } = renderWithProvider(
      <Folders
        actionsDisplay={'inline'}
        dataSource={FOLDERS}
        onDelete={onDelete}
        onEdit={onEdit}
        onAdd={onAdd}
        onFavourite={onFavourite}
        maxItemsVisible={2}
        //@ts-ignore
        texts={{
          addItemLabel: 'Add folder',
          showLessLabel: 'Hide',
          showMoreLabel: 'Show',
        }}
      />
    );
    expect(getByText('Alaska')).toBeTruthy();
    expect(getByText('Bangkok')).toBeTruthy();
    expect(queryByText('Zaragoza')).toBeNull();
  });
});

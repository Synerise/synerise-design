import * as React from 'react';
import Menu from '@synerise/ds-menu';
import Folder from './Elements/Folder/Folder';
import AddButton from './Elements/AddButton/AddButton';
import './style/index.less';
import { FolderItem, FoldersProps } from './Folders.types';
import { handleItemAdd, handleItemDelete, handleItemEdit, handleItemFavourite, sortAlphabetically } from './utils';

const Folders: React.FC<FoldersProps> = ({ addButtonDisabled,actionsDisplay, dataSource }: FoldersProps) => {
  const [items, setItems] = React.useState<FolderItem[]>(dataSource);

  const onItemAdd = (addedItem: FolderItem): void => {
    setItems(handleItemAdd(items, addedItem));
  };
  const onItemEdit = (editedItem: FolderItem): void => {
    setItems(handleItemEdit(items, editedItem));
  };
  const onItemFavourite = (item: FolderItem): void => {
    setItems(handleItemFavourite(items, item));
  };
  const onItemDelete = (deleted: FolderItem): void => {
    setItems(handleItemDelete(items, deleted));
  };

  const renderItem = (item: FolderItem): React.ReactNode => (
    <Folder
      id={item.id}
      key={`${item.id}-${item.name}`}
      name={item.name}
      actionsDisplay={actionsDisplay}
      favourite={!!item.favourite}
      onDelete={item.canDelete ? onItemDelete : undefined}
      onEdit={item.canUpdate ? onItemEdit : undefined}
      onFavourite={onItemFavourite}
    />
  );
  return (
    <>
      <AddButton addItemLabel="Add folder" disabled={!!addButtonDisabled} onItemAdd={onItemAdd} />
      <Menu>
        {items
          .filter(x => x.favourite)
          .sort(sortAlphabetically)
          .map(renderItem)}
        {items
          .filter(x => !x.favourite)
          .sort(sortAlphabetically)
          .map(renderItem)}
      </Menu>
    </>
  );
};
export default Folders;

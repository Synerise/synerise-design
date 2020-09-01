import * as React from 'react';
import Menu from '@synerise/ds-menu';
import Folder from './Elements/Folder/Folder';
import AddButton from './Elements/AddButton/AddButton';
import './style/index.less';
import { FolderItem, FoldersProps } from './Folders.types';

const Folders: React.FC<FoldersProps> = ({ actionsDisplay, dataSource }: FoldersProps) => {
  const [items, setItems] = React.useState<FolderItem[]>(dataSource);
  const onItemEdit = (editedItem: FolderItem): void => {
    const updatedItems = items.map(i => {
      if (i.id === editedItem.id) {
        return {
          ...i,
          name: editedItem.name,
        };
      }
      return i;
    });
    setItems(updatedItems);
  };
  const onItemFavourite = (item: FolderItem): void => {
    const updatedItems = items.map(i => {
      if (i.id === item.id) {
        return {
          ...i,
          favourite: !i.favourite,
        };
      }
      return i;
    });
    setItems(updatedItems);
  };
  const onItemDelete = (deleted: FolderItem): void => {
    const updatedItems = items.filter(i => i.id !== deleted.id);
    setItems(updatedItems);
  };
  const sortAlphabetically = (prev: FolderItem, next: FolderItem): number =>
    prev.name < next.name ? -1 : prev.name > next.name ? 1 : 0;

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
      onSettingsEnter={() => {}}
    />
  );
  return (
    <>
      <AddButton addItemLabel="Add folder" disabled={false} />
      <Menu>
        {items
          .filter(x => !!x.favourite)
          .sort(sortAlphabetically)
          .map(renderItem)}{' '}
        {items
          .filter(x => !x.favourite)
          .sort(sortAlphabetically)
          .map(renderItem)}
      </Menu>
    </>
  );
};
export default Folders;

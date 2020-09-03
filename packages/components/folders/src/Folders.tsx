import * as React from 'react';
import Menu from '@synerise/ds-menu';
import Folder from './Elements/Folder/Folder';
import AddModal from './Elements/AddModal/AddModal';
import './style/index.less';
import { FolderItem, FoldersProps } from './Folders.types';
import { handleItemAdd, handleItemDelete, handleItemEdit, handleItemFavourite, sortAlphabetically } from './utils';
import DeleteModal from './Elements/DeleteModal/DeleteModal';
import ShowLessOrMore from './Elements/ShowLessOrMore/ShowLessOrMore';

const Folders: React.FC<FoldersProps> = ({
  addButtonDisabled,
  actionsDisplay,
  dataSource,
  visibleItemsCount,
}: FoldersProps) => {
  const [items, setItems] = React.useState<FolderItem[]>(dataSource);
  const [itemToDelete, setItemToDelete] = React.useState<FolderItem | undefined>(undefined);
  const [visibleCount, setVisibleCount] = React.useState<number>(visibleItemsCount || 5);
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
    setItemToDelete(deleted);
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
      toggleDeleteModal={(): void => {
        setItemToDelete(item);
      }}
    />
  );
  const renderItemsList = () => {
    const favouriteItems = items.filter(x => x.favourite).sort(sortAlphabetically);
    const restOfItems = items.filter(x => !x.favourite).sort(sortAlphabetically);
    const total = [...favouriteItems, ...restOfItems].slice(0, visibleCount);
    return total.map(renderItem);
  };
  return (
    <>
      <AddModal addItemLabel="Add folder" disabled={!!addButtonDisabled} onItemAdd={onItemAdd} />
      <Menu>
        {renderItemsList()}
        <DeleteModal
          visible={!!itemToDelete}
          deletedItem={itemToDelete}
          onClose={(): void => {
            setItemToDelete(undefined);
          }}
          folders={items}
        />{' '}
      </Menu>
      <ShowLessOrMore
        onShowMore={(more): void => {
          setVisibleCount(visibleCount + more);
        }}
        onShowLess={(less): void => {
          setVisibleCount(visibleCount - less);
        }}
        totalItemsCount={items.length}
        visibleItemsCount={visibleCount}
        texts={{
          showLessLabel: 'Hide',
          showMoreLabel: 'Show',
          less: 'less',
          more: 'more',
        }}
        step={5}
      />
    </>
  );
};
export default Folders;

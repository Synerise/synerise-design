import * as React from 'react';
import Menu from '@synerise/ds-menu';
import Folder from './Elements/Folder/Folder';
import AddModal from './Elements/AddModal/AddModal';
import './style/index.less';
import { FolderItem, FoldersProps } from './Folders.types';
import { handleItemAdd, handleItemDelete, handleItemEdit, handleItemFavourite, sortAlphabetically } from './utils';
import DeleteModal from './Elements/DeleteModal/DeleteModal';
import ShowLessOrMore from './Elements/ShowLessOrMore/ShowLessOrMore';

const DEFAULT_STEP = 5;
const Folders: React.FC<FoldersProps> = ({
  addButtonDisabled,
  actionsDisplay,
  dataSource,
  visibleItemsCount = 5,
  onDelete,
  onAdd,
  onEdit,
  onFavourite,
  onSelect,
  onSettings,
  texts,
  showHideStep,
}: FoldersProps) => {
  const [items, setItems] = React.useState<FolderItem[]>(dataSource);
  const [itemToDelete, setItemToDelete] = React.useState<FolderItem | undefined>(undefined);
  const [visibleCount, setVisibleCount] = React.useState<number>(visibleItemsCount);
  const onItemAdd = (addedItem: FolderItem): void => {
    onAdd && onAdd(addedItem);
    setItems(handleItemAdd(items, addedItem));
  };
  const onItemEdit = (editedItem: FolderItem): void => {
    onEdit && onEdit(editedItem);
    setItems(handleItemEdit(items, editedItem));
  };
  const onItemFavourite = (item: FolderItem): void => {
    onFavourite && onFavourite({ ...item, favourite: !item.favourite });
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
      onSettingsEnter={
        item.canEnterSettings
          ? (): void => {
              onSettings(item);
            }
          : undefined
      }
      toggleDeleteModal={(): void => {
        setItemToDelete(item);
      }}
      onItemSelect={onSelect}
      texts={texts}
    />
  );
  const renderItemsList = (): React.ReactNode => {
    const favouriteItems = items.filter(i => i.favourite).sort(sortAlphabetically);
    const restOfItems = items.filter(i => !i.favourite).sort(sortAlphabetically);
    const total = [...favouriteItems, ...restOfItems].slice(0, visibleCount);
    return total.map(renderItem);
  };
  return (
    <>
      <AddModal disabled={!!addButtonDisabled} onItemAdd={onItemAdd} texts={texts} />
      <Menu>
        {renderItemsList()}
        <DeleteModal
          visible={!!itemToDelete}
          deletedItem={itemToDelete}
          onClose={(): void => {
            setItemToDelete(undefined);
          }}
          folders={items}
          onConfirm={(options): void => {
            if (itemToDelete) {
              onItemDelete(itemToDelete);
              onDelete && onDelete(itemToDelete, options);
            }
          }}
          texts={texts}
        />
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
        texts={texts}
        step={showHideStep || DEFAULT_STEP}
      />
    </>
  );
};
export default Folders;

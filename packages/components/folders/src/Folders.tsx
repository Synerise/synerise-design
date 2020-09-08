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
const MODAL_CLOSE_DURATION = 250;
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
  folderFilter,
}: FoldersProps) => {
  const [items, setItems] = React.useState<FolderItem[]>(folderFilter ? dataSource.filter(folderFilter) : dataSource);
  const [itemToDelete, setItemToDelete] = React.useState<FolderItem | undefined>(undefined);
  const [deleteModalVisible, setDeleteModalVisible] = React.useState<boolean>(false);
  const [maxVisibleItemsCount, setMaxVisibleItemsCount] = React.useState<number>(visibleItemsCount);

  React.useEffect(() => {
    const itemsCount = items.length;
    if (maxVisibleItemsCount > itemsCount && visibleItemsCount < itemsCount) {
      setMaxVisibleItemsCount(itemsCount);
    }
  }, [items, maxVisibleItemsCount, visibleItemsCount]);
  React.useEffect(() => {
    setItems(folderFilter ? dataSource.filter(folderFilter) : dataSource);
  }, [dataSource, folderFilter]);

  React.useEffect(() => {
    if (!deleteModalVisible && !!itemToDelete) {
      setDeleteModalVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemToDelete]);
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
      item={item}
      key={`${item.id}-${item.name}`}
      actionsDisplay={actionsDisplay}
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
    const total = [...favouriteItems, ...restOfItems].slice(0, maxVisibleItemsCount);
    if (!!folderFilter && typeof folderFilter === 'function') {
      return total.filter(folderFilter).map(renderItem);
    }
    return total.map(renderItem);
  };
  return (
    <>
      <AddModal disabled={!!addButtonDisabled} onItemAdd={onItemAdd} texts={texts} />
      <Menu>
        {renderItemsList()}
        <DeleteModal
          visible={deleteModalVisible}
          deletedItem={itemToDelete}
          onClose={(): void => {
            setDeleteModalVisible(false);
            setTimeout(() => {
              setItemToDelete(undefined);
            }, MODAL_CLOSE_DURATION);
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
          setMaxVisibleItemsCount(maxVisibleItemsCount + more);
        }}
        onShowLess={(less): void => {
          setMaxVisibleItemsCount(maxVisibleItemsCount - less);
        }}
        totalItemsCount={items.length}
        visibleItemsCount={items.length <= maxVisibleItemsCount ? items.length : maxVisibleItemsCount}
        texts={texts}
        step={showHideStep || DEFAULT_STEP}
      />
    </>
  );
};
export default Folders;

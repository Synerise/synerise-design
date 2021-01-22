import * as React from 'react';
import Menu from '@synerise/ds-menu';
import Item from './Elements/Item/Item';
import AddModal from './Elements/AddModal/AddModal';
import './style/index.less';
import { TagsListItem, TagsListProps } from './TagsList.types';
import { handleItemAdd, handleItemDelete, handleItemEdit, handleItemFavourite, sortAlphabetically } from './utils';
import DeleteModal from './Elements/DeleteModal/DeleteModal';
import ShowLessOrMore from './Elements/ShowLessOrMore/ShowLessOrMore';

const DEFAULT_STEP = 5;
const DEFAULT_ITEMS_VISIBLE = 5;
const MODAL_CLOSE_DURATION = 250;

const MemoItem = React.memo(Item);

const TagsList: React.FC<TagsListProps> = ({
  addButtonDisabled,
  actionsDisplay,
  dataSource,
  maxItemsVisible,
  onDelete,
  onAdd,
  onEdit,
  onFavourite,
  onSelect,
  onSettings,
  texts,
  showHideStep,
  folderFilter,
  withCheckbox,
}: TagsListProps) => {
  const [items, setItems] = React.useState<TagsListItem[]>(folderFilter ? dataSource.filter(folderFilter) : dataSource);
  const [itemToDelete, setItemToDelete] = React.useState<TagsListItem | undefined>(undefined);
  const [deleteModalVisible, setDeleteModalVisible] = React.useState<boolean>(false);
  const [visibleItemsCount, setVisibleItemsCount] = React.useState<number>(
    maxItemsVisible && maxItemsVisible > 0 ? maxItemsVisible : DEFAULT_ITEMS_VISIBLE
  );

  React.useEffect(() => {
    setVisibleItemsCount(maxItemsVisible && maxItemsVisible > 0 ? maxItemsVisible : DEFAULT_ITEMS_VISIBLE);
  }, [maxItemsVisible]);
  React.useEffect(() => {
    const itemsCount = items.length;
    if (maxItemsVisible && visibleItemsCount > itemsCount) {
      setVisibleItemsCount(itemsCount);
    }
  }, [items, visibleItemsCount, maxItemsVisible]);
  React.useEffect(() => {
    setItems(folderFilter ? dataSource.filter(folderFilter) : dataSource);
  }, [dataSource, folderFilter]);

  React.useEffect(() => {
    if (!deleteModalVisible && !!itemToDelete) {
      setDeleteModalVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemToDelete]);
  const onItemAdd = (addedItem: TagsListItem): void => {
    onAdd && onAdd(addedItem);
    setItems(handleItemAdd(items, addedItem));
  };
  const onItemEdit = (editedItem: TagsListItem): void => {
    onEdit && onEdit(editedItem);
    setItems(handleItemEdit(items, editedItem));
  };
  const onItemFavourite = (item: TagsListItem): void => {
    onFavourite && onFavourite({ ...item, favourite: !item.favourite });
    setItems(handleItemFavourite(items, item));
  };
  const onItemDelete = (deleted: TagsListItem): void => {
    setItemToDelete(deleted);
    setItems(handleItemDelete(items, deleted));
  };

  const renderItem = (item: TagsListItem): React.ReactNode => (
    <MemoItem
      item={item}
      key={`${item.id}-${item.name}`}
      actionsDisplay={actionsDisplay}
      checked={item.checked}
      onDelete={item.canDelete ? onItemDelete : undefined}
      onEdit={item.canUpdate ? onItemEdit : undefined}
      onFavourite={onItemFavourite}
      withCheckbox={withCheckbox}
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
    const total = [...favouriteItems, ...restOfItems].slice(0, visibleItemsCount);
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
          setVisibleItemsCount(visibleItemsCount + more);
        }}
        onShowLess={(less): void => {
          setVisibleItemsCount(visibleItemsCount - less);
        }}
        totalItemsCount={items.length}
        visibleItemsCount={items.length <= visibleItemsCount ? items.length : visibleItemsCount}
        texts={texts}
        maxItemsToShow={Number(maxItemsVisible)}
        step={showHideStep || DEFAULT_STEP}
      />
    </>
  );
};
export default TagsList;

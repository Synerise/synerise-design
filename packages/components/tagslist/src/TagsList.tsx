import * as React from 'react';
import Menu from '@synerise/ds-menu';
import Result from '@synerise/ds-result';

import TagsListContext, { defaultValue } from './TagsListContext';
import MemoItem from './Elements/Item/MemoItem';
import Toolbar from './Elements/Toolbar';
import { TagsListItem, TagsListProps } from './TagsList.types';
import { handleItemDelete, handleItemEdit, handleItemFavourite, sortAlphabetically } from './utils';
import DeleteModal from './Elements/DeleteModal/DeleteModal';
import ShowLessOrMore from './Elements/ShowLessOrMore/ShowLessOrMore';

import './style/index.less';

const DEFAULT_STEP = 5;
const DEFAULT_ITEMS_VISIBLE = 5;
const MODAL_CLOSE_DURATION = 250;

const TagsList: React.FC<TagsListProps> = (props) => {
  const {
    items = [],
    maxItemsVisible,
    onDelete,
    onEdit,
    onFavourite,
    onVisibility,
    onSelect,
    onSettings,
    texts,
    showHideStep,
    withCheckbox = true
  } = props;

  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [searchOpen, setSearchOpen] = React.useState<boolean>(false);

  const searchFilter = (item: TagsListItem) => {
    return item.name.toLowerCase().match(searchQuery.toLowerCase());
  };

  const setItems = (items: TagsListItem[]) => {};
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
    if (!deleteModalVisible && !!itemToDelete) {
      setDeleteModalVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemToDelete]);

  /* const onItemAdd = (addedItem: TagsListItem): void => {
    onAdd && onAdd(addedItem);
    setItems(handleItemAdd(items, addedItem));
  }; */

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
      checked={item.checked}
      onDelete={item.canDelete ? onItemDelete : undefined}
      onEdit={item.canUpdate ? onItemEdit : undefined}
      onFavourite={onItemFavourite}
      onVisibility={onVisibility}
      withCheckbox={withCheckbox}
      onSettingsEnter={
        item.canEnterSettings
          ? (): void => {
              onSettings && onSettings(item);
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

    const total = searchQuery ? 
      [...favouriteItems, ...restOfItems].filter(searchFilter) :
      [...favouriteItems, ...restOfItems].slice(0, visibleItemsCount);

    if(searchQuery && !total.length)
      return (
        <Result
          description="No results"
          noSearchResults
          type="no-results"
        />
      );

    return total.map(renderItem);
  };

  const contextValue = {
    ...defaultValue,
    ...props,
    searchQuery,
    setSearchQuery,
    searchOpen,
    setSearchOpen
  }

  return (
    <TagsListContext.Provider value={contextValue}>
      <Toolbar />
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
      {!searchQuery && (
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
      )}
    </TagsListContext.Provider>
  );
};
export default TagsList;

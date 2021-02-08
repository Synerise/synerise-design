import * as React from 'react';
import Menu from '@synerise/ds-menu';
import Result from '@synerise/ds-result';
import { NOOP } from '@synerise/ds-utils';
import invariant from 'invariant';

import TagsListContext, { defaultValue } from './TagsListContext';
import Item from './Elements/Item/Item';
import Toolbar from './Elements/Toolbar';
import { TagsListActions, TagsListItem, TagsListProps, TagVisibility } from './TagsList.types';
import { sortAlphabetically } from './utils';
import ShowLessOrMore from './Elements/ShowLessOrMore/ShowLessOrMore';
import useTexts from './useTexts';

import './style/index.less';
import TagsListContainer from './TagsList.styles';

const DEFAULT_STEP = 100;
const DEFAULT_ITEMS_VISIBLE = 10;

export function replaceItem(items: TagsListItem[], item: TagsListItem, index?: number): [TagsListItem[], TagsListItem] {
  const newItems = [...items];
  const idx = index || newItems.findIndex((findItem: TagsListItem) => findItem.id === item.id);
  if (idx > -1) newItems[idx] = item;
  return [newItems, newItems[idx]];
}

const TagsList: React.FC<TagsListProps> = props => {
  const {
    items: controlledItems,
    defaultItems = [],
    maxItemsVisible,
    onChange,
    onSettings,
    texts: propTexts = {},
    showHideStep,
    withCheckbox = true,
  } = props;

  const isControlled = 'items' in props;

  const texts = useTexts(propTexts);

  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [searchOpen, setSearchOpen] = React.useState<boolean>(false);

  const searchFilter = (item: TagsListItem): RegExpMatchArray | null => {
    return item.name.toLowerCase().match(searchQuery.toLowerCase());
  };

  const [items, setItems] = React.useState<TagsListItem[]>(controlledItems || defaultItems);
  const [visibleItemsCount, setVisibleItemsCount] = React.useState<number>(
    maxItemsVisible && maxItemsVisible > 0 ? maxItemsVisible : DEFAULT_ITEMS_VISIBLE
  );

  // if is controlled and no onChange method whine!
  React.useEffect(() => {
    invariant(
      !(isControlled && !onChange),
      `${TagsList.displayName}: You've added controlled 'items' list but there is no onChange event function!`
    );
  }, [isControlled, onChange]);

  // if is controlled and items props changes do update!
  React.useEffect(() => {
    if (isControlled && JSON.stringify(controlledItems) !== JSON.stringify(items)) {
      setItems(controlledItems || []);
    }
  }, [isControlled, controlledItems, items]);

  React.useEffect(() => {
    setVisibleItemsCount(maxItemsVisible && maxItemsVisible > 0 ? maxItemsVisible : DEFAULT_ITEMS_VISIBLE);
  }, [maxItemsVisible]);

  React.useEffect(() => {
    const itemsCount = items.length;
    if (maxItemsVisible && visibleItemsCount > itemsCount) {
      setVisibleItemsCount(itemsCount);
    }
  }, [items, visibleItemsCount, maxItemsVisible]);

  const handleOnChange = (action: TagsListActions, item: TagsListItem): void => {
    let newItems: TagsListItem[];
    let newItem: TagsListItem;

    switch (action) {
      case TagsListActions.Favourite:
        [newItems, newItem] = replaceItem(items, { ...item, favourite: !item.favourite });
        break;
      case TagsListActions.Select:
        [newItems, newItem] = replaceItem(items, { ...item, checked: !item.checked });
        break;
      case TagsListActions.Delete:
        newItems = items.filter(thisItem => thisItem.id !== item.id);
        newItem = item;
        break;
      default:
        [newItems, newItem] = replaceItem(items, item);
    }

    isControlled ? onChange && onChange(action, newItems, newItem, items, item) : setItems(newItems);
  };

  const onItemEdit = (item: TagsListItem): void => {
    handleOnChange(TagsListActions.Edit, item);
  };

  const onItemFavourite = (item: TagsListItem): void => {
    handleOnChange(TagsListActions.Favourite, item);
  };

  const onItemVisibility = (visibility: TagVisibility, item: TagsListItem): void => {
    handleOnChange(TagsListActions.Visibility, { ...item, visibility });
  };

  const onItemDelete = (deleted: TagsListItem): void => {
    handleOnChange(TagsListActions.Delete, deleted);
  };

  const onItemSelect = (item: TagsListItem): void => {
    handleOnChange(TagsListActions.Select, item);
  };

  const renderItem = (item: TagsListItem): React.ReactNode => (
    <Item
      item={item}
      key={`${item.id}-${item.name}`}
      checked={item.checked}
      onDelete={item.canDelete ? onItemDelete : NOOP}
      onEdit={item.canUpdate ? onItemEdit : undefined}
      onFavourite={onItemFavourite}
      onVisibility={onItemVisibility}
      withCheckbox={withCheckbox}
      onSettingsEnter={
        item.canEnterSettings
          ? (): void => {
              onSettings && onSettings(item);
            }
          : undefined
      }
      onItemSelect={onItemSelect}
      texts={texts}
    />
  );

  const renderItemsList = (): React.ReactNode => {
    const favouriteItems = items.filter(i => i.favourite).sort(sortAlphabetically);
    const restOfItems = items.filter(i => !i.favourite).sort(sortAlphabetically);

    const total = searchQuery
      ? [...favouriteItems, ...restOfItems].filter(searchFilter)
      : [...favouriteItems, ...restOfItems].slice(0, visibleItemsCount);

    if (!total.length) return <Result description="No results" noSearchResults type="no-results" />;

    return total.map(renderItem);
  };

  const contextValue = {
    ...defaultValue,
    ...props,
    texts,
    searchQuery,
    setSearchQuery,
    searchOpen,
    setSearchOpen,
  };

  if (!isControlled)
    contextValue.onItemsAdd = (addItems: TagsListItem[]): void => {
      const newItems = addItems.map(item => ({ ...item, checked: false }));
      const newList = [...items];
      newItems.forEach((item: TagsListItem) => {
        if (newList.findIndex((row: TagsListItem) => row.id === item.id) === -1) newList.push(item);
      });
      setItems(newList);
    };

  return (
    <TagsListContainer>
      <TagsListContext.Provider value={contextValue}>
        <Toolbar />
        <Menu>{renderItemsList()}</Menu>
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
    </TagsListContainer>
  );
};
export default TagsList;

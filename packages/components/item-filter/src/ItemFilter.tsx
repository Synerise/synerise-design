import * as React from 'react';
import Typography from '@synerise/ds-typography';
import Drawer from '@synerise/ds-drawer';
import Button from '@synerise/ds-button';
import Tabs from '@synerise/ds-tabs';
import Icon from '@synerise/ds-icon';
import { CloseM } from '@synerise/ds-icon/dist/icons';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import ManageableList from '@synerise/ds-manageable-list';
import Result from '@synerise/ds-result';
import { ItemProps } from '@synerise/ds-manageable-list/dist/Item/Item';
import { withTheme } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import SearchBar from '@synerise/ds-search-bar';
import * as S from './ItemFIlter.styles';

type Category = {
  label: string;
};

interface Item extends ItemProps {
  categories: string[];
}

export type ItemFilterProps = {
  visible: boolean;
  hide: () => void;
  removeItem?: (removeParams: { id: string }) => void;
  editItem?: (editParams: { id: string; name: string }) => void;
  duplicateItem?: (duplicateParams: { id: string }) => void;
  selectItem: (selectParams: { id: string }) => void;
  items: Item[];
  categories: Category[];
  selectedItemId: string | undefined;
  maxToShowItems?: number;
  texts?: {
    [k: string]: string | React.ReactNode;
  };
  theme: {
    [k: string]: string;
  };
};

const ItemFilter: React.FC<ItemFilterProps> = ({
  visible,
  hide,
  removeItem,
  editItem,
  duplicateItem,
  selectItem,
  items,
  selectedItemId,
  texts = {
    activateItemTitle: <FormattedMessage id="DS.ITEM-FILTER.ACTIVATE-ITEM-TITLE" />,
    activate: <FormattedMessage id="DS.ITEM-FILTER.ACTIVATE" />,
    cancel: <FormattedMessage id="DS.ITEM-FILTER.CANCEL" />,
    deleteConfirmationTitle: <FormattedMessage id="DS.ITEM-FILTER.DELETE-CONFIRMATION-TITLE" />,
    deleteConfirmationDescription: <FormattedMessage id="DS.ITEM-FILTER.DELETE-CONFIRMATION-DESCRIPTION" />,
    deleteLabel: <FormattedMessage id="DS.ITEM-FILTER.DELETE-LABEL" />,
    noResults: <FormattedMessage id="DS.ITEM-FILTER.NO-RESULTS" />,
    searchPlaceholder: <FormattedMessage id="DS.ITEM-FILTER.SEARCH-PLACEHOLDER" />,
    title: <FormattedMessage id="DS.ITEM-FILTER.TITLE" />,
    more: <FormattedMessage id="DS.MANAGABLE-LIST.MORE" />,
    less: <FormattedMessage id="DS.MANAGABLE-LIST.LESS" />,
  },
  maxToShowItems = 200,
  categories,
  theme,
}) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredItems = React.useMemo(() => {
    const filterd = items.filter(
      (item: Item) =>
        item.categories.includes(categories[activeTab].label) &&
        (!searchQuery || (searchQuery && item.name.toLowerCase().includes(searchQuery.toLowerCase())))
    );

    return filterd.sort((a, b) => (a.id === selectedItemId && b.id !== selectedItemId ? -1 : 1));
  }, [activeTab, items, categories, searchQuery, selectedItemId]);

  return (
    <Drawer visible={visible} placement="right" width={676} onClose={hide}>
      <Drawer.DrawerHeaderWithoutPadding>
        <Drawer.DrawerHeader>
          <S.ItemFilterHeader>
            <Typography.Title style={{ flex: 1, margin: 0 }} level={4}>
              {texts.title}
            </Typography.Title>
            <Button type="ghost" mode="single-icon" onClick={hide} data-testid="ds-item-filter-close-button">
              <Icon component={<CloseM />} />
            </Button>
          </S.ItemFilterHeader>
          <Tabs activeTab={activeTab} tabs={categories} handleTabClick={setActiveTab} underscore />
        </Drawer.DrawerHeader>
        <SearchBar
          onSearchChange={setSearchQuery}
          placeholder={texts.searchPlaceholder as string}
          value={searchQuery}
          onClearInput={(): void => setSearchQuery('')}
          iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
        />
      </Drawer.DrawerHeaderWithoutPadding>
      <Drawer.DrawerBody>
        <Drawer.DrawerContent>
          <S.FiltersList>
            {filteredItems.length ? (
              <ManageableList
                maxToShowItems={maxToShowItems}
                onItemRemove={removeItem}
                onItemEdit={editItem}
                onItemSelect={selectItem}
                onItemDuplicate={duplicateItem}
                type="filter"
                items={filteredItems}
                loading={false}
                selectedItemId={selectedItemId}
                texts={texts}
                searchQuery={searchQuery}
              />
            ) : (
              <Result type="no-results" noSearchResults description={texts.noResults} />
            )}
          </S.FiltersList>
        </Drawer.DrawerContent>
      </Drawer.DrawerBody>
    </Drawer>
  );
};

export default withTheme(ItemFilter);

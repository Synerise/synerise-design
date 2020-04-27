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
import { IntlFormatters, injectIntl } from 'react-intl';
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
  intl: IntlFormatters;
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
  intl,
  texts = {
    activateItemTitle: intl.formatMessage({ id: 'DS.ITEM-FILTER.ACTIVATE-ITEM-TITLE' }),
    activate: intl.formatMessage({ id: 'DS.ITEM-FILTER.ACTIVATE' }),
    cancel: intl.formatMessage({ id: 'DS.ITEM-FILTER.CANCEL' }),
    deleteConfirmationTitle: intl.formatMessage({ id: 'DS.ITEM-FILTER.DELETE-CONFIRMATION-TITLE' }),
    deleteConfirmationDescription: intl.formatMessage({ id: 'DS.ITEM-FILTER.DELETE-CONFIRMATION-DESCRIPTION' }),
    deleteConfirmationNo: intl.formatMessage({ id: 'DS.ITEM-FILTER.DELETE-CONFIRMATION-NO' }),
    deleteConfirmationYes: intl.formatMessage({ id: 'DS.ITEM-FILTER.DELETE-CONFIRMATION-YES' }),
    noResults: intl.formatMessage({ id: 'DS.ITEM-FILTER.NO-RESULTS' }),
    searchPlaceholder: intl.formatMessage({ id: 'DS.ITEM-FILTER.SEARCH-PLACEHOLDER' }),
    title: intl.formatMessage({ id: 'DS.ITEM-FILTER.TITLE' }),
    more: intl.formatMessage({ id: 'DS.MANAGABLE-LIST.MORE' }),
    less: intl.formatMessage({ id: 'DS.MANAGABLE-LIST.LESS' }),
    searchClearTooltip: intl.formatMessage({ id: 'DS.ITEM-FILTER.SEARCH-CLEAR' }),
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
          clearTooltip={texts.searchClearTooltip}
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

export default injectIntl(withTheme(ItemFilter));

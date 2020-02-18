import * as React from 'react';
import Typography from '@synerise/ds-typography';
import Drawer from '@synerise/ds-drawer';
import Button from '@synerise/ds-button';
import Tabs from '@synerise/ds-tabs';
import Icon from '@synerise/ds-icon';
import { CloseM, SearchNoResultsM } from '@synerise/ds-icon/dist/icons';
import SearchInput from '@synerise/ds-dropdown/dist/elements/SearchInput/SearchInput';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import ManageableList from '@synerise/ds-manageable-list';
import { ItemProps } from '@synerise/ds-manageable-list/dist/Item/Item';
import { withTheme } from 'styled-components';
import Avatar from '@synerise/ds-avatar';
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
  removeItem: () => void;
  editItem: () => void;
  duplicateItem: () => void;
  selectItem: () => void;
  items: Item[];
  categories: Category[];
  selectedItemId: string;
  texts: {
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
  texts,
  categories,
  theme,
}) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredItems = React.useMemo(() => {
    return items.filter(
      (item: Item) =>
        item.categories.includes(categories[activeTab].label) &&
        (!searchQuery || (searchQuery && item.name.toLowerCase().includes(searchQuery.toLowerCase())))
    );
  }, [activeTab, items, categories, searchQuery]);

  return (
    <Drawer visible={visible} placement="right" width={676} onClose={hide}>
      <Drawer.DrawerHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 24 }}>
          <Typography.Title style={{ flex: 1, margin: 0 }} level={4}>
            {texts.title}
          </Typography.Title>
          <Button type="ghost" mode="single-icon" onClick={hide}>
            <Icon component={<CloseM />} />
          </Button>
        </div>
        <Tabs activeTab={activeTab} tabs={categories} handleTabClick={setActiveTab} />
      </Drawer.DrawerHeader>
      <Drawer.DrawerBody>
        <SearchInput
          onSearchChange={setSearchQuery}
          placeholder={texts.searchPlaceholder as string}
          value={searchQuery}
          onClearInput={(): void => setSearchQuery('')}
          iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
        />
        <Drawer.DrawerContent>
          <S.FiltersList>
            {filteredItems.length ? (
              <ManageableList
                maxToShowItems={200}
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
              <S.NoResults>
                <Avatar
                  size="large"
                  shape="circle"
                  backgroundColor="grey"
                  backgroundColorHue="050"
                  iconComponent={<Icon component={<SearchNoResultsM />} color={theme.palette['grey-800']} />}
                />
                <span>{texts.noResults}</span>
              </S.NoResults>
            )}
          </S.FiltersList>
        </Drawer.DrawerContent>
      </Drawer.DrawerBody>
    </Drawer>
  );
};
export default withTheme(ItemFilter);

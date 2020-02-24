import * as React from 'react';
import { withTheme } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Typography from 'antd/lib/typography';
import Drawer from '@synerise/ds-drawer';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import ItemFilter from '@synerise/ds-item-filter';
import { CloseM, FolderM, SearchM } from '@synerise/ds-icon/dist/icons';
import SearchInput from '@synerise/ds-dropdown/dist/elements/SearchInput/SearchInput';
import { ItemFilterProps } from '@synerise/ds-item-filter/dist/ItemFilter';
import ColumnManagerActions from './ColumnManagerActions/ColumnManagerActions';
import ColumnManagerList from './ColumnManagerList/ColumnManagerList';
import { Column } from './ColumnManagerItem/ColumnManagerItem';

export type ColumnManagerProps = {
  hide: () => void;
  visible: boolean;
  onSave: (savedView: SavedView) => void;
  columns: Column[];
  texts?: {
    [k: string]: string | React.ReactNode;
  };
  theme: {
    [k: string]: string;
  };
  itemFilterConfig?: ItemFilterProps;
};

export type SavedView = {
  meta: ViewMeta;
  columns: Column[];
};

export type ViewMeta = {
  name: string;
  description: string;
};

const ColumnManager: React.FC<ColumnManagerProps> = ({
  hide,
  visible,
  theme,
  onSave,
  columns,
  itemFilterConfig,
  texts = {
    title: <FormattedMessage id="DS.COLUMN-MANAGER.TITLE" />,
    searchPlaceholder: <FormattedMessage id="DS.COLUMN-MANAGER.SEARCH-PLACEHOLDER" />,
    noResults: <FormattedMessage id="DS.COLUMN-MANAGER.NO-RESULTS" />,
    visible: <FormattedMessage id="DS.COLUMN-MANAGER.VISIBLE" />,
    hidden: <FormattedMessage id="DS.COLUMN-MANAGER.HIDDEN" />,
    saveView: <FormattedMessage id="DS.COLUMN-MANAGER.SAVE-VIEW" />,
    cancel: <FormattedMessage id="DS.COLUMN-MANAGER.CANCEL" />,
    apply: <FormattedMessage id="DS.COLUMN-MANAGER.APPLY" />,
    fixedLeft: <FormattedMessage id="DS.COLUMN-MANAGER.FIXED-LEFT" />,
    fixedRight: <FormattedMessage id="DS.COLUMN-MANAGER.FIXED-RIGHT" />,
    clear: <FormattedMessage id="DS.COLUMN-MANAGER.CLEAR" />,
    viewName: <FormattedMessage id="DS.COLUMN-MANAGER.VIEW-NAME" />,
    viewDescription: <FormattedMessage id="DS.COLUMN-MANAGER.VIEW-DESCRIPTION" />,
    viewNamePlaceholder: <FormattedMessage id="DS.COLUMN-MANAGER.VIEW-NAME-PLACEHOLDER" />,
    viewDescriptionPlaceholder: <FormattedMessage id="DS.COLUMN-MANAGER.VIEW-DESCRIPTION-PLACEHOLDER" />,
    mustNotBeEmpty: <FormattedMessage id="DS.COLUMN-MANAGER.MUST-NOT-BE-EMPTY" />,
  },
}) => {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [visibleList, setVisibleList] = React.useState(columns.filter(column => column.visible));
  const [hiddenList, setHiddenList] = React.useState(columns.filter(column => !column.visible));
  const [itemFilterVisible, setItemFilterVisible] = React.useState(false);

  const searchResults = React.useMemo(() => {
    return [...visibleList, ...hiddenList].filter(column =>
      column.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, visibleList, hiddenList]);

  const updateVisibleColumns = (newVisibleList: Column[]): void => {
    setVisibleList(newVisibleList.map((column: Column): Column => ({ ...column, visible: true })));
  };

  const updateHiddenColumns = (newHiddenList: Column[]): void => {
    setHiddenList(newHiddenList.map((column: Column): Column => ({ ...column, visible: false })));
  };

  const setFixed = (id: string, fixed?: string): void => {
    setVisibleList(
      visibleList.map(visibleColumn => (visibleColumn.id === id ? { ...visibleColumn, fixed } : visibleColumn))
    );
  };

  const hideColumn = (id: string): void => {
    const column = visibleList.find(col => col.id === id);
    column && setVisibleList(visibleList.filter(visibleColumn => visibleColumn.id !== column.id));
    column && setHiddenList([...hiddenList, { ...column, visible: false }]);
  };

  const showColumn = (id: string): void => {
    const column = hiddenList.find(col => col.id === id);
    column && setHiddenList(hiddenList.filter(hiddenColumn => hiddenColumn.id !== column.id));
    column && setVisibleList([...visibleList, { ...column, visible: true }]);
  };

  const toggleColumn = (id: string, columnVisible: boolean): void => {
    if (columnVisible) {
      hideColumn(id);
    } else {
      showColumn(id);
    }
  };

  const hideItemFilter = React.useCallback(() => {
    setItemFilterVisible(false);
  }, [setItemFilterVisible]);

  const showItemFilter = React.useCallback(() => {
    setItemFilterVisible(true);
  }, [setItemFilterVisible]);

  const handleSave = (viewMeta: { name: string; description: string }): void => {
    onSave({
      meta: viewMeta,
      columns: [...visibleList, ...hiddenList],
    });
  };

  return (
    <Drawer visible={visible} width={338} onClose={hide}>
      <Drawer.DrawerHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 24 }}>
          <Typography.Title style={{ flex: 1, margin: 0 }} level={4}>
            {texts.title}
          </Typography.Title>
          <Button type="ghost" mode="single-icon" onClick={showItemFilter}>
            <Icon component={<FolderM />} />
          </Button>
          <Button style={{ marginLeft: '8px' }} mode="single-icon" type="ghost" onClick={hide}>
            <Icon component={<CloseM />} />
          </Button>
        </div>
      </Drawer.DrawerHeader>
      <SearchInput
        onSearchChange={setSearchQuery}
        placeholder={texts.searchPlaceholder as string}
        value={searchQuery}
        onClearInput={(): void => setSearchQuery('')}
        iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-800']} />}
      />
      <Drawer.DrawerBody>
        <Drawer.DrawerContent style={{ padding: '0 0 80px' }}>
          <ColumnManagerList
            texts={texts}
            searchQuery={searchQuery}
            searchResults={searchResults}
            visibleList={visibleList}
            hiddenList={hiddenList}
            setFixed={setFixed}
            toggleColumn={toggleColumn}
            updateVisibleList={updateVisibleColumns}
            updateHiddenList={updateHiddenColumns}
          />
        </Drawer.DrawerContent>
        <ColumnManagerActions onSave={handleSave} texts={texts} />
      </Drawer.DrawerBody>
      {itemFilterConfig && (
        <ItemFilter
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...itemFilterConfig}
          visible={itemFilterVisible}
          hide={hideItemFilter}
        />
      )}
    </Drawer>
  );
};
export default withTheme(ColumnManager);

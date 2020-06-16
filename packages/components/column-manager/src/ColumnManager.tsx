import * as React from 'react';
import { injectIntl } from 'react-intl';
import Typography from 'antd/lib/typography';
import Drawer from '@synerise/ds-drawer';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import ItemFilter from '@synerise/ds-item-filter';
import { CloseM, FolderM, SearchM } from '@synerise/ds-icon/dist/icons';
import Scrollbar from '@synerise/ds-scrollbar';
import SearchBar from '@synerise/ds-search-bar';
import ColumnManagerActions from './ColumnManagerActions/ColumnManagerActions';
import ColumnManagerList from './ColumnManagerList/ColumnManagerList';
import { ColumnManagerProps, State, Texts } from './ColumnManager.types';
import { Column } from './ColumnManagerItem/ColumManagerItem.types';
import * as S from './styles/ColumnManager.styles';
import ColumnManagerGroupSettings from './ColumnManagerGroupSettings/ColumnManagerGroupSettings';

const DEFAULT_STATE: State = {
  searchQuery: '',
  visibleList: [],
  hiddenList: [],
  itemFilterVisible: false,
  selectedFilterId: undefined,
  activeColumn: undefined,
  groupSettings: undefined,
};

class ColumnManager extends React.Component<ColumnManagerProps, State> {
  constructor(props: ColumnManagerProps) {
    super(props);
    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      ...DEFAULT_STATE,
      visibleList: props.columns.filter((column: Column) => column.visible),
      hiddenList: props.columns.filter((column: Column) => !column.visible),
      selectedFilterId: props.itemFilterConfig && props.itemFilterConfig.selectedItemId,
    };
  }

  static getDerivedStateFromProps(props: ColumnManagerProps, state: State): Partial<State> | null {
    if (props.itemFilterConfig && props.itemFilterConfig.selectedItemId !== state.selectedFilterId) {
      const visible = props.columns.filter((column: Column) => column.visible);
      const hidden = props.columns.filter((column: Column) => !column.visible);
      return {
        visibleList: visible,
        hiddenList: hidden,
        selectedFilterId: (props.itemFilterConfig && props.itemFilterConfig.selectedItemId) || undefined,
      };
    }
    return null;
  }

  get texts(): { [k in Texts]: string | React.ReactNode } {
    const { texts, intl } = this.props;
    return {
      title: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.TITLE' }),
      searchPlaceholder: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.SEARCH-PLACEHOLDER' }),
      searchClearTooltip: intl.formatMessage({ id: 'DS.ITEM-FILTER.SEARCH-CLEAR' }),
      noResults: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.NO-RESULTS' }),
      searchResults: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.SEARCH-RESULTS' }),
      visible: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.VISIBLE' }),
      hidden: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.HIDDEN' }),
      saveView: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.SAVE-VIEW' }),
      cancel: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.CANCEL' }),
      apply: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.APPLY' }),
      fixedLeft: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.FIXED-LEFT' }),
      fixedRight: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.FIXED-RIGHT' }),
      group: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.GROUP' }),
      clear: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.CLEAR' }),
      viewName: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.VIEW-NAME' }),
      viewDescription: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.VIEW-DESCRIPTION' }),
      viewNamePlaceholder: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.VIEW-NAME-PLACEHOLDER' }),
      viewDescriptionPlaceholder: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.VIEW-DESCRIPTION-PLACEHOLDER' }),
      mustNotBeEmpty: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.MUST-NOT-BE-EMPTY' }),
      switchOn: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.SWITCH-ON' }),
      switchOff: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.SWITCH-OFF' }),
      groupByValue: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.GROUP_BY_VALUE' }),
      groupByRanges: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.GROUP_BY_RANGERS' }),
      groupByIntervals: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.GROUP_BY_INTERVALS' }),
      groupDisabled: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.GROUP_DISABLED' }),
      groupTitle: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.GROUP_TITLE' }),
      selectPlaceholder: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.SELECT_PLACEHOLDER' }),
      intervalPlaceholder: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.INTERVAL_PLACEHOLDER' }),
      groupingType: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.SET_GROUPING_TYPE' }),
      groupingTypeTooltip: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.GROUPING_TYPE_TOOLTIP' }),
      from: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.FROM' }),
      to: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.TO' }),
      remove: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.REMOVE' }),
      addRange: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.ADD_RANGE' }),
      errorEmptyRange: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.ERROR_EMPTY_RANGE' }),
      errorEmptyFromField: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.ERROR_EMPTY_FROM_FIELD' }),
      errorEmptyToField: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.ERROR_EMPTY_TO_FIELD' }),
      errorChooseGrouping: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.ERROR_CHOOSE_GROUPING' }),
      errorInterval: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.ERROR_INTERVAL' }),
      errorRange: intl.formatMessage({ id: 'DS.COLUMN-MANAGER.ERROR_RANGE' }),
      ...texts,
    };
  }

  updateVisibleColumns = (newVisibleList: Column[]): void => {
    this.setState({
      visibleList: newVisibleList.map((column: Column): Column => ({ ...column, visible: true })),
    });
  };

  updateHiddenColumns = (newHiddenList: Column[]): void => {
    this.setState({
      hiddenList: newHiddenList.map((column: Column): Column => ({ ...column, visible: false })),
    });
  };

  hideColumn = (id: string): void => {
    const { visibleList, hiddenList } = this.state;
    const column = visibleList.find(col => col.id === id);
    column &&
      this.setState({
        visibleList: visibleList.filter(visibleColumn => visibleColumn.id !== column.id),
        hiddenList: [...hiddenList, { ...column, visible: false }],
      });
  };

  showColumn = (id: string): void => {
    const { visibleList, hiddenList } = this.state;
    const column = hiddenList.find(col => col.id === id);
    column &&
      this.setState({
        hiddenList: hiddenList.filter(hiddenColumn => hiddenColumn.id !== column.id),
        visibleList: [...visibleList, { ...column, visible: true }],
      });
  };

  toggleColumn = (id: string, columnVisible: boolean): void => {
    if (columnVisible) {
      this.hideColumn(id);
    } else {
      this.showColumn(id);
    }
  };

  setFixed = (id: string, fixed?: string): void => {
    const { visibleList } = this.state;
    this.setState({
      visibleList: visibleList.map(visibleColumn => {
        if (visibleColumn.id === id) {
          return visibleColumn.fixed === fixed ? { ...visibleColumn, fixed: undefined } : { ...visibleColumn, fixed };
        }
        return visibleColumn;
      }),
    });
  };

  showGroupSettings = (column: Column): void => {
    this.setState({ activeColumn: column });
  };

  hideItemFilter = (): void => {
    const { hideSavedViews } = this.props;
    hideSavedViews && hideSavedViews();
    this.setState({
      itemFilterVisible: false,
    });
  };

  handleShowItemFilter = (): void => {
    this.setState({
      itemFilterVisible: true,
    });
  };

  handleSearchChange = (query: string): void => {
    this.setState({
      searchQuery: query,
    });
  };

  handleSave = (viewMeta: { name: string; description: string }): void => {
    const { onSave } = this.props;
    const { visibleList, hiddenList } = this.state;
    onSave({
      meta: viewMeta,
      columns: [...visibleList, ...hiddenList],
    });
  };

  handleApply = (): void => {
    const { onApply } = this.props;
    const { visibleList, hiddenList, groupSettings } = this.state;
    onApply([...visibleList, ...hiddenList], groupSettings);
  };

  render(): React.ReactElement {
    const { visible, hide, itemFilterConfig, savedViewsVisible } = this.props;
    const { visibleList, hiddenList, searchQuery, itemFilterVisible, activeColumn, groupSettings } = this.state;

    const searchResults = [...visibleList, ...hiddenList].filter(column =>
      column.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const visibleListWithGroup = visibleList.map(column => {
      if (column.id === groupSettings?.column?.id) {
        return {
          ...column,
          group: true,
        };
      }
      return column;
    });

    return (
      <>
        <S.ColumnManager visible={visible || savedViewsVisible} width={338} onClose={hide}>
          <Drawer.DrawerHeader>
            <Drawer.DrawerHeaderBar>
              <Typography.Title style={{ flex: 1, margin: 0 }} level={4}>
                {this.texts.title}
              </Typography.Title>
              <Button
                data-testid="ds-column-manager-show-filters"
                type="ghost"
                mode="single-icon"
                onClick={this.handleShowItemFilter}
              >
                <Icon component={<FolderM />} />
              </Button>
              <Button
                data-testid="ds-column-manager-close"
                style={{ marginLeft: '8px' }}
                mode="single-icon"
                type="ghost"
                onClick={hide}
              >
                <Icon component={<CloseM />} />
              </Button>
            </Drawer.DrawerHeaderBar>
          </Drawer.DrawerHeader>
          <SearchBar
            onSearchChange={this.handleSearchChange}
            placeholder={this.texts.searchPlaceholder as string}
            value={searchQuery}
            onClearInput={(): void => this.handleSearchChange('')}
            iconLeft={<Icon component={<SearchM />} />}
            clearTooltip={(this.texts.searchClearTooltip as string) || ''}
          />
          <Scrollbar absolute>
            <Drawer.DrawerContent style={{ padding: '0 0 80px' }}>
              <ColumnManagerList
                texts={this.texts}
                searchQuery={searchQuery}
                searchResults={searchResults}
                visibleList={visibleListWithGroup}
                hiddenList={hiddenList}
                setFixed={this.setFixed}
                showGroupSettings={this.showGroupSettings}
                groupSettings={groupSettings}
                toggleColumn={this.toggleColumn}
                updateVisibleList={this.updateVisibleColumns}
                updateHiddenList={this.updateHiddenColumns}
              />
            </Drawer.DrawerContent>
          </Scrollbar>

          <ColumnManagerActions
            onSave={this.handleSave}
            onApply={this.handleApply}
            onCancel={hide}
            texts={this.texts}
          />
          {itemFilterConfig && (
            <ItemFilter
              {...itemFilterConfig}
              visible={itemFilterVisible || Boolean(savedViewsVisible)}
              hide={this.hideItemFilter}
            />
          )}
        </S.ColumnManager>
        <ColumnManagerGroupSettings
          texts={this.texts}
          hide={(): void => {
            this.setState({ activeColumn: undefined });
          }}
          visible={activeColumn !== undefined}
          column={activeColumn}
          settings={activeColumn?.key === groupSettings?.column?.key ? groupSettings : undefined}
          onOk={(settings): void => {
            this.setState({ groupSettings: settings, activeColumn: undefined });
          }}
        />
      </>
    );
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default injectIntl(ColumnManager);

import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import Table, { TableProps } from 'antd/lib/table';

import './style/index.less';
import Icon from '@synerise/ds-icon';
import { AngleLeftS, AngleRightS, AngleDownS, SearchM } from '@synerise/ds-icon/dist/icons';
import Button from '@synerise/ds-button';
import Dropdown from '@synerise/ds-dropdown';
import Checkbox from '@synerise/ds-checkbox';
import Menu from '@synerise/ds-menu';
import SpinnerM from '@synerise/ds-icon/dist/icons/SpinnerM';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import * as S from './Table.styles';
import FilterTrigger from './FilterTrigger/FilterTrigger';

const SELECTION_ALL = 'SELECTION_ALL';
const SELECTION_VISIBLE = 'SELECTION_VISIBLE';
const SELECTION_INVERT = 'SELECTION_INVERT';

export type AntTableProps<T> = Omit<TableProps<T>, 'title' | 'subTitle' | 'onSearch' | 'itemsMenu' | 'search'>;

type Selection = {
  key: string;
  label: string;
  onClick: () => void;
};

type SelectionItem = 'SELECTION_ALL' | 'SELECTION_VISIBLE' | 'SELECTION_INVERT';

interface RowSelection<T> {
  fixed?: boolean;
  selectedRowKeys: React.ReactText[];
  selections?: [SelectionItem, Selection];
  onChange: (selectedRowKeys: React.ReactText[], selectedRows: T[]) => void;
  setRowSelection: (keys: React.ReactText[]) => void;
}

interface Filter {
  tooltips: {
    default: string;
    clear: string;
    define: string;
    list: string;
  };
  key: string;
  icon: React.ReactNode;
  showList: () => void;
  show: () => void;
  handleClear: () => void;
  selected?: {
    name: string;
  };
}

export interface DSTableProps<T extends { key: React.ReactText }> extends AntTableProps<T> {
  title?: string | React.ReactNode;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  itemsMenu?: string | React.ReactNode;
  search?: string;
  cellSize?: string | 'medium' | 'small';
  roundedHeader?: boolean;
  selection?: RowSelection<T>;
  filters?: Filter[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DSTable<T extends { key: React.ReactText }>(props: DSTableProps<T>): React.ReactElement {
  const {
    title,
    onSearch,
    loading,
    selection,
    itemsMenu,
    cellSize,
    pagination,
    dataSource,
    roundedHeader,
    filters,
  } = props;

  const footerPagination = React.useMemo((): object => {
    return {
      showTotal: (total: number, range: number[]): React.ReactNode => (
        <span>
          <strong>{range[0]}</strong>-<strong>{range[1]}</strong> of <strong>{total}</strong> items
        </span>
      ),
      columnWidth: 72,
      itemRender: (page: number, type: string, originalElement: React.ReactNode): React.ReactNode => {
        if (type === 'prev') {
          return (
            <Button mode="single-icon" type="ghost">
              <Icon component={<AngleLeftS />} />
            </Button>
          );
        }
        if (type === 'next') {
          return (
            <Button mode="single-icon" type="ghost">
              <Icon component={<AngleRightS />} />
            </Button>
          );
        }
        return originalElement;
      },
      ...pagination,
    };
  }, [pagination]);

  const selectAll = React.useCallback(() => {
    if (dataSource && selection) selection.setRowSelection(dataSource.map(record => record.key));
  }, [dataSource, selection]);

  const unselectAll = React.useCallback(() => {
    if (selection) selection.setRowSelection([]);
  }, [selection]);

  const selectInvert = React.useCallback(() => {
    if (dataSource && selection)
      selection.setRowSelection(
        dataSource.filter(record => !selection.selectedRowKeys.includes(record.key)).map(record => record.key)
      );
  }, [dataSource, selection]);

  const allSelected = React.useMemo(() => {
    return dataSource && selection?.selectedRowKeys && dataSource.length === selection.selectedRowKeys.length;
  }, [dataSource, selection]);

  const customSelection = React.useMemo((): React.ReactNode => {
    if (selection && dataSource) {
      const { selectedRowKeys, selections } = selection;
      return (
        <S.Selection>
          <Checkbox
            checked={allSelected}
            onChange={(event: CheckboxChangeEvent): void => {
              if (event.target.checked) {
                selectAll();
              } else {
                unselectAll();
              }
            }}
            indeterminate={selectedRowKeys.length > 0 && !allSelected}
          />
          {selections && (
            <Dropdown
              trigger={['click']}
              overlay={
                <S.SelectionMenu>
                  {selections.indexOf(SELECTION_ALL) >= 0 && !allSelected && (
                    <Menu.Item onClick={selectAll}>Select all</Menu.Item>
                  )}
                  {selections.indexOf(SELECTION_INVERT) && (
                    <Menu.Item onClick={selectInvert}>Invert selection</Menu.Item>
                  )}
                  {selections.indexOf(SELECTION_ALL) >= 0 && allSelected && (
                    <Menu.Item onClick={unselectAll}>Unselect all</Menu.Item>
                  )}
                  {selections
                    .filter((sel): sel is Selection => typeof (sel as Selection).key === 'string')
                    .map(
                      (sel): React.ReactNode => (
                        // eslint-disable-next-line react/jsx-handler-names
                        <Menu.Item key={sel.key} onClick={sel.onClick}>
                          {sel.label}
                        </Menu.Item>
                      )
                    )}
                </S.SelectionMenu>
              }
            >
              <Button mode="single-icon" type="ghost">
                <Icon component={<AngleDownS />} />
              </Button>
            </Dropdown>
          )}
        </S.Selection>
      );
    }
    return '';
  }, [selection, selectAll, unselectAll]);

  const renderSelection = (size: number): React.ReactNode => {
    return (
      <S.Header>
        <S.Left>
          {selection && customSelection}
          <S.Title>
            <strong>{size}</strong> selected
          </S.Title>
          {itemsMenu}
        </S.Left>
      </S.Header>
    );
  };

  const renderTitle = (): React.ReactNode => {
    return (
      <S.Header>
        <S.Left>
          {customSelection}
          {title && <S.Title>{title}</S.Title>}
        </S.Left>
        <S.Right>
          {filters?.map(filter => (
            <FilterTrigger
              key={filter.key}
              iconComponent={filter.icon}
              tooltips={filter.tooltips}
              /* eslint-disable-next-line react/jsx-handler-names */
              handleClear={filter.handleClear}
              show={filter.show}
              showList={filter.showList}
              selected={filter.selected}
            />
          ))}
          {onSearch && <Icon component={<SearchM />} />}
        </S.Right>
      </S.Header>
    );
  };

  const renderHeader = React.useCallback((): React.ReactNode => {
    const size = selection && selection?.selectedRowKeys && selection?.selectedRowKeys.length;
    return size ? renderSelection(size) : title && renderTitle();
  }, [selection, title, renderSelection, renderTitle]);

  return (
    <div className={`ds-table ds-table-cell-size-${cellSize} ${roundedHeader ? 'ds-table-rounded' : ''}`}>
      {loading && (
        <S.Spinner className="spinner">
          <Icon component={<SpinnerM />} color="#6a7580" />
        </S.Spinner>
      )}
      <Table<T>
        {...props}
        pagination={dataSource?.length ? footerPagination : false}
        title={renderHeader}
        /* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */
        // @ts-ignore
        rowSelection={
          selection && {
            ...selection,
          }
        }
      />
    </div>
  );
}

DSTable.SELECTION_ALL = SELECTION_ALL;
DSTable.SELECTION_VISIBLE = SELECTION_VISIBLE;
DSTable.SELECTION_INVERT = SELECTION_INVERT;

export default DSTable;

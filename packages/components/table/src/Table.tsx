import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import { Input } from '@synerise/ds-input';
import Table, { TableProps } from 'antd/lib/table';

import './style/index.less';
import Icon from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import { useOnClickOutside } from '@synerise/ds-utils';
import { FilterM, Grid2M } from '@synerise/ds-icon/dist/icons';
import Button from '@synerise/ds-button';
import Dropdown from '@synerise/ds-dropdown';
import Checkbox from '@synerise/ds-checkbox';
import Tooltip from '@synerise/ds-tooltip';
import * as S from './Table.styles';

export type AntTableProps<T> = Omit<TableProps<T>, 'title' | 'subTitle' | 'onSearch' | 'itemsMenu' | 'search'>;

export interface DSTableProps<T> extends AntTableProps<T> {
  title?: string | React.ReactNode;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  itemsMenu?: string | React.ReactNode;
  search?: string;
  cellSize?: string | 'medium' | 'small';
  roundedHeader?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DSTable<T extends object = any>(props: DSTableProps<T>): React.ReactElement {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const { title, onSearch, search, rowSelection, itemsMenu, cellSize, pagination, dataSource, roundedHeader } = props;
  useOnClickOutside(ref, () => {
    setIsSearchOpen(false);
  });

  const footerPagination = React.useMemo((): object => {
    return {
      showTotal: (total: number, range: number[]): React.ReactNode => (
        <span>
          <strong>{range[0]}</strong>-<strong>{range[1]}</strong> of <strong>{total}</strong> items
        </span>
      ),
      columnWidth: 72,
      ...pagination,
    };
  }, [pagination]);

  const toggleSearch = React.useCallback((): void => {
    if (isSearchOpen === true) {
      return;
    }
    setIsSearchOpen(prevState => {
      return !prevState;
    });
  }, [isSearchOpen, setIsSearchOpen]);

  const customSelection = React.useMemo((): React.ReactNode => {
    if (rowSelection) {
      return (
        <S.Selection>
          {/* eslint-disable-next-line react/jsx-handler-names */}
          <Checkbox onChange={console.log} indeterminate={false} />
        </S.Selection>
      );
    }
    return '';
  }, [rowSelection]);

  const renderSelection = (size: number): React.ReactNode => {
    return (
      <S.Header>
        <S.Left>
          {customSelection}
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
          <Dropdown trigger={['click']} overlay={<div>Saved views</div>}>
            <Tooltip title="Table view">
              <Button type="ghost" mode="single-icon">
                <Icon component={<Grid2M />} />
              </Button>
            </Tooltip>
          </Dropdown>
          <Dropdown trigger={['click']} overlay={<div>Saved filters</div>}>
            <Tooltip title="Filter">
              <Button type="ghost" mode="single-icon">
                <Icon component={<FilterM />} />
              </Button>
            </Tooltip>
          </Dropdown>
          {onSearch && (
            <S.InputWrapper isOpen={isSearchOpen} searchValue={search}>
              <Tooltip title="Search">
                <S.Icon onClick={toggleSearch}>
                  <Icon color={theme.palette['grey-600']} component={<SearchM />} size={24} />
                </S.Icon>
              </Tooltip>
              <S.Input onClick={toggleSearch} ref={ref} isOpen={isSearchOpen}>
                <Input value={search} onChange={onSearch} />
              </S.Input>
            </S.InputWrapper>
          )}
        </S.Right>
      </S.Header>
    );
  };

  const renderHeader = React.useCallback((): React.ReactNode => {
    const size = rowSelection && rowSelection.selectedRowKeys && rowSelection.selectedRowKeys.length;
    return size ? renderSelection(size) : title && renderTitle();
  }, [rowSelection, title, renderSelection, renderTitle]);

  return (
    <div className={`ds-table ds-table-cell-size-${cellSize} ${roundedHeader ? 'ds-table-rounded' : ''}`}>
      <Table<T>
        {...props}
        pagination={dataSource?.length ? footerPagination : false}
        title={renderHeader}
        rowSelection={
          rowSelection && {
            ...rowSelection,
          }
        }
      />
    </div>
  );
}

export default DSTable;

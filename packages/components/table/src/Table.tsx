import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import Table from 'antd/lib/table';

import './style/index.less';
import Icon from '@synerise/ds-icon';
import { AngleLeftS, AngleRightS } from '@synerise/ds-icon/dist/icons';
import Button from '@synerise/ds-button';
import SpinnerM from '@synerise/ds-icon/dist/icons/SpinnerM';
import * as S from './Table.styles';
import { DSTableProps } from './Table.types';
import TableHeader from './TableHeader/TableHeader';

export const SELECTION_ALL = 'SELECTION_ALL';
export const SELECTION_VISIBLE = 'SELECTION_VISIBLE';
export const SELECTION_INVERT = 'SELECTION_INVERT';

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

  const renderHeader = React.useCallback((): React.ReactNode => {
    const size = selection && selection?.selectedRowKeys && selection?.selectedRowKeys.length;
    return (
      <TableHeader
        selectedRows={size}
        title={title}
        onSearch={onSearch}
        filters={filters}
        itemsMenu={itemsMenu}
        selection={selection}
        dataSource={dataSource}
      />
    );
  }, [selection, title, onSearch, dataSource, filters, itemsMenu]);

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

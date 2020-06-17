import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import Icon from '@synerise/ds-icon';
import SpinnerM from '@synerise/ds-icon/dist/icons/SpinnerM';
import * as S from './Table.styles';
import { DSTableProps } from './Table.types';
import TableHeader from './TableHeader/TableHeader';
import DefaultTable from './DefaultTable/DefaultTable';
import GroupTable from './GroupTable/GroupTable';

export const SELECTION_ALL = 'SELECTION_ALL';
export const SELECTION_INVERT = 'SELECTION_INVERT';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DSTable<T extends object = any>(props: DSTableProps<T>): React.ReactElement {
  const {
    title,
    onSearch,
    loading,
    selection,
    itemsMenu,
    cellSize,
    dataSource,
    roundedHeader,
    filters,
    searchComponent,
    filterComponent,
    rowKey,
    headerWithBorderTop,
    hideTitleBar,
    grouped,
  } = props;

  const renderHeader = React.useCallback((): React.ReactNode => {
    const size = selection && selection?.selectedRowKeys && selection?.selectedRowKeys.length;
    return (
      !hideTitleBar && (
        <TableHeader
          withBorderTop={headerWithBorderTop}
          selectedRows={size}
          title={title}
          onSearch={onSearch}
          filters={filters}
          itemsMenu={itemsMenu}
          selection={selection}
          dataSource={dataSource}
          searchComponent={searchComponent}
          filterComponent={filterComponent}
          rowKey={rowKey}
        />
      )
    );
  }, [
    selection,
    title,
    onSearch,
    dataSource,
    filters,
    itemsMenu,
    searchComponent,
    filterComponent,
    rowKey,
    headerWithBorderTop,
    hideTitleBar,
  ]);

  return (
    <div className={`ds-table ds-table-cell-size-${cellSize} ${roundedHeader ? 'ds-table-rounded' : ''}`}>
      {loading && (
        <S.Spinner className="spinner">
          <Icon component={<SpinnerM />} color="#6a7580" />
        </S.Spinner>
      )}
      {/*
        // @ts-ignore */}
      {grouped ? <GroupTable<T> {...props} title={renderHeader} /> : <DefaultTable {...props} title={renderHeader} />}
    </div>
  );
}

DSTable.SELECTION_ALL = SELECTION_ALL;
DSTable.SELECTION_INVERT = SELECTION_INVERT;

export default DSTable;

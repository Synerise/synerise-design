import React from 'react';

import Pagination from '@synerise/ds-pagination';

import { type TablePaginationProps } from '../../Table.types';
import { useTableContext } from '../../contexts/TableContext';
import * as S from './TablePagination.styles';

export const TablePagination = ({ ...rest }: TablePaginationProps) => {
  const { table } = useTableContext();

  return (
    <S.PaginationWrapper data-testid="ds-table-pagination">
      <Pagination
        hideOnSinglePage
        {...rest}
        total={table.getRowCount()}
        onShowSizeChange={(_current, size) => {
          table.setPageSize(size);
        }}
        onChange={(page) => {
          table.setPageIndex(page - 1);
        }}
        pageSize={table.getState().pagination.pageSize}
        // Control the active page from table state so programmatic resets (e.g. on search)
        // are reflected in the controls — otherwise the page indicator would stay stale.
        current={table.getState().pagination.pageIndex + 1}
      />
    </S.PaginationWrapper>
  );
};

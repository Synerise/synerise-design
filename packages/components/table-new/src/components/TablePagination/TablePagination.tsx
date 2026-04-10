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
        pageSize={table.getState().pagination.pageSize}
        total={table.getRowCount()}
        onShowSizeChange={(_current, size) => {
          table.setPageSize(size);
        }}
        onChange={(page) => {
          table.setPageIndex(page - 1);
        }}
        {...rest}
      />
    </S.PaginationWrapper>
  );
};

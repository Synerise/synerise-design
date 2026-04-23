import React from 'react';

import { flexRender } from '@tanstack/react-table';

import { type TableColumnsProps } from '../../Table.types';
import { useTableContext } from '../../contexts/TableContext';
import { isSorted } from '../../utils/sort';
import { TableColumnSorter } from './TableColumnSorter/TableColumnSorter';
import * as S from './TableColumns.styles';

export const TableColumns = <TData extends object>({
  texts,
  disableColumnNamesLineBreak,
}: TableColumnsProps) => {
  const { table } = useTableContext<TData>();
  const headerGroups = table.getHeaderGroups();

  return (
    <>
      <S.THead role="rowgroup" data-testid="ds-table-columns">
        {headerGroups.map((headerGroup) => (
          <S.Tr key={headerGroup.id} role="row">
            {headerGroup.headers.map((header, columnIndex) => {
              const id = header.id;
              const isSticky = header.column.getIsPinned();
              const hasSorter = header.column.getCanSort();
              const isColumnSorted = isSorted(header.column);
              const align = header.column.columnDef.meta?.align;
              return (
                <S.Th
                  headerIndex={columnIndex}
                  key={id}
                  colSpan={header.colSpan}
                  style={header.column.columnDef.meta?.style}
                  isPinned={header.column.getIsPinned()}
                  leftOffset={header.column.getStart('left')}
                  rightOffset={header.column.getAfter('right')}
                  isSorted={isColumnSorted}
                  hasSorter={hasSorter}
                  $align={align}
                  data-sticky={isSticky ? 'true' : undefined}
                  role="columnheader"
                >
                  <S.HeaderWrapper $align={align}>
                    <S.Label
                      disableColumnNamesLineBreak={disableColumnNamesLineBreak}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </S.Label>
                    {hasSorter &&
                      (header.column.columnDef.meta?.renderCustomSortButton?.(
                        header.getContext(),
                      ) || (
                        <TableColumnSorter
                          texts={texts}
                          column={header.column}
                        />
                      ))}
                  </S.HeaderWrapper>
                </S.Th>
              );
            })}
          </S.Tr>
        ))}
      </S.THead>
    </>
  );
};

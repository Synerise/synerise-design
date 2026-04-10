import React, { useMemo } from 'react';

import { useDataFormat } from '@synerise/ds-core';
import InlineAlert from '@synerise/ds-inline-alert';

import { TableSkeleton } from '../../../Table.styles';
import { useTableContext } from '../../../contexts/TableContext';
import * as S from './TableLimit.styles';
import { type TableLimitProps } from './TableLimit.types';

export function TableLimit<TData extends object>({
  texts,
  itemsMenu,
  selection,
  isCounterLoading,
  renderCustomCounter,
}: TableLimitProps<TData>) {
  const { formatValue } = useDataFormat();
  const { table } = useTableContext<TData>();
  const { limit } = selection;

  const selectedRows = table.getSelectedRowModel().rows.length;

  const total = table.getRowCount();

  const limitReachedInfo = useMemo(
    () =>
      limit <= selectedRows && (
        <S.Alert>
          <InlineAlert type="warning" message={texts.selectionLimitWarning} />
        </S.Alert>
      ),
    [texts, selectedRows, limit],
  );

  const selected = useMemo(() => {
    const counterContent = (
      <>
        <strong>{formatValue(total)}</strong> {texts.totalItems}
      </>
    );
    return selectedRows > 0 ? (
      <S.Title>
        <strong>{`${formatValue(selectedRows)} / ${formatValue(limit)}`}</strong>{' '}
        {texts.selected}
      </S.Title>
    ) : (
      <S.Title>
        {isCounterLoading ? (
          <TableSkeleton numberOfSkeletons={1} size="S" skeletonWidth="100px" />
        ) : (
          <>
            {renderCustomCounter
              ? renderCustomCounter({
                  count: total,
                  content: counterContent,
                })
              : counterContent}
          </>
        )}
      </S.Title>
    );
  }, [
    formatValue,
    renderCustomCounter,
    limit,
    texts.totalItems,
    texts.selected,
    isCounterLoading,
    selectedRows,
    total,
  ]);
  return (
    <S.TableLimit>
      {selected}
      {limitReachedInfo}
      {selectedRows > 0 && <S.ItemsMenu>{itemsMenu}</S.ItemsMenu>}
    </S.TableLimit>
  );
}

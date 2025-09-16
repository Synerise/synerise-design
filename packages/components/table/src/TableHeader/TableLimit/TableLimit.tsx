import React, { useMemo } from 'react';

import Alert from '@synerise/ds-alert';
import { useDataFormat } from '@synerise/ds-core';

import { Skeleton } from '../../Table.styles';
import * as S from './TableLimit.styles';
import { type TableLimitProps } from './TableLimit.types';

export function TableLimit<T extends { children?: T[] }>({
  total,
  locale,
  itemsMenu,
  selection,
  isCounterLoading,
  renderCustomCounter,
}: TableLimitProps<T>) {
  const { formatValue } = useDataFormat();
  const { selectedRowKeys, limit } = selection;
  const selectedRows = useMemo(
    () => selectedRowKeys.length || 0,
    [selectedRowKeys],
  );
  const limitReachedInfo = useMemo(
    () =>
      limit <= selectedRows && (
        <S.Alert>
          <Alert.InlineAlert
            type="warning"
            message={locale.selectionLimitWarning}
          />
        </S.Alert>
      ),
    [locale, selectedRows, limit],
  );

  const selected = useMemo(() => {
    const counterContent = (
      <>
        <strong>{formatValue(total)}</strong> {locale.pagination?.items}
      </>
    );
    return selectedRows > 0 ? (
      <S.Title>
        <strong>{`${formatValue(selectedRows)} / ${formatValue(limit)}`}</strong>{' '}
        {locale.selected}
      </S.Title>
    ) : (
      <S.Title>
        {isCounterLoading ? (
          <Skeleton numberOfSkeletons={1} size="S" skeletonWidth="100px" />
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
    locale.pagination,
    locale.selected,
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

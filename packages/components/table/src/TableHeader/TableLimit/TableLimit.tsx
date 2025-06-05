import React, { useMemo } from 'react';
import Alert from '@synerise/ds-alert';
import { useDataFormat } from '@synerise/ds-data-format';
import * as S from './TableLimit.styles';
import { Skeleton } from '../../Table.styles';
import { TableLimitProps } from './TableLimit.types';

export function TableLimit<T extends { children?: T[] }>({
  total,
  locale,
  itemsMenu,
  selection,
  isCounterLoading,
}: TableLimitProps<T>) {
  const { formatValue } = useDataFormat();
  const { selectedRowKeys, limit } = selection;
  const selectedRows = useMemo(() => selectedRowKeys.length || 0, [selectedRowKeys]);
  const limitReachedInfo = useMemo(
    () =>
      limit <= selectedRows && (
        <S.Alert>
          <Alert.InlineAlert type="warning" message={locale.selectionLimitWarning} />
        </S.Alert>
      ),
    [locale, selectedRows, limit]
  );

  const selected = useMemo(() => {
    return selectedRows > 0 ? (
      <S.Title>
        <strong>{`${formatValue(selectedRows)} / ${formatValue(limit)}`}</strong> {locale.selected}
      </S.Title>
    ) : (
      <S.Title>
        {isCounterLoading ? (
          <Skeleton numberOfSkeletons={1} size="S" skeletonWidth="100px" />
        ) : (
          <>
            <strong>{formatValue(total)}</strong> {locale.pagination?.items}
          </>
        )}
      </S.Title>
    );
  }, [formatValue, limit, locale.pagination, locale.selected, isCounterLoading, selectedRows, total]);

  return (
    <S.TableLimit>
      {selected}
      {limitReachedInfo}
      {selectedRows > 0 && <S.ItemsMenu>{itemsMenu}</S.ItemsMenu>}
    </S.TableLimit>
  );
}

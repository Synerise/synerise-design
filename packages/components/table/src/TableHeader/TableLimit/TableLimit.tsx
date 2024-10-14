import React, { ReactText, useMemo } from 'react';
import Alert from '@synerise/ds-alert';
import { useDataFormat } from '@synerise/ds-data-format';
import * as S from './TableLimit.styles';
import { TableLimitProps } from './TableLimit.types';

export function TableLimit<T extends { key: ReactText; children?: T[] }>({
  total,
  locale,
  itemsMenu,
  selection,
}: TableLimitProps<T>) {
  const { formatValue } = useDataFormat();
  const selectedRows = useMemo(() => selection?.selectedRowKeys.length || 0, [selection]);
  const limitReachedInfo = useMemo(
    () =>
      selection?.limit &&
      selection?.limit <= selectedRows && (
        <S.Alert>
          <Alert.InlineAlert type="warning" message={locale.selectionLimitWarning} />
        </S.Alert>
      ),
    [locale, selectedRows, selection]
  );

  const selected = useMemo(() => {
    return selectedRows > 0 ? (
      <S.Title>
        <strong>{formatValue(selectedRows)}</strong> {locale.selected} /{' '}
        {`${formatValue(total)} ${locale.pagination?.items}`}
      </S.Title>
    ) : (
      <S.Title>
        <strong>{formatValue(total)}</strong> {locale.pagination?.items}
      </S.Title>
    );
  }, [formatValue, locale.pagination, locale.selected, selectedRows, total]);

  return (
    <S.TableLimit>
      {selected}
      {limitReachedInfo}
      {selectedRows > 0 && <S.ItemsMenu>{itemsMenu}</S.ItemsMenu>}
    </S.TableLimit>
  );
}

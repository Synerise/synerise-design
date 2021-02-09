import * as React from 'react';
import Alert from '@synerise/ds-alert';
import * as S from './TableLimit.styles';
import { TableLimitProps } from './TableLimit.types';

// eslint-disable-next-line import/prefer-default-export
export function TableLimit<T extends { key: React.ReactText; children?: T[] }>({
  total,
  locale,
  itemsMenu,
  selection,
}: TableLimitProps<T>): React.ReactElement | null {
  const selectedRows = React.useMemo(() => selection?.selectedRowKeys.length || 0, [selection]);
  const limitReachedInfo = React.useMemo(
    () =>
      selection?.limit &&
      selection?.limit <= selectedRows && (
        <S.Alert>
          <Alert.InlineAlert type="warning" message={locale.selectionLimitWarning} />
        </S.Alert>
      ),
    [locale.selectionLimitWarning, selectedRows, selection]
  );

  const selected = React.useMemo(() => {
    return selectedRows > 0 ? (
      <S.Title>
        <strong>{selectedRows}</strong> {locale.selected} / {`${total} ${locale.pagination?.items}`}
      </S.Title>
    ) : (
      <S.Title>
        <strong>{total}</strong> {locale.pagination?.items}
      </S.Title>
    );
  }, [locale.pagination, locale.selected, selectedRows, total]);

  return (
    <S.TableLimit>
      {selected}
      {limitReachedInfo}
      {selectedRows > 0 && <S.ItemsMenu>{itemsMenu}</S.ItemsMenu>}
    </S.TableLimit>
  );
}

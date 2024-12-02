import React from 'react';
import Button from '@synerise/ds-button';
import Tooltip from '@synerise/ds-tooltip';
import { DSColumnType } from '../../Table.types';
import { AnyRecordType, CreateRowStarColumnProps, UseStarredApi } from './useRowStar.types';

const STAR_COL_WIDTH_SINGLE = 64;
const STAR_COL_WIDTH_SELECTON = 40;

const createRowStarColumn =
  ({ isStarred, toggleStarred }: Pick<UseStarredApi, 'isStarred' | 'toggleStarred'>) =>
  ({ locale, rowStar, selection, getRowKey, loading }: CreateRowStarColumnProps): DSColumnType<AnyRecordType> => ({
    key: '_row-star',
    className: `${rowStar?.className || ''} ds-table-star-column`,
    width: !!selection && !!rowStar ? STAR_COL_WIDTH_SELECTON : STAR_COL_WIDTH_SINGLE,
    render:
      rowStar?.renderCell ||
      ((value, record): React.ReactNode => {
        const { expandedChild } = record;
        const keyString = String(getRowKey(record));
        if (loading || (expandedChild && rowStar?.disableForExpandedRows)) return null;

        return (
          <Tooltip title={locale?.starRowTooltip}>
            <Button.Star
              data-testid="ds-table-star-button"
              active={isStarred(keyString)}
              onClick={(e): void => {
                const newStarredRowKeys = toggleStarred(keyString);
                if (typeof rowStar?.onChange === 'function') {
                  rowStar.onChange(newStarredRowKeys, keyString, isStarred(keyString));
                }

                if (typeof rowStar?.onClick === 'function') {
                  rowStar.onClick(e);
                }
              }}
            />
          </Tooltip>
        );
      }),
  });

// eslint-disable-next-line import/prefer-default-export
export const useRowStar = (initialStarredKeys: string[]): UseStarredApi => {
  const starredKeys = React.useRef(new Set(initialStarredKeys));

  const getStarredRowKeys = (): string[] => Array.from(starredKeys.current);

  const isStarred = React.useCallback((key: string): boolean => starredKeys.current.has(key), [starredKeys]);

  const toggleStarred = React.useCallback(
    (key: string): string[] => {
      if (starredKeys.current.has(key)) {
        starredKeys.current.delete(key);
      } else {
        starredKeys.current.add(key);
      }

      return getStarredRowKeys();
    },
    [starredKeys]
  );

  const getRowStarColumn = React.useMemo(
    () => createRowStarColumn({ isStarred, toggleStarred }),
    [isStarred, toggleStarred]
  );

  return {
    getStarredKeys: getStarredRowKeys,
    isStarred,
    toggleStarred,
    getRowStarColumn,
  };
};

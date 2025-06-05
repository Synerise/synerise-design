import React, { useMemo } from 'react';
import { useTheme } from '@synerise/ds-core';
import Icon, {
  DragHandleM,
  VarTypeBooleanM,
  VarTypeDateM,
  VarTypeListM,
  VarTypeNumberM,
  VarTypeStringM,
} from '@synerise/ds-icon';
import { RawSwitch } from '@synerise/ds-switch';
import { escapeRegEx } from '@synerise/ds-utils';
import Tooltip from '@synerise/ds-tooltip';

import * as S from './ColumnManagerItem.styles';
import { Column, ColumnManagerItemProps } from './ColumManagerItem.types';

const DEFAULT_TYPE = 'text';

const typeIcon = {
  text: <VarTypeStringM />,
  number: <VarTypeNumberM />,
  date: <VarTypeDateM />,
  boolean: <VarTypeBooleanM />,
  list: <VarTypeListM />,
};

export const ColumnManagerItem = <ColumnType extends Column>({
  item,
  switchAction,
  draggable,
  searchQuery,
  texts,
  dragHandleProps,
  id,
  isDragged,
  ...rest
}: ColumnManagerItemProps<ColumnType>) => {
  const theme = useTheme();

  const columnName = useMemo(() => {
    if (searchQuery) {
      const escapedQuery = escapeRegEx(searchQuery);
      const startOfQuery = item.name.toLowerCase().search(escapedQuery.toLowerCase());
      const result = item.name.substr(startOfQuery, searchQuery.length);
      return item.name.replace(result, `<span class="search-highlight">${result}</span>`);
    }
    return item.name;
  }, [item.name, searchQuery]);

  return (
    <S.ColumnManagerItem data-testid="ds-column-manager-item" isDragged={isDragged} {...rest}>
      <S.ItemPart align="left">
        {draggable && (
          <S.DragHandler
            component={<DragHandleM />}
            color={theme.palette['grey-400']}
            {...dragHandleProps?.attributes}
            {...dragHandleProps?.listeners}
          />
        )}
        <Icon component={typeIcon[item.type || DEFAULT_TYPE]} color={theme.palette['grey-600']} />
        <S.ColumnManagerItemName dangerouslySetInnerHTML={{ __html: columnName }} />
      </S.ItemPart>
      <S.ItemPart align="right">
        <Tooltip title={item.visible ? texts.switchOff : texts.switchOn} placement="topRight" disabled={item.readOnly}>
          <RawSwitch
            disabled={item.readOnly}
            checked={item.visible}
            onChange={() => switchAction(item.id, !item.visible)}
          />
        </Tooltip>
      </S.ItemPart>
    </S.ColumnManagerItem>
  );
};

export default ColumnManagerItem;

import React, { useMemo } from 'react';
import { withTheme } from 'styled-components';
import Icon, {
  CheckS,
  DividerM,
  DragHandleM,
  Grid4M,
  Grid5M,
  OptionHorizontalM,
  PinM,
  VarTypeBooleanM,
  VarTypeDateM,
  VarTypeListM,
  VarTypeNumberM,
  VarTypeStringM,
} from '@synerise/ds-icon';
import Switch from '@synerise/ds-switch';
import Dropdown from '@synerise/ds-dropdown';
import Button from '@synerise/ds-button';
import { escapeRegEx } from '@synerise/ds-utils';
import Tooltip from '@synerise/ds-tooltip';

import * as S from './ColumnManagerItem.styles';
import { ColumnProps } from './ColumManagerItem.types';

const FIXED_TYPES = {
  left: 'left',
  right: 'right',
};

const typeIcon = {
  text: <VarTypeStringM />,
  number: <VarTypeNumberM />,
  date: <VarTypeDateM />,
  boolean: <VarTypeBooleanM />,
  list: <VarTypeListM />,
};

const ColumnManagerItem = ({
  item,
  theme,
  setFixed,
  switchAction,
  draggable,
  searchQuery,
  texts,
  showGroupSettings,
  ...rest
}: ColumnProps) => {
  const columnName = useMemo(() => {
    if (searchQuery) {
      const escapedQuery = escapeRegEx(searchQuery);
      const startOfQuery = item.name.toLowerCase().search(escapedQuery.toLowerCase());
      const result = item.name.substr(startOfQuery, searchQuery.length);
      return item.name.replace(result, `<span class="search-highlight">${result}</span>`);
    }
    return item.name;
  }, [item.name, searchQuery]);

  const menuDataSource = useMemo(() => {
    return [
      {
        onClick: () => setFixed(item.id, FIXED_TYPES.left),
        prefixel: <Icon component={<Grid4M />} color={theme.palette['grey-600']} />,
        suffixel: item.fixed === FIXED_TYPES.left && <Icon component={<CheckS />} color={theme.palette['green-600']} />,
        text: texts.fixedLeft,
      },
      {
        onClick: () => setFixed(item.id, FIXED_TYPES.right),
        prefixel: <Icon component={<Grid5M />} color={theme.palette['grey-600']} />,
        suffixel: item.fixed === FIXED_TYPES.right && (
          <Icon component={<CheckS />} color={theme.palette['green-600']} />
        ),
        text: texts.fixedRight,
      },
      {
        onClick: () => showGroupSettings(item),
        prefixel: <Icon component={<DividerM />} color={theme.palette['grey-600']} />,
        suffixel: item.group && <Icon component={<CheckS />} color={theme.palette['green-600']} />,

        text: texts.group,
      },
    ];
  }, [item, setFixed, showGroupSettings, texts.fixedLeft, texts.fixedRight, texts.group, theme.palette]);

  return (
    <S.ColumnManagerItem {...rest}>
      <S.ItemPart align="left">
        {draggable && <S.DragHandler component={<DragHandleM />} color={theme.palette['grey-400']} />}
        <Icon component={typeIcon[item.type]} color={theme.palette['grey-600']} />
        <S.ColumnManagerItemName dangerouslySetInnerHTML={{ __html: columnName }} />
      </S.ItemPart>
      <S.ItemPart align="right">
        <S.Icons>
          {item.group && <Icon component={<DividerM />} color={theme.palette['grey-400']} />}
          {item.fixed && <Icon component={<PinM />} color={theme.palette['grey-400']} />}
        </S.Icons>
        {item.visible && (
          <Dropdown overlay={<S.FixedMenu dataSource={menuDataSource} />}>
            <Button type="ghost" mode="single-icon">
              <Icon component={<OptionHorizontalM />} color={theme.palette['grey-700']} />
            </Button>
          </Dropdown>
        )}
        <Tooltip title={item.visible ? texts.switchOff : texts.switchOn} placement="topRight">
          <Switch checked={item.visible} label="" onChange={() => switchAction(item.id, item.visible)} />
        </Tooltip>
      </S.ItemPart>
    </S.ColumnManagerItem>
  );
};

export default withTheme(ColumnManagerItem);

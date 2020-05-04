import * as React from 'react';
import {
  CheckS,
  Close2M,
  DragHandleM,
  Grid4M,
  PinM,
  VarTypeBooleanM,
  VarTypeDateM,
  VarTypeListM,
  VarTypeNumberM,
  VarTypeStringM,
} from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Switch from '@synerise/ds-switch/dist/Switch';
import { withTheme } from 'styled-components';
import Dropdown from '@synerise/ds-dropdown';
import Button from '@synerise/ds-button';
import Divider from '@synerise/ds-divider';
import Menu from '@synerise/ds-menu';
import { escapeRegEx } from '@synerise/ds-utils';

import Tooltip from '@synerise/ds-tooltip';
import * as S from './ColumnManagerItem.styles';
import { Column, ColumnProps } from './ColumManagerIte.types';

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

const ColumnManagerItem: React.FC<Column & ColumnProps> = ({
  id,
  name,
  visible,
  type,
  fixed,
  theme,
  setFixed,
  switchAction,
  draggable,
  searchQuery,
  texts,
  ...rest
}) => {
  const columnName = React.useMemo(() => {
    if (searchQuery) {
      const escapedQuery = escapeRegEx(searchQuery);
      const startOfQuery = name.toLowerCase().search(escapedQuery.toLowerCase());
      const result = name.substr(startOfQuery, searchQuery.length);
      return name.replace(result, `<span class="search-highlight">${result}</span>`);
    }
    return name;
  }, [name, searchQuery]);

  const fixedMenu = (): React.ReactElement => (
    <S.FixedMenu>
      <Menu.Item
        onClick={(): void => setFixed(id, FIXED_TYPES.left)}
        prefixel={<Icon component={<Grid4M />} color={theme.palette['grey-600']} />}
        suffixel={fixed === FIXED_TYPES.left && <Icon component={<CheckS />} color={theme.palette['green-600']} />}
      >
        {texts.fixedLeft}
      </Menu.Item>
      <Menu.Item
        onClick={(): void => setFixed(id, FIXED_TYPES.right)}
        prefixel={<Icon component={<Grid4M />} color={theme.palette['grey-600']} />}
        suffixel={fixed === FIXED_TYPES.right && <Icon component={<CheckS />} color={theme.palette['green-600']} />}
      >
        {texts.fixedRight}
      </Menu.Item>
      <Divider dashed style={{ margin: '8px 0' }} />
      <Menu.Item
        danger
        onClick={(): void => setFixed(id, undefined)}
        prefixel={<Icon component={<Close2M />} color={theme.palette['grey-600']} />}
      >
        {texts.clear}
      </Menu.Item>
    </S.FixedMenu>
  );

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <S.ColumnManagerItem {...rest}>
      <S.ItemPart align="left">
        {draggable && <S.DragHandler component={<DragHandleM />} color={theme.palette['grey-400']} />}
        <Icon component={typeIcon[type]} color={theme.palette['grey-600']} />
        <S.ColumnManagerItemName dangerouslySetInnerHTML={{ __html: columnName }} />
      </S.ItemPart>
      <S.ItemPart align="right">
        {visible && (
          <Dropdown
            overlay={fixedMenu()}
            className={fixed ? 'ds-column-manager-item-fixed' : 'ds-column-manager-item-non-fixed'}
          >
            <Button type="ghost" mode="single-icon">
              <Icon component={<PinM />} color={theme.palette['grey-700']} />
            </Button>
          </Dropdown>
        )}
        <Tooltip title={visible ? texts.switchOff : texts.switchOn} placement="topRight">
          <Switch checked={visible} label="" onChange={(): void => switchAction(id, visible)} />
        </Tooltip>
      </S.ItemPart>
    </S.ColumnManagerItem>
  );
};

export default withTheme(ColumnManagerItem);

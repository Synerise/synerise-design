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
import * as S from './ColumnManagerItem.styles';

const FIXED_TYPES = {
  left: 'left',
  right: 'right',
};

export type Column = {
  id: string;
  name: string;
  visible: boolean;
  type: string | 'text' | 'number' | 'date' | 'boolean' | 'list';
  fixed?: string | 'left' | 'right';
};

export type ColumnProps = {
  setFixed: (id: string, fixed?: string) => void;
  draggable?: boolean;
  switchAction: (id: string, visible: boolean) => void;
  searchQuery?: string;
  texts: {
    [k: string]: string | React.ReactNode;
  };
  theme: {
    [k: string]: string;
  };
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
      const startOfQuery = name.toLowerCase().search(searchQuery.toLowerCase());
      const result = name.substr(startOfQuery, searchQuery.length);
      return name.replace(result, `<span class="search-highlight">${result}</span>`);
    }
    return name;
  }, [name, searchQuery]);

  const fixedMenu = (): React.ReactNode => (
    <S.FixedMenu>
      <S.FixedMenuItem delete={false} onClick={(): void => setFixed(id, FIXED_TYPES.left)}>
        <S.FixedMenuItemIcon component={<Grid4M />} color={theme.palette['grey-600']} />
        <S.FixedMenuItemLabel>{texts.fixedLeft}</S.FixedMenuItemLabel>
        {fixed === FIXED_TYPES.left && (
          <S.FixedMenuItemCheckIcon component={<CheckS />} color={theme.palette['green-600']} />
        )}
      </S.FixedMenuItem>
      <S.FixedMenuItem delete={false} onClick={(): void => setFixed(id, FIXED_TYPES.right)}>
        <S.FixedMenuItemIcon component={<Grid4M />} color={theme.palette['grey-600']} />
        <S.FixedMenuItemLabel>{texts.fixedRight}</S.FixedMenuItemLabel>
        {fixed === FIXED_TYPES.right && (
          <S.FixedMenuItemCheckIcon component={<CheckS />} color={theme.palette['green-600']} />
        )}
      </S.FixedMenuItem>
      <Divider dashed style={{ margin: '8px 0' }} />
      <S.FixedMenuItem delete onClick={(): void => setFixed(id, undefined)}>
        <Icon component={<Close2M />} color={theme.palette['grey-600']} />
        <S.FixedMenuItemLabel>{texts.clear}</S.FixedMenuItemLabel>
      </S.FixedMenuItem>
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
        <Switch checked={visible} label="" onChange={(): void => switchAction(id, visible)} />
      </S.ItemPart>
    </S.ColumnManagerItem>
  );
};

export default withTheme(ColumnManagerItem);

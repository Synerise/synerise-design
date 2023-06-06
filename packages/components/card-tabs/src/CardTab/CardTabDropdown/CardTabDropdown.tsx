import * as React from 'react';
import { FC, useState, useRef, ReactElement, MouseEvent } from 'react';
import Dropdown from '@synerise/ds-dropdown';
import { useOnClickOutside } from '@synerise/ds-utils';
import Icon, { OptionVerticalM, EditM, DuplicateM, TrashM } from '@synerise/ds-icon';
import Menu from '@synerise/ds-menu';
import MenuItem from '@synerise/ds-menu/dist/Elements/Item/MenuItem';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

import * as S from '../CardTab.styles';
import { CardTabDropdownProps } from './CardTabDropdown.types';

const CardTabDropdown: FC<CardTabDropdownProps> = ({ editNameHandler, duplicateHandler, removeHandler, texts }) => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => {
    setOpen(false);
  });
  const menuItems: ReactElement[] = [];

  if (editNameHandler) {
    menuItems.push(
      <MenuItem
        onClick={(e): void => {
          editNameHandler(e.domEvent);
          setOpen(false);
        }}
        prefixel={<Icon component={<EditM />} />}
      >
        {texts?.changeNameMenuItem || 'Edit'}
      </MenuItem>
    );
  }
  if (duplicateHandler) {
    menuItems.push(
      <MenuItem
        onClick={(e): void => {
          duplicateHandler(e.domEvent);
          setOpen(false);
        }}
        prefixel={<Icon component={<DuplicateM />} />}
      >
        {texts?.duplicateMenuItem || 'Duplicate'}
      </MenuItem>
    );
  }
  if (removeHandler) {
    menuItems.push(
      <MenuItem
        prefixel={<Icon component={<TrashM />} />}
        onClick={(e): void => {
          removeHandler(e.domEvent);
          setOpen(false);
        }}
        key="key3"
        type="danger"
      >
        {texts?.removeMenuItem || 'Delete'}
      </MenuItem>
    );
  }

  return (
    <S.CardTabSuffix data-testid="card-tab-suffix" className="ds-card-tabs__suffix-nodrag">
      <Dropdown
        overlayStyle={{ borderRadius: '3px' }}
        visible={open}
        placement="bottomLeft"
        trigger={['click']}
        overlay={
          <div ref={ref}>
            <Menu asDropdownMenu>{menuItems}</Menu>
          </div>
        }
      >
        <Icon
          onClick={(e: MouseEvent): void => {
            e.stopPropagation();
            setOpen(!open);
          }}
          component={<OptionVerticalM />}
          color={theme.palette['grey-600']}
        />
      </Dropdown>
    </S.CardTabSuffix>
  );
};

export default CardTabDropdown;

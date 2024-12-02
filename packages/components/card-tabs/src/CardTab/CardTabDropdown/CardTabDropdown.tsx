import React, { useState, useRef, MouseEvent } from 'react';
import Dropdown from '@synerise/ds-dropdown';
import { useOnClickOutside } from '@synerise/ds-utils';
import Icon, { OptionVerticalM, EditM, DuplicateM, TrashM } from '@synerise/ds-icon';
import Menu, { MenuItemProps } from '@synerise/ds-menu';

import * as S from '../CardTab.styles';
import { CardTabDropdownProps } from './CardTabDropdown.types';

const CardTabDropdown = ({ editNameHandler, duplicateHandler, removeHandler, texts }: CardTabDropdownProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuItems: MenuItemProps[] = [];

  useOnClickOutside(ref, () => {
    setOpen(false);
  });

  if (editNameHandler) {
    menuItems.push({
      onClick: event => {
        editNameHandler(event.domEvent);
        setOpen(false);
      },
      key: 'card-tabs-menu-item-rename',
      prefixel: <Icon component={<EditM />} />,
      text: texts.changeNameMenuItem,
    });
  }
  if (duplicateHandler) {
    menuItems.push({
      onClick: event => {
        duplicateHandler(event.domEvent);
        setOpen(false);
      },
      key: 'card-tabs-menu-item-duplicate',
      prefixel: <Icon component={<DuplicateM />} />,
      text: texts.duplicateMenuItem,
    });
  }
  if (removeHandler) {
    menuItems.push({
      prefixel: <Icon component={<TrashM />} />,
      onClick: event => {
        removeHandler(event.domEvent);
        setOpen(false);
      },
      key: 'card-tabs-menu-item-delete',
      type: 'danger',
      text: texts.removeMenuItem,
    });
  }

  return (
    <S.CardTabSuffix data-testid="card-tab-suffix" className="ds-card-tabs__suffix-nodrag">
      <Dropdown
        visible={open}
        placement="bottomLeft"
        trigger={['click']}
        overlay={
          <div data-testid="card-tabs-dropdown" ref={ref}>
            <Menu asDropdownMenu dataSource={menuItems} />
          </div>
        }
      >
        <Icon
          onClick={(event: MouseEvent) => {
            event.stopPropagation();
            setOpen(!open);
          }}
          data-testid="ds-card-tabs-contextmenu"
          component={<OptionVerticalM />}
        />
      </Dropdown>
    </S.CardTabSuffix>
  );
};

export default CardTabDropdown;

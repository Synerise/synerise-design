import React from 'react';

import {
  DropdownMenu,
  type DropdownMenuListItemProps,
} from '@synerise/ds-dropdown';
import Icon, {
  DuplicateM,
  EditM,
  OptionVerticalM,
  TrashM,
} from '@synerise/ds-icon';

import * as S from '../CardTab.styles';
import { type CardTabDropdownProps } from './CardTabDropdown.types';

const CardTabDropdown = ({
  editNameHandler,
  duplicateHandler,
  removeHandler,
  texts,
}: CardTabDropdownProps) => {
  const menuItems: DropdownMenuListItemProps[] = [];

  if (editNameHandler) {
    menuItems.push({
      onClick: (event) => {
        editNameHandler(event.domEvent);
      },
      key: 'card-tabs-menu-item-rename',
      prefixel: <Icon component={<EditM />} />,
      text: texts.changeNameMenuItem,
    });
  }
  if (duplicateHandler) {
    menuItems.push({
      onClick: (event) => {
        duplicateHandler(event.domEvent);
      },
      key: 'card-tabs-menu-item-duplicate',
      prefixel: <Icon component={<DuplicateM />} />,
      text: texts.duplicateMenuItem,
    });
  }
  if (removeHandler) {
    menuItems.push({
      prefixel: <Icon component={<TrashM />} />,
      onClick: (event) => {
        removeHandler(event.domEvent);
      },
      key: 'card-tabs-menu-item-delete',
      type: 'danger',
      text: texts.removeMenuItem,
    });
  }

  return (
    <S.CardTabSuffix
      data-testid="card-tab-suffix"
      className="ds-card-tabs__suffix-nodrag"
    >
      <DropdownMenu
        dataSource={menuItems}
        placement="bottomLeft"
        hideOnItemClick
        trigger="click"
        asChild
        popoverProps={{ testId: 'card-tabs-contextmenu' }}
      >
        <Icon
          data-testid="ds-card-tabs-contextmenu"
          component={<OptionVerticalM />}
        />
      </DropdownMenu>
    </S.CardTabSuffix>
  );
};

export default CardTabDropdown;

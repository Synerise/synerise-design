import React from 'react';
import styled from 'styled-components';
import Dropdown from '@synerise/ds-dropdown';
import Menu, { MenuItemProps } from '@synerise/ds-menu';
import Button from '@synerise/ds-button';
import Icon, { OptionHorizontalM } from '@synerise/ds-icon';

import type { ItemRollElement } from '../ItemsRoll.types';

export type ExtrasProps = {
  actions: ItemRollElement<MenuItemProps>[];
};

const ItemMenu = styled(Menu)`
  padding: 8px;
`;

const Extras = ({ actions }: ExtrasProps) => {
  return (
    <Dropdown
      trigger={['click']}
      placement="bottomRight"
      overlay={
        <div data-testid="items-roll-action-menu">
          <ItemMenu dataSource={actions} />
        </div>
      }
    >
      <Button type="ghost" mode="single-icon">
        <Icon component={<OptionHorizontalM />} />
      </Button>
    </Dropdown>
  );
};

export default Extras;

import * as React from 'react';
import styled from 'styled-components';
import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import OptionHorizontalM from '@synerise/ds-icon/dist/icons/OptionHorizontalM';

import { ItemRollElement } from '../ItemsRoll.types';

export type ExtrasProps = {
  actions: ItemRollElement[];
};

const ItemMenu = styled(Menu)`
  padding: 8px;
`;

const Extras: React.FC<ExtrasProps> = ({ actions }) => {
  return (
    <Dropdown
      trigger={['click']}
      overlay={
        <ItemMenu data-testid="items-roll-action-menu">
          {actions.map(action => (
            <Menu.Item {...action} key={action.id}>
              {action.text}
            </Menu.Item>
          ))}
        </ItemMenu>
      }
    >
      <Button type="ghost" mode="single-icon">
        <Icon component={<OptionHorizontalM />} />
      </Button>
    </Dropdown>
  );
};

export default Extras;

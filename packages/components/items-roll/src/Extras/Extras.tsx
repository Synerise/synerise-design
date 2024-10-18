import React from 'react';
import styled from 'styled-components';
import Dropdown from '@synerise/ds-dropdown';
import ListItem from '@synerise/ds-list-item';
import Button from '@synerise/ds-button';
import Icon, { OptionHorizontalM } from '@synerise/ds-icon';

import { ItemRollElement } from '../ItemsRoll.types';

export type ExtrasProps = {
  actions: ItemRollElement[];
};

const ItemMenu = styled.div`
  padding: 8px;
`;

const Extras: React.FC<ExtrasProps> = ({ actions }) => {
  return (
    <Dropdown
      trigger={['click']}
      placement="bottomRight"
      overlay={
        <ItemMenu data-testid="items-roll-action-menu">
          {actions.map(action => (
            <ListItem {...action} key={action.id}>
              {action.text}
            </ListItem>
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

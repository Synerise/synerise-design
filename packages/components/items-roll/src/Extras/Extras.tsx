import React from 'react';

import Button from '@synerise/ds-button';
import { DropdownMenu } from '@synerise/ds-dropdown';
import Icon, { OptionHorizontalM } from '@synerise/ds-icon';
import { type ListItemProps } from '@synerise/ds-list-item';

import type { ItemRollElement } from '../ItemsRoll.types';

export type ExtrasProps = {
  actions: ItemRollElement<ListItemProps>[];
};

const Extras = ({ actions }: ExtrasProps) => {
  return (
    <DropdownMenu
      dataSource={actions}
      trigger={['click']}
      placement="bottomRight"
      popoverProps={{
        testId: 'items-roll-actions',
      }}
      asChild
    >
      <Button type="ghost" mode="single-icon">
        <Icon component={<OptionHorizontalM />} />
      </Button>
    </DropdownMenu>
  );
};

export default Extras;

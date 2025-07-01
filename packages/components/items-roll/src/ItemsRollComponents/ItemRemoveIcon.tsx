import React, { type MouseEvent } from 'react';

import { theme } from '@synerise/ds-core';
import Icon, { CloseS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import { RemoveIconWrapper } from './ItemRemoveIcon.styles';
import { type RemoveIconProps } from './ItemRemoveIcon.types';

export const RemoveIcon = ({
  id,
  handleRemove,
  tooltipLabel,
  group,
}: RemoveIconProps) => (
  <Tooltip title={tooltipLabel}>
    <RemoveIconWrapper data-testid="items-roll-remove-icon">
      <Icon
        className="element-remove-icon"
        onClick={(event: MouseEvent<HTMLDivElement>) => {
          event.stopPropagation();
          handleRemove(id, group);
        }}
        component={<CloseS />}
        color={theme.palette['red-600']}
        size={24}
      />
    </RemoveIconWrapper>
  </Tooltip>
);

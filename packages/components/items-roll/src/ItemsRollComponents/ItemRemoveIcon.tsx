import React, { type MouseEvent } from 'react';

import Icon, { CloseS } from '@synerise/ds-icon';
import { FloatingDelayGroup } from '@synerise/ds-popover';
import Tooltip from '@synerise/ds-tooltip';

import { RemoveIconWrapper } from './ItemRemoveIcon.styles';
import type { RemoveIconProps } from './ItemRemoveIcon.types';

export const RemoveIcon = ({
  id,
  handleRemove,
  tooltipLabel,
  group,
}: RemoveIconProps) => (
  <FloatingDelayGroup delay={{ open: 0, close: 100 }}>
    <Tooltip title={tooltipLabel}>
      <RemoveIconWrapper data-testid="items-roll-remove-icon">
        <Icon
          className="element-remove-icon"
          onClick={(event: MouseEvent<HTMLDivElement>) => {
            event.stopPropagation();
            handleRemove(id, group);
          }}
          component={<CloseS />}
          color="var(--ds-color-icon-danger-default)"
          size={24}
        />
      </RemoveIconWrapper>
    </Tooltip>
  </FloatingDelayGroup>
);

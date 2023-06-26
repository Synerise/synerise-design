import * as React from 'react';
import Icon, { CloseS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import { theme } from '@synerise/ds-core';
import { RemoveIconWrapper } from './ItemRemoveIcon.styles';
import { RemoveIconProps } from './ItemRemoveIcon.types';

// eslint-disable-next-line import/prefer-default-export
export const RemoveIcon: React.FC<RemoveIconProps> = ({ id, handleRemove, tooltipLabel, group }) => (
  <Tooltip title={tooltipLabel}>
    <RemoveIconWrapper>
      <Icon
        className="element-remove-icon"
        onClick={(e: React.MouseEvent<HTMLDivElement>): void => {
          e.stopPropagation();
          handleRemove(id, group);
        }}
        component={<CloseS />}
        color={theme.palette['red-600']}
        size={24}
      />
    </RemoveIconWrapper>
  </Tooltip>
);

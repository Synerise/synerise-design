import * as React from 'react';
import Icon from '@synerise/ds-icon';
import CloseS from '@synerise/ds-icon/dist/icons/CloseS';
import Tooltip from '@synerise/ds-tooltip';

import { RemoveIconWrapper } from './ItemRemoveIcon.styles';

export type RemoveIconProps = {
  id: string;
  isHovered: boolean;
  handleRemove: (id: string) => void;
  tooltipLabel: string | React.ReactNode;
};

export const RemoveIcon: React.FC<RemoveIconProps> = ({ id, isHovered, handleRemove, tooltipLabel }) => (
  <Tooltip title={tooltipLabel}>
    <RemoveIconWrapper isHovered={isHovered}>
      <Icon
        className="element-remove-icon"
        onClick={(e): void => {
          e.stopPropagation();
          handleRemove(id);
        }}
        component={<CloseS />}
        size={24}
      />
    </RemoveIconWrapper>
  </Tooltip>
);

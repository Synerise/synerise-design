import * as React from 'react';
import Icon from '@synerise/ds-icon';
import CloseS from '@synerise/ds-icon/dist/icons/CloseS';
import Tooltip from '@synerise/ds-tooltip';

import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { RemoveIconWrapper } from './ItemRemoveIcon.styles';

export type RemoveIconProps = {
  id: string;
  handleRemove: (id: string) => void;
  tooltipLabel: string | React.ReactNode;
};

export const RemoveIcon: React.FC<RemoveIconProps> = ({ id, handleRemove, tooltipLabel }) => (
  <Tooltip title={tooltipLabel}>
    <RemoveIconWrapper>
      <Icon
        className="element-remove-icon"
        onClick={(e): void => {
          e.stopPropagation();
          handleRemove(id);
        }}
        component={<CloseS />}
        color={theme.palette['red-600']}
        size={24}
      />
    </RemoveIconWrapper>
  </Tooltip>
);

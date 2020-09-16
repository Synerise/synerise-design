import * as React from 'react';
import Icon from '@synerise/ds-icon';
import CloseS from '@synerise/ds-icon/dist/icons/CloseS';
import Tooltip from '@synerise/ds-tooltip';

import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { RemoveIconWrapper } from './ItemRemoveIcon.styles';
import { RemoveIconProps } from './ItemRemoveIcon.types';

// eslint-disable-next-line import/prefer-default-export
export const RemoveIcon: React.FC<RemoveIconProps> = ({ id, handleRemove, tooltipLabel }) => (
  <Tooltip title={tooltipLabel}>
    <RemoveIconWrapper>
      <Icon
        className="element-remove-icon"
        onClick={(e: React.MouseEvent<HTMLDivElement>): void => {
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

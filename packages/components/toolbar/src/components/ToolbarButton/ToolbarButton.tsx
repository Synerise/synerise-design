import React from 'react';
import Button from '@synerise/ds-button';
import Tooltip from '@synerise/ds-tooltip';
import Badge from '@synerise/ds-badge';

import type { ToolbarButtonProps } from '../../Toolbar.types';

export const ToolbarButton = ({ tooltipProps, badgeProps, ...props }: ToolbarButtonProps) => {
  const rawButton = <Button type="ghost" {...props} />;
  const button = badgeProps ? <Badge {...badgeProps}>{rawButton}</Badge> : rawButton;
  return tooltipProps ? <Tooltip {...tooltipProps}>{button}</Tooltip> : button;
};

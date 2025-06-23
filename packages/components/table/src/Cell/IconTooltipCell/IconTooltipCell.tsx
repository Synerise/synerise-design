import React from 'react';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { IconTooltipCellProps } from './IconTooltipCell.types';
import * as S from './IconTooltipCell.styles';

const IconTooltipCell = ({
  label,
  icon,
  tooltip = {},
  tooltipIcon,
  disabled,
  ...htmlAttributes
}: IconTooltipCellProps) => (
  <S.IconTooltipCell {...htmlAttributes} isDisabled={disabled}>
    {icon && <Icon className="main-icon" {...icon} />}
    {label && <S.Label>{label}</S.Label>}
    {tooltipIcon && (
      <Tooltip {...tooltip}>
        <Icon className="tooltip-icon" {...tooltipIcon} />
      </Tooltip>
    )}
  </S.IconTooltipCell>
);

export default IconTooltipCell;

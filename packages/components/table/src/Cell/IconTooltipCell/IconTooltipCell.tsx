import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { Props } from './IconTooltipCell.types';
import * as S from './IconTooltipCell.styles';

const IconTooltipCell: React.FC<Props> = ({ label, icon = {}, tooltip = {}, tooltipIcon = {} }) => (
  <S.IconTooltipCell>
    {!!icon && <Icon className="main-icon" {...icon} />}
    {!!label && <S.Label>{label}</S.Label>}
    {tooltipIcon && (
      <Tooltip {...tooltip}>
        <Icon className="tooltip-icon" {...tooltipIcon} />
      </Tooltip>
    )}
  </S.IconTooltipCell>
);

export default IconTooltipCell;

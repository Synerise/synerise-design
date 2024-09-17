import React from 'react';
import Tooltip from '@synerise/ds-tooltip';
import Icon, { InfoFillS } from '@synerise/ds-icon';

import * as S from './Label.styles';
import { LabelProps } from './Label.types';

const Label = ({ id, className, label, tooltip, tooltipConfig, style }: LabelProps) => (
  <>
    {label && (
      <S.Label style={style} htmlFor={id} className={className}>
        <S.LabelText ellipsis={{ tooltip: label }}>{label}</S.LabelText>
        {(tooltip || tooltipConfig) && (
          <Tooltip title={tooltip} placement="top" trigger="hover" transitionName="zoom-big-fast" {...tooltipConfig}>
            <S.IconWrapper>
              <Icon size={24} component={<InfoFillS />} />
            </S.IconWrapper>
          </Tooltip>
        )}
      </S.Label>
    )}
  </>
);

export default Label;

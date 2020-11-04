import * as React from 'react';
import Tooltip from '@synerise/ds-tooltip';
import Icon from '@synerise/ds-icon';
import InfoFillS from '@synerise/ds-icon/dist/icons/InfoFillS';
import * as S from './Label.styles';
import { LabelProps } from './Label.types';

const Label: React.FC<LabelProps> = ({ id, className, label, tooltip, tooltipConfig, style }) => (
  <>
    {label && (
      <S.Label style={style} htmlFor={id} className={className}>
        {label}
        {(tooltip || tooltipConfig) && (
          <Tooltip title={tooltip} placement="top" trigger="hover" transitionName="zoom-big-fast" {...tooltipConfig}>
            <span>
              <Icon size={24} component={<InfoFillS />} />
            </span>
          </Tooltip>
        )}
      </S.Label>
    )}
  </>
);

export default Label;

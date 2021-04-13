import * as React from 'react';
import Icon from '@synerise/ds-icon';
import CheckL from '@synerise/ds-icon/dist/icons/L/CheckL';
import WarningL from '@synerise/ds-icon/dist/icons/L/WarningL';
import WarningXl from '@synerise/ds-icon/dist/icons/XL/WarningXl';
import CheckXl from '@synerise/ds-icon/dist/icons/XL/CheckXl';
import { AlertInfoProps } from './AlertInfo.types';
import * as S from './AlertInfo.styles';

const mapSizeToPx = {
  L: 48,
  XL: 96,
};

const AlertInfo: React.FC<AlertInfoProps> = ({
  size = 'L',
  label,
  labelPosition = 'right',
  type,
  text,
  button,
  fontSize,
  mode,
}) => {
  const mapTypeToStatus = {
    warning: {
      IconComponent: size === 'L' ? WarningL : WarningXl,
      iconColor: 'yellow-600',
    },
    error: {
      IconComponent: size === 'L' ? WarningL : WarningXl,
      iconColor: 'red-600',
    },
    success: {
      IconComponent: size === 'L' ? CheckL : CheckXl,
      iconColor: 'green-600',
    },
  };
  const { IconComponent, ...iconContainerStyles } = mapTypeToStatus[type];
  return (
    <S.AlertWrapper mode={mode} className="ds-alert-info" labelPosition={labelPosition}>
      <S.AlertIconContainer>
        <S.StatusIconContainer {...iconContainerStyles}>
          <Icon component={<IconComponent />} size={mapSizeToPx[size]} />
        </S.StatusIconContainer>
      </S.AlertIconContainer>
      {text && (
        <S.HeaderWrapper size={size} fontSize={fontSize}>
          {text}
        </S.HeaderWrapper>
      )}
      <S.TextWrapper labelPosition={labelPosition}>{label}</S.TextWrapper>
      {button && <S.ButtonWrapper>{button}</S.ButtonWrapper>}
    </S.AlertWrapper>
  );
};
export default AlertInfo;

import React from 'react';

import Icon, { CheckL, CheckXl, WarningL, WarningXl } from '@synerise/ds-icon';

import * as S from './AlertInfo.styles';
import { type AlertInfoProps, AlertSize } from './AlertInfo.types';

const mapSizeToPx = {
  [AlertSize.SMALL]: 48,
  [AlertSize.MEDIUM]: 96,
};

const AlertInfo: React.FC<AlertInfoProps> = ({
  size = AlertSize.SMALL,
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
      IconComponent: size === AlertSize.SMALL ? WarningL : WarningXl,
      iconColor: 'yellow-600',
    },
    error: {
      IconComponent: size === AlertSize.SMALL ? WarningL : WarningXl,
      iconColor: 'red-600',
    },
    success: {
      IconComponent: size === AlertSize.SMALL ? CheckL : CheckXl,
      iconColor: 'green-600',
    },
  };
  const { IconComponent, ...iconContainerStyles } = mapTypeToStatus[type];
  return (
    <S.AlertWrapper
      mode={mode}
      className="ds-alert-info"
      labelPosition={labelPosition}
    >
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

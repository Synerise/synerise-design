import React, { type ReactNode, useMemo } from 'react';

import Icon, { Check3M, InfoFillM, WarningFillM } from '@synerise/ds-icon';

import * as S from './InlineAlert.styles';
import {
  type InlineAlertProps,
  type InlineAlertType,
} from './InlineAlert.types';

const ICONS: Record<InlineAlertType, ReactNode> = {
  success: <Check3M />,
  alert: <WarningFillM />,
  warning: <WarningFillM />,
  info: <InfoFillM />,
};

const InlineAlert = ({ type = 'warning', message }: InlineAlertProps) => {
  const icon = useMemo(() => {
    return ICONS[type];
  }, [type]);
  return (
    <S.InlineAlertWrapper type={type} className="ds-inline-alert">
      <Icon component={icon} />
      <S.Message>{message}</S.Message>
    </S.InlineAlertWrapper>
  );
};

export default InlineAlert;

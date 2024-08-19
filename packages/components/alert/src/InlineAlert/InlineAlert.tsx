import React, { useMemo, ReactNode } from 'react';
import Icon, { Check3M, WarningFillM, InfoFillM } from '@synerise/ds-icon';
import { InlineAlertProps, InlineAlertType } from './InlineAlert.types';
import * as S from './InlineAlert.styles';

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

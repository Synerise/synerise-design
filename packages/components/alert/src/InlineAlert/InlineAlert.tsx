import * as React from 'react';
import Icon, { Check3M, WarningFillM, InfoM } from '@synerise/ds-icon';
import { InlineAlertProps, InlineAlertType } from './InlineAlert.types';
import * as S from './InlineAlert.styles';

const ICONS: Record<InlineAlertType, React.ReactNode> = {
  success: <Check3M />,
  alert: <WarningFillM />,
  warning: <WarningFillM />,
  info: <InfoM />,
};

const InlineAlert: React.FC<InlineAlertProps> = ({ type = 'warning', message }) => {
  const icon = React.useMemo(() => {
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

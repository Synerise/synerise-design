import { Check2M, WarningFillM } from '@synerise/ds-icon/dist/icons';
import * as React from 'react';
import Icon from '@synerise/ds-icon';
import { InlineAlertProps } from './InlineAlert.types';
import * as S from './InlineAlert.styles';

const ICONS = {
  success: <Check2M />,
  alert: <WarningFillM />,
  warning: <WarningFillM />,
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

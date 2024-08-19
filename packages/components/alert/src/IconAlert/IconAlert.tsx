import React, { ReactNode, useMemo } from 'react';
import Icon, { Check3M, WarningFillM, InfoFillM } from '@synerise/ds-icon';
import { IconAlertProps, IconAlertType } from './IconAlert.types';
import * as S from './IconAlert.styles';

const ICONS: Record<IconAlertType, ReactNode> = {
  success: <Check3M />,
  alert: <WarningFillM />,
  warning: <WarningFillM />,
  info: <InfoFillM />,
};

const IconAlert = ({
  type = 'warning',
  iconAlert,
  message,
  withLink,
  withEmphasis,
  hoverButton,
  disabled,
  customIcon,
  ...rest
}: IconAlertProps) => {
  const icon = useMemo(() => {
    return ICONS[type];
  }, [type]);
  return (
    <S.IconAlertWrapper {...rest} type={type} disabled={disabled} hoverButton={hoverButton} className="ds-inline-alert">
      {iconAlert && (customIcon || <Icon component={icon} />)}
      {message && (
        <S.Message>
          {message}
          {withLink && <S.LinkWrapper>{withLink}</S.LinkWrapper>}
          {withEmphasis && !withLink && <S.EmphasisWrapper>{withEmphasis}</S.EmphasisWrapper>}
        </S.Message>
      )}
    </S.IconAlertWrapper>
  );
};

export default IconAlert;

import { Check2M, WarningFillM, InfoM } from '@synerise/ds-icon/dist/icons';
import * as React from 'react';
import Icon from '@synerise/ds-icon';
import { IconAlertProps, IconAlertType } from './IconAlert.types';
import * as S from './IconAlert.styles';

const ICONS: Record<IconAlertType, React.ReactNode> = {
  success: <Check2M />,
  alert: <WarningFillM />,
  warning: <WarningFillM />,
  info: <InfoM />,
};

const IconsAlert: React.FC<IconAlertProps> = ({ type = 'warning', iconAlert, message, withLink,withEmphasis,hoverButton,disabled,...rest }) => {
  const icon = React.useMemo(() => {
    return ICONS[type];
  }, [type]);
  return (
    <S.IconAlertWrapper {...rest} type={type} disabled={disabled} hoverButton={hoverButton} className="ds-inline-alert">
      {iconAlert && <Icon component={icon} />}
      {message && <S.Message>{message}{withLink && <S.LinkWrapper>{withLink}</S.LinkWrapper>}
        {withEmphasis && !withLink && <S.EmphasisWrapper>{withEmphasis}</S.EmphasisWrapper>}</S.Message>}
    </S.IconAlertWrapper>
  );
};

export default IconsAlert;
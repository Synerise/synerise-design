import Icon from '@synerise/ds-icon';
import { WarningFillM, InfoFillM, Check3M, HelpFillM } from '@synerise/ds-icon/dist/icons';
import * as React from 'react';
import UserCheckM from '@synerise/ds-icon/dist/icons/UserCheckM';
import UpdateDataM from '@synerise/ds-icon/dist/icons/UpdateDataM';
import NotificationsReceiveM from '@synerise/ds-icon/dist/icons/NotificationsReceiveM';
import * as S from './AlertSemanticColor.styles';
import { AlertType, Props } from './AlertSemanticColor.types';

const ICONS: Record<AlertType, React.ReactNode> = {
  positive: <Check3M />,
  notice: <WarningFillM />,
  negative: <WarningFillM />,
  informative: <InfoFillM />,
  neutral: <HelpFillM />,
  supply: <UserCheckM />,
  service: <UpdateDataM />,
  entity: <NotificationsReceiveM />,
};
const DEFAULT_ICON = <WarningFillM />;

const AlertSemanticColor: React.FC<Props> = (props: Props) => {
  const { icon, type, color, mode } = props;

  const renderIcon = React.useMemo(() => {
    if (icon) return icon;
    if (ICONS[type]) return ICONS[type];
    return DEFAULT_ICON;
  }, [icon, type]);

  return (
    <S.Container mode={mode} color={color}>
      <S.IconWrapper mode={mode} color={color}>
        <Icon component={renderIcon} />
      </S.IconWrapper>
    </S.Container>
  );
};
export default AlertSemanticColor;

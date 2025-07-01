import React from 'react';

import Icon, {
  Check3M,
  HelpFillM,
  InfoFillM,
  NotificationsReceiveM,
  UpdateDataM,
  UserCheckM,
  WarningFillM,
} from '@synerise/ds-icon';

import * as S from './AlertSemanticColor.styles';
import { type AlertType, type Props } from './AlertSemanticColor.types';

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

const AlertSemanticColor: React.FC<Props> = ({
  icon,
  type,
  color,
  mode,
}: Props) => {
  const renderIcon = React.useMemo(() => {
    if (icon) {
      return icon;
    }
    if (ICONS[type]) {
      return ICONS[type];
    }
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

import React from 'react';

import Icon, { Check2M, Close2M, NotificationsM } from '@synerise/ds-icon';

import * as S from './Alert.styles';
import {
  type AlertSubComponents,
  type AlertType,
  type Props,
} from './Alert.types';
import InlineAlert from './InlineAlert/InlineAlert';
import './style/index.less';

const ICONS: Record<AlertType, React.ReactNode> = {
  success: <Check2M />,
  warning: <Check2M />,
  error: <Close2M />,
  info: <NotificationsM />,
};

const DEFAULT_ICON = <Check2M />;

const Alert: React.FC<Props> & AlertSubComponents = (props: Props) => {
  const { icon, type, message, description, showMoreLabel, onShowMore } = props;

  const renderMessage = React.useMemo(() => {
    return (
      <S.AlertContent>
        {message && <S.AlertMessage>{message}</S.AlertMessage>}
        {description && <S.AlertDescription>{description}</S.AlertDescription>}
        {onShowMore && showMoreLabel && (
          <S.AlertShowMore onClick={onShowMore}>
            {showMoreLabel}
          </S.AlertShowMore>
        )}
      </S.AlertContent>
    );
  }, [message, description, showMoreLabel, onShowMore]);

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
    <S.AntdAlert
      {...props}
      className="ds-alert"
      icon={<Icon component={renderIcon} />}
      message={renderMessage}
      description={null}
    />
  );
};

Alert.InlineAlert = InlineAlert;

export default Alert;

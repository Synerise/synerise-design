import * as React from 'react';
import './style/index.less';
import { Check2M, Close2M, NotificationsM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import * as S from './Alert.styles';
import { Props } from './Alert.types';

const ICONS = {
  success: <Check2M />,
  warning: <Check2M />,
  error: <Close2M />,
  info: <NotificationsM />,
};

const DEFAULT_ICON = <Check2M />;

const Alert: (props: Props) => JSX.Element = (props: Props) => {
  const { icon, type, message, description, showMoreLabel, onShowMore } = props;

  const renderMessage = React.useMemo(() => {
    return (
      <S.AlertContent>
        {message && <S.AlertMessage>{message}</S.AlertMessage>}
        {description && <S.AlertDescription>{description}</S.AlertDescription>}
        {onShowMore && showMoreLabel && <S.AlertShowMore onClick={onShowMore}>{showMoreLabel}</S.AlertShowMore>}
      </S.AlertContent>
    );
  }, [message, description, showMoreLabel, onShowMore]);

  const renderIcon = React.useMemo(() => {
    if (icon) return icon;
    if (ICONS[type]) return ICONS[type];
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
export default Alert;

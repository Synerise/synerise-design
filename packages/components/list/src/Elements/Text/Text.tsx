import React from 'react';
import * as S from './Text.styles';

interface Props {
  disabled?: boolean;
  icon?: JSX.Element;
  danger?: boolean;
  actions?: React.ReactNode;
  onSelect?: (e?: React.MouseEvent | React.KeyboardEvent) => void;
  size?: S.ListItemType;
}

const Text: React.FC<Props> = ({ disabled, icon, onSelect, danger, actions, children, size = 'small' }) => {
  const onKeyUpHandler = React.useCallback(
    (event: React.KeyboardEvent): void | false => event.nativeEvent.code === 'Space' && onSelect && onSelect(event),
    [onSelect]
  );
  return (
    <S.Wrapper
      disabled={disabled}
      tabIndex={!disabled ? 0 : undefined}
      onClick={onSelect}
      onKeyUp={onKeyUpHandler}
      danger={danger}
      icon={icon}
      size={size}
    >
      {icon && <S.IconWrapper>{icon}</S.IconWrapper>}
      <S.ContentWrapper icon={icon}>{children}</S.ContentWrapper>
      <S.ActionWraper>{actions && actions}</S.ActionWraper>
    </S.Wrapper>
  );
};

export default Text;

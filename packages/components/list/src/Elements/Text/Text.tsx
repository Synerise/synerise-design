import * as React from 'react';
import * as S from './Text.styles';

interface Props {
  disabled?: boolean;
  icon?: JSX.Element;
  danger?: boolean;
  actions?: React.ReactNode;
  onSelect?: () => void;
  size?: S.ListItemType;
}

const Text: React.FC<Props> = ({ disabled, icon, onSelect, danger, actions, children, size = 'small' }) => (
  <S.Wrapper
    disabled={disabled}
    tabIndex={!disabled ? 0 : undefined}
    onClick={onSelect}
    onKeyUp={(event: React.KeyboardEvent): void | false => event.nativeEvent.code === 'Space' && onSelect && onSelect()}
    danger={danger}
    icon={icon}
    size={size}
  >
    {icon && <S.IconWrapper>{icon}</S.IconWrapper>}
    <S.ContentWrapper>{children}</S.ContentWrapper>
    <S.ActionWraper>{actions && actions}</S.ActionWraper>
  </S.Wrapper>
);

export default Text;

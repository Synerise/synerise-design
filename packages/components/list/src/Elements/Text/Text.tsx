import * as React from 'react';
import * as S from './Text.styles';

interface Props {
  disabled?: boolean;
  icon?: JSX.Element;
  danger?: boolean;
  actions?: React.ReactNode;
  onSelect?: () => void;
}

const Text: React.FC<Props> = ({ disabled, icon, onSelect, danger, actions, children }) => (
  <S.Wrapper
    disabled={disabled}
    tabIndex={!disabled && '0'}
    onClick={onSelect}
    onKeyUp={(event: React.KeyboardEvent): void => event.nativeEvent.code === 'Space' && onSelect()}
    danger={danger}
  >
    {icon && <S.IconWrapper>{icon}</S.IconWrapper>}
    <div>{children}</div>
    {actions && <S.Actions>{actions}</S.Actions>}
  </S.Wrapper>
);

export default Text;

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
    tabIndex={!disabled ? 0 : undefined}
    onClick={onSelect}
    onKeyUp={(event: React.KeyboardEvent): void | false => event.nativeEvent.code === 'Space' && onSelect && onSelect()}
    danger={danger}
  >
    {icon && <S.IconWrapper className="ds-manageable-list-item-icon">{icon}</S.IconWrapper>}
    <div>{children}</div>
    {actions && <S.Actions>{actions}</S.Actions>}
  </S.Wrapper>
);

export default Text;

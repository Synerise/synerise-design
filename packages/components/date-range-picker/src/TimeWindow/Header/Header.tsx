import * as React from 'react';
import * as S from './Header.styles';
import { Props } from './Header.types';

const Header: React.FC<Props> = ({ title, actions, ...rest }: Props) => (
  <S.Container data-attr="time-window-header" {...rest}>
    <S.Title data-attr="title">{title}</S.Title>
    <S.Actions data-attr="actions">
      {actions &&
        actions.map((action) => (
          <S.Action key={action.key} data-attr={action.key} onClick={action.onClick}>
            {action.label}
          </S.Action>
        ))}
    </S.Actions>
  </S.Container>
);

export default Header;
import React, { type ReactElement, type ReactNode } from 'react';

import * as S from './Header.styles';

export type Action = {
  label: ReactElement;
  key: string;
  onClick: () => void;
};

type HeaderProps = {
  title: ReactNode;
  actions?: Action[];
  suffix?: ReactNode;
};

const HeaderBase = ({ title, actions, suffix }: HeaderProps) => (
  <S.Container data-attr="time-window-header">
    <S.Title data-attr="title">{title}</S.Title>
    <S.Actions data-attr="actions">
      {actions &&
        actions.map((action) => (
          <S.Action
            key={action.key}
            data-attr={action.key}
            onClick={action.onClick}
          >
            {action.label}
          </S.Action>
        ))}
    </S.Actions>
    {suffix}
  </S.Container>
);
export const Header = React.memo(HeaderBase);

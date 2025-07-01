import React from 'react';

import * as S from './Header.styles';

export type Action = {
  label: JSX.Element;
  key: string;
  onClick: () => void;
};

type HeaderProps = {
  title: string | React.ReactNode;
  actions?: Action[];
  suffix?: React.ReactNode;
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

import React, { type ReactNode } from 'react';

import ListItem from '../../ListItem';
import { type ListItemProps } from '../../ListItem.types';
import * as S from './GroupItem.styles';

type GroupItemProps = {
  title: ReactNode;
  children?: ReactNode;
  items?: ListItemProps[];
};
export const GroupItem = ({ title, items, children }: GroupItemProps) => {
  return (
    <>
      <S.Title>{title}</S.Title>
      {items?.map(ListItem)}
      {children}
    </>
  );
};

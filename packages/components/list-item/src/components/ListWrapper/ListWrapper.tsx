import React, { type ReactNode } from 'react';

import { type WithHTMLAttributes } from '@synerise/ds-utils';

import { type ListContextProps } from '../ListContext/ListContext';
import { ListContextProvider } from '../ListContext/ListContextProvider';
import * as S from './ListWrapper.styles';

export type ListWrapperProps = WithHTMLAttributes<
  HTMLDivElement,
  ListContextProps & {
    children?: ReactNode;
  }
>;

export const ListWrapper = ({
  children,
  onItemSelect,
  onClick,
  ...htmlAttributes
}: ListWrapperProps) => {
  return (
    <S.ListWrapperContainer {...htmlAttributes}>
      <ListContextProvider onItemSelect={onItemSelect} onClick={onClick}>
        {children}
      </ListContextProvider>
    </S.ListWrapperContainer>
  );
};

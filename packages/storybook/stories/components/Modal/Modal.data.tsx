import React, { ReactNode } from 'react';
import { fn } from 'storybook/test';

import { TabsProps } from '@synerise/ds-tabs';

import * as S from './styles';

export const SIZES = [
  'small',
  'medium',
  'large',
  'extraLarge',
  'fullSize',
  'fullScreen',
];

const TABS = [
  {
    label: 'Tab first',
  },
  {
    label: 'Tab second ',
  },
  {
    label: 'Tab third',
  },
];
export const TAB_PROPS: TabsProps = {
  tabs: TABS,
  activeTab: 0,
  handleTabClick: fn(),
  underscore: true,
};

export const headerWithPrefix = (text: string, prefix: ReactNode) => {
  return (
    <S.HeaderWrapper>
      <S.HeaderTitleWrapper>
        <S.HeaderPrefix>{prefix}</S.HeaderPrefix>
        {text}
      </S.HeaderTitleWrapper>
    </S.HeaderWrapper>
  );
};

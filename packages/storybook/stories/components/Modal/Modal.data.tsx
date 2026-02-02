import React, { ReactNode } from 'react';
import { fn } from 'storybook/test';

import Button from '@synerise/ds-button';
import { ModalFooter } from '@synerise/ds-modal';
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

export const TABS = [
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

export const footer = (
  settingButton: string,
  cancelText: string,
  applyButton: string,
) => {
  const props = {
    okText: applyButton,
    cancelText: cancelText,
    prefix: (
      <div style={{ width: '100%', display: 'flex' }}>
        <Button type="secondary">{settingButton}</Button>
      </div>
    ),
  };

  return <ModalFooter {...props} />;
};

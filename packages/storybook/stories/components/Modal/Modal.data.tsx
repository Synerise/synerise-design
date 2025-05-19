import React, { ReactNode } from 'react';

import Button from '@synerise/ds-button';
import { ModalFooter } from '@synerise/ds-modal';
import Tabs from '@synerise/ds-tabs';

import * as S from './styles';


export const sizes = [
  'small',
  'medium',
  'large',
  'extraLarge',
  'fullSize',
  'fullScreen',
];

export const color = [
  'white',
  'grey',
];

const tabs = [
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

export const footer = (settingButton: string, cancelText: string, applyButton: string) => {
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

export const headerWithTabs = (text: string) => {
  return (
    <S.HeaderWrapper>
      {text}
      <S.HeaderPlaceholder />
      <S.TabsContainer>
        <Tabs
          underscore
          tabs={tabs}
          configuration={{ label: 'Manage tabs' }}
        />
      </S.TabsContainer>
    </S.HeaderWrapper>
  );
};

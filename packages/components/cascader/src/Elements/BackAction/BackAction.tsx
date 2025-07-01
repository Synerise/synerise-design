import React from 'react';

import Divider from '@synerise/ds-divider';
import Icon, { ArrowLeftM } from '@synerise/ds-icon';

import { DividerContainer } from '../../Cascader.styles';
import * as S from './BackAction.styles';
import { type BackActionProps } from './BackAction.types';

export const BackAction = ({ label, onClick }: BackActionProps) => (
  <>
    <S.BackActionWrapper>
      <S.ContentWrapper onClick={onClick}>
        <S.IconWrapper>
          <Icon component={<ArrowLeftM />} />
        </S.IconWrapper>
        <S.Label>{label}</S.Label>
      </S.ContentWrapper>
    </S.BackActionWrapper>
    <DividerContainer>
      <Divider dashed />
    </DividerContainer>
  </>
);

export default BackAction;

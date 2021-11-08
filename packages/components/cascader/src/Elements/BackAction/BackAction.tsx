import * as React from 'react';
import Icon, { ArrowLeftM } from '@synerise/ds-icon';
import Divider from '@synerise/ds-divider';
import * as S from './BackAction.styles';
import { DividerContainer } from '../../Cascader.styles';
import { Props } from './BackAction.types';

const BackAction: React.FC<Props> = ({ label, onClick }) => (
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

import * as React from 'react';

import Divider from '@synerise/ds-divider';
import Icon, { ArrowLeftM } from '@synerise/ds-icon';

import * as S from './BackAction.styles';
import { Props } from './BackAction.types';

const BackAction: React.FC<Props> = ({ label, onClick }) => (
  <S.BackActionWrapper>
    <S.ContentWrapper onClick={onClick}>
      <S.IconWrapper>
        <Icon component={<ArrowLeftM />} />
      </S.IconWrapper>
      <S.Label>{label}</S.Label>
    </S.ContentWrapper>
    <Divider dashed style={{ margin: '0' }} />
  </S.BackActionWrapper>
);

export default BackAction;

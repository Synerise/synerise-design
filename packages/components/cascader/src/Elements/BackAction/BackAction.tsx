import * as React from 'react';
import Icon from '@synerise/ds-icon';
import ArrowLeftM from '@synerise/ds-icon/dist/icons/ArrowLeftM';

import Divider from '@synerise/ds-divider';
import * as S from './BackAction.styles';
import { DividerContainer } from '../../Cascader.styles';

interface Props {
  label: React.ReactNode;
  onClick: () => void;
}

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

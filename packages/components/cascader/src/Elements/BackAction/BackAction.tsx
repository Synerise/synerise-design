import * as React from 'react';
import Icon from '@synerise/ds-icon';
import ArrowLeftM from '@synerise/ds-icon/dist/icons/ArrowLeftM';
import Divider from '@synerise/ds-divider';
import Button from '@synerise/ds-button';
import * as S from './BackAction.styles';
import { DividerContainer } from '../../Cascader.styles';

interface Props {
  label: React.ReactNode;
  onClick: () => void;
}

const BackAction: React.FC<Props> = ({ label, onClick }) => (
  <>
    <S.BackActionWrapper>
      <Button onClick={onClick} mode="icon-label" size='large' type="ghost" block>
        <S.ButtonContentWrapper>
          <Icon component={<ArrowLeftM />} />
          <S.ButtonLabelWrapper>
            {label}
          </S.ButtonLabelWrapper>
        </S.ButtonContentWrapper>
      </Button>
    </S.BackActionWrapper>
    <DividerContainer>
      <Divider dashed />
    </DividerContainer>
  </>
);

export default BackAction;

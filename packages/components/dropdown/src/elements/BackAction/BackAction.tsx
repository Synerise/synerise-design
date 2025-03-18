import React from 'react';

import Divider from '@synerise/ds-divider';
import Icon, { ArrowLeftM } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import * as S from './BackAction.styles';
import { Props } from './BackAction.types';

const BackAction = ({ label, onClick, tooltip, tooltipProps }: Props) => (
  <S.BackActionWrapper>
    <S.ContentWrapper data-testid="dropdown-back-action-arrow" onClick={onClick}>
      <Tooltip title={tooltip} {...tooltipProps}>
        <S.IconWrapper>
          <Icon component={<ArrowLeftM />} />
        </S.IconWrapper>
      </Tooltip>
      <S.Label data-testid="dropdown-back-action-label">{label}</S.Label>
    </S.ContentWrapper>
    <Divider dashed style={{ margin: '0' }} />
  </S.BackActionWrapper>
);

export default BackAction;

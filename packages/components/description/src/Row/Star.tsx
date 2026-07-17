import React from 'react';

import Icon, { StarFillM, StarM } from '@synerise/ds-icon';

import * as S from './DescriptionRow.styles';
import { type StarProps } from './Star.types';

const Star: React.FC<StarProps> = ({ starType, hasPrefixEl }) =>
  starType === 'active' ? (
    <S.StarWrapper className="ds-description-star" hasPrefixEl={hasPrefixEl}>
      <Icon
        component={<StarFillM />}
        color="var(--ds-color-icon-warning-default)"
      />
    </S.StarWrapper>
  ) : (
    <S.StarWrapper className="ds-description-star" hasPrefixEl={hasPrefixEl}>
      <Icon component={<StarM />} color="var(--ds-color-border-base-strong)" />
    </S.StarWrapper>
  );

export default Star;

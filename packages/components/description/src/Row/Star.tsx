import * as React from 'react';
import Icon, { StarFillM, StarM } from '@synerise/ds-icon';

import { theme } from '@synerise/ds-core';
import * as S from './DescriptionRow.styles';
import { StarProps } from './Star.types';

const Star: React.FC<StarProps> = ({ starType, hasPrefixEl }) =>
  starType === 'active' ? (
    <S.StarWrapper className="ds-description-star" hasPrefixEl={hasPrefixEl}>
      <Icon component={<StarFillM />} color={theme.palette['yellow-600']} />
    </S.StarWrapper>
  ) : (
    <S.StarWrapper className="ds-description-star" hasPrefixEl={hasPrefixEl}>
      <Icon component={<StarM />} color={theme.palette['grey-300']} />
    </S.StarWrapper>
  );

export default Star;

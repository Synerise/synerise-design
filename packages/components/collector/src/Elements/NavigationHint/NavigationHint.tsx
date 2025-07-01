import React from 'react';

import Icon, { KeyboardEnterM, KeyboardKeysM } from '@synerise/ds-icon';

import * as S from '../../Collector.styles';
import { type NavigationHintProps } from './NavigationHint.types';

const NavigationHint: React.FC<NavigationHintProps> = ({
  texts,
}: NavigationHintProps) => {
  return (
    <S.NavigationWrapper>
      <Icon component={<KeyboardKeysM />} />
      <span>{texts?.toNavigate}</span>
      <Icon component={<KeyboardEnterM />} />
      <span>{texts?.toSelect}</span>
    </S.NavigationWrapper>
  );
};

export default NavigationHint;

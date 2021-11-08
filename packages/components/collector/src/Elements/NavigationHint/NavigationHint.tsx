import * as React from 'react';
import Icon, { KeyboardEnterM, KeyboardKeysM } from '@synerise/ds-icon';
import { NavigationHintProps } from './NavigationHint.types';
import * as S from '../../Collector.styles';

const NavigationHint: React.FC<NavigationHintProps> = ({ texts }: NavigationHintProps) => {
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

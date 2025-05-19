import React from 'react';
import Radio from '@synerise/ds-radio';

import type { DecisionSectionProps } from '../Confirmation.types';
import * as S from '../Confirmation.styles';

export const DecisionSection = ({ options, title }: DecisionSectionProps) => {
  return (
    <S.ConfirmationExtra>
      <S.ConfirmationExtraTitle level={6}>{title}</S.ConfirmationExtraTitle>
      <S.DecisionOptions>
        <Radio.Group>
          {options.map(option => (
            <Radio key={option.id} {...option} />
          ))}
        </Radio.Group>
      </S.DecisionOptions>
    </S.ConfirmationExtra>
  );
};

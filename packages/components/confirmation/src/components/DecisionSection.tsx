import React from 'react';

import Radio from '@synerise/ds-radio';

import * as S from '../Confirmation.styles';
import type { DecisionSectionProps } from '../Confirmation.types';

export const DecisionSection = ({ options, title }: DecisionSectionProps) => {
  return (
    <S.ConfirmationExtra>
      <S.DecisionOptions p="8px 18px" label={title}>
        <Radio.Group>
          {options.map((option) => (
            <Radio key={option.id} {...option} />
          ))}
        </Radio.Group>
      </S.DecisionOptions>
    </S.ConfirmationExtra>
  );
};

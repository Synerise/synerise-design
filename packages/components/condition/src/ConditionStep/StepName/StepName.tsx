import React, { type ReactNode } from 'react';

import * as S from '../../Condition.style';
import { type ConditionTexts } from '../../Condition.types';

type StepNameProps = {
  texts: ConditionTexts;
  index: number;
  name: ReactNode;
};

export const StepName = ({ texts, index, name }: StepNameProps) => {
  return (
    <S.StepName className="ds-condition-step-name">
      <S.StepIndexWrapper>
        {texts.stepNamePrefix} {`${index + 1}`}
      </S.StepIndexWrapper>
      {name}
    </S.StepName>
  );
};

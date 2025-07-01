import React from 'react';

import * as S from '../FormField.styles';
import type { ContentAboveProps } from '../FormField.types';
import { FormFieldLabel } from './FormFieldLabel';

export const ContentAboveElement = ({
  label,
  id,
  tooltip,
  tooltipConfig,
  rightSide,
}: ContentAboveProps) => {
  return label || rightSide ? (
    <S.ContentAbove>
      <FormFieldLabel
        label={label}
        id={id}
        tooltip={tooltip}
        tooltipConfig={tooltipConfig}
      />
      <S.RightSide>{rightSide}</S.RightSide>
    </S.ContentAbove>
  ) : (
    <></>
  );
};

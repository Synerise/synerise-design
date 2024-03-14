import React from 'react';
import Label from '../Label/Label';
import { BaseProps } from '../Input.types';
import * as S from '../Input.styles';

type ContentAboveProps = Pick<BaseProps, 'tooltip' | 'tooltipConfig' | 'label'> & {
  counterLimit?: number;
  charCount?: number;
  id: string;
};

export const ContentAboveElement = ({
  label,
  counterLimit,
  id,
  tooltip,
  tooltipConfig,
  charCount,
}: ContentAboveProps) => {
  return label || counterLimit ? (
    <S.ContentAbove>
      <Label label={label} id={id} tooltip={tooltip} tooltipConfig={tooltipConfig} />
      {counterLimit && (
        <S.Counter data-testid="counter">
          {charCount}/{counterLimit}
        </S.Counter>
      )}
    </S.ContentAbove>
  ) : (
    <></>
  );
};

import React from 'react';
import Label from '../Label/Label';
import { BaseProps } from '../Input.types';
import * as S from '../Input.styles';

type ContentAboveProps = Pick<BaseProps, 'tooltip' | 'tooltipConfig' | 'label' | 'renderCustomCounter'> & {
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
  renderCustomCounter,
}: ContentAboveProps) => {
  return label || counterLimit ? (
    <S.ContentAbove>
      <Label label={label} id={id} tooltip={tooltip} tooltipConfig={tooltipConfig} />
      {renderCustomCounter ? (
        <S.Counter data-testid="custom-counter">{renderCustomCounter(charCount)}</S.Counter>
      ) : (
        counterLimit && (
          <S.Counter data-testid="counter">
            {charCount}/{counterLimit}
          </S.Counter>
        )
      )}
    </S.ContentAbove>
  ) : (
    <></>
  );
};

import React, { type ReactNode } from 'react';

import { ContentBelowElement, FormFieldLabel } from '@synerise/ds-form-field';

import * as S from '../Slider.styles';

type SliderAboveProps = {
  label?: ReactNode;
  description?: ReactNode;
};
export const SliderAbove = ({ label, description }: SliderAboveProps) => {
  return (
    (label || description) && (
      <S.SliderLabel data-testid="ds-slider-details">
        {label && <FormFieldLabel label={label} />}
        {description && <ContentBelowElement description={description} />}
      </S.SliderLabel>
    )
  );
};

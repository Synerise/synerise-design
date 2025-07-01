import React, { useId } from 'react';

import * as S from './FormField.styles';
import type { FormFieldProps } from './FormField.types';
import { ContentAboveElement } from './components/ContentAboveElement';
import { ContentBelowElement } from './components/ContentBelowElement';

const FormField = ({
  label,
  tooltip,
  id,
  rightSide,
  tooltipConfig,
  description,
  errorText,
  children,
  ...rest
}: FormFieldProps) => {
  const uniqueId = useId();
  const hasContent = Boolean(label || rightSide || description || errorText);
  return (
    <S.FormFieldWrapper hasContent={hasContent} {...rest}>
      <ContentAboveElement
        label={label}
        rightSide={rightSide}
        id={id || uniqueId}
        tooltip={tooltip}
        tooltipConfig={tooltipConfig}
      />
      <S.FormFieldComponent>{children}</S.FormFieldComponent>
      <ContentBelowElement description={description} errorText={errorText} />
    </S.FormFieldWrapper>
  );
};
export default FormField;

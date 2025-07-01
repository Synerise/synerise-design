import React from 'react';

import { Description, ErrorText } from '@synerise/ds-typography';

import * as S from '../Checkbox.styles';
import type { CheckboxBaseProps } from '../Checkbox.types';

export const CheckboxBase = ({
  description,
  errorText,
  children,
  withoutPadding,
  hasError,
  ...antdCheckboxProps
}: CheckboxBaseProps) => {
  return (
    <S.CheckboxWrapper
      className="ds-checkbox"
      withoutPadding={Boolean(withoutPadding)}
    >
      <S.AntdCheckbox
        {...antdCheckboxProps}
        className={hasError || errorText ? 'error' : undefined}
        solo={!children && !errorText && !description}
      >
        {children}
      </S.AntdCheckbox>
      {(errorText || description) && (
        <S.AdditionalData>
          {errorText && <ErrorText>{errorText}</ErrorText>}
          {description && (
            <Description disabled={antdCheckboxProps.disabled}>
              {description}
            </Description>
          )}
        </S.AdditionalData>
      )}
    </S.CheckboxWrapper>
  );
};

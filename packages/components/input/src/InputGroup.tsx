import React, { Children } from 'react';

import FormField from '@synerise/ds-form-field';

import * as InputStyles from './Input.styles';
import * as S from './InputGroup.styles';
import { type Props } from './InputGroup.types';

const InputGroup = ({
  children,
  label,
  errorText,
  errors,
  description,
  resetMargin,
  tooltip,
  tooltipConfig,
  compact,
  growItem,
  className,
  style,
  // antd `Input.Group` size cascade is no longer applied; size each child input directly.
  size: _size,
  ...rest
}: Props) => {
  const childrenArray = Children.toArray(children);
  // Prefer the FormField-standard `errorText`; fall back to the deprecated
  // `errors` string array (each rendered as its own line) for callers that
  // haven't migrated yet.
  const resolvedErrorText =
    errorText ??
    (errors &&
      errors.map((error) => (
        <InputStyles.ErrorText key={error}>{error}</InputStyles.ErrorText>
      )));
  return (
    <InputStyles.OuterWrapper
      className="ds-input-group-outer-wrapper"
      resetMargin={resetMargin}
    >
      <FormField
        label={label}
        tooltip={tooltip}
        tooltipConfig={tooltipConfig}
        description={description}
        errorText={resolvedErrorText}
      >
        <S.InputGroupWrapper
          compact={compact}
          $growItem={growItem}
          className={className}
          style={style}
          {...rest}
        >
          {Children.map(childrenArray, (child, index) => (
            <S.InputGroupItem
              className={`ds-input-group-item ds-input-group-item-${index}`}
            >
              {child}
            </S.InputGroupItem>
          ))}
        </S.InputGroupWrapper>
      </FormField>
    </InputStyles.OuterWrapper>
  );
};

export default InputGroup;

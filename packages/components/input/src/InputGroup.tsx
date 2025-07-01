import Input from 'antd/lib/input';
import React, { Children } from 'react';

import FormField from '@synerise/ds-form-field';

import * as InputStyles from './Input.styles';
import * as S from './InputGroup.styles';
import { type Props } from './InputGroup.types';

const InputGroup = ({
  children,
  label,
  errors,
  description,
  resetMargin,
  tooltip,
  tooltipConfig,
  ...antdInputGroupProps
}: Props) => {
  const childrenArray = Children.toArray(children);
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
        errorText={
          errors &&
          errors.map((error) => (
            <InputStyles.ErrorText key={error}>{error}</InputStyles.ErrorText>
          ))
        }
      >
        <Input.Group {...antdInputGroupProps}>
          <S.InputGroupWrapper compact={antdInputGroupProps.compact}>
            {Children.map(childrenArray, (child, index) => (
              <S.InputGroupItem
                className={`ds-input-group-item ds-input-group-item-${index}`}
              >
                {child}
              </S.InputGroupItem>
            ))}
          </S.InputGroupWrapper>
        </Input.Group>
      </FormField>
    </InputStyles.OuterWrapper>
  );
};

export default InputGroup;

import React, { Children } from 'react';
import Input from 'antd/lib/input';
import * as InputStyles from './Input.styles';
import * as S from './InputGroup.styles';
import Label from './Label/Label';
import { Props } from './InputGroup.types';

const InputGroup = ({ children, label, errors, description, resetMargin, tooltip, ...antdInputGroupProps }: Props) => {
  const childrenArray = Children.toArray(children);
  return (
    <InputStyles.OuterWrapper className="ds-input-group-outer-wrapper" resetMargin={resetMargin}>
      {label && (
        <InputStyles.ContentAbove>
          <Label label={label} tooltip={tooltip} />
        </InputStyles.ContentAbove>
      )}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Input.Group {...antdInputGroupProps}>
        <S.InputGroupWrapper compact={antdInputGroupProps.compact}>
          {Children.map(childrenArray, (child, index) => (
            <S.InputGroupItem className={`ds-input-group-item ds-input-group-item-${index}`}>{child}</S.InputGroupItem>
          ))}
        </S.InputGroupWrapper>
      </Input.Group>
      {((errors && errors.length > 0) || description) && (
        <InputStyles.ContentBelow>
          {errors && errors.map(error => <InputStyles.ErrorText key="error">{error}</InputStyles.ErrorText>)}
          {description && <InputStyles.Description>{description}</InputStyles.Description>}
        </InputStyles.ContentBelow>
      )}
    </InputStyles.OuterWrapper>
  );
};

export default InputGroup;

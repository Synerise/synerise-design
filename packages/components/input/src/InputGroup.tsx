import * as React from 'react';
import Input from 'antd/lib/input';
import { GroupProps } from 'antd/es/input';
import * as InputStyles from './Input.styles';

interface Props extends GroupProps {
  label?: React.ReactNode;
  errors?: string[];
  description?: React.ReactNode;
  resetMargin?: boolean;
}

const InputGroup: React.FC<Props> = ({ children, label, errors, description, resetMargin, ...antdInputGroupProps }) => (
  <InputStyles.OuterWrapper resetMargin={resetMargin}>
    {label && (
      <InputStyles.ContentAbove>
        <InputStyles.Label>{label}</InputStyles.Label>
      </InputStyles.ContentAbove>
    )}
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Input.Group {...antdInputGroupProps}>{children}</Input.Group>
    {((errors && errors.length > 0) || description) && (
      <InputStyles.ContentBelow>
        {errors && errors.map(error => <InputStyles.ErrorText key="error">{error}</InputStyles.ErrorText>)}
        {description && <InputStyles.Description>{description}</InputStyles.Description>}
      </InputStyles.ContentBelow>
    )}
  </InputStyles.OuterWrapper>
);

export default InputGroup;

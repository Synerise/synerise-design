import React from 'react';
import Divider from '@synerise/ds-divider';
import * as S from './FieldSet.styles';
import { FieldSetProps } from './FieldSet.types';

const FieldSet = ({
  className,
  prefix,
  title,
  description,
  component,
  button,
  onTitleClick,
  divider = true,
}: FieldSetProps) => {
  return (
    <S.ContainerWrapper className={`ds-field-set ${className}`}>
      <S.HeaderWrapper>
        {prefix && <S.ButtonWrapper>{prefix}</S.ButtonWrapper>}
        <S.FieldSetTitle description={Boolean(description)}>
          <S.Title onClick={onTitleClick} isClickable={Boolean(onTitleClick)} description={Boolean(description)}>
            {title}
          </S.Title>
          <S.Description>{description}</S.Description>
        </S.FieldSetTitle>
      </S.HeaderWrapper>
      {divider && <Divider />}
      {component && <S.ComponentWrapper>{component}</S.ComponentWrapper>}
      {button && <S.ActionButton>{button}</S.ActionButton>}
    </S.ContainerWrapper>
  );
};
export default FieldSet;

import React from 'react';
import Divider from '@synerise/ds-divider';
import * as S from './FieldSet.styles';
import { FieldSetProps } from './FieldSet.types';

const FieldSet = ({ prefix, title, description, component, button, onTitleClick }: FieldSetProps) => {
  return (
    <S.ContainerWrapper className="ds-field-set">
      <S.HeaderWrapper>
        <S.ButtonWrapper>{prefix}</S.ButtonWrapper>
        <S.FieldSetTitle description={Boolean(description)}>
          <S.Title onClick={onTitleClick} isClickable={Boolean(onTitleClick)} description={Boolean(description)}>
            {title}
          </S.Title>
          <S.Description description={Boolean(description)}>{description}</S.Description>
        </S.FieldSetTitle>
      </S.HeaderWrapper>
      <Divider />
      <S.ComponentWrapper>{component}</S.ComponentWrapper>
      <S.ActionButton>{button}</S.ActionButton>
    </S.ContainerWrapper>
  );
};
export default FieldSet;

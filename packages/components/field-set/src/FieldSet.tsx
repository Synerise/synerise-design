import * as React from 'react';
import Divider from '@synerise/ds-divider';
import * as S from './FieldSet.styles';
import { FieldSetProps } from './FieldSet.types';

const FieldSet: React.FC<FieldSetProps> = ({ prefix, title, description, component, button }) => {
  return (
    <S.ContainerWrapper className="ds-field-set">
      <S.HeaderWrapper>
        <S.ButtonWrapper>{prefix}</S.ButtonWrapper>
        <S.FieldSetTitle description={description}>
          <S.Title description={description}>{title}</S.Title>
          <S.Description description={description}>{description}</S.Description>
        </S.FieldSetTitle>
      </S.HeaderWrapper>
      <Divider />
      <S.ComponentWrapper>{component}</S.ComponentWrapper>
      <S.ActionButton>{button}</S.ActionButton>
    </S.ContainerWrapper>
  );
};
export default FieldSet;

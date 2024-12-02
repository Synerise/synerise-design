import React from 'react';
import Divider from '@synerise/ds-divider';
import * as S from './FieldSet.styles';
import { FieldSetProps } from './FieldSet.types';

const FieldSet = ({ className, heading, description, withLine, children }: FieldSetProps) => (
  <>
    <S.TopWrapper className={className}>
      <S.Heading>{heading}</S.Heading>
      <S.Description>{description}</S.Description>
      {withLine && <Divider marginTop={18} />}
    </S.TopWrapper>
    {children}
  </>
);

export default FieldSet;

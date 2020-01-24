import * as React from 'react';
import Divider from '@synerise/ds-divider';
import * as S from './FieldSet.styles';

export interface FieldSetProps {
  className?: string;
  heading: React.ReactNode;
  description?: React.ReactNode;
  withLine?: boolean;
}

const FieldSet: React.FC<FieldSetProps> = ({ className, heading, description, withLine, children }) => (
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

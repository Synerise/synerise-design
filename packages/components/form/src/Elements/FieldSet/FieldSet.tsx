import * as React from 'react';
import Divider from '@synerise/ds-divider';
import * as S from './FieldSet.styles';

interface Props {
  heading: React.ReactNode;
  description?: React.ReactNode;
  withLine?: boolean;
}

const FieldSet: React.FC<Props> = ({ heading, description, withLine, children }) => (
  <>
    <S.TopWrapper>
      <S.Heading>{heading}</S.Heading>
      <S.Description>{description}</S.Description>
      {withLine && <Divider marginTop={18} />}
    </S.TopWrapper>
    {children}
  </>
);

export default FieldSet;

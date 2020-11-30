import * as React from 'react';
import * as S from './Stepper.styles';
import { StepperProps, TYPES } from './Stepper.types';

const Stepper: React.FC<StepperProps> = ({ type = TYPES.HORIZONTAL, children }) => {
  return (
    <S.StepperWrapper className="ds-stepper" type={type}>
      {children &&
        React.Children.map(children, (Child, index) => {
          return (
            <>
              {Child}
              {/*
              // @ts-ignore
              */}
              {type === 'horizontal' && index < children.length - 1 && <S.StepDivider />}
            </>
          );
        })}
    </S.StepperWrapper>
  );
};

export default Stepper;

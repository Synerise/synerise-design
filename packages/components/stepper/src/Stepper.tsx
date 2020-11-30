import * as React from 'react';
import * as S from './Stepper.styles';
import { StepperProps, ORIENTATIONS } from './Stepper.types';

const Stepper: React.FC<StepperProps> = ({ orientation = ORIENTATIONS.HORIZONTAL, children }) => {
  return (
    <S.StepperWrapper className="ds-stepper" orientation={orientation}>
      {children &&
        React.Children.map(children, (Child, index) => {
          return (
            <>
              {Child}
              {/*
              // @ts-ignore */}
              {orientation === ORIENTATIONS.HORIZONTAL && index < children.length - 1 && <S.StepDivider />}
            </>
          );
        })}
    </S.StepperWrapper>
  );
};

export default Stepper;

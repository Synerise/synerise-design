import * as React from 'react';
import * as S from './Stepper.styles';
import { StepperProps, ORIENTATIONS, StepperSubComponents } from './Stepper.types';
import Step from './Step/Step';

const Stepper: React.FC<StepperProps> & StepperSubComponents = ({
  orientation = ORIENTATIONS.HORIZONTAL,
  children,
}) => {
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

Stepper.Step = Step;

export default Stepper;

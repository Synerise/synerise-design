import * as React from 'react';
import * as S from './Stepper.styles';
import { StepperProps, ORIENTATIONS, StepperSubComponents } from './Stepper.types';
import Step from './Step/Step';

const Stepper: React.FC<StepperProps> & StepperSubComponents = ({
  orientation = ORIENTATIONS.HORIZONTAL,
  style,
  children,
  size = 'default',
}) => {
  return (
    <S.StepperWrapper className="ds-stepper" orientation={orientation} style={style}>
      {children &&
        React.Children.map(children, (Child, index) => {
          return (
            <>
              {React.isValidElement(Child) ? React.cloneElement(Child as React.ReactElement, { size, orientation }) : Child}
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

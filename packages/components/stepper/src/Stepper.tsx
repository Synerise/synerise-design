import React, { Children, cloneElement, isValidElement, ReactElement } from 'react';
import * as S from './Stepper.styles';
import { StepperProps, ORIENTATIONS } from './Stepper.types';
import Step from './Step/Step';

const Stepper = ({
  orientation = ORIENTATIONS.HORIZONTAL,
  style,
  children,
  size = 'default',
}: StepperProps) => {
  const childrenCount = Children.count(children);
  return (
    <S.StepperWrapper className="ds-stepper" orientation={orientation} style={style}>
      {children &&
        Children.map(children, (Child, index) => {
          return (
            <>
              {isValidElement(Child)
                ? cloneElement(Child as ReactElement, { size, orientation })
                : Child}

              {orientation === ORIENTATIONS.HORIZONTAL && index < childrenCount - 1 && <S.StepDivider />}
            </>
          );
        })}
    </S.StepperWrapper>
  );
};

Stepper.Step = Step;

export default Stepper;

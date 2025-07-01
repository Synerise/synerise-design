import React, {
  Children,
  type ReactElement,
  cloneElement,
  isValidElement,
} from 'react';

import Step from './Step/Step';
import * as S from './Stepper.styles';
import { ORIENTATIONS, type StepperProps } from './Stepper.types';

const Stepper = ({
  orientation = ORIENTATIONS.HORIZONTAL,
  style,
  children,
  size = 'default',
}: StepperProps) => {
  return (
    <S.StepperWrapper
      className="ds-stepper"
      orientation={orientation}
      style={style}
    >
      {children &&
        Children.map(children, (Child, index) => {
          return (
            <>
              {isValidElement(Child)
                ? cloneElement(Child as ReactElement, { size, orientation })
                : Child}
              {orientation === ORIENTATIONS.HORIZONTAL &&
                // @ts-expect-error Property 'length' does not exist on type 'number'.
                index < children.length - 1 && <S.StepDivider />}
            </>
          );
        })}
    </S.StepperWrapper>
  );
};

Stepper.Step = Step;

export default Stepper;

import styled from 'styled-components';

import { Step, StepContent, StepWrapper } from './Step/Step.styles';
import { ORIENTATIONS, type StepperOrientation } from './Stepper.types';

export const StepperWrapper = styled.div<{ orientation: StepperOrientation }>`
  display: flex;
  flex-direction: ${(props): string =>
    props.orientation === ORIENTATIONS.VERTICAL ? 'column' : 'row'};
  align-items: ${(props): string =>
    props.orientation === ORIENTATIONS.VERTICAL ? 'flex-start' : 'center'};
  justify-content: flex-start;
  width: auto;
  ${Step} {
    align-items: ${(props): string =>
      props.orientation === ORIENTATIONS.VERTICAL ? 'flex-start' : 'center'};

    &:first-of-type {
      margin-top: 0;
    }
    &:last-of-type {
      margin-bottom: 0;
    }
    flex-direction: ${(props): string =>
      props.orientation === ORIENTATIONS.VERTICAL ? 'column' : 'row'};
  }
  ${StepWrapper} {
    margin: ${(props): string =>
      props.orientation === ORIENTATIONS.VERTICAL ? '8px 0' : '0'};
  }
  ${StepContent} {
    display: ${(props): string =>
      props.orientation === ORIENTATIONS.VERTICAL ? 'flex' : 'none'};
  }
`;

export const StepDivider = styled.div`
  display: flex;
  flex: 1;
  margin: 0 8px;
  max-width: 48px;
  min-width: 8px;
  height: 24px;
  position: relative;
  &:after {
    position: absolute;
    top: 12px;
    height: 1px;
    width: 100%;
    content: '';
    background-color: ${(props): string => props.theme.palette['grey-400']};
  }
`;

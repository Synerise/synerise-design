import styled from 'styled-components';
import { StepperType } from './Stepper.types';
import { Step, StepContent, StepWrapper } from './Step/Step.styles';

// eslint-disable-next-line import/prefer-default-export
export const StepperWrapper = styled.div<{ type: StepperType }>`
  display: flex;
  flex-direction: ${(props): string => (props.type === 'vertical' ? 'column' : 'row')};
  align-items: flex-start;
  justify-content: flex-start;
  width: auto;
  ${Step} {
    align-items: ${(props): string => (props.type === 'vertical' ? 'flex-start' : 'center')};

    &:first-of-type {
      margin-top: 0;
    }
    &:last-of-type {
      margin-bottom: 0;
    }
    flex-direction: ${(props): string => (props.type === 'vertical' ? 'column' : 'row')};
  }
  ${StepWrapper} {
    margin: ${(props): string => (props.type === 'vertical' ? '8px 0' : '0')};
  }
  ${StepContent} {
    display: ${(props): string => (props.type === 'vertical' ? 'flex' : 'none')};
  }
`;

export const StepDivider = styled.div`
  display: flex;
  flex: 1;
  margin: 0 8px;
  max-width: 48px;
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

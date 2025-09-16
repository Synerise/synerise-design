import styled, { css } from 'styled-components';

import {
  ORIENTATIONS,
  type StepperOrientation,
  type StepperSize,
} from '../Stepper.types';

export const StepPrefix = styled.div<{ noMargin: boolean }>`
  width: 24px;
  min-width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.palette['grey-400']};
  margin-right: ${(props) => (props.noMargin ? '0' : '8px')};
  text-align: center;
  transition:
    border-color 0.2s ease-in-out,
    margin-right 0.2s ease-in-out;
`;

export const StepNumber = styled.span`
  font-size: 13px;
  display: inline-flex;
  text-align: center;
  width: 10px;
  position: absolute;
  line-height: 24px;
  justify-content: center;
  align-items: center;
  transition: color 0.2s ease-in-out;
  color: ${(props) => props.theme.palette['grey-400']};
`;

export const StepName = styled.span`
  font-size: 13px;
  line-height: 18px;
  flex-wrap: nowrap;
  position: relative;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  width: auto;
  transition: opacity 0.2s ease-in-out;
  opacity: 1;
  &:before {
    position: absolute;
    display: block;
    font-weight: 500;
    content: attr(data-label);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: calc(100% + 2px);
    visibility: hidden;
  }
`;

export const StepLabel = styled.span`
  transition: color 0.2s ease-in-out;
  color: ${(props) => props.theme.palette['grey-400']};
  overflow: hidden;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
`;

export const StepWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const StepContent = styled.div`
  display: flex;
  padding: 0 0 0 20px;
  transition: padding 0.2s ease-in-out;
  min-height: 16px;
  position: relative;
  margin-left: 12px;
  outline: 0;
  && {
    border-left: 1px solid ${(props) => props.theme.palette['grey-400']};
  }
`;

export const Step = styled.div<{
  active: boolean;
  wasActive: boolean;
  done: boolean;
  warning: boolean;
  validated: boolean;
  hasChildren: boolean;
  size: StepperSize;
  orientation: StepperOrientation;
  clickable: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: relative;

  ${(props) => {
    if (props.wasActive) {
      return css`
        ${StepName} {
          transition-delay: 0s;
        }
      `;
    }
    if (props.active && !props.wasActive) {
      return css`
        ${StepName} {
          transition-delay: 0.3s;
        }
      `;
    }
    return false;
  }};

  ${(props) => {
    if (
      props.size === 'small' &&
      props.orientation === ORIENTATIONS.HORIZONTAL
    ) {
      return css`
        ${StepPrefix} {
          margin-right: 0;
        }
        ${StepName} {
          max-width: 0;
          opacity: 0;
        }
      `;
    }

    return false;
  }};

  ${(props) => {
    if (
      props.active &&
      props.size === 'small' &&
      props.orientation === ORIENTATIONS.HORIZONTAL
    ) {
      return css`
        ${StepPrefix} {
          margin-right: 8px;
        }
        ${StepName} {
          max-width: 100px;
          opacity: 1;
        }
      `;
    }
    if (props.active) {
      return css`
        ${StepContent} {
          padding: ${props.hasChildren ? '16px' : '0'} 0
            ${props.hasChildren ? '16px' : '0'} 20px;
        }
      `;
    }
    return false;
  }};

  ${(props) => {
    if (props.validated) {
      return css`
        ${StepPrefix} {
          border-color: ${props.theme.palette['red-600']};
        }
        ${StepNumber}${StepNumber},
        ${StepLabel}${StepLabel} {
          color: ${props.theme.palette['red-600']};
          font-weight: 400;
        }
      `;
    }
    if (props.warning) {
      return css`
        ${StepPrefix} {
          border-color: ${props.theme.palette['yellow-600']};
        }
        ${StepNumber}${StepNumber},
        ${StepLabel}${StepLabel} {
          color: ${props.theme.palette['yellow-600']};
          font-weight: 400;
        }
      `;
    }
    if (props.done) {
      return css`
        ${StepPrefix} {
          border-color: ${props.theme.palette['green-600']};
        }
        ${StepNumber},
        ${StepLabel} {
          color: ${props.theme.palette['green-600']};
          font-weight: 400;
        }
      `;
    }
    if (props.active) {
      return css`
        ${StepPrefix} {
          border-color: ${props.theme.palette['grey-700']};
        }
        ${StepNumber} {
          color: ${props.theme.palette['grey-700']};
          font-weight: 500;
        }
        ${StepName} {
          &::before {
            border-color: ${props.theme.palette['grey-700']};
            color: ${props.theme.palette['grey-700']};
            visibility: visible;
          }
          ${StepLabel} {
            visibility: hidden;
          }
        }
      `;
    }
    return (
      props.clickable &&
      css`
        &:hover {
          ${StepPrefix} {
            border-color: ${props.theme.palette['grey-700']};
          }
          ${StepNumber},
          ${StepLabel} {
            color: ${props.theme.palette['grey-700']};
            font-weight: 400;
          }
        }
      `
    );
  }};
  &:last-of-type {
    ${StepContent} {
      border-left: 0;
    }
  }
  ${StepWrapper} {
    cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};
  }
`;

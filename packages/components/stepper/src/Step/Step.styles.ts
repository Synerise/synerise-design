import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

export const StepPrefix = styled.div`
  width: 24px;
  min-width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props): string => props.theme.palette['grey-400']};
  margin-right: 8px;
  color: ${(props): string => props.theme.palette['grey-400']};
  transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out;
`;

export const StepLabel = styled.span`
  font-size: 13px;
  line-height: 18px;
  color: ${(props): string => props.theme.palette['grey-400']};
  transition: color 0.2s ease-in-out;
  flex-wrap: nowrap;
`;

export const StepWrapper = styled.div<{ clickable: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  cursor: ${(props): string => (props.onClick ? 'pointer' : 'default')};
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
    border-left: 1px solid ${(props): string => props.theme.palette['grey-400']};
  }
`;

export const Step = styled.div<{ active: boolean; done: boolean; validated: boolean; hasChildren: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: relative;

  ${(props): FlattenSimpleInterpolation | false => {
    if (props.active)
      return css`
        ${StepContent} {
          padding: ${props.hasChildren ? '16px' : '0'} 0 ${props.hasChildren ? '16px' : '0'} 20px;
        }
      `;
    return false;
  }};

  ${(props): FlattenSimpleInterpolation => {
    if (props.validated)
      return css`
        ${StepPrefix} {
          border-color: ${props.theme.palette['red-600']};
        }
        ${StepPrefix},
        ${StepLabel} {
          color: ${props.theme.palette['red-600']};
          font-weight: 400;
        }
      `;
    if (props.done)
      return css`
        ${StepPrefix} {
          border-color: ${props.theme.palette['green-600']};
        }
        ${StepPrefix},
        ${StepLabel} {
          color: ${props.theme.palette['green-600']};
          font-weight: 400;
        }
      `;
    if (props.active)
      return css`
        ${StepPrefix} {
          border-color: ${props.theme.palette['grey-700']};
        }
        ${StepPrefix},
        ${StepLabel} {
          color: ${props.theme.palette['grey-700']};
          font-weight: 500;
        }
      `;
    return css`
      &:hover {
        ${StepPrefix} {
          border-color: ${props.theme.palette['grey-700']};
        }
        ${StepPrefix},
        ${StepLabel} {
          color: ${props.theme.palette['grey-700']};
          font-weight: 400;
        }
      }
    `;
  }};
  &:last-of-type {
    ${StepContent} {
      border-left: 0;
    }
  }
`;

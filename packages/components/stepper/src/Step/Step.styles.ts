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
  text-align: center;
  transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out;
`;

export const StepNumber = styled.span`
  display: inline-flex;
  text-align: center;
  width: 10px;
  position: absolute;
  line-height: 24px;
  justify-content: center;
  align-items: center;
  transition: color 0.2s ease-in-out;
  color: ${(props): string => props.theme.palette['grey-400']};
`;

export const StepName = styled.span`
  font-size: 13px;
  line-height: 18px;
  flex-wrap: nowrap;
  position: relative;
  display: flex;
  align-items: center;
`;

export const StepLabel = styled.span`
  color: inherit;
  transition: color 0.2s ease-in-out;
  color: ${(props): string => props.theme.palette['grey-400']};
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
        ${StepNumber},
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
        ${StepNumber},
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
        ${StepNumber} {
          color: ${props.theme.palette['grey-700']};
          font-weight: 500;
        }
        ${StepName} {
          &::before {
            border-color: ${props.theme.palette['grey-700']};
            color: ${props.theme.palette['grey-700']};
            position: absolute;
            display: flex;
            font-weight: 500;
            content: attr(data-label);
          }
          ${StepLabel} {
            visibility: hidden;
          }
        }
      `;
    return css`
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
    `;
  }};
  &:last-of-type {
    ${StepContent} {
      border-left: 0;
    }
  }
`;

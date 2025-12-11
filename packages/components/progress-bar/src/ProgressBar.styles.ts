import styled, { css } from 'styled-components';

import { FormFieldLabel } from '@synerise/ds-form-field';

export const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;
export const Label = styled(FormFieldLabel)`
  &&& {
    margin: 0 8px 0 0;
    align-items: center;
  }
`;

export const ProgressWrapper = styled.div<{ $width: string; $thin: boolean }>`
  position: relative;
  margin-right: 2px;
  width: ${(props) => props.$width};
  height: ${(props) => (props.$thin ? '4px' : '6px')};
  background: ${(props) => props.theme.palette['grey-200']};
`;

export const ProgressOuter = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  flex: 1 1 auto;
`;

export const Percent = styled.span``;

export const ProgressBarDescription = styled.span`
  margin-top: 8px;
`;

export const ProgressBar = styled.div<{ customColor: string; $width: string }>`
  position: absolute;
  height: 100%;
  width: ${(props) => props.$width};
  background-color: ${(props) =>
    props.customColor ? props.customColor : props.theme.palette['green-500']};
`;

export const PercentWrapper = styled.div`
  margin-left: 8px;
  color: ${(props) => props.theme.palette['grey-800']};
  font-weight: 400;
`;

export const Container = styled.div<{ $steps?: number; $inline?: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: ${(props) => (props.$inline ? 'row' : 'column')};

  ${ProgressWrapper}:last-of-type {
    border-radius: 3px;

    ${ProgressBar}:last-of-type {
      border-radius: 3px;
    }
  }

  ${(props) =>
    props.$steps !== 1 &&
    css`
      ${ProgressWrapper}:first-of-type {
        border-radius: 3px 0 0 3px;

        ${ProgressBar}:first-of-type {
          border-radius: 3px 0 0 3px;
        }
      }

      ${ProgressWrapper}:last-of-type {
        border-radius: 0 3px 3px 0;

        ${ProgressBar}:last-of-type {
          border-radius: 0 3px 3px 0;
        }
      }
    `}
`;

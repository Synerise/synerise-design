import styled, {
  type FlattenSimpleInterpolation,
  css,
} from 'styled-components';

import type { RangeDisplayMode } from './RangeForm.types';

export const RemoveIconWrapper = styled.div`
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease-in-out;
  margin-left: 4px;
  min-width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  .ds-select-wrapper {
    min-width: 20%;
    margin-right: 8px;
  }
  .ds-time-picker {
    max-width: 220px;
    width: 100%;
  }
  &:hover {
    ${RemoveIconWrapper} {
      opacity: 1;
      pointer-events: all;
    }
  }
`;
export const Row = styled.div<{
  justifyContent: string;
  mode: RangeDisplayMode;
}>`
  width: 100%;
  display: flex;
  justify-content: ${(props): string => props.justifyContent};
  min-height: 32px;
  margin: 8px 0;

  ${(props): FlattenSimpleInterpolation | false =>
    props.mode === 'slider' &&
    css`
      & {
        column-gap: 8px;
        margin-top: 16px;
        ${RemoveIconWrapper} {
          margin-top: 14px;
        }
      }
    `}

  .ant-slider {
    width: 100%;
    margin: 24px 8px 8px;
  }
  .ant-tooltip-inner {
    white-space: nowrap;
  }
  && .ant-slider-handle:focus,
  && .ant-slider-handle:hover {
    .ant-tooltip-content {
      background-color: transparent;
    }
    .ant-tooltip-inner {
      color: ${(props): string => props.theme.palette['grey-600']};
    }
  }
`;
export const Separator = styled.span`
  & {
    line-height: 32px;
    height: 32px;
    margin: 0 8px;
  }
`;

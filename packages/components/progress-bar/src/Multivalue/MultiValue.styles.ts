import { type MouseEvent } from 'react';
import styled, { css } from 'styled-components';

export const Multivalue = styled.div<{
  color: string;
  percent: number;
  $isFirst?: boolean;
  $isLast?: boolean;
  $stacked?: boolean;
  onClick?: (event: MouseEvent) => void;
}>`
  background: ${(props) => props.color};
  width: ${(props) => props.percent}%;
  height: 6px;
  overflow: hidden;
  margin-top: -6px;

  ${(props) =>
    props.$stacked
      ? css`
          border-radius: 6px;
          ${!props.$isFirst &&
          css`
            border-top-right-radius: 0px;
            border-bottom-right-radius: 0px;
            border-right: 2px solid white;
          `}
        `
      : css`
          border-radius: 0;
          ${props.$isFirst &&
          css`
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
          `}
          ${props.$isLast &&
          css`
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
          `}
        `}
`;
export const Container = styled.div<{ stackedBars: boolean }>`
  position: relative;
  height: 16px;
  width: 100%;
  padding-top: 11px;

  ${(props) =>
    !props.stackedBars &&
    css`
      justify-content: flex-start;
      display: flex;
      gap: 2px;
    `}
`;

import styled, { css } from 'styled-components';

export const chartStyles = css`
  .highcharts-tooltip {
    > span {
      background-color: #4c5561;
      border-radius: 4px;
      overflow: hidden;
      padding: 0;

      .tooltip-body {
        color: #e9edee;
        padding: 5px 10px;
        font-size: 13px;
        font-weight: 400;

        b {
          font-weight: 600;
        }

        .series-name {
          display: block;
          font-size: 15px;
        }

        div.diff {
          margin: 12px 0;
        }
      }
    }
  }
  .highcharts-point {
    &.inactive-serie {
      opacity: 0.1;
      pointer-events: none;
    }
  }
`;

type ChartContent = {
  chartItemHeight?: string;
  chartItemMaxWidth?: string;
  chartItemMinWidth?: string;
  chartItemWidth?: string;
  showBorder?: boolean;
};

export const Content = styled.div<{ maxHeight?: string; spacing?: string | number }>`
  margin: ${(props): string | number | undefined => props.spacing};
  max-height: ${({ maxHeight }): string => maxHeight || '167px'};
  position: relative;
  ${chartStyles}
`;

export const Wrapper = styled.div<ChartContent>`
  ${(props): undefined | false | string => props.showBorder && 'border: 1px solid #ebebed;'};
  background: #fff;
  padding-top: 20px;
  max-width: ${(props): string | undefined => props.chartItemMaxWidth};
  min-width: ${(props): string | undefined => props.chartItemMinWidth};
  width: ${(props): string | undefined => props.chartItemWidth};
`;

export const ChartTitle = styled.div`
  margin-left: 10px;
`;

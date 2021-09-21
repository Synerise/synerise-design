import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

export type ColumnChartStrokeStyles = { stroke: string; strokeWidth: number };

export const colors = [
  '#248afe',
  '#0fc2bc',
  '#cf2eeb',
  '#ffc303',
  '#ff2f52',
  '#248afe',
  '#0fc2bc',
  '#cf2eeb',
  '#ffc303',
  '#ff2f52',
];

export const ChartStyles = styled.div`
  position: relative;
  .highcharts-container {
    font-family: 'Graphik LCG Web' !important;
    font-size: 14px;
    font-weight: 500;
  }
  .highcharts-legend-item {
    cursor: pointer;
  }
  .highcharts-navigator-outline {
    stroke: none;
  }
  .highcharts-navigator-xaxis {
    text {
      transform: translate(0, -11px);
      fill: #6c7780;
    }
  }
  .highcharts-navigator-mask-inside {
    cursor: ew-resize;
    stroke: #1685fc;
    z-index: 30;
    fill: transparent;
    shape-rendering: crispedges;
    stroke-width: 1.5;
  }
  .highcharts-navigator-handle {
    cursor: ew-resize;
    fill: #1685fc;
    stroke: #fff;
  }
  .highcharts-button {
    text {
      font-size: 13px;
      fill: #6c7780;
      font-weight: normal;
    }
    &.highcharts-button-pressed,
    &.highcharts-button-hover {
      text {
        font-size: 13px;
        fill: #1685fc !important;
        font-weight: normal !important;
      }
      rect {
        stroke-width: 0.8;
        stroke: #d7d9dd;
        fill: none !important;
        shape-rendering: crispedges;
      }
    }
  }

  .highcharts-custom-tooltip {
    color: #fff;
    opacity: 1;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    font-size: 12px;
    padding: 5px 15px;
    font-weight: 500;
    font-family: 'Graphik LCG Web' !important;
  }

  .highcharts-custom-tooltip-format {
    color: #949ea6;
    display: block;
    min-width: 230px;
    padding: 2px 0;
    display: flex;
    font-family: 'Graphik LCG Web' !important;
    justify-content: space-between;
    > span {
      max-width: 200px;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .dot {
      display: inline-block;
      padding-right: 3px;
    }
    b {
      float: right;
      display: inline-block;
      padding-left: 10px;
      color: #384350;
      font-weight: 500;
    }
  }
`;

export const PreloaderWrapper = styled.div`
  width: 100%;
  position: absolute;
  box-sizing: border-box;
  top: 0;
  left: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 180px 0;
`;

export const ChartWrapper = styled.div<{ colors?: string[]; stroke?: ColumnChartStrokeStyles }>`
  width: 100%;
  position: relative;
  height: 100%;

  ${(props): undefined | FlattenSimpleInterpolation =>
    props.colors &&
    props.colors.map(
      (color, index) => css`
    .snrs-striped-series .highcharts-color-${index} {
      fill: url('#snrs-striped-${index}');
      stroke: none;}`
    )};

  .highcharts-point {
    ${(props: { stroke?: ColumnChartStrokeStyles }): undefined | ColumnChartStrokeStyles =>
      props.stroke && props.stroke};
  }
`;

export const WithCustomLabel = styled(ChartStyles)`
  .highcharts-label > span {
    box-shadow: rgba(171, 178, 183, 0.32) 0 8px 16px;
    padding: 15px 15px 5px;
    position: relative;
    border-radius: 4px;
    font-family: inherit !important;
    overflow: hidden;
    background: #fff;
    fill: transparent;
    stroke: transparent;
  }
  .highcharts-tooltip {
    fill: transparent;
    stroke: transparent;
  }
`;

export const Popover = styled.div<{ visible?: boolean; left: number; top: number }>`
  position: absolute;
  display: ${(props): string => (props.visible ? 'block' : 'none')};
  left: ${(props): string => `${props.left}px`};
  top: ${(props): string => `${props.top}px`};
  border-radius: 5px;
  box-shadow: rgba(171, 178, 183, 0.32) 0 8px 16px;
  span {
    font-weight: 500;
    padding-left: 5px;
    display: inline-block;
  }
`;

import styled from 'styled-components';

import ModalBase from '@synerise/ds-modal';

export const ChartStyles = styled.div`
  background: ${(props): string => props.theme.variable('@white')};
  box-shadow: ${(props): string => props.theme.variable('@box-shadow-base')};
  position: relative;
  height: 800px;
  width: 100%;

  .chart {
    height: 100%;
    max-height: 688px;
    width: 100%;
    position: absolute;
  }

  .highcharts-node {
    fill: ${(props): string => props.theme.variable('@white')};
    filter: url('#snrs-sankey-node');
  }

  .highcharts-tooltip > span:first-child {
    z-index: 99999 !important;
  }

  .sankey-node {
    & > span {
      top: 0;
      left: 0;
      width: 120px;
    }
  }

  .sankey-legend {
    display: flex;
    flex-wrap: wrap;

    &-item {
      color: black;
      font-size: 15px;
      width: 120px;
      padding-left: 30px;
    }
  }

  .sankey-node-label {
    font-size: 13px;
    font-weight: 500;
    font-family: ${(props): string => props.theme.variable('@font-family')};
    padding: 5px 10px 12px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: absolute;
    width: 120px;
    border-radius: 2px;

    &-name {
      max-width: 90px;
      min-height: 13px;
      margin-right: 5px;
      display: inline-block;
      color: ${(props): string => props.theme.variable('@gray-color')};
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &-drilldown {
      max-width: 90px;
      min-height: 13px;
      display: inline-block;
      color: ${(props): string => props.theme.variable('@gray-color-lighter-2')};
      font-weight: 400;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &-percent {
      color: ${(props): string => props.theme.variable('@gray-color-lighter-2')};
    }
  }

  .sankey-tooltip {
    background: ${(props): string => props.theme.variable('@white')};
    box-shadow: 0 5px 25px 0 rgba(0, 1, 1, 0.15);
    border-radius: 4px;
    font-family: 'Graphik LCG Web', sans-serif;
    width: 200px;
    z-index: 99999;

    &-header {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      background: #697580;
      color: ${(props): string => props.theme.variable('@white')};
      font-size: 12px;
      font-weight: 400;
      padding: 9px 15px;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;

      .bold {
        display: inline-block;
        margin-left: 5px;
        font-weight: 500;
      }

      & > span:first-child {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    &-content {
      padding: 16px 6px;

      span {
        display: block;
        color: ${(props): string => props.theme.variable('@gray-color-lighter-3')};
        font-size: 9px;
        letter-spacing: 0.01px;
      }
    }

    &-block {
      span {
        text-transform: uppercase;
        font-weight: 500;
        display: inline-block;
        margin-bottom: 4px;
      }

      .drilldown {
        display: block;
        word-break: break-word;
        text-overflow: ellipsis;
        overflow: hidden;
        text-transform: none;
        font-size: 11px;
      }

      .drilldown-name {
        display: block;
        text-transform: lowercase;
      }
    }

    &-separator {
      border-bottom: 0.5px dotted #dbe0e3;
      margin: 12px 0 16px;
    }

    &-item {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;

      &-desc,
      &-stats {
        display: flex;
        align-items: center;

        & > span {
          font-size: 12px;
          text-transform: none;
        }

        & > span:last-child {
          display: inline-block;
          margin-left: 2px;
          font-weight: 400;
        }
      }

      &-desc {
        max-width: 115px;

        & > span:last-child {
          margin-right: 1px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }

      &-stats {
        & > span:first-child {
          font-weight: 400;
        }

        & > span:last-child {
          color: ${(props): string => props.theme.variable('@gray-color')};
          font-weight: 500;
        }
      }
    }

    &-chartKeys {
      &-item {
        display: flex;
        justify-content: space-between;

        & > span:first-child {
          font-size: 12px;
          color: ${(props): string => props.theme.variable('@gray-color-lighter-3')};
        }

        & > span:last-child {
          font-size: 12px;
          color: ${(props): string => props.theme.variable('@gray-color')};
          font-weight: 500;
        }
      }
    }
  }

  .highcharts-label-box {
    fill: transparent;
  }
`;

export const SankeyStepsWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 45px 0 45px 10px;
  font-family: Graphik;
`;

export const Step = styled.div`
  display: flex;
  justify-content: center;
  width: 100px;
  margin: 0 10px;
  padding-top: 2px;
  color: ${(props): string => props.theme.variable('@gray-color-lighter-2')};
  font-family: 'Graphik LCG Web', sans-serif;
  font-size: 15px;
  font-weight: 500;

  span {
    display: inline-block;
    margin-right: 3px;
  }
`;

export const DottedLine = styled.div<{ width: number }>`
  width: ${(props): string => `${props.width}px`};
  border-bottom: 1px dotted rgba(171, 178, 183, 0.28);
`;

export const Modal = styled(ModalBase)`
  && {
    .ant-modal-body {
      padding: 0;
    }

    .ant-menu {
      padding: 9px 0px;
      border: none;
      border-radius: 3px;
      box-shadow: 0px 8px 16px 0 rgba(171, 178, 183, 0.32);
    }

    .ant-menu-vertical .ant-menu-item:not(:last-child) {
      margin-bottom: 0;
    }

    .ant-menu-item {
      margin: 0;
      padding: 12px 16px;
      font-size: 13px;
      color: ${(props): string => props.theme.variable('@gray-color-lighter-2')};
      font-weight: 500;
      line-height: 1em;

      &:hover {
        background: ${(props): string => props.theme.variable('@primary-color-lighter-6')};
        color: ${(props): string => props.theme.variable('@gray-color')};
      }
    }
  }
`;

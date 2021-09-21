import styled from 'styled-components';

export const GeneralChartStyles = styled.div`
  flex: 1 1 auto;
  height: 100%;
  margin: 12px 0 0;

  & .highcharts-container {
    overflow: visible !important;
  }

  & .chart {
    height: 100%;
  }

  & > div {
    height: 100%;
  }

  & .highcharts-background {
    fill: ${(props): string => props.theme.variable('@component-background')};
  }

  & .highcharts-yaxis .highcharts-axis-line,
  .highcharts-xaxis .highcharts-axis-line {
    display: none;
  }

  & .highcharts-yaxis-grid .highcharts-grid-line {
    display: none;
  }

  & .highcharts-pie-series path,
  & .highcharts-column-series path {
    stroke-width: 0 !important;
  }

  & .highcharts-yaxis-grid .highcharts-grid-line {
    stroke: ${(props): string => (props.theme.isDarkTheme ? '#57616D' : '#e6e6e6')};
  }

  & .highcharts-axis-line {
    stroke: ${(props): string => (props.theme.isDarkTheme ? '#87919D' : '#B5BDC3')};
  }

  & .highcharts-xaxis-labels {
    transform: translateY(15px);
  }

  & .highcharts-data-label text tspan {
    stroke: none;
    font-weight: 500;
  }

  & .highcharts-axis-labels text {
    color: ${(props): string => (props.theme.isDarkTheme ? '#949EA6 !important' : '#666666')};
    fill: ${(props): string => (props.theme.isDarkTheme ? '#949EA6 !important' : '#666666')};
  }

  & .highcharts-yaxis-labels text {
    transform: translateX(-20px);
  }

  & .highcharts-legend-item text {
    font-weight: 400 !important;
    color: ${(props): string => (props.theme.isDarkTheme ? '#949EA6 !important' : '#333333')};
    fill: ${(props): string => (props.theme.isDarkTheme ? '#949EA6 !important' : '#333333')};
  }

  & .highcharts-axis-title tspan {
    color: ${(props): string => (props.theme.isDarkTheme ? '#949EA6 !important' : '#666666')};
    fill: ${(props): string => (props.theme.isDarkTheme ? '#949EA6 !important' : '#666666')};
  }

  & .highcharts-tooltip {
    position: relative;
    z-index: 99999;
    border: none;
  }

  & .highcharts-tooltip > span {
    display: inline-block;
    z-index: 1000;

    & .dot {
      display: inline-block;
      position: relative;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      margin-right: 5px;
      transform: translateY(-2px);
    }

    & strong {
      margin-left: 10px;
      font-weight: 700;
    }
  }
`;

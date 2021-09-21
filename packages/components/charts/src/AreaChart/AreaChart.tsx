import * as React from 'react';
import * as Highcharts from 'highcharts/highstock';
import { HighchartsChart, Chart, XAxis, YAxis, AreaSplineSeries, HighchartsProvider } from 'react-jsx-highstock';

import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { Props } from './AreaChart.types';
import { DEFAULT_EXPORTING_OPTIONS } from '../common/chartsConfig';

const AreaChart: React.FC<Props> = ({ data, axes, lineColor, areaColor, axesColor, axesTickColor, height, width }) => {
  const plotOptions = {
    areaspline: {
      lineColor: theme.variable[lineColor],
      fillColor: theme.variable[areaColor],
      marker: {
        enabled: false,
      },
      enableMouseTracking: false,
    },
  };

  const xAxisConfig = {
    id: 'x',
    tickInterval: 1,
    offset: 18,
    tickLength: 0,
    lineWidth: 0,
    tickColor: theme.variable[axesTickColor],
    minPadding: 0.1,
    maxPadding: 0.05,
    reversed: axes.x.reversed,
    visible: axes.x.visible,
    labels: {
      style: {
        color: theme.variable[axesColor],
      },
      formatter: axes.x.formatter,
    },
  };

  const yAxisConfig = {
    id: 'y',
    tickColor: theme.variable[axesTickColor],
    reversed: axes.y.reversed,
    visible: axes.y.visible,
    labels: {
      align: 'left' as const,
      x: 48,
      y: -8,
      style: {
        color: theme.variable[axesColor],
      },
      formatter: axes.y.formatter,
    },
  };

  return (
    <HighchartsProvider Highcharts={Highcharts}>
      <HighchartsChart plotOptions={plotOptions} exporting={DEFAULT_EXPORTING_OPTIONS}>
        <Chart margin={0} height={height} width={width} />

        <XAxis {...xAxisConfig} />
        <YAxis {...yAxisConfig}>
          <AreaSplineSeries data={data} keys={['x', 'y']} />
        </YAxis>
      </HighchartsChart>
    </HighchartsProvider>
  );
};

AreaChart.defaultProps = {
  lineColor: '@primary-color',
  areaColor: '@primary-color-lighter-6',
  axesColor: '@gray-color-lighter-4',
  axesTickColor: '@gray-color-lighter-5',
  width: 115,
  height: 40,
};

export default AreaChart;

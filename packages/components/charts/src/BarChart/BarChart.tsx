import * as React from 'react';
import * as Highcharts from 'highcharts/highstock';
import { merge } from 'lodash';
import {
  HighchartsChart,
  Chart,
  XAxis,
  YAxis,
  BarSeries,
  ColumnSeries,
  HighchartsProvider,
  Tooltip,
} from 'react-jsx-highstock';

import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { Props, AxesConfig, DataItem } from './BarChart.types';
import { DEFAULT_EXPORTING_OPTIONS } from '../common/chartsConfig';

const createDataToColumnChartSeriesMapper = (axes: AxesConfig): ((data: DataItem[]) => any[][]) => {
  const xProperty = axes.x.dataProperty;
  const yProperty = axes.y.dataProperty;

  return (data): any[] => data.map(entry => [entry[xProperty], entry[yProperty]]);
};

const BarChart: React.FC<Props> = ({
  data,
  axes,
  barColor = '@primary-color',
  axesColor = '@gray-color-lighter-3',
  axesTickColor = '@gray-color-lighter-5',
  chartType,
  plotOptions = {},
  tooltip,
}) => {
  const mapDataToColumnChartSeries = createDataToColumnChartSeriesMapper(axes);

  const defaultPlotOptions = {
    column: {
      color: theme.variable[barColor],
    },
    bar: {
      color: theme.variable[barColor],
    },
  };

  const xAxisConfig = {
    id: 'x',
    tickInterval: 1,
    offset: 'offset' in axes.x ? axes.x.offset : 18,
    tickLength: 0,
    lineWidth: 0,
    tickColor: theme.variable[axesTickColor],
    minPadding: 0.1,
    maxPadding: 0.05,
    allowDecimals: 'allowDecimals' in axes.x ? axes.x.allowDecimals : true,
    labels: {
      style: {
        color: theme.variable[axesColor],
      },
      formatter: axes.x.formatter,
      ...('labels' in axes.x ? axes.x.labels : null),
    },
  };

  const yAxisConfig = {
    id: 'y',
    offset: 'offset' in axes.y ? axes.y.offset : 32,
    tickColor: theme.variable[axesTickColor],
    allowDecimals: 'allowDecimals' in axes.y ? axes.y.allowDecimals : true,
    labels: {
      align: 'left',
      x: 48,
      y: -8,
      style: {
        color: theme.variable[axesColor],
        transform: 'translateY(-5px)',
      },
      formatter: axes.y.formatter,
      ...('labels' in axes.y ? axes.y.labels : null),
    },
  };

  const chartMargin = plotOptions.margin || [30, 10, 50, 10];

  return (
    <HighchartsProvider Highcharts={Highcharts}>
      <HighchartsChart plotOptions={merge(defaultPlotOptions, plotOptions)} exporting={DEFAULT_EXPORTING_OPTIONS}>
        <Chart margin={chartMargin} height={350} />
        <Tooltip {...tooltip} />
        <XAxis {...xAxisConfig} />
        <YAxis {...yAxisConfig}>
          {chartType === 'bar' ? (
            <BarSeries data={mapDataToColumnChartSeries(data)} keys={['x', 'y']} />
          ) : (
            <ColumnSeries data={mapDataToColumnChartSeries(data)} keys={['x', 'y']} />
          )}
        </YAxis>
      </HighchartsChart>
    </HighchartsProvider>
  );
};

export default BarChart;

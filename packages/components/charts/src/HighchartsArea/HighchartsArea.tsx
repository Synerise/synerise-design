import * as React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import {
  HighchartsChart,
  Chart,
  HighchartsProvider,
  XAxis,
  YAxis,
  Title,
  Legend,
  AreaSeries,
  Tooltip,
} from 'react-jsx-highstock';
import HighchartsCustomEvent from 'highcharts-custom-events';

import Stripped from '../Defs/Stripped';
import Defs from '../Defs';
import { ChartWrapper, WithCustomLabel } from '../common/ChartStyles.styles';
import { SimpleChartProps } from '../SimpleAreaChart/SimpleAreaChart.types';
import { DEFAULT_EXPORTING_OPTIONS, defaultColor } from '../common/chartsConfig';

export type HighchartsChartProps = Pick<SimpleChartProps, 'chartData' | 'getHighchartsChart' | 'strokeStyles'>;

HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);

const HighchartsArea: React.FC<HighchartsChartProps> = ({
  chartData,
  strokeStyles,
  getHighchartsChart,
}: HighchartsChartProps) => {
  React.useEffect(() => {
    HighchartsCustomEvent(Highcharts);
  }, []);

  const handleLoad = React.useCallback(
    (highchartsChart: Highcharts.Chart) => {
      getHighchartsChart && getHighchartsChart(highchartsChart);
    },
    [getHighchartsChart]
  );

  return (
    <HighchartsProvider Highcharts={Highcharts}>
      <ChartWrapper colors={chartData.colors} stroke={strokeStyles}>
        <Stripped colors={chartData.colors || defaultColor} />
        <WithCustomLabel>
          <Defs />
          <HighchartsChart
            callback={handleLoad}
            colors={chartData.colors}
            exporting={chartData.exporting || DEFAULT_EXPORTING_OPTIONS}
            plotOptions={chartData.plotOptions}
          >
            <Chart {...(chartData.chart || {})} animation={false} />
            <Title />
            <Tooltip {...(chartData.tooltip || {})} />
            <XAxis id="x" {...(chartData.xAxis || {})} />
            <YAxis id="y" {...(chartData.yAxis || {})}>
              {chartData.series.map((areaSeries, i: number) => {
                const key = `line_${i}`;
                return <AreaSeries key={key} id={key} {...areaSeries} />;
              })}
            </YAxis>
            <Legend {...(chartData.legend || {})} />
          </HighchartsChart>
        </WithCustomLabel>
      </ChartWrapper>
    </HighchartsProvider>
  );
};

export default HighchartsArea;

import * as React from 'react';
import * as Highcharts from 'highcharts/highstock';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import {
  Chart,
  ColumnSeries,
  HighchartsChart,
  Legend,
  Title,
  Tooltip,
  HighchartsProvider,
  XAxis,
  YAxis,
} from 'react-jsx-highstock';
import HighchartsCustomEvent from 'highcharts-custom-events';

import Loader from '@synerise/ds-loader';
import {
  AxisCrosshairOptions,
  ChartOptions,
  ColorString,
  ExportingOptions,
  LegendOptions,
  PlotOptions,
  TooltipOptions,
  XAxisOptions,
  YAxisOptions,
} from 'highcharts';
import HighchartsRoundedCorners from './highchartsRoundedCorners';
import Stripped from '../Defs/Stripped';
import Defs from '../Defs';
import { ChartWrapper, PreloaderWrapper, WithCustomLabel } from '../common/ChartStyles.styles';
import { ColumnChartStrokeStyles } from '../SimpleColumnChart/SimpleColumnChart.types';
// import { PartialChartObject } from '../SimpleAreaChart/SimpleAreaChart.types';

import { defaultColor, DEFAULT_EXPORTING_OPTIONS } from '../common/chartsConfig';

HighchartsRoundedCorners(Highcharts);
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);

type Data = {
  x: number;
  y: number;
};

type Serie = {
  type: 'Line' | 'Column';
  name: string;
  data: Data[];
  className?: string;
};

type HighchartsColumnProps = {
  chartData: {
    colors: Array<ColorString>;
    yAxis: YAxisOptions | YAxisOptions[];
    xAxis: XAxisOptions | Array<XAxisOptions>;
    crosshair?: boolean | AxisCrosshairOptions;
    exporting?: ExportingOptions;
    plotOptions?: PlotOptions;
    chart?: ChartOptions;
    tooltip?: TooltipOptions;
    legend?: LegendOptions;
    series: Serie[];
  };
  getHighchartsChart?: (chart: Highcharts.Chart) => void;
  overrideColors?: boolean;
  noPreloading: boolean;
  strokeStyles?: ColumnChartStrokeStyles;
};

const HighchartsColumn: React.FC<HighchartsColumnProps> = ({
  overrideColors,
  chartData,
  strokeStyles,
  noPreloading,
  getHighchartsChart,
}) => {
  React.useEffect(() => {
    HighchartsCustomEvent(Highcharts);
  }, []);

  const handleLoad = React.useCallback(
    (highchartsChart: Highcharts.Chart) => {
      getHighchartsChart && getHighchartsChart(highchartsChart);
    },
    [getHighchartsChart]
  );

  const colors = overrideColors ? chartData.colors : defaultColor;
  const yAxis = chartData.yAxis || {};

  return (
    <HighchartsProvider Highcharts={Highcharts}>
      <ChartWrapper colors={colors} stroke={strokeStyles}>
        <Stripped colors={colors} />
        <WithCustomLabel>
          {!noPreloading && (
            <PreloaderWrapper>
              <Loader size="M" />
            </PreloaderWrapper>
          )}
          <Defs />
          <HighchartsChart
            callback={handleLoad}
            colors={colors}
            exporting={chartData.exporting || DEFAULT_EXPORTING_OPTIONS}
            plotOptions={chartData.plotOptions}
          >
            <Chart {...chartData.chart} animation={false} />
            <Title />
            <Tooltip {...chartData.tooltip} />
            <XAxis
              lineColor={(chartData.xAxis as XAxisOptions).lineColor}
              crosshair={chartData.crosshair}
              id="x"
              categories={(chartData.xAxis as XAxisOptions).categories}
              tickLength={0}
              minorTickLength={0}
            />
            <YAxis id="y" {...yAxis}>
              {chartData.series.map((child, i) => {
                const key = `col_${i}`;
                return <ColumnSeries key={key} className={`${child.className || ''}`} id={key} {...child} />;
              })}
            </YAxis>
            <Legend {...chartData.legend} />
          </HighchartsChart>
        </WithCustomLabel>
      </ChartWrapper>
    </HighchartsProvider>
  );
};

export default HighchartsColumn;

import * as React from 'react';
import * as Highcharts from 'highcharts';
import {
  HighchartsChart,
  Chart,
  HighchartsProvider,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarSeries,
} from 'react-jsx-highcharts';

import { ChartStyles, ChartWrapper } from '../common/ChartStyles.styles';
import Defs from '../Defs/Defs';
import { DEFAULT_EXPORTING_OPTIONS } from '../common/chartsConfig';

// eslint-disable-next-line func-names
Highcharts.wrap(Highcharts.Axis.prototype, 'setTickPositions', function(proceed, secondPass) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  proceed.call(this, secondPass);
});

type Props = {
  chartData: Omit<Highcharts.Options, 'series'>;
  series: Array<{ name: string; data: number[] }>;
};

const HighchartsBars: React.FC<Props> = ({ chartData, series }) => {
  return (
    <HighchartsProvider Highcharts={Highcharts}>
      <ChartWrapper>
        <ChartStyles>
          <Defs />
          <HighchartsChart plotOptions={chartData.plotOptions} exporting={DEFAULT_EXPORTING_OPTIONS}>
            <Chart {...chartData.chart} />
            <Tooltip {...chartData.tooltip} />
            {/*
            // @ts-ignore */}
            <XAxis {...chartData.xAxis} />
            <YAxis {...chartData.yAxis}>
              {series.map((child, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <BarSeries {...child} key={i} />
              ))}
            </YAxis>
            <Legend {...chartData.legend} />
          </HighchartsChart>
        </ChartStyles>
      </ChartWrapper>
    </HighchartsProvider>
  );
};

export default HighchartsBars;

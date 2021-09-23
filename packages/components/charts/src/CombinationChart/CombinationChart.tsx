import * as Highcharts from 'highcharts/highstock';
import * as React from 'react';
import {
  Chart,
  HighchartsStockChart,
  Legend,
  Navigator,
  Series,
  Title,
  Tooltip,
  HighchartsProvider,
  XAxis,
  YAxis,
} from 'react-jsx-highstock';
import HighchartCustomEvent from 'highcharts-custom-events';

import Loader from '@synerise/ds-loader';
import { AlignValue } from 'highcharts';
import Defs from '../Defs';
import { ChartStyles, ChartWrapper, PreloaderWrapper } from '../common/ChartStyles.styles';
import { DEFAULT_EXPORTING_OPTIONS } from '../common/chartsConfig';
import { Props } from './CombinationChart.types';

HighchartCustomEvent(Highcharts);

const defaultOpt = {
  colors: [
    '#0b68ff',
    '#4da7fe',
    '#13c2bc',
    '#0bcb38',
    '#f97600',
    '#ffba00',
    '#4e1daf',
    '#b88cee',
    '#d41640',
    '#ff2f52',
  ],
  legend: {
    align: 'left' as AlignValue,
  },
  chart: {
    panning: { enabled: true },
    type: 'column',
  },
  crosshair: {
    color: 'transparent',
    width: 1,
  },
  yAxis: {
    id: 'main_y',
    min: 0,
    minRange: 0.1,
  },
  time: {
    useUTC: true,
  },
};

const setSeries = (props: Props): React.ReactNode =>
  props.chartData.series.map((child, i) => {
    const key = `col_${child.name.replace(/ /g, '_') + i}`;
    const type = child.type === 'Line' ? 'Spline' : child.type;
    return (
      <Series
        type={type.toLowerCase()}
        pointStart={props.chartData.series[0].data}
        data={child.data}
        id={key}
        name={child.name}
        key={key}
        marker={{
          enabled: child.data && child.data.length === 1,
        }}
        dataGrouping={props.chartData.dataGrouping}
      />
    );
  });

const HighchartCombination: React.FC<Props> = props => {
  const {
    chartData: {
      plotOptions,
      loading,
      colors,
      yAxis,
      time,
      exporting,
      chart,
      tooltip,
      xAxis,
      crosshair,
      legend,
      navigator,
    },
  } = props;

  return (
    <HighchartsProvider Highcharts={Highcharts}>
      <ChartWrapper>
        <ChartStyles>
          <PreloaderWrapper>
            <Loader size="M" />
          </PreloaderWrapper>
          <Defs />
          <HighchartsStockChart
            plotOptions={plotOptions}
            loading={loading}
            colors={colors || defaultOpt.colors}
            time={time || defaultOpt.time}
            exporting={exporting || DEFAULT_EXPORTING_OPTIONS}
          >
            <Chart {...(chart || defaultOpt.chart)} animation={false} />
            <Title />
            <Tooltip {...tooltip} />
            <XAxis {...xAxis} crosshair={crosshair || defaultOpt.crosshair} tickLength={0} minorTickLength={0} />
            <YAxis {...(yAxis || defaultOpt.yAxis)}>{setSeries(props)}</YAxis>
            <Legend {...(legend || defaultOpt.legend)} />
            <Navigator
              series={{ color: '#ededed', lineWidth: 1 }}
              maskFill="transparent"
              // maskStroke="#ddd"
              outlineColor="#f7f7f7"
              outlineWidth={1}
              {...navigator}
            />
          </HighchartsStockChart>
        </ChartStyles>
      </ChartWrapper>
    </HighchartsProvider>
  );
};

export default HighchartCombination;

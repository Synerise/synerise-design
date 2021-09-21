import * as React from 'react';
import Button from '@synerise/ds-button';

import { SimpleAreaChart } from '@synerise/ds-charts';
import { PartialChartObject } from '@synerise/ds-charts/dist/SimpleAreaChart/SimpleAreaChart.types';

const series = [
  {
    name: '50th percentile',
    data: [502, 635, 809, 947, 1402, 3634, 5268],
  },
  {
    name: '75th percentile',
    data: [106, 107, 111, 133, 221, 767, 1766],
  },
  {
    name: '90th percentile',
    data: [163, 203, 276, 408, 547, 729, 628],
  },
  {
    name: '95th percentile',
    data: [18, 31, 54, 156, 339, 818, 1201],
  },
  {
    name: '99th percentile',
    data: [2, 2, 2, 6, 13, 30, 46],
  },
  {
    name: '99,9th percentile',
    data: [20, 2000, 40, 206, 1343, 3550, 456],
  },
];

const stories = {
  default: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [chart, setChart] = React.useState<PartialChartObject | null>(null);

    const chartData = {
      id: 'simple',
      name: 'simple',
      colors: ['#ffc303', '#ff2f52', '#248afe', '#0fc2bc', '#cf2eeb', '#f25653'],
      exporting: {
        buttons: {
          contextButton: {
            enabled: false,
          },
        },
        csv: {
          dateFormat: '%Y-%m-%d',
          decimalPoint: null,
        },
      },
      legend: {
        enabled: true,
        itemStyle: {
          color: '#384043',
          fontWeight: 'normal',
        },
      },
      plotOptions: {
        area: {
          stacking: 'normal' as const,
          lineColor: '#666666',
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#666666',
          },
        },
      },
      series,
      tooltip: {
        padding: 0,
        shadow: false,
        useHTML: true,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        formatter: function() {
          const self = this as any;
          return (
            self.point &&
            `<div style="margin: 20px" class="tooltip-body">
            <div class="series-name">${self.point.y} millions</b></div>
          </div>`
          );
        },
      },
      xAxis: {
        categories: ['2021-10-01', '2021-10-02', '2021-10-03', '2021-10-04', '2021-10-05', '2021-10-06', '2021-10-07'],
        tickmarkPlacement: 'on' as const,
      },
      yAxis: {
        title: {
          text: 'Billions',
        },
        labels: {
          formatter: function(): string {
            return String((this as any).value / 1000);
          },
        },
      },
    };

    const getHighchartsChart = (chart: PartialChartObject) => {
      setChart(chart);
    };

    return (
      <>
        {chart ? (
          <>
            <Button
              onClick={() => {
                chart.print();
              }}
            >
              Print chart
            </Button>
            <Button
              onClick={() => {
                chart.exportChart();
              }}
            >
              Download PNG
            </Button>
            <Button
              onClick={() => {
                chart.downloadCSV();
              }}
            >
              Download CSV
            </Button>
            <Button
              onClick={() => {
                chart.downloadCSV();
                chart.exportChart();
              }}
            >
              Download CSV + PNG
            </Button>
          </>
        ) : null}
        <SimpleAreaChart
          chartItemHeight="400px"
          chartItemMinWidth="600px"
          chartItemMaxWidth="100%"
          chartItemWidth="100%"
          chartData={chartData}
          getHighchartsChart={getHighchartsChart}
          showBorder
          title={'Historic and Estimated Worldwide Population Growth by Region'}
          titleProps={{
            m: 24,
          }}
        />
      </>
    );
  },
};

export default {
  name: 'Components/Chart/SimpleAreaChart',
  config: {},
  stories,
};

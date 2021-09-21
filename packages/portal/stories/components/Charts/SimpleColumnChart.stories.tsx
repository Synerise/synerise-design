import * as React from 'react';
import * as Highcharts from 'highcharts';
import Button from '@synerise/ds-button';
import { TooltipFormatterContextObject } from 'highcharts';
import { SimpleColumnChart } from '@synerise/ds-charts';

const stories = {
  default: () => {
    const items = {
      meta: {
        title: 'Test',
      },
      data: [
        {
          name: 'Step A',
          result: 340,
        },
        {
          name: 'Step B',
          result: 367,
        },
        {
          name: 'Step C',
          result: 300,
        },
      ],
      labels: null,
    };

    return <SimpleColumnChart items={items} showBorder title="Title of Chart" />;
  },
  stockingColumns: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [chart, setChart] = React.useState<Highcharts.Chart | null>(null);

    const items = {
      meta: {
        title: 'Test',
      },
      data: [
        {
          name: '0',
          result: [
            100,
            2000,
            3000,
            4000,
            5000,
            6000,
            7000,
            8000,
            9000,
            10000,
            11000,
            12000,
            13000,
            14000,
            15,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            17,
          ],
          borderRadiusTopLeft: '3px',
          borderRadiusTopRight: '3px',
        },
        {
          name: '1',
          result: [6, 7, 8, 9, 0],
        },
        {
          name: '2',
          result: [6, 7, 8, 9, 0],
        },
        {
          name: '3',
          result: [6, 7, 8, 9, 0],
        },
        {
          name: '4',
          result: [6, 7, 8, 9, 0],
        },
        {
          name: '5',
          result: [6, 7, 8, 9, 10],
        },
      ],
    };

    const chartOptions = {
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
        column: {
          stacking: 'normal' as const,
          pointPadding: 0,
          groupPadding: 0.2,
          padding: 2,
        },
        series: {
          stacking: 'normal' as const,
        },
      },
      tooltip: {
        padding: 0,
        shadow: false,
        useHTML: true,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        formatter: (
          item: TooltipFormatterContextObject
        ): false | string | Array<string | null | undefined> | null | undefined =>
          item.point &&
          `<div style="margin: 20px" class="tooltip-body">
            <div class="series-name">${item.point.y} events</b></div>
          </div>`,
      },
      xAxis: {
        categories: [
          '2020-10-01',
          '2020-10-02',
          '2020-10-03',
          '2020-10-04',
          '2020-10-05',
          '2020-10-06',
          '2020-10-07',
          '2020-10-08',
          '2020-10-09',
          '2020-10-10',
          '2020-10-11',
          '2020-10-12',
          '2020-10-13',
          '2020-10-14',
          '2020-10-15',
          '2020-10-16',
          '2020-10-17',
          '2020-10-18',
          '2020-10-19',
          '2020-10-20',
          '2020-10-21',
          '2020-10-22',
          '2020-10-23',
          '2020-10-24',
          '2020-10-25',
          '2020-10-26',
          '2020-10-27',
          '2020-10-28',
          '2020-10-29',
          '2020-10-30',
          '2020-10-31',
        ],
      },
      yAxis: {
        labels: {
          padding: 0,
        },
        type: 'logarithmic' as const,
      },
    };

    const getHighchartsChart = (chartObject: Highcharts.Chart): void => {
      setChart(chartObject);
    };

    return (
      <>
        {chart ? (
          <>
            <Button
              onClick={(): void => {
                chart.print();
              }}
            >
              Print chart
            </Button>
            <Button
              onClick={(): void => {
                // chart.exportChart();
              }}
            >
              Download PNG
            </Button>
            <Button
              onClick={(): void => {
                chart.downloadCSV();
              }}
            >
              Download CSV
            </Button>
            <Button
              onClick={(): void => {
                chart.downloadCSV();
                // chart.exportChart();
              }}
            >
              Download CSV + PNG
            </Button>
          </>
        ) : null}
        <SimpleColumnChart
          chartItemHeight="400px"
          chartItemMinWidth="600px"
          chartItemMaxWidth="1192px"
          chartItemWidth="1192px"
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          chartOptions={chartOptions}
          // amount of colors must be the same of bigger than data length
          // otherwise rounding won't work properly as it is based on colorIndex
          columnColors={[
            '#ffc303',
            '#ff2f52',
            '#248afe',
            '#0fc2bc',
            '#cf2eeb',
            '#384356',
            '#34eedd',
            '#f25653',
            '#000000',
            'blue',
            'green',
            'orange',
            'red',
            'cornflowerblue',
            'cyan',
            'purple',
            'pink',
            '#111111',
            '#01026e',
            '#ac021f',
            '#520004',
            '#f97600',
            '#f7b80f',
            '#a0ffa2',
            '#002429',
            '#7e109e',
            '#44fffe',
            '#44449e',
            '#7eff9e',
            '#02929f',
            '#fcc676',
            '#bccb76',
          ]}
          contentMaxHeight="400px"
          getHighchartsChart={getHighchartsChart}
          items={items}
          strokeStyles={{
            stroke: 'white',
            strokeWidth: 1,
          }}
          title="Events"
          wrapperStyles={{
            margin: '20px auto',
          }}
        />
      </>
    );
  },
};

export default {
  name: 'Components/Chart/SimpleColumnChart',
  config: {},
  stories,
  // Component: Charts,
};

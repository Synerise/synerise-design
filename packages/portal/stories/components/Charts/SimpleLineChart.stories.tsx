import * as React from 'react';
import * as Highcharts from 'highcharts';
import Button from '@synerise/ds-button';

import { SimpleLineChart } from '@synerise/ds-charts';

const data = [
  {
    name: 'other',
    result: [
      496,
      473,
      910,
      920,
      455,
      458,
      459,
      915,
      474,
      1364,
      470,
      490,
      460,
      458,
      464,
      928,
      492,
      37,
      466,
      729,
      361,
      448,
      939,
      2719,
      464,
      480,
      459,
      463,
      474,
      478,
    ],
    color: '#6d2ed3',
    borderRadiusTopLeft: '3px',
    borderRadiusTopRight: '3px',
  },
  {
    name: 'automation.clientPathStep',
    result: [
      2066,
      531,
      698,
      2168,
      1032,
      460,
      462,
      1777,
      979,
      1691,
      647,
      2109,
      491,
      493,
      2246,
      2903,
      1561,
      1245,
      1125,
      346,
      0,
      0,
      483,
      575,
      557,
      1115,
      413,
      499,
      699,
      598,
    ],
    color: '#ffc300',
  },
  {
    name: 'user.chooseProfile',
    result: [
      2063,
      533,
      551,
      1376,
      1000,
      425,
      427,
      1730,
      941,
      1652,
      615,
      2093,
      456,
      458,
      2202,
      2893,
      1593,
      1256,
      1132,
      377,
      401,
      553,
      665,
      595,
      600,
      1124,
      405,
      492,
      709,
      599,
    ],
    color: '#13c2bc',
  },
  {
    name: 'user.logIn',
    result: [
      2067,
      531,
      698,
      2168,
      1032,
      460,
      462,
      1777,
      979,
      1690,
      647,
      2109,
      491,
      493,
      2246,
      2903,
      1561,
      1245,
      1125,
      388,
      407,
      532,
      602,
      575,
      557,
      1115,
      413,
      499,
      699,
      598,
    ],
    color: '#ff5a4d',
  },
  {
    name: 'automation.clientEndPath',
    result: [
      2066,
      531,
      698,
      2168,
      1032,
      460,
      462,
      1777,
      979,
      1690,
      647,
      2109,
      491,
      493,
      2246,
      2903,
      1561,
      1556,
      2257,
      687,
      0,
      0,
      1029,
      1170,
      1157,
      2239,
      818,
      991,
      1408,
      1197,
    ],
    color: '#238afe',
  },
  {
    name: 'automation.clientStartPath',
    result: [
      2066,
      531,
      698,
      2168,
      1032,
      460,
      462,
      1777,
      979,
      1690,
      647,
      2109,
      491,
      493,
      2246,
      2903,
      1561,
      1556,
      2257,
      687,
      0,
      0,
      1029,
      1170,
      1157,
      2239,
      818,
      991,
      1408,
      1197,
    ],
    color: '#ce2feb',
  },
];

const series = data.map(item => ({
  ...item,
  data: item.result,
}));

const stories = {
  default: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [logarithmicScale, setLogarithmicScale] = React.useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [chart, setChart] = React.useState<Highcharts.Chart | null>(null);

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
        filename: 'chartik',
      },
      legend: {
        enabled: true,
        itemStyle: {
          color: '#384043',
          fontWeight: 'normal',
        },
      },
      plotOptions: {
        line: {
          stacking: 'normal' as const,
        },
        series: {
          fillOpacity: 0.3,
          lineWidth: 2,
          marker: {
            enabled: false,
            radius: 4,
            states: {
              hover: {
                lineColor: '#fff',
                lineWidth: 2,
              },
            },
            symbol: 'circle',
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
        tickmarkPlacement: 'on' as const,
      },
      yAxis: {
        title: {
          text: 'Billions',
        },
        labels: {
          formatter: function(): string {
            return String((this as any).value);
          },
        },
        type: logarithmicScale ? ('logarithmic' as const) : ('linear' as const),
      },
    };

    const getHighchartsChart = (chart: Highcharts.Chart) => {
      setChart(chart);
    };

    return (
      <>
        <Button style={{ marginBottom: 48 }} onClick={() => setLogarithmicScale(!logarithmicScale)}>
          Scale {logarithmicScale ? 'logarithmic' : 'linear'}
        </Button>
        <br />
        {chart ? (
          <>
            <Button
              onClick={() => {
                // @ts-ignore
                chart.print();
              }}
            >
              Print chart
            </Button>
            <Button
              onClick={() => {
                // @ts-ignore
                chart.exportChart();
              }}
            >
              Download PNG
            </Button>
            <Button
              onClick={() => {
                // @ts-ignore
                chart.downloadCSV();
              }}
            >
              Download CSV
            </Button>
            <Button
              onClick={() => {
                // @ts-ignore
                chart.downloadCSV();
                // @ts-ignore
                chart.exportChart();
              }}
            >
              Download CSV + PNG
            </Button>
          </>
        ) : null}
        <SimpleLineChart
          chartItemHeight="400px"
          chartItemMinWidth="600px"
          chartItemMaxWidth="100%"
          chartItemWidth="100%"
          chartData={chartData}
          getHighchartsChart={getHighchartsChart}
          showBorder
          title={'Example Line Chart'}
          titleProps={{
            m: 24,
          }}
        />
      </>
    );
  },
};

export default {
  name: 'Components/Chart/SimpleLineChart',
  config: {},
  stories,
};

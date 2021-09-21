import * as React from 'react';
import { shallow } from 'enzyme';

import { DSProvider } from '@synerise/ds-core';
import SankeyChart from './SankeyChart';
import { nodeTooltipFormatter, ribbonTooltipFormatter } from './SankeyChartHelpers';
import { SankeyChartProps } from './SankeyChart.types';

const chartData = {
  plotOptions: {
    sankey: {
      colors: ['#134ab4', '#d993da', '#f45a00', '#99c00e'],
      tooltip: {
        nodeFormatter: (): string => {
          return nodeTooltipFormatter({
            header: {
              title: 'Title',
              value: 50,
              percent: 50,
            },
            from: {
              translation: 'from',
              value: [
                {
                  title: 'Custom',
                  value: 30,
                  percent: 100,
                  color: '#efcfce',
                },
              ],
            },
            to: {
              translation: 'to',
              value: [
                {
                  title: 'Custom',
                  value: 30,
                  percent: 100,
                  color: '#efcfce',
                },
              ],
            },
          });
        },
        pointFormatter: (): string => {
          return ribbonTooltipFormatter({
            header: {
              title: 'Flow value',
              value: 30,
              percent: 100,
            },
            from: {
              translation: 'from',
              value: [{ title: 'Custom', value: 30, percent: 100, color: '#efcfce' }],
            },
            to: {
              translation: 'to',
              value: [{ title: 'Custom', value: 30, percent: 100, color: '#efcfce' }],
            },
            chartKeys: [{ title: 'Custom', value: 30, percent: 100, color: '#efcfce' }],
          });
        },
      },
    },
  },
};

const series = {
  keys: ['from', 'to', 'weight', 'avg', 'min', 'max'],
  data: [
    ['page visit', 'view item', 460, 1, 1, 2],
    ['page visit', 'add to cart', 320, 1, 1, 2],
    ['page visit', 'client update', 220, 1, 1, 2],
    ['view item', 'cart update', 280, 1, 1, 2],
    ['view item', 'add to favorite', 90, 1, 1, 2],
    ['view item', 'add to heart', 90, 1, 1, 2],
    ['add to cart', 'cart update', 160, 1, 1, 2],
    ['add to cart', 'add to favorite', 160, 1, 1, 2],
    ['client update', 'cart update', 80, 1, 1, 2],
    ['client update', 'add to heart', 140, 1, 1, 2],
    ['cart update', 'purchase', 440, 1, 1, 2],
    ['cart update', 'session end', 80, 1, 1, 2],
    ['add to favorite', 'purchase', 250, 1, 1, 2],
    ['add to heart', 'purchase', 240, 1, 1, 2],
    ['add to heart', 'app opened', 1, 1, 1, 2],
  ],
};

describe('SankeyChart', () => {
  it('properly render SankeyChart', () => {
    const wrapper = shallow(
      <DSProvider locale="pl">
        {/*
        // @ts-ignore */}
        <SankeyChart chartData={chartData} series={series} />
      </DSProvider>
    );

    const Chart = wrapper.find(SankeyChart);
    const ChartProps = Chart.props() as SankeyChartProps;
    expect(ChartProps.series.data.length).toBe(15);
    expect(Chart.prop('chartData')).toEqual(chartData);
  });
});

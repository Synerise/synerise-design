import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import ReactHighmaps from 'react-highcharts/ReactHighmaps';

import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { GeneralChartStyles } from './MatrixChart.styles';

import type { Props } from './MatrixChart.types';

class MatrixChartBase extends React.Component<Props> {

  static defaultProps = {
    maxColor: '@primary-color-lighter-1',
    minColor: '@primary-color-lighter-5',
    tooltipBackgroundColor: '@component-background',
    tickColor: '@gray-color-lighter-7',
    height: 500,
    dataLabelSize: '13px',
  };

  setUpDefaultConfig = (): {} => {
    const {
      data,
      categoriesX,
      categoriesY,
      minColor,
      maxColor,
      width,
      height,
      tooltipBackgroundColor,
      tickColor,
      dataLabelSize,
    } = this.props;

    const config = {
      chart: {
        type: 'heatmap',
        plotBorderWidth: 0,
        marginLeft: 150,
        marginBottom: 100,
        zoomType: 'x',
        events: {
          redraw: (): void => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            const seriesData = this.series[0].data;
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            const xe = this.xAxis[0].getExtremes();
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            const ye = this.yAxis[0].getExtremes();

            seriesData.filter((point: {x: number; y: number}) => {
              return point.x <= xe.max && point.x >= xe.min && point.y <= ye.max && point.y >= ye.min;
            });
          },
        },
        width,
        height,
      },

      credits: false,

      title: {
        text: null,
      },

      xAxis: {
        categories: categoriesX,
        visible: true,
        title: null,
        tickLength: 50,
        tickColor: theme.variable(tickColor),
      },

      yAxis: {
        categories: categoriesY,
        visible: true,
        title: null,
        tickWidth: 1,
        tickLength: 100,
        tickColor: theme.variable(tickColor),
      },

      colorAxis: {
        minColor: theme.variable(minColor),
        maxColor: theme.variable(maxColor),
      },

      legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 0,
        symbolHeight: height - 130,
      },

      tooltip: {
        useHTML: true,
        borderWidth: 0,
        borderRadius: 5,
        backgroundColor: theme.variable(tooltipBackgroundColor),

        formatter(): React.ReactNode {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          const { yAxis, xAxis } = this.series;
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          return `<div><span class="dot" style="background:${this.color}"></span> from ${yAxis.categories[this.point.y]} to ${xAxis.categories[this.point.x]}<strong>${this.point.value}</strong></div>`;
        },
      },

      series: [
        {
          data,
          turboThreshold: 100000,
          borderWidth: 1,
          borderColor: '#fff',
          dataLabels: {
            enabled: true,
            color: 'contrast',
            formatter(): string {
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              const customContrastColor = this.point.contrastColor === '#FFFFFF' ? '#FFF' : theme.variable('@primary-color-darker-1');
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              return this.point?.value && `<span style="color: ${customContrastColor}">${this.point?.value}</span>`;
            },
            style: {
              fontSize: dataLabelSize,
            },
          },
        },
      ],
    };

    return { config };
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const { config } = this.setUpDefaultConfig();
    return (
      <GeneralChartStyles>
        <ReactHighmaps config={config} />
      </GeneralChartStyles>
    );
  }
}

export default MatrixChartBase;

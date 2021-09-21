import * as React from 'react';
import { TooltipFormatterContextObject, AlignValue } from 'highcharts';
import { HighchartColumn } from '../HighchartColumn';
import * as S from './SimpleColumnChart.styles';
import { Props, DataItem } from './SimpleColumnChart.types';
import { colors } from '../common/ChartStyles.styles';

const SimpleColumnChart: React.FC<Props> = ({
  chartItemHeight,
  chartItemMaxWidth,
  chartItemMinWidth,
  chartItemWidth,
  contentMaxHeight,
  getHighchartsChart,
  spacing,
  showBorder,
  strokeStyles,
  title,
  wrapperStyles,
  items,
  inactiveSeries,
  columnColors,
  chartOptions,
}) => {
  const getChartData = React.useMemo(() => {
    const data = items && items.data;
    const labels = items && items.labels;
    const series =
      data &&
      data.map((item: DataItem, i: number) => {
        return {
          ...item,
          data:
            typeof item.result === 'number'
              ? [
                  {
                    y: item.result,
                    valueIndex: i,
                    className: inactiveSeries && inactiveSeries.includes(i) && 'inactive-serie',
                  },
                ]
              : item.result.map((value, index) => ({
                  y: value,
                  valueIndex: index,
                  className: inactiveSeries && inactiveSeries.includes(index) && 'inactive-serie',
                })),
        };
      });

    const tooltipOptions = {
      padding: 0,
      shadow: false,
      useHTML: true,
      backgroundColor: 'transparent',
      formatter: (
        item: TooltipFormatterContextObject
      ): false | string | Array<string | null | undefined> | null | undefined =>
        item.point &&
        `<div class="tooltip-body">
            <div class="series-name">${item.point.y}${labels ? ` ${labels.unit}` : ''}</b></div>
          </div>`,
    };

    const labelFormat = labels ? { format: `{value} ${labels.unit || ''}` } : {};

    return {
      id: 'test',
      name: 'test',
      colors: columnColors || colors,
      exporting: {
        buttons: {
          contextButton: {
            enabled: false,
          },
        },
      },
      plotOptions: {
        series: {
          compareStart: true,
          colorByPoint: false,
          animation: false,
          legend: {
            enabled: true,
          },
        },
        column: {
          pointPadding: 0.18,
          groupPadding: 0.1,
          borderWidth: 0,
          borderRadius: 0,
        },
      },
      legend: {
        enabled: false,
      },
      chart: {
        panning: { enabled: true },
        type: 'column',
        height: chartItemHeight,
      },
      tooltip: {
        enabled: true,
        valueDecimals: 2,
        fontSize: 13,
        borderWidth: 0,
        borderRadius: 0,
        ...tooltipOptions,
      },
      crosshair: {
        color: 'transparent',
        width: 1,
      },
      xAxis: {
        categories: [''],
        gridLineColor: '#f3f5f6',
      },
      yAxis: {
        labels: {
          ...labelFormat,
          align: 'left' as AlignValue,
          x: 0,
          y: -10,
        },
        gridLineColor: '#f3f5f6',
      },
      series,
      ...(chartOptions || {}),
    };
  }, [chartItemHeight, chartOptions, columnColors, inactiveSeries, items]);

  return (
    <S.Wrapper
      chartItemHeight={chartItemHeight}
      chartItemMinWidth={chartItemMinWidth}
      chartItemMaxWidth={chartItemMaxWidth}
      chartItemWidth={chartItemWidth}
      showBorder={showBorder}
      style={wrapperStyles}
    >
      <S.Content maxHeight={contentMaxHeight} spacing={spacing}>
        <S.ChartTitle>{title}</S.ChartTitle>
        <HighchartColumn
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          chartData={getChartData}
          getHighchartsChart={getHighchartsChart}
          noPreloading
          overrideColors
          strokeStyles={strokeStyles}
        />
      </S.Content>
    </S.Wrapper>
  );
};

SimpleColumnChart.defaultProps = {
  chartItemHeight: '150px',
  chartItemMaxWidth: '600px',
  chartItemMinWidth: '400px',
  chartItemWidth: '400px',
  spacing: '20px 50px 0px 0',
};

export default SimpleColumnChart;

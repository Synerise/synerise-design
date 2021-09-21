import * as React from 'react';
import * as Highcharts from 'highcharts';
import { BoxProps } from '@rebass/grid';

import { ColumnChartStrokeStyles } from '../SimpleColumnChart/SimpleColumnChart.types';

export type SimpleChartProps = {
  chartItemHeight?: string;
  chartItemMaxWidth?: string;
  chartItemMinWidth?: string;
  chartItemWidth?: string;
  chartData: Omit<Highcharts.Options, 'series'> & { series: Array<{ name: string; data: number[] }> };
  contentMaxHeight?: string;
  getHighchartsChart?: (chart: Highcharts.Chart) => void;
  showBorder?: boolean;
  spacing?: string | number;
  strokeStyles?: ColumnChartStrokeStyles;
  title?: string | React.ReactNode;
  titleProps?: BoxProps;
  wrapperStyles?: React.CSSProperties;
};

export type PartialChartObject = {
  addCredits(options: Highcharts.CreditsOptions): void;
  chartHeight?: number;
  chartWidth?: number;
  container: HTMLElement;
  destroy(): void;
  downloadCSV(): void;
  drillUp(): void;
  exportChart(options?: Highcharts.ExportingOptions, chartOptions?: Highcharts.Options): void;
  exportChartLocal(options?: Highcharts.ExportingOptions, chartOptions?: Highcharts.Options): void;
  getCSV(useLocalDecimalPoint?: boolean): string;
  getSVG(additionalOptions?: Highcharts.Options): string;
  hideLoading(): void;
  options: Highcharts.Options;
  plotLeft?: number;
  plotSizeX?: number;
  plotSizeY?: number;
  plotTop?: number;
  print(): void;
  redraw(animation?: boolean | Animation): void;
  reflow(): void;
  setSize(width: number, height: number, animation?: boolean | Animation): void;
  setTitle(title: Highcharts.TitleOptions, subtitle?: Highcharts.SubtitleOptions, redraw?: boolean): void;
  showLoading(str?: string): void;
  subtitle: Highcharts.TitleObject;
  title: Highcharts.TitleObject;
  updatePosition(): void;
};

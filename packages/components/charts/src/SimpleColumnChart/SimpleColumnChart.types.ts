import { Options } from 'highcharts';
import * as React from 'react';
import * as Highcharts from 'highcharts';

export type DataItem = {
  name: string;
  result: number | number[];
};

export type Items = {
  meta: {
    title: string;
  };
  data: DataItem[];
  labels?: {
    unit?: string;
  } | null;
};

export type ColumnChartStrokeStyles = { stroke: string; strokeWidth: number };

export type Props = {
  chartItemHeight?: string;
  chartItemMaxWidth?: string;
  chartItemMinWidth?: string;
  chartItemWidth?: string;
  chartOptions?: Options;
  columnColors?: string[];
  contentMaxHeight?: string;
  getHighchartsChart?: (chart: Highcharts.Chart) => void;
  inactiveSeries?: number[];
  items: Items;
  onRecordClick?: Function;
  showBorder?: boolean;
  spacing?: string;
  title?: string | React.ReactNode;
  wrapperStyles?: React.CSSProperties;
  strokeStyles?: ColumnChartStrokeStyles;
};

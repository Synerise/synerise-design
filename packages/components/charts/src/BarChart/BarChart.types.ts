import {
  AxisLabelsFormatterCallbackFunction,
  PlotOptions,
  TooltipOptions,
  XAxisLabelsOptions,
  YAxisLabelsOptions,
} from 'highcharts';

export type AxisConfig = {
  dataProperty: string;
  formatter?: AxisLabelsFormatterCallbackFunction;
  offset?: number;
  allowDecimals?: boolean;
  labels?: XAxisLabelsOptions | YAxisLabelsOptions | undefined;
};

export type AxesConfig = {
  x: AxisConfig;
  y: AxisConfig;
};

export type DataItemValue = string | number | boolean;

export type DataItem = Record<string, DataItemValue>;

export type Props = {
  data: DataItem[];
  barColor?: string;
  axesColor?: string;
  axesTickColor?: string;
  axes: AxesConfig;
  chartType: string;
  plotOptions?: PlotOptions;
  tooltip?: TooltipOptions;
};

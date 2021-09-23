import { AxisLabelsFormatterCallbackFunction, SeriesAreasplineOptions } from 'highcharts';

export type AxisConfig = {
  formatter?: AxisLabelsFormatterCallbackFunction;
  reversed?: boolean;
  visible?: boolean;
};

export type AxesConfig = {
  x: AxisConfig;
  y: AxisConfig;
};

export type Props = {
  data: SeriesAreasplineOptions['data'];
  lineColor: string;
  areaColor: string;
  axesColor: string;
  axesTickColor: string;
  axes: AxesConfig;
  width: number;
  height: number;
};

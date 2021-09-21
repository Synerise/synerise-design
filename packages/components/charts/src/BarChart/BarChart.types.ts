export type AxisConfig = {
  dataProperty: string;
  formatter?: Function;
  offset?: number;
  allowDecimals?: boolean;
  labels?: any;
};

export type AxesConfig = {
  x: AxisConfig;
  y: AxisConfig;
};

export type DataItem = Record<string, any>;

export type Props = {
  data: DataItem[];
  barColor: string;
  axesColor: string;
  axesTickColor: string;
  axes: AxesConfig;
  chartType: string;
  plotOptions: Record<string, any>;
  tooltip: Record<string, any>;
};

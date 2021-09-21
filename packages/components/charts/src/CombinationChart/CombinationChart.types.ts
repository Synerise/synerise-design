import {
  AxisCrosshairOptions,
  ChartOptions,
  ColorString,
  DataGroupingOptionsObject,
  ExportingOptions,
  LegendOptions,
  LoadingOptions,
  NavigatorOptions,
  PlotOptions,
  TimeOptions,
  TooltipOptions,
  XAxisOptions,
  YAxisOptions,
} from 'highcharts';

type Data = {
  x: number;
  y: number;
};

type Serie = {
  type: 'Line' | 'Column';
  name: string;
  data: Data[];
};

export type Props = {
  chartData: {
    series: Serie[];
    dataGrouping?: DataGroupingOptionsObject;
    plotOptions?: PlotOptions;
    loading?: LoadingOptions;
    colors?: Array<ColorString>;
    yAxis?: YAxisOptions | Array<YAxisOptions>;
    time?: TimeOptions;
    exporting?: ExportingOptions;
    chart?: ChartOptions;
    tooltip?: TooltipOptions;
    xAxis?: XAxisOptions | Array<XAxisOptions>;
    crosshair?: boolean | AxisCrosshairOptions;
    legend?: LegendOptions;
    navigator?: NavigatorOptions;
  };
};

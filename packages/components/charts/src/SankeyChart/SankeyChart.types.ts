import * as React from 'react';
import { SeriesClickEventObject, XAxisOptions, SeriesSankeyPointOptionsObject } from 'highcharts';

type Tooltip = {
  borderWidth: number;
  borderRadiius: number;
  padding: number;
  shadow: boolean;
  useHTML: boolean;
};

type NodeDataLabels = {
  className: string;
  nodeFormatter: (this: SankeyChartBody) => string;
  useHTML: boolean;
  verticalAlign: string;
};

type NodeEvents = {
  [key: string]: (e: Event) => void;
};

type PlotOptionsSankey = {
  borderRadius: number;
  clip: boolean;
  colors: string[];
  curveFactor: number;
  dataLabels: NodeDataLabels;
  events: NodeEvents;
  linkOpacity: number;
  nodePadding: number;
  tooltip: {
    headerFormat: null;
    nodeFormatter: () => string;
    pointFormatter: () => string;
    useHTML: boolean;
  };
};

type PlotOptionsSeries = {
  className: string;
  clip: boolean;
};

type PlotOptions = {
  sankey: PlotOptionsSankey;
  series: PlotOptionsSeries;
};
export interface SankeyChartProps {
  series: {
    data: SeriesSankeyPointOptionsObject[];
    keys: string[];
  };
  chartData: {
    name: string;
    tooltip: Tooltip;
    xAxis: XAxisOptions;
    plotOptions: PlotOptions;
  };
  onClick: Function;
  isModalDisabled: boolean;
  isDrillDownDisabled: boolean;
  drillDown: JSX.Element;
  isOpenInCRMDisabled: boolean;
  openInCRM: JSX.Element;
}

export interface SankeyChartState {
  nodeXCoords: number[] | null;
  isModalVisible: boolean;
  nodeEventObject: SeriesClickEventObject | null;
}

export type nodeLabelArgs = {
  id: string;
  label: string;
  drilldown?: DrillDown;
  weightPercent: number;
  height: number;
  top: number;
  color: string;
};

type shapeArgs = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type SankeyChartPoint = {
  name: string;
  from: string;
  to: string;
  weight: number;
  avg: number;
  min: number;
  max: number;
  isNode?: boolean;
  nodeY: number;
  shapeArgs: shapeArgs;
};

export type Node = {
  color: string;
  colorIndex: number;
  nodeX: number;
  nodeY: number;
  id: string;
  name: string;
};

type ChartObj = {
  nodeColumns: Node[];
};

export interface ChartType {
  series: ChartObj[];
}

type Series = {
  nodeColumns: unknown[];
  nodes: Node[];
};

export type SankeyChartBody = {
  point: SankeyChartPoint;
  color: string;
  series: Series;
  key: string;
};

export type LabelContent = {
  label: string;
  weightPercent: number;
  drilldown?: DrillDown;
};

export type SankeyObj = {
  title: string;
  value?: number | string;
  percent?: number;
  color?: string;
  drilldown?: DrillDown;
};

type SankeyTooltipFromTo = {
  translation: string;
  value: SankeyObj[];
};

export type SankeyTooltip = {
  header: SankeyObj;
  from: SankeyTooltipFromTo;
  to: SankeyTooltipFromTo;
  chartKeys?: SankeyObj[];
};

export interface NodeClickEvent extends React.MouseEvent<HTMLElement> {
  target: {
    className: string;
  } & EventTarget;
}

export type DrillDown = {
  name: string;
  value: string;
};

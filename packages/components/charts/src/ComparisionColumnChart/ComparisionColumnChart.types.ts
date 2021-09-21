import { Items } from '../SimpleColumnChart/SimpleColumnChart.types';

export type Data = Items[];

export type Props = {
  chartItemHeight?: string;
  chartItemWidth?: string;
  chartItemMinWidth?: string;
  spacing?: string;
  data: Data;
};

export type State = {
  inactiveSeries: number[] | never;
};

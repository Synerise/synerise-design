import * as React from 'react';
import { ComparisionColumnChart } from '@synerise/ds-charts';

const NO_CHARTS = 4;
const NO_COLS = 4;

const randomData = (scale: number[]) => Math.round(Math.random() * (scale[1] - scale[0]) + scale[0]);

const arrGen = (lengthOfArray: number) => new Array(lengthOfArray).fill(0).map((_, i) => i);

const labels = [
  null,
  {
    unit: '%',
  },
  null,
  null,
];

const scales = [
  [90000, 99900],
  [3, 6],
  [100, 140],
  [20, 29.9],
  [14000, 14299],
  [1100, 1189],
  [289, 299],
  [11, 18],
  [41, 89],
  [15, 56],
];

const data = arrGen(NO_CHARTS).map((chart: number, i: number) => ({
  meta: {
    title: `title ${chart}`,
  },
  data: arrGen(NO_COLS).map((col: number) => ({
    name: `col ${col} in ${chart} chart`,
    result: randomData(scales[chart < 10 ? chart : chart % 10]),
  })),
  labels: labels[i],
}));

const stories = {
  default: () => {
    return (
      <ComparisionColumnChart
        data={data}
        chartItemWidth="25%"
        chartItemHeight="150px"
        chartItemMinWidth="500px"
        spacing="100px 0 0 0"
      />
    );
  },
};

export default {
  name: 'Components/Chart/ComparisionColumnChart',
  config: {},
  stories,
};

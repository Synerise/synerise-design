import * as React from 'react';
import { CombinationChart } from '@synerise/ds-charts';

const getItems = (legends, items): Record<string, any>[] => {
  return legends.map((serie, serieIndex) => {
    const data = items.map(dateItem => {
      const item = dateItem.values[serieIndex];
      return {
        x: item.date,
        y: item.value,
      };
    });
    return {
      name: serie.title,
      type: 'spline',
      data,
    };
  });
};

const series = getItems(
  [
    {
      title: 'serie 1',
    },
  ],
  [
    {
      values: [
        {
          date: 1546300800000,
          value: 123,
        },
      ],
    },
    {
      values: [
        {
          date: 1548979200000,
          value: 567,
        },
      ],
    },
    {
      values: [
        {
          date: 1551398400000,
          value: 450,
        },
      ],
    },
  ]
);

const stories = {
  default: () => {
    return <CombinationChart chartData={{ plotOptions: {}, series }} />;
  },
};

export default {
  name: 'Components/Chart/CombinationChart',
  config: {},
  stories,
};

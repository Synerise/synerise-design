import * as React from 'react';
import { BarChart } from '@synerise/ds-charts';

const stories = {
  default: () => {
    const data = [
      {
        label: 'Year 1800',
        index: 0,
        data: 107,
      },
      {
        label: 'Year 1900',
        index: 1,
        data: 408,
      },
      {
        label: 'Year 2012',
        index: 2,
        data: 38,
      },
    ];
    const axes = {
      x: {
        dataProperty: 'index',
        formatter: item => {
          return data[item.value].label;
        },
      },
      y: {
        dataProperty: 'data',
      },
    };
    return <BarChart data={data} axes={axes} chartType="column" />;
  },
  bar: () => {
    const data = [
      {
        label: 'Year fdfd fdfef 1800',
        index: 0,
        data: 107,
      },
      {
        label: 'Year ewewe dwdwedew 1900',
        index: 1,
        data: 408,
      },
      {
        label: 'Year 2012',
        index: 2,
        data: -38,
      },
    ];
    const axes = {
      x: {
        dataProperty: 'index',
        formatter: item => {
          return data[item.value].label;
        },
      },
      y: {
        dataProperty: 'data',
      },
    };

    const plotOptions = {
      bar: {
        negativeColor: 'red',
      },
      margin: [30, 10, 50, 100],
    };

    const tooltip = {
      shared: true,
    };

    return <BarChart data={data} axes={axes} chartType="bar" plotOptions={plotOptions} tooltip={tooltip} />;
  },
};

export default {
  name: 'Components/Chart/BarChart',
  config: {},
  stories,
};

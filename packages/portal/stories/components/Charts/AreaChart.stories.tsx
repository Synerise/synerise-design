import * as React from 'react';
import { AreaChart } from '@synerise/ds-charts';

const stories = {
  default: () => {
    const data = [
      [0, 0],
      [1, 1],
      [2, 0],
    ];
    const axes = {
      x: { visible: false, reversed: true },
      y: { visible: false },
    };
    return <AreaChart width={320} height={240} axes={axes} data={data} />;
  },
};

export default {
  name: 'Components/Chart/AreaChart',
  config: {},
  stories,
};

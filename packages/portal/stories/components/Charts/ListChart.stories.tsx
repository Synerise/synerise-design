import * as React from 'react';

import { ListChart } from '@synerise/ds-charts';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';

const data = [
  { title: 'Mean basket sizeasdasdasdadsfsdgddssfsdf', value: -0.8 },
  { title: 'Mesdan discount asda safghg', value: 1 },
  { title: 'Mesdan discount', value: 1 },
];

const stories = {
  default: () => {
    const count = 3;
    return (
      <ListChart
        title={'List chart title'}
        count={count}
        actions={
          <Button type={'ghost'} href="/" onClick={() => alert('click')}>
            List action
          </Button>
        }
        maxToShow={2}
      >
        {data.map(i => (
          <ListChart.Item
            key={i}
            title={i.title}
            value={i.value}
            actions={
              <Button onClick={() => alert('click')} type="ghost" mode="single-icon">
                <Icon name="push-m" type="primary" />
              </Button>
            }
          />
        ))}
      </ListChart>
    );
  },
};

export default {
  name: 'Components/Chart/ListChart',
  config: {},
  stories,
};

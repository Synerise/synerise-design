import { boolean, number, select } from '@storybook/addon-knobs';
import * as React from 'react';
import Skeleton from '@synerise/ds-skeleton';


const SkeletonSizes = {
  Small: 'S',
  Medium: 'M',
  Large: 'L',
};
const stories = {
  default: () => {
    const size = select('Size', SkeletonSizes, 'M');
    const numberOfSkeletons = number('Number of skeletons', 2);
    return (
      <div style={{width: '150px'}}>
      <Skeleton size={size} numberOfSkeletons={numberOfSkeletons}/>
      </div>
    )
  },
};

export default {
  name: 'Components/Skeleton',
  stories,
  Component: Skeleton
};
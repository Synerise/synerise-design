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
    const usePredefinedHeight = boolean('use pixel height', false);
    let height: number | undefined;
    if (usePredefinedHeight) {
        height = number('Height (overwrites height defined by size)', 24);
    }
    return (
      <div style={{width: '150px'}}>
      <Skeleton size={size} height={height} numberOfSkeletons={numberOfSkeletons}/>
      </div>
    )
  },
};

export default {
  name: 'Components/Skeleton',
  stories,
  Component: Skeleton
};
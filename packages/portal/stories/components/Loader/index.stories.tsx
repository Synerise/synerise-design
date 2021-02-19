import * as React from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';
import Loader from '@synerise/ds-loader';
import useInterval from "@use-it/interval";
import { useState } from 'react';



const iconSizes = {
  Small: 'S',
  Medium: 'M',
  Large: 'L'
};
const colorOptions = {
  blue: 'blue',
  grey:'grey',
  red:'red',
  green: 'green',
  yellow: 'yellow',
  pink: 'pink',
  mars: 'mars',
  orange: 'orange',
  fern: 'fern',
  cyan: 'cyan',
  purple: 'purple',
  violet: 'violet',
};



export const Counter = ({ delay = 100 }) => {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount((currentCount) => currentCount + 1);
    if (count === 100)
      setCount(0)
  }, delay);

  return <span>{count}%</span>;
};

const stories = {
  default: () => {
    const size = select('Size', iconSizes,'M')
    const labelPosition = select('Position of elements', ['right','bottom'],'right');
    const showText = boolean ('Show Loading text',true, );
    const colors = select('Set custom color', colorOptions, colorOptions.blue);
    const loadingText = text('Loading', 'Loading...');
    const showPercent = boolean ('Show percent text',false , );

    const getLoading = (showText: boolean): string | null => {
      if (showText) {
        return loadingText;
      } else {
        return null;
      }
    };
    const getPercent = (): number | React.ReactNode | null => {
      if (showPercent) {
        return (<Counter/>);
      } else {
        return null;
      }
    };
    return(
      <div>
        <Loader mode='absolute' percentFormatter={getPercent} size={size} color={colors} label={loadingText && getLoading(showText)} labelPosition={labelPosition}></Loader>
      </div>
    )
  },
};

export default {
name: 'Components/Loader',
  config: {},
  stories,
  Component: Loader,
}

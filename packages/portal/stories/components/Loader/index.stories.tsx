import * as React from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';
import Loader from '@synerise/ds-loader';
import styled from 'styled-components';



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

export const PercantageWrapper = styled.div`
@property --num {
  syntax: "<integer>";
  initial-value: 0;
  inherits: false;
}
  animation: counter 10s infinite ease-in-out;
  counter-reset: num var(--num);

&::after {
  content: counter(num);
}

@keyframes counter {
  from {
    --num: 0;
  }
  to {
    --num: 100;
  }
}
`;
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
        return <div style={{display: 'flex'}}><PercantageWrapper/> %</div>;
      } else {
        return null;
      }
    };
    return(
      <div>
        <Loader percentFormatter={getPercent} size={size} color={colors} label={loadingText && getLoading(showText)} labelPosition={labelPosition}></Loader>
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

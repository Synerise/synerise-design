import * as React from 'react';
import ProgressBar from '@synerise/ds-progress-bar';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { select, object, number } from '@storybook/addon-knobs';
import Multivalue from '@synerise/ds-progress-bar/dist/Multivalue/Multivalue';



const customColorOptions = {
  blue: theme.palette['blue-500'],
  grey: theme.palette['grey-500'],
  red: theme.palette['red-500'],
  green: theme.palette['green-500'],
  yellow: theme.palette['yellow-500'],
  pink: theme.palette['pink-500'],
  mars: theme.palette['mars-500'],
  orange: theme.palette['orange-500'],
  fern: theme.palette['fern-500'],
  cyan: theme.palette['cyan-500'],
  purple: theme.palette['purple-500'],
  violet: theme.palette['violet-500'],
};
const decorator = storyFn => <div style={{ background: '#fff', padding: '16px', width: '600px' }}>{storyFn()}</div>;

const stories = {
  soloBar: () => {
    const colors = select('Set custom color', customColorOptions, customColorOptions.green);
    return <ProgressBar amount={60} percent={50} showLabel={false} strokeColor={colors}></ProgressBar>;
  },
  soloBarWithLabel: () => {
    const colors = select('Set custom color', customColorOptions, customColorOptions.green);
    return <ProgressBar amount={30} percent={60} showLabel={true} strokeColor={colors}></ProgressBar>;
  },

  soloBarWithLabelAndDescription: () => {
    return (
      <ProgressBar
        amount={60}
        percent={60}
        showLabel={true}
        description="Description"
        strokeColor="#ff5a4d"
      ></ProgressBar>
    );
  },
  multivalueBar: () => {
    const percentArray = [
      {
        percent: number( "Set percent value 1: ", 100, {min:0, max:100}),
        color: customColorOptions.mars,
      },
      {
        percent: number( "Set percent value 2: ", 80, {min:0, max:100}),
        color: customColorOptions.yellow,
      },
      {
        percent: number( "Set percent value 3: ", 60, {min:0, max:100}),
        color: customColorOptions.cyan,
      },
    ];

    return <Multivalue values={percentArray}></Multivalue>;
  },
};

export default {
name: 'Components/Progress Bar',
  decorator,
  stories,
  Component: ProgressBar,
};

import React from 'react';
import ProgressBar from '@synerise/ds-progress-bar';
import { theme } from '@synerise/ds-core';
import { select, text, number, boolean } from '@storybook/addon-knobs';
import Multivalue from '@synerise/ds-progress-bar/dist/Multivalue/Multivalue';
import ProgressTiles from '@synerise/ds-progress-bar/dist/ProgressTiles/ProgressTiles';

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
const decorator = storyFn => (
  <div
    style={{
      background: '#fff',
      padding: '16px',
      width: '600px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {storyFn()}
  </div>
);

const stories = {
  soloBar: () => {
    const colors = select('Set custom color', customColorOptions, customColorOptions.green);
    const percentValue = number('Set percentage', 60, { min: 0, max: 100 });
    return (
      <ProgressBar
        amount={60}
        percent={percentValue}
        showLabel={false}
        strokeColor={colors}
        containerStyles={{ display: 'flex', flexDirection: 'row' }}
      ></ProgressBar>
    );
  },
  soloSmallBar: () => {
    const colors = select('Set custom color', customColorOptions, customColorOptions.green);
    const isThick = boolean('Set thick', false);
    const percentValue = number('Set percentage', 60, { min: 0, max: 100 });
    return (
      <ProgressBar
        thick={isThick}
        showLabel={true}
        containerStyles={{ flexDirection: 'row-reverse', width: '80px' }}
        labelFormatter={(amount, percent) => (
          <div style={{ padding: isThick ? '7px 0px 0px 8px' : '8px 0 0 8px' }}>{percent}%</div>
        )}
        percent={percentValue}
        strokeColor={colors}
      ></ProgressBar>
    );
  },
  soloBarWithLabel: () => {
    const colors = select('Set custom color', customColorOptions, customColorOptions.green);
    const percentValue = number('Set percentage', 60, { min: 0, max: 100 });
    return (
      <ProgressBar amount={60} percent={percentValue} maxPercent showLabel={true} strokeColor={colors}></ProgressBar>
    );
  },

  soloBarWithLabelAndDescription: () => {
    const colors = select('Set custom color', customColorOptions, customColorOptions.green);
    const percentValue = number('Set percentage', 60, { min: 0, max: 100 });
    return (
      <ProgressBar
        amount={percentValue}
        percent={percentValue}
        showLabel={true}
        description="Description"
        strokeColor={colors}
      ></ProgressBar>
    );
  },
  multivalueBar: () => {
    const percentArray = [
      {
        percent: number('Set percent value 1: ', 100, { min: 0, max: 100 }),
        color: customColorOptions.mars,
      },
      {
        percent: number('Set percent value 2: ', 80, { min: 0, max: 100 }),
        color: customColorOptions.yellow,
      },
      {
        percent: number('Set percent value 3: ', 60, { min: 0, max: 100 }),
        color: customColorOptions.cyan,
      },
    ];

    return <Multivalue values={percentArray}></Multivalue>;
  },
  withProgressTiles: () => {
    const tileWidths = ['10px', '30px', '60px', '100px'];

    return (
      <ProgressTiles
        percent={number('Set percent ', 45, { min: 0, max: 100 })}
        tileWidth={select('TileWidth', tileWidths, '100px')}
        label={text('Label', 'Label')}
        colors={[
          customColorOptions.mars,
          customColorOptions.yellow,
          customColorOptions.cyan,
          customColorOptions.red,
          customColorOptions.yellow,
          customColorOptions.violet,
        ]}
      />
    );
  },
};

export default {
  name: 'Components/Progress Bar',
  decorator,
  stories,
  Component: ProgressBar,
};

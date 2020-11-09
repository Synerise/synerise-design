import * as React from 'react';
import { boolean, select } from '@storybook/addon-knobs';
import Status from '@synerise/ds-status';
import { TagShape } from '@synerise/ds-tags';
import Tags from '@synerise/ds-tags/dist/Tags';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

const decorator = (storyFn) => (
  <div style={{ padding: 12 }}>
    {storyFn()}
  </div>
);

const typeOptions = {
  primary: 'primary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  disabled: 'disabled',
};
const customColorOptions = {
  blue: theme.palette['blue-600'],
  grey: theme.palette['grey-600'],
  red: theme.palette['red-600'],
  green: theme.palette['green-600'],
  yellow: theme.palette['yellow-600'],
  pink: theme.palette['pink-600'],
  mars: theme.palette['mars-600'],
  orange: theme.palette['orange-600'],
  fern: theme.palette['fern-600'],
  cyan: theme.palette['cyan-600'],
  purple: theme.palette['purple-600'],
  violet: theme.palette['violet-600'],
};

const stories = {
  status: () => ({
    type: select('Type', typeOptions, 'primary'),
    label: 'This is a status',
  }),
  tagSmall: () => {
    const shapes = {
      'Default Round': TagShape.SMALL_ROUND,
      'Default Square': TagShape.SMALL_SQUARE,
    };
    const shape = select('Shape', shapes, shapes['Default Round']);
    const colors = select('Set custom color', customColorOptions, customColorOptions.blue);
    const disabled = boolean('Disable', false);

    const thisTag = [
      {
        id: 0,
        name: 'Tag name 3',
        color: colors,
      },
    ];

    return (
      <React.Fragment>
        <div style={{ padding: 24 }}>
          <Tags tagShape={shape} selected={thisTag} disabled={disabled} />
        </div>
      </React.Fragment>
    );
  },
};

export default {
name: 'Components/Pills',
  decorator,
  stories,
  Component: Status,
};

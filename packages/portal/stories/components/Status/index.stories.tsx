import * as React from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';
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
  default: 'default',
  primary: 'primary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  customStatus: 'customStatus',
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
const customColorStatusOptions = {
  blue: theme.palette['blue-600'],
  grey: theme.palette['grey-500'],
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
  Status: () => {
    const type = select('Type', typeOptions, 'default');
    const colors = type === 'customStatus' && select('Set custom status color', customColorStatusOptions, customColorStatusOptions.grey);
    const label = text('Label', 'Draft')
    return(
      <React.Fragment>
        <div style={{ padding: 24 }}>
          <Status label={label} type={type} color={colors}/>
        </div>
      </React.Fragment>
    );
  },
  pillSmall: () => {
    const shapes = {
      'Default Round': TagShape.SMALL_ROUND,
      'Default Square': TagShape.SMALL_SQUARE,
    };
    const shape = select('Shape', shapes, shapes['Default Round']);
    const colors = select('Set custom color', customColorOptions, customColorOptions.grey);
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

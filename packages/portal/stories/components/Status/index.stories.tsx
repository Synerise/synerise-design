import * as React from 'react';
import Status from '@synerise/ds-status';
import { TagShape } from '@synerise/ds-tags';
import Tags from '@synerise/ds-tags/dist/Tags';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import mdx from './Status.mdx';

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
const customColorStatusOptions = [
  {blue: theme.palette['blue-600']},
  {grey: theme.palette['grey-500']},
  {red: theme.palette['red-600']},
  {green: theme.palette['green-600']},
  {yellow: theme.palette['yellow-600']},
  {pink: theme.palette['pink-600']},
  {mars: theme.palette['mars-600']},
  {orange: theme.palette['orange-600']},
  {fern: theme.palette['fern-600']},
  {cyan: theme.palette['cyan-600']},
  {purple: theme.palette['purple-600']},
  {violet: theme.palette['violet-600']},
];


export default {
  title: 'Components/Pills',
  parameters: {
    docs: { page: mdx },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 12 }}>
          {Story()}
      </div>
    ),
  ],
  component: Status,
};

export const StatusBasic =  (args) => {
  
    return(
      <React.Fragment>
        <div style={{ padding: 24 }}>
          <Status {...args}/>
        </div>
      </React.Fragment>
    );
  };
// StatusBasic.storyName="Status";
StatusBasic.args = {
  type:typeOptions.default,
  color:customColorStatusOptions[1].grey,
  label:'Draft',
}
StatusBasic.argTypes = {
  type:{
    options:[ 'default', 'primary', 'success', 'warning', 'danger', 'customStatus'],
    control: {
      type: 'select',
      labels:typeOptions,
    },
    defaultValue:"default",
  },
  className:{control:''},
  color:{
    options:['blue','grey','red','green','yellow','pink','mars','orange','fern','cyan','purple','violet'],
    control: {
      type: 'select',
      labels:customColorStatusOptions,
    },
    defaultValue:customColorStatusOptions[1],
  },
}

export const pillSmall = (args) => {
    const shapes = {
      'Default Round': TagShape.SMALL_ROUND,
      'Default Square': TagShape.SMALL_SQUARE,
    };
    const shape = shapes['Default Round'];
    const colors =  customColorOptions.grey;
    const disabled = 'Disable';

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
          <Tags {...args} tagShape={shape} selected={thisTag} disabled={disabled} />
        </div>
      </React.Fragment>
    );
  };

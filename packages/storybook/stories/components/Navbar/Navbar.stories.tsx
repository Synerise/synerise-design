import React from 'react';

import type { StoryObj, Meta } from '@storybook/react-webpack5';

import Navbar from '@synerise/ds-navbar';

import { theme }from '@synerise/ds-core';
import { IconAlert } from '@synerise/ds-alert';
import Button from '@synerise/ds-button';
import { UserAvatar } from '@synerise/ds-avatar';
import Icon, { Add3M, AngleDownS, BookM, HelpM, NotificationsActiveM } from '@synerise/ds-icon';

import {
  centeredPaddedWrapper,
  CLASSNAME_ARG_CONTROL,
  REACT_NODE_AS_STRING,
  controlFromOptionsArray,
  reactNodeAsSelect,
} from '../../utils';

const COLOR_OPTIONS = {
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


export default {
  title: "Components/Navbar",
  tags: ['autodocs'],
  component: Navbar,
  decorators: [centeredPaddedWrapper],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    description: REACT_NODE_AS_STRING,
    logo: REACT_NODE_AS_STRING,
    color: {
      ...controlFromOptionsArray('select', Object.keys(COLOR_OPTIONS)),
      mapping: COLOR_OPTIONS
    },
    additionalNodes: { ...reactNodeAsSelect([ 'Buttons', 'None'], {
        Buttons: [<>
          <Button type="ghost-white" mode="single-icon">
            <Icon component={<Add3M />} color={theme.palette.white} />
          </Button>
          <Button type="ghost-white" mode="single-icon">
            <Icon component={<BookM />} color={theme.palette.white} />
          </Button>
          <Button type="ghost-white" mode="single-icon">
            <Icon component={<HelpM />} color={theme.palette.white} />
          </Button>
          <Button type="ghost-white" mode="single-icon">
            <Icon component={<NotificationsActiveM />} color={theme.palette.white} />
          </Button>
        </>,
<div>
  <Button mode="label-icon" type="ghost-white" >
    Button
    <Icon component={<AngleDownS />} />
  </Button>
</div>,],
        None: undefined,
      })
    },
    alertNotification:{ ...reactNodeAsSelect([ 'iconAlert', 'None'], {
      iconAlert: <React.Fragment>
        <IconAlert iconAlert={true} message="Trial - Expire in 12 days." type="info" />
        <Button type="tertiary-white">Button</Button>
      </React.Fragment>,
      None: undefined,
    })
    },
    actions: { ...reactNodeAsSelect([ 'Avatar', 'None'], {
        Avatar: <Button type="ghost" mode="single-icon">
          <UserAvatar text="AK" size="small" />
        </Button>,
        None: undefined,
      })
    },
  },
} as Meta<typeof Navbar>;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    description: 'Module name',
    color: 'blue',
    alertNotification: 'iconAlert',
    actions: 'Avatar',
    additionalNodes: 'Buttons',
  },
};
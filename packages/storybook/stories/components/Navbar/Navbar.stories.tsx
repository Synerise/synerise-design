import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconAlert } from '@synerise/ds-alert';
import { UserAvatar } from '@synerise/ds-avatar';
import Button from '@synerise/ds-button';
import Icon, {
  Add3M,
  AngleDownS,
  BookM,
  HelpM,
  NotificationsActiveM,
} from '@synerise/ds-icon';
import Navbar from '@synerise/ds-navbar';
import { customColors } from '@synerise/ds-tokens/names';

import {
  CLASSNAME_ARG_CONTROL,
  REACT_NODE_AS_STRING,
  centeredPaddedWrapper,
  controlFromOptionsArray,
  reactNodeAsSelect,
} from '../../utils';

const COLOR_OPTIONS = {
  blue: customColors.blue['600'],
  grey: customColors.grey['600'],
  red: customColors.red['600'],
  green: customColors.green['600'],
  yellow: customColors.yellow['600'],
  pink: customColors.pink['600'],
  mars: customColors.mars['600'],
  orange: customColors.orange['600'],
  fern: customColors.fern['600'],
  cyan: customColors.cyan['600'],
  purple: customColors.purple['600'],
  violet: customColors.violet['600'],
};

export default {
  title: 'Components/Navbar',
  tags: ['autodocs'],
  component: Navbar,
  decorators: [centeredPaddedWrapper],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    description: REACT_NODE_AS_STRING,
    logo: REACT_NODE_AS_STRING,
    color: {
      ...controlFromOptionsArray('select', Object.keys(COLOR_OPTIONS)),
      mapping: COLOR_OPTIONS,
    },
    additionalNodes: {
      ...reactNodeAsSelect(['Buttons', 'None'], {
        Buttons: [
          <>
            <Button type="ghost-white" mode="single-icon">
              <Icon
                component={<Add3M />}
                color={'var(--ds-color-icon-onsolid-default)'}
              />
            </Button>
            <Button type="ghost-white" mode="single-icon">
              <Icon
                component={<BookM />}
                color={'var(--ds-color-icon-onsolid-default)'}
              />
            </Button>
            <Button type="ghost-white" mode="single-icon">
              <Icon
                component={<HelpM />}
                color={'var(--ds-color-icon-onsolid-default)'}
              />
            </Button>
            <Button type="ghost-white" mode="single-icon">
              <Icon
                component={<NotificationsActiveM />}
                color={'var(--ds-color-icon-onsolid-default)'}
              />
            </Button>
          </>,
          <div>
            <Button mode="label-icon" type="ghost-white">
              Button
              <Icon component={<AngleDownS />} />
            </Button>
          </div>,
        ],
        None: undefined,
      }),
    },
    alertNotification: {
      ...reactNodeAsSelect(['iconAlert', 'None'], {
        iconAlert: (
          <React.Fragment>
            <IconAlert
              iconAlert={true}
              message="Trial - Expire in 12 days."
              type="info"
            />
            <Button type="tertiary-white">Button</Button>
          </React.Fragment>
        ),
        None: undefined,
      }),
    },
    actions: {
      ...reactNodeAsSelect(['Avatar', 'None'], {
        Avatar: (
          <Button type="ghost" mode="single-icon">
            <UserAvatar text="AK" size="small" />
          </Button>
        ),
        None: undefined,
      }),
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

import React from 'react';

import type { StoryObj, Meta } from '@storybook/react-webpack5';

import Footer from '@synerise/ds-footer';
import Button from '@synerise/ds-button';
import Icon, { AcademyM, ChatM, LifebuoyM } from '@synerise/ds-icon';

import {
  CLASSNAME_ARG_CONTROL,
  footerWrapper,
} from '../../utils';


export default {
  title: "Components/Footer",
  tags: ['autodocs'],
  component: Footer,
  decorators: [footerWrapper],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
  },
} as Meta<typeof Footer>;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  render: () => (
    <Footer>
      <Button type="ghost" mode="icon-label">
        <Icon component={<AcademyM />} /> Help
      </Button>
      <Button type="ghost" mode="icon-label">
        <Icon component={<ChatM />} /> Leave feedback
      </Button>
      <Button type="ghost" mode="icon-label">
        <Icon component={<LifebuoyM />} /> Contact support
      </Button>
    </Footer>
  ),
};
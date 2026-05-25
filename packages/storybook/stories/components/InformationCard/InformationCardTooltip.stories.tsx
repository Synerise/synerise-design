import React from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';
import Button from '@synerise/ds-button';
import { InformationCardTooltip } from '@synerise/ds-information-card';
import type { InformationCardTooltipProps } from '@synerise/ds-information-card';

import { centeredPaddedWrapper } from '../../utils';
import { CompleteExample } from './InformationCard.stories';

export default {
  title: 'Components/InformationCard',
  component: InformationCardTooltip,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [centeredPaddedWrapper],
  args: {
    children: <Button type="primary">Button with infocard</Button>,
    informationCardProps: CompleteExample.args,
  },
} as Meta<InformationCardTooltipProps>;

type Story = StoryObj<InformationCardTooltipProps>;

export const DefaultStory: Story = {
  name: 'InformationCardTooltip',
  parameters: {
    docs: {
      source: {
        code: `<InformationCardTooltip
  informationCardProps={{
    title: 'Title',
    subtitle: 'Subtitle',
    icon: <SegmentM color="mars" />,
    iconColor: 'mars',
    avatarTooltipText: 'Tooltip Text',
    descriptionConfig: '...',
    actionsMenu: {
      items: ACTIONS_MENU_ITEMS,
      buttonLabel: 'Quick links',
      navigationLabel: 'Quick links',
    },
    propertyListItems: PROPERTIES_LIST,
    summaryItems: SUMMARY_ITEMS,
    actionButton: renderPreviewButton,
  }}
>
  <Button type="primary">Button with infocard</Button>
</InformationCardTooltip>`,
      },
    },
  },
};

export const InformationCardTooltipTopPlacement: Story = {
  args: {
    children: <Button type="primary">Button with infocard</Button>,
    popoverProps: {
      placement: 'top',
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<InformationCardTooltip
  informationCardProps={{
    title: 'Title',
    subtitle: 'Subtitle',
    icon: <SegmentM color="mars" />,
    iconColor: 'mars',
    avatarTooltipText: 'Tooltip Text',
    descriptionConfig: '...',
    actionsMenu: {
      items: ACTIONS_MENU_ITEMS,
      buttonLabel: 'Quick links',
      navigationLabel: 'Quick links',
    },
    propertyListItems: PROPERTIES_LIST,
    summaryItems: SUMMARY_ITEMS,
    actionButton: renderPreviewButton,
  }}
  popoverProps={{ placement: 'top' }}
>
  <Button type="primary">Button with infocard</Button>
</InformationCardTooltip>`,
      },
    },
  },
};

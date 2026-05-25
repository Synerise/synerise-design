import React from 'react';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';
import { SegmentM } from '@synerise/ds-icon';
import InformationCard, { buildExtraInfo } from '@synerise/ds-information-card';
import type { InformationCardProps } from '@synerise/ds-information-card';

import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  REACT_NODE_AS_STRING,
  STRING_CONTROL,
  THEME_PALETTE_COLOR_NAMES_CONTROL,
  controlFromOptionsArray,
} from '../../utils';
import {
  ACTIONS_MENU_ITEMS,
  PROPERTIES_LIST,
  PROPERTIES_LIST_LONG,
  SUMMARY_ITEMS,
  renderExternalLinkButton,
  renderPreviewButton,
} from './InformationCard.data';

const InformationCardMeta = {
  title: 'Components/InformationCard',
  component: InformationCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    asTooltip: BOOLEAN_CONTROL,
    isLoading: BOOLEAN_CONTROL,
    title: STRING_CONTROL,
    icon: REACT_NODE_AS_STRING,
    notice: REACT_NODE_AS_STRING,
    footerText: REACT_NODE_AS_STRING,
    className: CLASSNAME_ARG_CONTROL,
    iconColor: THEME_PALETTE_COLOR_NAMES_CONTROL,
    avatarTooltipText: STRING_CONTROL,
    subtitle: STRING_CONTROL,
    descriptionConfig: STRING_CONTROL,
    copyTooltip: STRING_CONTROL,
    actionButtonTooltipText: STRING_CONTROL,
    copiedTooltip: STRING_CONTROL,
    actionButtonCallback: {
      action: 'actionButtonCallback',
    },
  },
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    icon: <SegmentM color="mars" />,
    iconColor: 'mars',
    avatarTooltipText: 'Tooltip Text',
    descriptionConfig: {},
  },
} as Meta<InformationCardProps>;

type Story = StoryObj<InformationCardProps>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<InformationCard
  title="Title"
  subtitle="Subtitle"
  icon={<SegmentM color="mars" />}
  iconColor="mars"
  avatarTooltipText="Tooltip Text"
  descriptionConfig={{}}
/>`,
      },
    },
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<InformationCard isLoading />`,
      },
    },
  },
};

export const WithNotice: Story = {
  args: {
    notice: buildExtraInfo('Note: cannot be undone', 'warning'),
  },
  parameters: {
    docs: {
      source: {
        code: `<InformationCard
  title="Title"
  subtitle="Subtitle"
  icon={<SegmentM color="mars" />}
  iconColor="mars"
  avatarTooltipText="Tooltip Text"
  descriptionConfig={{}}
  notice={buildExtraInfo('Note: cannot be undone', 'warning')}
/>`,
      },
    },
  },
};

export const WithoutDescription: Story = {
  args: {
    descriptionConfig: null,
  },
  parameters: {
    docs: {
      source: {
        code: `<InformationCard
  title="Title"
  subtitle="Subtitle"
  icon={<SegmentM color="mars" />}
  iconColor="mars"
  avatarTooltipText="Tooltip Text"
  descriptionConfig={null}
/>`,
      },
    },
  },
};

export const Minimalistic: Story = {
  args: {
    renderBadge: null,
    descriptionConfig: null,
  },
  parameters: {
    docs: {
      source: {
        code: `<InformationCard
  title="Title"
  subtitle="Subtitle"
  icon={<SegmentM color="mars" />}
  iconColor="mars"
  avatarTooltipText="Tooltip Text"
  descriptionConfig={null}
  renderBadge={null}
/>`,
      },
    },
  },
};

export const CustomFooter: Story = {
  args: {
    renderFooter: () => <>Custom footer element</>,
  },
  parameters: {
    docs: {
      source: {
        code: `<InformationCard
  title="Title"
  subtitle="Subtitle"
  icon={<SegmentM color="mars" />}
  iconColor="mars"
  avatarTooltipText="Tooltip Text"
  descriptionConfig={{}}
  renderFooter={() => <>Custom footer element</>}
/>`,
      },
    },
  },
};

export const FooterText: Story = {
  args: {
    footerText: 'Footer Text',
    actionButton: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<InformationCard
  title="Title"
  subtitle="Subtitle"
  icon={<SegmentM color="mars" />}
  iconColor="mars"
  avatarTooltipText="Tooltip Text"
  descriptionConfig={{}}
  footerText="Footer Text"
  actionButton
/>`,
      },
    },
  },
};

export const ActionButton: Story = {
  args: {
    actionButton: true,
    actionButtonCallback: fn(),
    actionButtonTooltipText: 'Action Button Tooltip Text',
  },
  parameters: {
    docs: {
      source: {
        code: `<InformationCard
  title="Title"
  subtitle="Subtitle"
  icon={<SegmentM color="mars" />}
  iconColor="mars"
  avatarTooltipText="Tooltip Text"
  descriptionConfig={{}}
  actionButton
  actionButtonCallback={() => {}}
  actionButtonTooltipText="Action Button Tooltip Text"
/>`,
      },
    },
  },
};

export const CustomActionButton: Story = {
  argTypes: {
    actionButton: {
      ...controlFromOptionsArray('inline-radio', ['external link', 'preview']),
      mapping: {
        'external link': renderExternalLinkButton,
        preview: renderPreviewButton,
      },
    },
  },
  args: {
    actionButton: renderPreviewButton,
  },
  parameters: {
    docs: {
      source: {
        code: `<InformationCard
  title="Title"
  subtitle="Subtitle"
  icon={<SegmentM color="mars" />}
  iconColor="mars"
  avatarTooltipText="Tooltip Text"
  descriptionConfig={{}}
  actionButton={renderPreviewButton}
/>`,
      },
    },
  },
};

export const CompleteExample: Story = {
  argTypes: {
    actionButton: {
      ...controlFromOptionsArray('inline-radio', ['external link', 'preview']),
      mapping: {
        'external link': renderExternalLinkButton,
        preview: renderPreviewButton,
      },
    },
  },
  args: {
    ...InformationCardMeta.args,
    descriptionConfig:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et risus ut lacus pulvinar tristique ac quis mi. Nulla sem ex, finibus ac neque et, ultricies fermentum sapien.',
    actionsMenu: {
      items: ACTIONS_MENU_ITEMS,
      buttonLabel: 'Quick links',
      navigationLabel: 'Quick links',
    },
    propertyListItems: PROPERTIES_LIST,
    summaryItems: SUMMARY_ITEMS,
    actionButton: renderPreviewButton,
  },
  parameters: {
    docs: {
      source: {
        code: `<InformationCard
  title="Title"
  subtitle="Subtitle"
  icon={<SegmentM color="mars" />}
  iconColor="mars"
  avatarTooltipText="Tooltip Text"
  descriptionConfig="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et risus ut lacus pulvinar tristique ac quis mi. Nulla sem ex, finibus ac neque et, ultricies fermentum sapien."
  actionsMenu={{
    items: ACTIONS_MENU_ITEMS,
    buttonLabel: 'Quick links',
    navigationLabel: 'Quick links',
  }}
  propertyListItems={PROPERTIES_LIST}
  summaryItems={SUMMARY_ITEMS}
  actionButton={renderPreviewButton}
/>`,
      },
    },
  },
};

export const PropertyListOverflow: Story = {
  ...CompleteExample,
  args: {
    ...CompleteExample.args,
    propertyListItems: PROPERTIES_LIST_LONG,
  },
  parameters: {
    docs: {
      source: {
        code: `<InformationCard
  title="Title"
  subtitle="Subtitle"
  icon={<SegmentM color="mars" />}
  iconColor="mars"
  avatarTooltipText="Tooltip Text"
  descriptionConfig="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et risus ut lacus pulvinar tristique ac quis mi. Nulla sem ex, finibus ac neque et, ultricies fermentum sapien."
  actionsMenu={{
    items: ACTIONS_MENU_ITEMS,
    buttonLabel: 'Quick links',
    navigationLabel: 'Quick links',
  }}
  propertyListItems={PROPERTIES_LIST_LONG}
  summaryItems={SUMMARY_ITEMS}
  actionButton={renderPreviewButton}
/>`,
      },
    },
  },
};

export default InformationCardMeta;

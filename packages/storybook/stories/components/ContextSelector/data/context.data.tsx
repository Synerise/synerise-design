import React from 'react';
import { ApiM, FolderM, FormM, MegaphoneM, SegmentM, WebhookM } from '@synerise/ds-icon';
import type { ContextItem } from '@synerise/ds-context-selector';

import InformationCard from '@synerise/ds-information-card';

export const CONTEXT_TEXTS = {
  buttonLabel: 'Choose',
  searchPlaceholder: 'Search',
  noResults: 'No results',
  loadingResults: 'Loading results',
  showMore: 'Show more',
  recentItemsGroupName: 'Recent',
  allItemsGroupName: 'Items'
};

export const CONTEXT_GROUPS = [
  {
    id: 'RECENT',
    name: 'Recent',
    defaultGroup: true,
  },
  {
    id: 'ALL',
    name: 'All',
    defaultGroup: false,
    subGroups: [
      {
        name: 'Schema builder',
        id: 'SCHEMA_BUILDER',
        icon: <FolderM />,
        groupName: 'Internal apps',
      },
      {
        name: 'Campaigns',
        id: 'CAMPAIGNS',
        icon: <FolderM />,
        groupName: 'Internal apps',
      },
    ],
  },
];
const infocardProps = {
  title: 'Title',
  subtitle: 'Subtitle',
  icon: <SegmentM color="mars" />,
  iconColor: 'mars',
  avatarTooltipText: 'Tooltip Text',
  descriptionConfig: {},
};

export const generateInfoCard = (item: ContextItem) => {
  const randomCount = <span className="chromatic-ignore">{Math.floor(Math.random() * 100)}</span>;
  return {
    ...item,
    renderHoverTooltip: () => (
      <InformationCard
        icon={item.icon}
        title={item.name}
        subtitle={item.subtitle}
        renderAdditionalDescription={item.renderAdditionalDescription}
        propertyListItems={[{ label: 'Count', value: randomCount }]}
        descriptionConfig={item.description ? { label: item.description, disabled: true } : undefined}
        {...item.informationCardProps}
      />
    ),
  };
};

const CONTEXT_ITEMS_DATA = [
  {
    name: 'Schema builder app',
    id: 'SCHEMA_BUILDER_APP',
    icon: <ApiM />,
    groupId: 'RECENT',
    groupName: 'Internal apps',
    subtitle: 'Infocard Subtitle',
  },
  {
    name: 'Unnamed schema',
    id: '1234-1234-1234-1234321',
    icon: <FormM />,
    groupId: 'RECENT',
    groupName: 'Internal apps',
    disabled: true,
  },
  {
    name: 'Catalogs',
    id: '1234-1234-1234-1236321',
    icon: <ApiM />,
    groupId: 'RECENT',
    groupName: 'Internal apps',
    disabled: true,
  },
  {
    name: 'Business profile',
    id: '1234-1234-1234-1235321',
    icon: <ApiM />,
    groupId: 'RECENT',
    groupName: 'Internal apps',
  },
  {
    name: 'Mobile',
    id: '1234-1234-1234-12373213',
    icon: <MegaphoneM />,
    groupId: 'RECENT',
    groupName: 'Internal apps',
  },
  {
    name: 'Slack',
    id: '1234-1234-1234-1238333',
    icon: <WebhookM />,
    groupId: 'RECENT',
    groupName: 'Integrations',
  },
  {
    name: 'Github',
    id: '1234-1234-1234-12123123',
    icon: <WebhookM />,
    groupId: 'RECENT',
    groupName: 'Integrations',
  },
  {
    name: 'Booking.com',
    id: '1234-1234-1234-122312311',
    icon: <WebhookM />,
    groupId: 'RECENT',
    groupName: 'Integrations',
  },
  {
    name: 'Schema builder app',
    id: 'SCHEMA_BUILDER_APP',
    icon: <ApiM />,
    groupId: 'SCHEMA_BUILDER',
    groupName: 'Internal apps',
  },
  {
    name: 'Schema 1',
    id: 'schema_1',
    icon: <FormM />,
    groupId: 'SCHEMA_BUILDER',
  },
  {
    name: 'Schema 2',
    id: 'schema_2',
    icon: <FormM />,
    groupId: 'SCHEMA_BUILDER',
  },
  {
    name: 'Schema 3',
    id: 'schema_3',
    icon: <FormM />,
    groupId: 'SCHEMA_BUILDER',
  },
  {
    name: 'Schema 4',
    id: 'schema_4',
    icon: <FormM />,
    groupId: 'SCHEMA_BUILDER',
  },
  {
    name: 'Schema 5',
    id: 'schema_5',
    icon: <FormM />,
    groupId: 'SCHEMA_BUILDER',
  },
  {
    name: 'Unnamed schema',
    id: '1234-1234-1234-1234',
    icon: <FormM />,
    groupId: 'SCHEMA_BUILDER',
    groupName: 'Internal apps',
  },
  {
    name: 'Catalogs',
    id: '1234-1234-1234-1236321',
    icon: <ApiM />,
    groupName: 'Internal apps',
  },
  {
    name: 'Catalog 1',
    id: 'catalog_1',
    icon: <ApiM />,
    groupId: 'CAMPAIGNS',
  },
  {
    name: 'Catalog 2',
    id: 'catalog_2',
    icon: <ApiM />,
    groupId: 'CAMPAIGNS',
  },
  {
    name: 'Business profile',
    id: '1234-1234-1234-1235',
    icon: <ApiM />,
    groupName: 'Internal apps',
    groupId: 'ALL',
  },
  {
    name: 'Mobile',
    id: '1234-1234-1234-1237',
    icon: <MegaphoneM />,
    groupName: 'Internal apps',
    groupId: 'ALL',
  },
  {
    name: 'Slack',
    subtitle: 'Desktop App',
    id: '1234-1234-1234-1238',
    icon: <WebhookM />,
    groupName: 'Integrations',
    groupId: 'ALL',
  },
  {
    name: 'Github',
    subtitle: 'Website',
    id: '1234-1234-1234-12123',
    icon: <WebhookM />,
    groupName: 'Integrations',
    groupId: 'ALL',
  },
  {
    name: 'Booking.com',
    subtitle: 'Website',
    id: '1234-1234-1234-1223123',
    icon: <WebhookM />,
    groupName: 'Integrations',
    groupId: 'ALL',
  },
];

export const CONTEXT_ITEMS = CONTEXT_ITEMS_DATA.map(generateInfoCard);

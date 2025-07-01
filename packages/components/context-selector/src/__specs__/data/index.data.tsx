import React from 'react';

import { ApiM, FolderM, FormM, MegaphoneM, WebhookM } from '@synerise/ds-icon';

export const CONTEXT_TEXTS = {
  buttonLabel: 'Choose',
  searchPlaceholder: 'Search',
  noResults: 'No results',
  showMore: 'Show more',
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

export const CONTEXT_ITEMS = [
  {
    name: 'Schema builder app',
    id: 'SCHEMA_BUILDER_APP',
    icon: <ApiM />,
    groupId: 'RECENT',
    groupName: 'Internal apps',
  },
  {
    name: 'Unnamed schema',
    id: '1234-1234-1234-1234321',
    icon: <FormM />,
    groupId: 'RECENT',
    groupName: 'Internal apps',
  },
  {
    name: 'Catalogs',
    id: '1234-1234-1234-1236321',
    icon: <ApiM />,
    groupId: 'RECENT',
    groupName: 'Internal apps',
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
    name: 'Catalog 3',
    id: 'catalog_3',
    icon: <ApiM />,
    groupId: 'CAMPAIGNS',
  },
  {
    name: 'Catalog 4',
    id: 'catalog_4',
    icon: <ApiM />,
    groupId: 'CAMPAIGNS',
  },
  {
    name: 'Catalog 5',
    id: 'catalog_5',
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
    id: '1234-1234-1234-1238',
    icon: <WebhookM />,
    groupName: 'Integrations',
    groupId: 'ALL',
  },
  {
    name: 'Github',
    id: '1234-1234-1234-12123',
    icon: <WebhookM />,
    groupName: 'Integrations',
    groupId: 'ALL',
  },
  {
    name: 'Booking.com',
    id: '1234-1234-1234-1223123',
    icon: <WebhookM />,
    groupName: 'Integrations',
    groupId: 'ALL',
  },
];

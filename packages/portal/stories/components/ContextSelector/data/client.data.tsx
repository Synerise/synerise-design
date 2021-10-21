import {
  AggregateM,
  ApiM,
  ExpressionM,
  FolderM,
  NotificationsM,
  SegmentM,
  TagM,
  VarTypeNumberM,
  VarTypeStringM,
} from '@synerise/ds-icon';
import * as React from 'react';

export const CONTEXT_CLIENT_GROUPS = [
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
        name: 'Segmentations',
        id: 'SEGMENTATIONS',
        icon: <FolderM />,
        groupName: 'Parameters',
      },
      {
        name: 'Tags',
        id: 'TAGS',
        icon: <FolderM />,
        groupName: 'Parameters',
      },
      {
        name: 'Attributes',
        id: 'ATTRIBUTES',
        icon: <FolderM />,
        groupName: 'Parameters',
      },
      {
        name: 'Expressions',
        id: 'EXPRESSIONS',
        icon: <FolderM />,
        groupName: 'Parameters',
      },
      {
        name: 'Aggregates',
        id: 'AGGREGATES',
        icon: <FolderM />,
        groupName: 'Parameters',
      },
      {
        name: 'Client Events',
        id: 'CLIENT_EVENTS',
        icon: <FolderM />,
        groupName: 'Activity',
      },
      {
        name: 'Integrations',
        id: 'INTEGRATIONS',
        icon: <FolderM />,
        groupName: 'Activity',
      },
      {
        name: 'Apps',
        id: 'APPS',
        icon: <FolderM />,
        groupName: 'Activity',
      },
    ],
  },
];

const segmentations = [...Array(20)].map((_, i) => ({
  name: `Segmentation ${i}`,
  id: `segmentation_${i}`,
  icon: <SegmentM />,
  groupId: 'SEGMENTATIONS',
}));
const tags = [...Array(20)].map((_, i) => ({
  name: `Tag ${i}`,
  id: `tag_${i}`,
  icon: <TagM />,
  groupId: 'TAGS',
}));
const attributes = [...Array(20)].map((_, i) => ({
  name: `Attribute ${i}`,
  id: `attribute_${i}`,
  icon: <VarTypeStringM />,
  groupId: 'ATTRIBUTES',
}));
const expressions = [...Array(20)].map((_, i) => ({
  name: `Expression ${i}`,
  id: `expression_${i}`,
  icon: <ExpressionM />,
  groupId: 'EXPRESSIONS',
}));
const aggregates = [...Array(20)].map((_, i) => ({
  name: `Aggregate ${i}`,
  id: `aggregate_${i}`,
  icon: <AggregateM />,
  groupId: 'AGGREGATES',
}));
const clientEvents = [...Array(20)].map((_, i) => ({
  name: `Client event ${i}`,
  id: `client_event_${i}`,
  icon: <NotificationsM />,
  groupId: 'CLIENT_EVENTS',
}));
const integrations = [...Array(20)].map((_, i) => ({
  name: `Integration ${i}`,
  id: `integration_${i}`,
  icon: <NotificationsM />,
  groupId: 'INTEGRATIONS',
}));
const apps = [...Array(20)].map((_, i) => ({
  name: `App ${i}`,
  id: `app_${i}`,
  icon: <ApiM />,
  groupId: 'APPS',
}));
export const CONTEXT_CLIENT_ITEMS = [
  {
    name: 'Pricelist 02',
    id: 0,
    icon: <SegmentM />,
    groupId: 'RECENT',
    groupName: 'Parameters',
  },
  {
    name: 'Retail',
    id: 1,
    icon: <TagM />,
    groupId: 'RECENT',
    groupName: 'Parameters',
  },
  {
    name: 'First name',
    id: 2,
    icon: <VarTypeStringM />,
    groupId: 'RECENT',
    groupName: 'Parameters',
  },
  {
    name: 'Churn',
    id: 3,
    icon: <VarTypeNumberM />,
    groupId: 'RECENT',
    groupName: 'Parameters',
  },
  {
    name: 'App score',
    id: 4,
    icon: <AggregateM />,
    groupId: 'RECENT',
    groupName: 'Parameters',
  },
  {
    name: 'Page visit',
    id: 5,
    icon: <NotificationsM />,
    groupId: 'RECENT',
    groupName: 'Activity',
  },
  {
    name: 'Transaction charge',
    id: 6,
    icon: <NotificationsM />,
    groupId: 'RECENT',
    groupName: 'Activity',
  },
  {
    name: 'Product buy',
    id: 7,
    icon: <NotificationsM />,
    groupId: 'RECENT',
    groupName: 'Activity',
  },
  {
    name: 'Custom event',
    id: 8,
    icon: <NotificationsM />,
    groupId: 'RECENT',
    groupName: 'Activity',
  },
  {
    name: 'Automation started',
    id: 9,
    icon: <NotificationsM />,
    groupId: 'RECENT',
    groupName: 'Activity',
  },
  ...attributes,
  ...expressions,
  ...aggregates,
  ...apps,
  ...tags,
  ...segmentations,
  ...clientEvents,
  ...integrations,
];

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
import React from 'react';

export const CONTEXT_DEFAULT_GROUPS = [
  {
    id: 'ALL',
    name: 'All',
    defaultGroup: true,
  },
  {
    id: 'CLIENT_EVENTS',
    name: 'Events',
  },
  {
    id: 'PROFILE',
    name: 'Profile',
    subGroups: [
      {
        name: 'Segmentations',
        id: 'SEGMENTATIONS',
        icon: <FolderM />,
      },
      {
        name: 'Tags',
        id: 'TAGS',
        icon: <FolderM />,
      },
      {
        name: 'Attributes',
        id: 'ATTRIBUTES',
        icon: <FolderM />,
      },
      {
        name: 'Specials',
        id: 'SPECIALS',
        icon: <FolderM />,
      },
      {
        name: 'Expressions',
        id: 'EXPRESSIONS',
        icon: <FolderM />,
      },
      {
        name: 'Aggregates',
        id: 'AGGREGATES',
        icon: <FolderM />,
      },
    ],
  },
];

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

const MATCHING_SEARCH_QUERY = `Matches search query`;

const segmentations = [
  ...[...Array(2000)].map((_, i) => ({
    name: `Segmentation ${i}`,
    id: `segmentation_${i}`,
    icon: <SegmentM />,
    groupId: 'SEGMENTATIONS',
  })),
  { name: MATCHING_SEARCH_QUERY, id: `segmentation_matching`, icon: <SegmentM />, groupId: 'SEGMENTATIONS' },
];
const tags = [
  ...[...Array(2000)].map((_, i) => ({
    name: `Tag ${i}`,
    id: `tag_${i}`,
    icon: <TagM />,
    groupId: 'TAGS',
  })),
  { name: MATCHING_SEARCH_QUERY, id: `tag_matching`, icon: <TagM />, groupId: 'TAGS' },
];
const attributes = [
  ...[...Array(2000)].map((_, i) => ({
    name: `Attribute ${i}`,
    id: `attribute_${i}`,
    icon: <VarTypeStringM />,
    groupId: 'ATTRIBUTES',
  })),
  { name: MATCHING_SEARCH_QUERY, id: `attribute_matching`, icon: <VarTypeStringM />, groupId: 'ATTRIBUTES' },
];
const expressions = [
  ...[...Array(2000)].map((_, i) => ({
    name: `Expression ${i}`,
    id: `expression_${i}`,
    icon: <ExpressionM />,
    groupId: 'EXPRESSIONS',
  })),
  { name: MATCHING_SEARCH_QUERY, id: `expression_matching`, icon: <ExpressionM />, groupId: 'EXPRESSIONS' },
];
const aggregates = [
  ...[...Array(2000)].map((_, i) => ({
    name: `Aggregate ${i}`,
    id: `aggregate_${i}`,
    icon: <AggregateM />,
    groupId: 'AGGREGATES',
  })),
  { name: MATCHING_SEARCH_QUERY, id: `aggregate_matching`, icon: <AggregateM />, groupId: 'AGGREGATES' },
];
const clientEvents = [
  ...[...Array(2000)].map((_, i) => ({
    name: `Client event ${i}`,
    id: `client_event_${i}`,
    icon: <NotificationsM />,
    groupId: 'CLIENT_EVENTS',
  })),
  { name: MATCHING_SEARCH_QUERY, id: `client_event_matching`, icon: <NotificationsM />, groupId: 'CLIENT_EVENTS' },
];
const integrations = [...Array(2000)].map((_, i) => ({
  name: `Integration ${i}`,
  id: `integration_${i}`,
  icon: <NotificationsM />,
  groupId: 'INTEGRATIONS',
}));
const apps = [...Array(2000)].map((_, i) => ({
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

export const CONTEXT_DEFAULT_ITEMS = [
  ...attributes,
  ...expressions,
  ...aggregates,
  ...tags,
  ...segmentations,
  ...clientEvents,
];

export const FLAT_LIST_ITEMS = [
  ...attributes,
  ...expressions,
  ...aggregates,
  ...apps,
  ...tags,
  ...segmentations,
  ...clientEvents,
  ...integrations,
];

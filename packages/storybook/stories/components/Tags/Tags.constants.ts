import { theme } from '@synerise/ds-core';
import { InformationCardProps } from '@synerise/ds-information-card';
import { type TagProps } from '@synerise/ds-tag';

export const TAG_TEXTS = {
  clearTooltip: 'Clear',
  deleteTooltip: 'Delete',
  addButtonLabel: 'Add tag',
  manageLinkLabel: 'Manage tags',
  createTagButtonLabel: 'Add tag',
  searchPlaceholder: 'Search tag...',
  dropdownNoTags: 'No tags found',
};

export const TAG_PROP_CATEGORY = {
  table: {
    category: 'Tag Props',
  },
};
export const TAG_COLOR = theme.palette['fern-600'];

export const ALL_TAGS: Array<
  TagProps & { informationCardProps?: InformationCardProps }
> = [
  {
    id: '0',
    name: 'Tag Name 1',
    color: theme.palette['grey-200'],
    informationCardProps: {
      title: 'Tag Name 1',
      subtitle: 'de2ba6d0-8cb3-40f7-ad35-adc6b2406214',
      descriptionConfig:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et risus ut lacus pulvinar tristique ac quis mi. Nulla sem ex, finibus ac neque et, ultricies fermentum sapien.',
    },
  },
  {
    id: '1',
    name: 'Tag Name 2',
    color: theme.palette['grey-600'],
    informationCardProps: {
      title: 'Tag Name 2',
      subtitle: 'de2ba6d0-8cb3-40f7-ad35-adc6b2406214',
      descriptionConfig:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et risus ut lacus pulvinar tristique ac quis mi. Nulla sem ex, finibus ac neque et, ultricies fermentum sapien.',
    },
  },
  {
    id: '2',
    name: 'Tag Name 3',
    color: theme.palette['mars-600'],
    informationCardProps: {
      title: 'Tag Name 3',
      subtitle: 'de2ba6d0-8cb3-40f7-ad35-adc6b2406214',
      descriptionConfig:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et risus ut lacus pulvinar tristique ac quis mi. Nulla sem ex, finibus ac neque et, ultricies fermentum sapien.',
    },
  },
  {
    id: '3',
    name: 'Tag Name 4',
    color: theme.palette['blue-600'],
  },
  {
    id: '4',
    name: 'Tag Name 5',
    color: theme.palette['fern-600'],
  },
  {
    id: '5',
    name: 'Tag Name 6',
    color: theme.palette['yellow-600'],
  },
  {
    id: '6',
    name: 'Tag Name 7',
    color: theme.palette['grey-200'],
  },
  {
    id: '7',
    name: 'Tag Name 8',
    color: theme.palette['grey-200'],
  },
  {
    id: '8',
    name: 'Tag Name 9',
    color: theme.palette['grey-200'],
  },
  {
    id: '9',
    name: 'Tag Name 10',
    color: theme.palette['grey-200'],
  },
  {
    id: '10',
    name: 'Tag Name 11',
    color: theme.palette['grey-200'],
  },
  {
    id: '11',
    name: 'Search Tag Name',
    color: theme.palette['grey-200'],
  },
  {
    id: '12',
    name: 'Search',
    color: theme.palette['grey-200'],
  },
];

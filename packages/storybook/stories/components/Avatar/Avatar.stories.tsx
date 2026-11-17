import { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { fn } from 'storybook/test';

import type {
  AvatarProps,
  ObjectAvatarProps,
  UserAvatarProps,
} from '@synerise/ds-avatar';
import Avatar, {
  ObjectAvatar as ObjectAvatarComponent,
  UserAvatar as UserAvatarComponent,
} from '@synerise/ds-avatar';
import type { BadgeStatus } from '@synerise/ds-badge';
import Badge from '@synerise/ds-badge';
import Icon, {
  MailM,
  ObjectCatalogM,
  ObjectEmailM,
  ObjectSegmentationM,
  Thunder2M,
  UserCircleM,
} from '@synerise/ds-icon';
import type { SkeletonAvatarProps } from '@synerise/ds-skeleton';
import { SkeletonAvatar } from '@synerise/ds-skeleton';

import { AVATAR_IMAGE } from '../../constants';
import {
  BOOLEAN_CONTROL,
  controlFromOptionsArray,
  reactNodeAsSelect,
} from '../../utils';
import { NO_SNAPSHOT } from '../../utils/chromatic';
import { STATUSES } from '../Badge/constants';
import { backgroundColors, shapes, sizes } from './constants';

const commonArgs = {
  tooltip: { title: 'Silvia Jobs', description: 'silvia.jobs@example.com' },
  useImage: true,
};
const colorOptions = backgroundColors.filter((color) => color !== 'auto');
const skeletonParameters = { controls: { include: ['size', 'shape'] } };
const skeletonSizeControl = controlFromOptionsArray('inline-radio', [
  'S',
  'M',
  'L',
  'XL',
]);
type AvatarStoryType = AvatarProps & {
  useImage: boolean;
  useIcon: Boolean;
  badgeStatus: BadgeStatus;
};

export default {
  title: 'Components/Avatar/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      ...controlFromOptionsArray('inline-radio', sizes),

      defaultValue: 'medium',
    },
    shape: {
      ...controlFromOptionsArray('inline-radio', [...shapes]),
      defaultValue: 'circle',
    },
    badgeStatus: {
      ...controlFromOptionsArray('select', [...STATUSES]),
      defaultValue: 'active',
    },

    disabled: BOOLEAN_CONTROL,
    text: {
      control: 'text',
      defaultValue: '',
    },
    tooltip: {
      control: 'object',
      defaultValue: { title: '', description: '' },
    },
    onClick: fn,
    onError: fn,

    iconComponent: {
      ...reactNodeAsSelect(['none', 'UserCircleM', 'MailM', 'Thunder2M'], {
        none: null,
        Thunder2M: <Icon component={<Thunder2M />} />,
        UserCircleM: <Icon component={<UserCircleM />} />,
        MailM: <Icon component={<MailM />} />,
      }),
    },
  },
} as Meta<AvatarStoryType>;

export const Default: StoryObj<AvatarStoryType> = {
  render: ({ badgeStatus, useImage, ...args }) => (
    <Badge status={badgeStatus || 'active'}>
      <Avatar
        {...args}
        src={useImage ? AVATAR_IMAGE : undefined}
        iconComponent={args.iconComponent}
        hasStatus
      >
        JJ
      </Avatar>
    </Badge>
  ),
  parameters: { controls: { exclude: ['text'] } },
  argTypes: {
    useImage: BOOLEAN_CONTROL,
  },
  args: {
    ...commonArgs,
    useImage: true,
    iconComponent: <Icon component={<MailM />} />,
    badgeStatus: 'active',
  },
};

export const UserAvatar: StoryObj<UserAvatarProps> = {
  parameters: { ...NO_SNAPSHOT },
  render: ({ user, ...args }) => (
    <UserAvatarComponent {...args} user={{ ...user }} />
  ),
  args: {
    ...commonArgs,
    text: 'JJ',
    user: {
      firstName: 'Silvia',
      lastName: 'Jobs',
      email: 'silvia.jobs@example.com',
      avatarId: '1234',
    },
  },
};

export const UserAvatarSkeleton: StoryObj<SkeletonAvatarProps> = {
  render: (args) => <SkeletonAvatar {...args} />,
  parameters: skeletonParameters,
  argTypes: { size: skeletonSizeControl },
  args: {
    size: 'M',
  },
};

export const ObjectAvatar: StoryObj<ObjectAvatarProps> = {
  parameters: { ...NO_SNAPSHOT },
  render: (args) => <ObjectAvatarComponent {...args} />,
  argTypes: {
    color: controlFromOptionsArray('select', colorOptions),
    iconComponent: {
      ...reactNodeAsSelect(
        ['none', 'ObjectSegmentationM', 'ObjectEmailM', 'ObjectCatalogM'],
        {
          none: null,
          ObjectSegmentationM: <Icon component={<ObjectSegmentationM />} />,
          ObjectEmailM: <Icon component={<ObjectEmailM />} />,
          ObjectCatalogM: <Icon component={<ObjectCatalogM />} />,
        },
      ),
    },
  },
  args: {
    ...commonArgs,
    iconComponent: <Icon component={<ObjectSegmentationM />} />,
  },
};

export const ObjectAvatarSkeleton: StoryObj<SkeletonAvatarProps> = {
  render: (args) => <SkeletonAvatar {...args} />,
  parameters: skeletonParameters,
  argTypes: { size: skeletonSizeControl },
  args: {
    size: 'M',
    shape: 'square',
  },
};

const MATRIX_STATES = [
  { label: 'default', disabled: false },
  { label: 'disabled', disabled: true },
] as const;

const MATRIX_COLUMNS: {
  label: string;
  render: (props: UserAvatarProps & ObjectAvatarProps) => React.ReactNode;
}[] = [
  {
    label: 'User · icon',
    render: (props) => <UserAvatarComponent {...props} />,
  },
  {
    label: 'User · image',
    render: (props) => (
      <UserAvatarComponent {...props} user={{ avatar: AVATAR_IMAGE }} />
    ),
  },
  {
    label: 'User · text',
    render: (props) => (
      <UserAvatarComponent
        {...props}
        user={{ firstName: 'Bruno', lastName: 'Gold' }}
      />
    ),
  },
  {
    label: 'Object · icon',
    render: (props) => (
      <ObjectAvatarComponent
        {...props}
        iconComponent={<Icon component={<ObjectSegmentationM />} />}
      />
    ),
  },
  {
    label: 'Object · image',
    render: (props) => (
      <ObjectAvatarComponent {...props} object={{ avatar: AVATAR_IMAGE }} />
    ),
  },
  {
    label: 'Object · text',
    render: (props) => (
      <ObjectAvatarComponent {...props} object={{ name: 'Wardrobe' }} />
    ),
  },
  // hasTile frames an image; an icon is framed anyway and text keeps its own colour.
  {
    label: 'User · image · tile',
    render: (props) => (
      <UserAvatarComponent {...props} hasTile user={{ avatar: AVATAR_IMAGE }} />
    ),
  },
  {
    label: 'Object · image · tile',
    render: (props) => (
      <ObjectAvatarComponent
        {...props}
        hasTile
        object={{ avatar: AVATAR_IMAGE }}
      />
    ),
  },
];

const matrixLabelStyle = {
  fontSize: 11,
  color: 'var(--ds-color-text-base-subtle)',
};

export const AvatarMatrix: StoryObj = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `auto repeat(${MATRIX_COLUMNS.length}, 120px)`,
        gap: 24,
        alignItems: 'center',
        justifyItems: 'center',
        padding: 24,
      }}
    >
      <span />
      {MATRIX_COLUMNS.map(({ label }) => (
        <span key={label} style={matrixLabelStyle}>
          {label}
        </span>
      ))}
      {sizes.flatMap((size) =>
        MATRIX_STATES.map(({ label, disabled }) => (
          <React.Fragment key={`${size}-${label}`}>
            <span style={{ ...matrixLabelStyle, justifySelf: 'start' }}>
              {size} · {label}
            </span>
            {MATRIX_COLUMNS.map((column) => (
              <span key={column.label}>
                {column.render({ size, disabled, tooltip: false })}
              </span>
            ))}
          </React.Fragment>
        )),
      )}
    </div>
  ),
};

import React from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';
import AvatarGroup, { type AvatarGroupProps } from '@synerise/ds-avatar-group';
import { theme } from '@synerise/ds-core';
import Icon, { LockM, UserRemoveM } from '@synerise/ds-icon';
import Menu from '@synerise/ds-menu';

import { centeredPaddedWrapper } from '../../utils';
import { groupAvatars } from './mockData';

const VISIBLE_USERS = 3;
const MORE_INFO_LABEL = `+${groupAvatars.length - VISIBLE_USERS}`;

export default {
  title: 'Components/Avatar/Avatar group/Tests',
  component: AvatarGroup,
  tags: ['visualtests'],
  decorators: [centeredPaddedWrapper],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<AvatarGroupProps>;

type Story = StoryObj<AvatarGroupProps>;

const renderRowMenu = (user: (typeof groupAvatars)[number]) => (
  <Menu style={{ padding: '8px' }}>
    <Menu.Item
      prefixel={
        <Icon component={<LockM />} color={theme.palette['grey-600']} />
      }
    >
      User permission {user.id}
    </Menu.Item>
    <Menu.Item type="danger" prefixel={<Icon component={<UserRemoveM />} />}>
      Remove user
    </Menu.Item>
  </Menu>
);

/**
 * Opens the group modal so the member list — a `@synerise/ds-table-new`
 * `VirtualTable` — is actually rendered. The default AvatarGroup story never
 * opens the modal, and `ds-modal` renders nothing until it has been opened, so
 * without this story the table has no visual-regression coverage at all.
 */
export const OpenGroupModal: Story = {
  args: {
    size: 'medium',
    hasStatus: true,
    numberOfVisibleUsers: VISIBLE_USERS,
    dataSource: groupAvatars,
    moreInfoTooltip: 'more users',
    groupModal: {
      title: 'All users',
      listTitle: `${groupAvatars.length} customers`,
      okText: 'Apply',
      cancelText: 'Cancel',
      inviteText: 'Invite user',
      renderRowMenu,
      handleOk: () => {},
      handleInvite: () => {},
    },
  },
  play: async ({ canvasElement }) => {
    // the modal portals to document.body, so query from the parent element
    const canvas = within(canvasElement.parentElement!);

    // S.MoreInfo is a styled Avatar div, not a button, and the "+N" text sits in
    // an inner span with pointer-events: none. Dispatch on the span and let the
    // event bubble to the onClick on the wrapper.
    await userEvent.click(canvas.getByText(MORE_INFO_LABEL), {
      pointerEventsCheck: 0,
    });

    await waitFor(async () =>
      expect(await canvas.findByText('All users')).toBeVisible(),
    );

    const table = await canvas.findByTestId('ds-table-container');
    await waitFor(() => expect(table).toBeVisible());

    // every member is listed, not just the three untruncated avatars. Scope the
    // query to the table — these names also appear in the avatar tooltips, and
    // the fixture repeats some of them across rows.
    const inTable = within(table);
    await waitFor(() =>
      expect(table.querySelectorAll('.ds-table-row')).toHaveLength(
        groupAvatars.length,
      ),
    );
    expect(
      inTable.getAllByText(
        `${groupAvatars[0].firstname} ${groupAvatars[0].lastname}`,
      ).length,
    ).toBeGreaterThan(0);

    // each row carries its action button. The legacy column declared width: 72,
    // which grew to fit under antd's auto layout; table-new rows are
    // table-layout: fixed with overflow: hidden on the cell, so the visual
    // snapshot is what guards against the button being clipped.
    expect(table.querySelectorAll('.ds-table-row button').length).toBe(
      groupAvatars.length,
    );
  },
};

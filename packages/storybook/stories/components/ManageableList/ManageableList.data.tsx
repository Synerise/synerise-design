import React, { ReactElement, ReactNode } from 'react';
import { action } from 'storybook/actions';

import { faker } from '@faker-js/faker';
import Avatar from '@synerise/ds-avatar';
import Button from '@synerise/ds-button';
import { theme } from '@synerise/ds-core';
import { Dropdown } from '@synerise/ds-dropdown';
import Icon, {
  FolderM,
  InputM,
  PauseM,
  PlayM,
  ShowM,
  StopM,
} from '@synerise/ds-icon';
import { Input } from '@synerise/ds-input';
import ListItem from '@synerise/ds-list-item';
import Status from '@synerise/ds-status';
import Tag, { TagShape } from '@synerise/ds-tag';

import { avatar1 } from '../../constants';

export const TEXTS = {
  addItemLabel: 'Add position',
  showMoreLabel: 'show all',
  showLessLabel: 'show less',
  more: 'more',
  less: 'less',
  activateItemTitle:
    'By activating this filter, you will cancel your unsaved filter settings',
  activate: 'Activate',
  cancel: 'Cancel',
  deleteConfirmationTitle: 'Delete filter',
  deleteConfirmationDescription:
    'Deleting this filter will permanently remove it from templates library. All tables using this filter will be reset.',
  deleteLabel: 'Delete',
  moveToTopTooltip: 'Move to the top of list',
  moveToBottomTooltip: 'Move to the bottom of list',
};

export type ItemType = {
  id: string;
  name: string;
  canAdd?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
  icon: ReactNode;
};

export const ITEMS: ItemType[] = [
  {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Default',
    canAdd: true,
    canUpdate: false,
    canDelete: false,
    icon: <FolderM />,
    disabled: true,
  },
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Basic',
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    icon: <FolderM />,
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'My folder',
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    icon: <FolderM />,
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    name: 'My folder 2',
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    icon: <FolderM />,
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    name: 'My folder 3',
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    icon: <FolderM />,
  },
  {
    id: '00000000-0000-0000-0000-000000000005',
    name: 'My folder 4',
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    icon: <FolderM />,
  },
  {
    id: '00000000-0000-0000-0000-000000000006',
    name: 'My folder 5',
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    icon: <FolderM />,
  },
];
export const EMPTY_ITEM = (): ItemType => ({
  id: `${faker.number.int()}`,
  name: '',
  canAdd: true,
  canUpdate: true,
  canDelete: true,
  icon: <FolderM />,
});

const BASE_ITEM = (name?: string) => ({
  id: `${faker.number.int()}`,
  name: name || 'Content item',
  canUpdate: true,
  canDuplicate: true,
  canDelete: true,
});
const menuDataSource = [
  { text: 'Option 1' },
  { text: 'Option 2' },
  { text: 'Option 3' },
];
const DROPDOWN_MENU = (
  <Dropdown.MenuWrapper>
    {menuDataSource.map((item) => (
      <ListItem {...item} />
    ))}
  </Dropdown.MenuWrapper>
);

export type ContentItemType = {
  id: string;
  name: string;
  description?: ReactNode;
  canAdd?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
  hideHeaderSuffixOnHover?: boolean;
  icon?: ReactNode;
  tag?: ReactElement;
  dropdown?: ReactElement;
  content?: ReactNode;
  additionalSuffix?: ReactNode;
  headerSuffix?: ReactNode;
};
export type BlankItemType = {
  id: string;
  name: string;
};
export const CONTENT_ITEMS: ContentItemType[] = [
  {
    ...BASE_ITEM('With label'),
  },
  {
    ...BASE_ITEM('With tag and label'),
    tag: (
      <Tag
        name={'A'}
        shape={TagShape.SINGLE_CHARACTER_SQUARE}
        color={theme.palette['grey-200']}
        textColor={theme.palette['grey-500']}
      />
    ),
  },
  {
    ...BASE_ITEM('With icon'),
    icon: <FolderM />,
  },
  {
    ...BASE_ITEM('With tag, icon and expander'),
    icon: <FolderM />,
    content: (
      <Input
        label={'Label'}
        placeholder={'Placeholder'}
        style={{ width: '472px' }}
        resetMargin
      />
    ),
    tag: (
      <Tag
        name={'A'}
        shape={TagShape.SINGLE_CHARACTER_SQUARE}
        color={theme.palette['grey-200']}
        textColor={theme.palette['grey-500']}
      />
    ),
  },
  {
    ...BASE_ITEM('With dropdown'),
    description: 'An item with a dropdown menu',
    dropdown: DROPDOWN_MENU,
  },
  {
    ...BASE_ITEM('With custom suffix'),
    hideHeaderSuffixOnHover: true,
    headerSuffix: <Status label={'Draft'} type={'disabled'} />,
    dropdown: DROPDOWN_MENU,
    disabled: true,
  },
  {
    ...BASE_ITEM('With additional suffix'),
    additionalSuffix: (
      <Button
        type="ghost"
        mode="single-icon"
        onClick={action('additional button action')}
      >
        <Icon component={<ShowM />} />
      </Button>
    ),
  },
  {
    ...BASE_ITEM('With options'),
    icon: <FolderM />,
    dropdown: DROPDOWN_MENU,
  },
  {
    ...BASE_ITEM('With expander and options'),
    icon: <FolderM />,
    dropdown: DROPDOWN_MENU,
    content: (
      <Input
        label={'Label'}
        placeholder={'Placeholder'}
        style={{ width: '472px' }}
        resetMargin
      />
    ),
  },
];
const BASE_AUTOMATION_ITEM = (name?: string) => ({
  id: `${faker.number.int()}`,
  name: name || 'Content item',
  canDuplicate: true,
  canDelete: true,
});

const createTag = (label) => {
  return (
    <Tag
      name={label}
      asPill
      shape={TagShape.DEFAULT_ROUND}
      color={theme.palette['grey-200']}
      textColor={theme.palette['grey-500']}
    />
  );
};

export const CONTENT_ITEMS_AUTOMATION: ContentItemType[] = [
  {
    ...BASE_AUTOMATION_ITEM('Long name in some foreign language'),
    icon: <PauseM />,
    content: <>Content</>,
    tags: (
      <>
        {createTag('Mon 14:00, Wed 15:00, Sat 16:00, +4')} from{' '}
        {createTag('23 Aug 2024')} to {createTag('23 Aug 2024')}
      </>
    ),
  },
  {
    ...BASE_AUTOMATION_ITEM('Stop at'),
    icon: <StopM />,
    content: <>Content</>,
    tags: <>{createTag('23 Aug 2024')}</>,
  },
  {
    ...BASE_AUTOMATION_ITEM('Activate daily'),
    tags: (
      <>
        {createTag('14:00, 15:00, 16:00, +4')} from {createTag('23 Aug 2024')}
      </>
    ),
    icon: <PlayM />,
    content: <>Content</>,
  },
];
export const CONTENT_ITEMS_LARGE: ContentItemType[] = [
  {
    name: 'Name',
    id: '0001',
    uniqueKey: '#name',
    content: <>Some content</>,
    tags: (
      <>
        <Tag
          name="label"
          asPill
          shape={TagShape.DEFAULT_ROUND}
          color={theme.palette['grey-200']}
          textColor={theme.palette['grey-500']}
        />
        <Tag
          name={'label'}
          asPill
          shape={TagShape.DEFAULT_ROUND}
          color={theme.palette['grey-200']}
          textColor={theme.palette['grey-500']}
        />
        <Tag
          name={'label'}
          asPill
          shape={TagShape.DEFAULT_ROUND}
          color={theme.palette['grey-200']}
          textColor={theme.palette['grey-500']}
        />
      </>
    ),
    description:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur',
    headerPrefix: (
      <Avatar
        backgroundColor="orange"
        backgroundColorHue="100"
        shape="square"
        iconComponent={
          <Icon component={<InputM />} color={theme.palette['grey-800']} />
        }
      />
    ),
  },
  {
    name: 'Name',
    id: '0002',
    uniqueKey: '#name',
    content: <>Some content</>,
    tags: (
      <>
        <Tag
          name="label"
          asPill
          shape={TagShape.DEFAULT_ROUND}
          color={theme.palette['grey-200']}
          textColor={theme.palette['grey-500']}
        />
        <Tag
          name={'label'}
          asPill
          shape={TagShape.DEFAULT_ROUND}
          color={theme.palette['grey-200']}
          textColor={theme.palette['grey-500']}
        />
        <Tag
          name={'label'}
          asPill
          shape={TagShape.DEFAULT_ROUND}
          color={theme.palette['grey-200']}
          textColor={theme.palette['grey-500']}
        />
      </>
    ),
    headerPrefix: (
      <Avatar
        backgroundColor="orange"
        backgroundColorHue="100"
        shape="square"
        iconComponent={
          <Icon component={<InputM />} color={theme.palette['grey-800']} />
        }
      />
    ),
  },
  {
    name: 'Name',
    id: '0003',
    uniqueKey: '#name',
    content: <>Some content</>,
    tags: (
      <>
        <Tag
          name="label"
          asPill
          shape={TagShape.DEFAULT_ROUND}
          color={theme.palette['grey-200']}
          textColor={theme.palette['grey-500']}
        />
        <Tag
          name={'label'}
          asPill
          shape={TagShape.DEFAULT_ROUND}
          color={theme.palette['grey-200']}
          textColor={theme.palette['grey-500']}
        />
        <Tag
          name={'label'}
          asPill
          shape={TagShape.DEFAULT_ROUND}
          color={theme.palette['grey-200']}
          textColor={theme.palette['grey-500']}
        />
      </>
    ),
    description:
      'Neque porro quisquam est qui dolorem quisquam est qui dolorem ipsum quia dolor sit amet, consectetur qui dolorem ipsum quia dolor sit amet, consectetur',
    headerPrefix: (
      <Avatar
        backgroundColor="orange"
        backgroundColorHue="100"
        shape="square"
        iconComponent={
          <Icon component={<InputM />} color={theme.palette['grey-800']} />
        }
      />
    ),
  },
];

export const BLANK_DATA = [
  { name: 'test', id: '1' },
  { name: 'test 2', id: '2' },
];
export const renderBlankItem = (item: (typeof BLANK_DATA)[number]) => {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <div style={{ flex: '1 1 50%' }}>
        <Input resetMargin value={item.name} />
      </div>
      <div style={{ flex: '1 1 50%' }}>
        <Input resetMargin />
      </div>
    </div>
  );
};

export type FilterItemType = {
  id: string;
  name: string;
  created?: string;
  canAdd?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
  canDuplicate?: boolean;
  hideHeaderSuffixOnHover?: boolean;
  icon?: ReactNode;
  user?: Record<string, string>;
  description?: string;
  tag?: ReactElement;
  dropdown?: ReactElement;
  content?: ReactNode;
  additionalSuffix?: ReactNode;
  headerSuffix?: ReactNode;
};

export const FILTER_ITEMS: FilterItemType[] = [
  {
    ...BASE_ITEM('Position 0'),
    description: 'The last 10 days of all customers sales ',
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canDuplicate: true,
    user: {
      firstname: 'Jan',
      lastname: 'Nowak',
      avatar_url: avatar1,
    },
    created: '2020-02-14T08:50:05+00:00',
  },
  {
    ...BASE_ITEM('Position 1'),
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    user: {
      firstname: 'Jan',
      lastname: 'Nowak',
    },
    created: '2020-02-12T08:50:05+00:00',
  },
];

import React from 'react';
import { boolean } from '@storybook/addon-knobs';

import { FolderM } from '@synerise/ds-icon';
import Tag from '@synerise/ds-tags/dist/Tag/Tag';
import { TagShape } from '@synerise/ds-tags/dist/Tag/Tag.types';
import { Input } from '@synerise/ds-input';
import Status from '@synerise/ds-status';
import { DropdownMenu, DropdownMenuItem } from '@synerise/ds-manageable-list/dist/Item/FilterItem/FilterItem.styles';
import { theme } from '@synerise/ds-core';

const TEXT_PLACEHOLDER = 'Position';
export const withLabel = {
  id: '00000000-0000-0000-0000-000000000000',
  name: TEXT_PLACEHOLDER,
};
export const withIcon = {
  id: '00000000-0000-0000-0000-000000000002',
  name: TEXT_PLACEHOLDER,
  icon: <FolderM />,
};

export const withTagAndLabel = {
  id: '00000000-0000-0000-0000-000000000002',
  name: TEXT_PLACEHOLDER,
};

export const withContent = {
  id: '00000000-0000-0000-0000-000000000002',
  name: TEXT_PLACEHOLDER,
  canUpdate: true,
  canDelete: true,
  content: <Input label={'Label'} placeholder={'Placeholder'} style={{ width: '472px' }} resetMargin />,
  tag: (
    <Tag
      name={'A'}
      shape={TagShape.SINGLE_CHARACTER_SQUARE}
      color={theme.palette['grey-200']}
      textColor={theme.palette['grey-500']}
    />
  ),
};

export const withOptions = {
  id: '00000000-0000-0000-0000-000000000005',
  name: TEXT_PLACEHOLDER,
  icon: <FolderM />,
  headerSuffix: <Status label={'Draft'} type={'disabled'} />,
  dropdown: <DropdownMenu dataSource={[{ text: 'Option 1' }, { text: 'Option 2' }, { text: 'Option 3' }]} />,
};
export const withExpanderAndOptions = {
  id: '00000000-0000-0000-0000-000000000005',
  name: TEXT_PLACEHOLDER,
  icon: <FolderM />,
  dropdown: <DropdownMenu dataSource={[{ text: 'Option 1' }, { text: 'Option 2' }, { text: 'Option 3' }]} />,
  content: <Input label={'Label'} placeholder={'Placeholder'} style={{ width: '472px' }} resetMargin />,
};

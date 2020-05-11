import FolderM from '@synerise/ds-icon/dist/icons/FolderM';
import Tag, { TagShape } from '@synerise/ds-tags/dist/Tag/Tag';
import * as React from 'react';
import { Input } from '@synerise/ds-input';
import { DropdownMenu, DropdownMenuItem } from '@synerise/ds-manageable-list/dist/Item/FilterItem/FilterItem.styles';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

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
  dropdown: (
    <DropdownMenu>
      <DropdownMenuItem> Option 1</DropdownMenuItem>
      <DropdownMenuItem> Option 2 </DropdownMenuItem>
      <DropdownMenuItem> Option 3 </DropdownMenuItem>
    </DropdownMenu>
  ),
};
export const withExpanderAndOptions = {
  id: '00000000-0000-0000-0000-000000000005',
  name: TEXT_PLACEHOLDER,
  icon: <FolderM />,
  dropdown: (
    <DropdownMenu>
      <DropdownMenuItem
        onClick={(e)=>{e.stopPropagation();}}
      >
        Option 1
      </DropdownMenuItem>
      <DropdownMenuItem> Option 2 </DropdownMenuItem>
      <DropdownMenuItem> Option 3 </DropdownMenuItem>
    </DropdownMenu>
  ),
  content: <Input label={'Label'} placeholder={'Placeholder'} style={{ width: '472px' }} resetMargin />,
};

import * as React from 'react';
import { ActionProps } from '../Actions.types';
import Menu from '@synerise/ds-menu';
import Dropdown from '@synerise/ds-dropdown';
import Icon from '@synerise/ds-icon';
import {
  CloseM,
  CloseS,
  EditM,
  EditS,
  OptionHorizontalM,
  Settings2M,
  StarM,
  StarS, TrashM,
} from '@synerise/ds-icon/dist/icons';
import * as S from '../Actions.styles';
const ActionsDropdown: React.FC<ActionProps> = ({ onFavourite, onSettingsEnter, onEdit, onDelete }: ActionProps) => {
  return (
    <Dropdown
      overlay={
        <S.DropdownMenu>
          {!!onEdit && <S.DropdownMenuItem prefixel={<Icon component={<EditM />} />}> Edit </S.DropdownMenuItem>}
          {!!onDelete && (
            <S.DropdownMenuItem prefixel={<Icon component={<TrashM />} />} type={'danger'}>
              {' '}
              Delete{' '}
            </S.DropdownMenuItem>
          )}
          {!!onFavourite && (
            <S.DropdownMenuItem prefixel={<Icon component={<StarM />} />}> Favourite </S.DropdownMenuItem>
          )}
          {!!onSettingsEnter && (
            <S.DropdownMenuItem prefixel={<Icon component={<Settings2M />} />}> Favourite </S.DropdownMenuItem>
          )}
        </S.DropdownMenu>
      }
      trigger={'click' as const}
    >
      <Icon component={<OptionHorizontalM />} />
    </Dropdown>
  );
};

export default ActionsDropdown;

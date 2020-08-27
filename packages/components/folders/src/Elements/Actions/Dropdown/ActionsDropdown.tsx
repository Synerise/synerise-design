import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Icon from '@synerise/ds-icon';
import { EditM, OptionHorizontalM, Settings2M, StarFillM, StarM, TrashM } from '@synerise/ds-icon/dist/icons';
import { ActionProps } from '../Actions.types';
import * as S from '../Actions.styles';

const ActionsDropdown: React.FC<ActionProps> = ({
  onFavourite,
  onSettingsEnter,
  onEdit,
  onDelete,
  isFavourite,
}: ActionProps) => {
  return (
    <Dropdown
      placement="bottomRight"
      overlayStyle={{ boxShadow: '0 4px 12px 0 rgba(35, 41, 54, 0.07)' }}
      overlay={
        <S.DropdownMenu>
          {!!onEdit && (
            <S.DropdownMenuItem
              prefixel={<Icon component={<EditM />} />}
              onClick={(): void => {
                onEdit();
              }}
            >
              {' '}
              Edit{' '}
            </S.DropdownMenuItem>
          )}
          {!!onDelete && (
            <S.DropdownMenuItem
              prefixel={<Icon component={<TrashM />} />}
              type="danger"
              onClick={(): void => {
                onDelete();
              }}
            >
              Delete
            </S.DropdownMenuItem>
          )}
          {!!onFavourite && (
            <S.DropdownMenuItem
              className="favourite"
              prefixel={
                <S.FavouriteIconWrapper isFavourite={!!isFavourite}>
                  <Icon component={isFavourite ? <StarFillM /> : <StarM />} />
                </S.FavouriteIconWrapper>
              }
              onClick={(): void => {
                onFavourite();
              }}
            >
              {' '}
              Favourite{' '}
            </S.DropdownMenuItem>
          )}
          {!!onSettingsEnter && (
            <S.DropdownMenuItem
              prefixel={<Icon component={<Settings2M />} />}
              onClick={(): void => {
                onSettingsEnter();
              }}
            >
              {' '}
              Favourite{' '}
            </S.DropdownMenuItem>
          )}
        </S.DropdownMenu>
      }
    >
      <S.DropdownTrigger component={<OptionHorizontalM />} />
    </Dropdown>
  );
};

export default ActionsDropdown;

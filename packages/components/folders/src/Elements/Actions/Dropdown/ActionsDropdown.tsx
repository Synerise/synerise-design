import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Icon from '@synerise/ds-icon';
import { EditM, OptionHorizontalM, Settings2M, StarFillM, StarM, TrashM } from '@synerise/ds-icon/dist/icons';
import { ActionProps } from '../Actions.types';
import * as S from '../Actions.styles';
import { ClickParam } from 'antd/es/menu';

const ActionsDropdown: React.FC<ActionProps> = ({
  onFavourite,
  onSettingsEnter,
  onEdit,
  onDelete,
  isFavourite,
  dropdownMouseOut,
  dropdownMouseOver,
  texts,
}: ActionProps) => {
  return (
    <Dropdown
      placement="bottomRight"
      overlayStyle={{ boxShadow: '0 4px 12px 0 rgba(35, 41, 54, 0.07)' }}
      overlay={
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        <S.DropdownMenu
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          onMouseOver={dropdownMouseOver}
          onMouseOut={dropdownMouseOut}
        >
          {!!onEdit && (
            <S.DropdownMenuItem
              prefixel={<Icon component={<EditM />} />}
              onClick={(e: ClickParam): void => {
                e.domEvent.stopPropagation();
                onEdit();
              }}
            >
              {texts.edit}
            </S.DropdownMenuItem>
          )}
          {!!onDelete && (
            <S.DropdownMenuItem
              prefixel={<Icon component={<TrashM />} />}
              type="danger"
              onClick={(e: ClickParam): void => {
                e.domEvent.stopPropagation();
                onDelete();
              }}
            >
              {texts.delete}
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
              onClick={(e: ClickParam): void => {
                e.domEvent.stopPropagation();
                onFavourite();
              }}
            >
              {isFavourite ? texts.deleteFromFavourites : texts.addToFavourite}
            </S.DropdownMenuItem>
          )}
          {!!onSettingsEnter && (
            <S.DropdownMenuItem
              prefixel={<Icon component={<Settings2M />} />}
              onClick={(e: ClickParam): void => {
                e.domEvent.stopPropagation();
                onSettingsEnter();
              }}
            >
              {texts.enterSettings}
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

import React, { MouseEvent as ReactMouseEvent } from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { EditM, OptionHorizontalM, Settings2M, StarFillM, StarM, TrashM } from '@synerise/ds-icon';
import ListItem from '@synerise/ds-list-item';
import { NOOP } from '@synerise/ds-utils';

import { TagVisibility, TagsListItem } from '../../TagsList.types';

import Visibility, { CheckIcon } from './Visibility';

import { ActionProps } from './Actions.types';
import * as S from './Actions.styles';

const stopClickPropagation = (event: ReactMouseEvent<HTMLElement, MouseEvent>) => event.stopPropagation();

const Actions = ({
  onVisibilityChange = NOOP,
  onFavouriteChange,
  onSettingsEnter,
  onEdit,
  onDelete,
  onDropdownToggle = NOOP,
  item,
  texts,
  visible,
}: ActionProps) => {
  const { favourite } = item;

  const handleVisibilityChange = (visibility: TagVisibility, thisItem: TagsListItem) => {
    onVisibilityChange(visibility, thisItem);
    onDropdownToggle(false);
  };

  return (
    <Dropdown
      placement="bottomRight"
      trigger={['click']}
      onVisibleChange={onDropdownToggle}
      visible={visible}
      align={{ offset: [12, 16] }}
      overlay={
        <S.DropdownMenu data-testid="ds-tagslist-actionsmenu" onClick={stopClickPropagation}>
          <Visibility texts={texts} item={item} onVisibilityChange={handleVisibilityChange} />
          <ListItem type="divider" />
          {!!onFavouriteChange && (
            <S.DropdownMenuItem
              className="favourite"
              prefixel={
                <S.FavouriteIconWrapper favourite={!!favourite}>
                  <Icon component={favourite ? <StarFillM /> : <StarM />} />
                </S.FavouriteIconWrapper>
              }
              suffixel={favourite ? <CheckIcon /> : null}
              onClick={event => {
                event.domEvent.stopPropagation();
                onFavouriteChange();
                onDropdownToggle(false);
              }}
            >
              {favourite ? texts?.deleteFromFavourites : texts?.addToFavourite}
            </S.DropdownMenuItem>
          )}
          {!!onEdit && (
            <S.DropdownMenuItem
              prefixel={<Icon component={<EditM />} />}
              onClick={event => {
                event.domEvent.stopPropagation();
                onEdit();
                onDropdownToggle(false);
              }}
            >
              {texts?.edit}
            </S.DropdownMenuItem>
          )}
          {!!onSettingsEnter && (
            <S.DropdownMenuItem
              prefixel={<Icon component={<Settings2M />} />}
              onClick={event => {
                event.domEvent.stopPropagation();
                onSettingsEnter(event.domEvent);
                onDropdownToggle(false);
              }}
            >
              {texts?.enterSettings}
            </S.DropdownMenuItem>
          )}
          <ListItem type="divider" />
          {!!onDelete && (
            <S.DropdownMenuItem
              prefixel={<Icon component={<TrashM />} />}
              type="danger"
              onClick={event => {
                event.domEvent.stopPropagation();
                onDelete(item);
                onDropdownToggle(false);
              }}
            >
              {texts?.delete}
            </S.DropdownMenuItem>
          )}
        </S.DropdownMenu>
      }
    >
      <S.DropdownTrigger
        component={<OptionHorizontalM data-testid="ds-tagslist-actionsmenu-trigger" />}
        onClick={stopClickPropagation}
      />
    </Dropdown>
  );
};

export default Actions;

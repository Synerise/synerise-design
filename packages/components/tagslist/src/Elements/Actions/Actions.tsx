import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Icon from '@synerise/ds-icon';
import Menu from '@synerise/ds-menu';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { EditM, OptionHorizontalM, Settings2M, StarFillM, StarM, TrashM, CheckS } from '@synerise/ds-icon/dist/icons';
import { NOOP } from '@synerise/ds-utils';
import { ClickParam } from 'antd/es/menu';
import { ActionProps, VisibilityProps } from './Actions.types';
import { TagVisibility } from '../../TagsList.types';
import * as S from './Actions.styles';

const triggerClick = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => event.stopPropagation();
const dropdownMenuClick = (event: ClickParam): void => event.domEvent.stopPropagation();

const CheckIcon: React.FC = () => <Icon color={theme.palette['green-600']} component={<CheckS />} />;

const Visibility: React.FC<VisibilityProps> = ({ texts, onVisibilityChange = NOOP, visibility, item }) => {
  const visibilities = {
    [TagVisibility.Show]: texts?.visibilityShow,
    [TagVisibility.ShowIfUsed]: texts?.visibilityShowIfUsed,
    [TagVisibility.Hide]: texts?.visibilityHide,
  };

  const [stateVisibility, setVisibility] = React.useState(visibility);

  return (
    <>
      {Object.keys(visibilities).map((key: string) => {
        const text = visibilities[key];
        const dropdownMenuItemClick = (event: ClickParam): void => {
          event.domEvent.stopPropagation();
          const vis = key as TagVisibility;
          setVisibility(vis);
          onVisibilityChange(vis, item);
        };

        return (
          <S.DropdownMenuItem suffixel={stateVisibility === key && CheckIcon} onClick={dropdownMenuItemClick} key={key}>
            {text}
          </S.DropdownMenuItem>
        );
      })}
    </>
  );
};

const Actions: React.FC<ActionProps> = ({
  onVisibilityChange,
  onFavouriteChange,
  onSettingsEnter,
  onEdit,
  onDelete,
  onDropdownToggle = NOOP,
  item,
  favourite,
  visibility,
  texts,
}) => {
  return (
    <Dropdown
      placement="bottomRight"
      trigger={['click']}
      onVisibleChange={onDropdownToggle}
      align={{ offset: [12, 16] }}
      overlay={
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        <S.DropdownMenu asDropdownMenu onClick={dropdownMenuClick}>
          <Visibility texts={texts} item={item} onVisibilityChange={onVisibilityChange} visibility={visibility} />
          <Menu.Divider />
          {!!onFavouriteChange && (
            <S.DropdownMenuItem
              className="favourite"
              prefixel={
                <S.FavouriteIconWrapper favourite={!!favourite}>
                  <Icon component={favourite ? <StarFillM /> : <StarM />} />
                </S.FavouriteIconWrapper>
              }
              suffixel={favourite ? <CheckIcon /> : null}
              onClick={(e: ClickParam): void => {
                e.domEvent.stopPropagation();
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
              onClick={(e: ClickParam): void => {
                e.domEvent.stopPropagation();
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
              onClick={(e: ClickParam): void => {
                e.domEvent.stopPropagation();
                onSettingsEnter(e.domEvent);
                onDropdownToggle(false);
              }}
            >
              {texts?.enterSettings}
            </S.DropdownMenuItem>
          )}
          <Menu.Divider />
          {!!onDelete && (
            <S.DropdownMenuItem
              prefixel={<Icon component={<TrashM />} />}
              type="danger"
              onClick={(e: ClickParam): void => {
                e.domEvent.stopPropagation();
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
      <S.DropdownTrigger component={<OptionHorizontalM />} onClick={triggerClick} />
    </Dropdown>
  );
};

export default Actions;
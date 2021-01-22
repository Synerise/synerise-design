import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Icon from '@synerise/ds-icon';
import Menu from '@synerise/ds-menu';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { EditM, OptionHorizontalM, Settings2M, StarFillM, StarM, TrashM, CheckS } from '@synerise/ds-icon/dist/icons';
import { ClickParam } from 'antd/es/menu';
import { ActionProps, VisibilityProps } from '../Actions.types';
import { TagVisibility } from '../../../TagsList.types';
import * as S from '../Actions.styles';

const triggerClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => event.stopPropagation();
const dropdownMenuClick = (event: ClickParam) => event.domEvent.stopPropagation();

const CheckIcon : React.FC = () => <Icon color={theme.palette['green-600']} component={<CheckS />} />;

const Visibility: React.FC<VisibilityProps> = ({texts, onVisibility, visibility, item}) => {
  const visibilities = {
    show: texts.visibilityShow,
    showifused: texts.visibilityShowIfUsed,
    hide: texts.visibilityHide,
  }

  const [stateVisibility, setVisibility] = React.useState(visibility);

  return (
    <>
      {Object
      .keys(visibilities)
      .map((key : string) => {
        const text = visibilities[key];
        const dropdownMenuItemClick = (event: ClickParam) => {
          event.domEvent.stopPropagation();
          const vis = key as TagVisibility;
          setVisibility(vis);
          if(typeof onVisibility === 'function') onVisibility(vis, item);
        };

        return (
          <S.DropdownMenuItem 
            suffixel={stateVisibility === key && CheckIcon} 
            onClick={dropdownMenuItemClick}
            key={key}
          >
            {text}
          </S.DropdownMenuItem>
        )
      })}
    </>
  );
};

const ActionsDropdown: React.FC<ActionProps> = ({
  onVisibility,
  onFavourite,
  onSettingsEnter,
  onEdit,
  onDelete,
  item,
  isFavourite,
  visibility,
  dropdownMouseOut,
  dropdownMouseOver,
  texts,
}: ActionProps) => {
  return (
    <Dropdown
      placement="bottomRight"
      overlayStyle={{ boxShadow: '0 4px 12px 0 rgba(35, 41, 54, 0.07)', padding: 0 }}
      align={{ offset: [12, 12] }}
      trigger={['click']}
      overlay={
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        <S.DropdownMenu asDropdownMenu onClick={dropdownMenuClick}>
          <Visibility texts={texts} item={item} onVisibility={onVisibility} visibility={visibility} />
          <Menu.Divider />
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
          <Menu.Divider />
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
        </S.DropdownMenu>
      }
    >
      <S.DropdownTrigger 
        component={<OptionHorizontalM />} 
        onClick={triggerClick}
      />
    </Dropdown>
  );
};

export default ActionsDropdown;

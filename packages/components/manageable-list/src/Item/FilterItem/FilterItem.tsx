import * as React from 'react';
import { withTheme } from 'styled-components';

import Icon, {
  CheckS,
  CircleShapeM,
  OptionHorizontalM,
  WarningFillM,
  EditM,
  DuplicateM,
  TrashM,
} from '@synerise/ds-icon';
import Popconfirm from '@synerise/ds-popconfirm';
import ModalProxy from '@synerise/ds-modal';
import Result from '@synerise/ds-result';
import Button from '@synerise/ds-button';
import Dropdown from '@synerise/ds-dropdown';
import { ItemType } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import Menu from '@synerise/ds-menu';

import ItemName from '../ItemName/ItemName';
import ItemMeta from '../ItemMeta/ItemMeta';

import * as S from '../ContentItem/ContentItem.styles';
import { SelectFilterItem, ItemHeader, DropdownMenu } from './FilterItem.styles';
import { FilterItemProps } from './FilterItem.types';

const FilterItem: React.FC<FilterItemProps> = ({
  item,
  selected,
  greyBackground,
  onDuplicate,
  onRemove,
  onUpdate,
  onSelect,
  texts,
  theme,
  searchQuery,
  style,
}: FilterItemProps) => {
  const [editMode, setEditMode] = React.useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = React.useState(false);

  const updateName = React.useCallback(
    (updateParams: { id: React.ReactText; name: string }): void => {
      setEditMode(false);
      onUpdate && onUpdate(updateParams);
    },
    [onUpdate]
  );

  const enterEditMode = React.useCallback((): void => {
    setEditMode(true);
  }, []);

  const handleRemove = React.useCallback((): void | boolean => {
    return onRemove ? setConfirmDeleteVisible(true) : false;
  }, [onRemove]);

  const handleDuplicate = React.useCallback((): void => {
    return onDuplicate && onDuplicate({ id: item.id });
  }, [item.id, onDuplicate]);

  return (
    <>
      <S.ItemContainer
        opened={false}
        greyBackground={greyBackground}
        key={item.id}
        data-testid="filter-item"
        style={style}
      >
        <ItemHeader>
          <S.ItemHeaderPrefix>
            <SelectFilterItem data-testid={selected && 'filter-item-selected'}>
              {selected ? (
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                <Icon className="selected-item-icon" component={<CheckS />} color={theme.palette.white} />
              ) : (
                <Popconfirm
                  okText={texts.activate}
                  cancelText={texts.cancel}
                  okType="primary"
                  placement="top"
                  onConfirm={(): void => onSelect({ id: item.id })}
                  title={texts.activateItemTitle}
                  icon={<Icon component={<WarningFillM />} color={theme.palette['yellow-600']} />}
                >
                  <Icon component={<CircleShapeM />} color={theme.palette['grey-300']} />
                </Popconfirm>
              )}
            </SelectFilterItem>
          </S.ItemHeaderPrefix>
          <ItemName item={item} editMode={editMode} onUpdate={updateName} searchQuery={searchQuery} />
          <S.ItemHeaderSuffix>
            {(item.user || item.created) && <ItemMeta user={item.user} created={item.created} />}
            <Dropdown
              trigger={['click']}
              placement="bottomRight"
              overlay={
                <DropdownMenu>
                  {item.canUpdate && (
                    <Menu.Item
                      onClick={enterEditMode}
                      prefixel={<Icon component={<EditM />} color={theme.palette['grey-600']} />}
                    >
                      {texts.itemActionRename}
                    </Menu.Item>
                  )}
                  {item.canDuplicate && (
                    <Menu.Item
                      onClick={handleDuplicate}
                      prefixel={<Icon component={<DuplicateM />} color={theme.palette['grey-600']} />}
                    >
                      {texts.itemActionDuplicate}
                    </Menu.Item>
                  )}
                  {item.canDelete && (
                    <Menu.Item
                      type={ItemType.DANGER}
                      danger
                      onClick={handleRemove}
                      prefixel={<Icon component={<TrashM />} />}
                    >
                      {texts.itemActionDelete}
                    </Menu.Item>
                  )}
                </DropdownMenu>
              }
            >
              <S.FilterDropdownTrigger className="ds-dropdown-trigger" mode="single-icon" type="ghost">
                <Icon component={<OptionHorizontalM />} color={theme.palette['grey-600']} />
              </S.FilterDropdownTrigger>
            </Dropdown>
          </S.ItemHeaderSuffix>
        </ItemHeader>
      </S.ItemContainer>
      <ModalProxy
        blank
        closable
        onCancel={(): void => setConfirmDeleteVisible(false)}
        visible={confirmDeleteVisible}
        size="small"
        footer={null}
      >
        <Result
          type="warning"
          title={texts.deleteConfirmationTitle}
          description={texts.deleteConfirmationDescription}
          buttons={
            <>
              <Button type="default" onClick={(): void => setConfirmDeleteVisible(false)}>
                {texts.deleteConfirmationNo}
              </Button>
              <Button type="primary" onClick={(): void => onRemove && onRemove({ id: item.id })}>
                {texts.deleteConfirmationYes}
              </Button>
            </>
          }
        />
      </ModalProxy>
    </>
  );
};

export default withTheme(FilterItem);

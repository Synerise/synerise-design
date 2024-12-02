import React, { useState, useCallback, ReactText, useMemo } from 'react';
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
import { ItemType, MenuItemProps } from '@synerise/ds-menu';

import ItemName from '../ItemName/ItemName';
import ItemMeta from '../ItemMeta/ItemMeta';

import * as S from '../ContentItem/ContentItem.styles';
import { SelectFilterItem, ItemHeader, DropdownMenu } from './FilterItem.styles';
import { FilterItemProps } from './FilterItem.types';

const FilterItemComponent = ({
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
  const [editMode, setEditMode] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  const updateName = useCallback(
    (updateParams: { id: ReactText; name: string }): void => {
      setEditMode(false);
      onUpdate && onUpdate(updateParams);
    },
    [onUpdate]
  );

  const enterEditMode = useCallback((): void => {
    setEditMode(true);
  }, []);

  const handleRemove = useCallback((): void | boolean => {
    return onRemove ? setConfirmDeleteVisible(true) : false;
  }, [onRemove]);

  const handleDuplicate = useCallback((): void => {
    return onDuplicate && onDuplicate({ id: item.id });
  }, [item.id, onDuplicate]);

  const dropdownMenuDataSource = useMemo(() => {
    const menuItems: MenuItemProps[] = [];
    if (item.canUpdate) {
      menuItems.push({
        onClick: enterEditMode,
        prefixel: <Icon component={<EditM />} color={theme.palette['grey-600']} />,
        text: texts.itemActionRename,
      });
    }
    if (item.canDuplicate) {
      menuItems.push({
        onClick: handleDuplicate,
        prefixel: <Icon component={<DuplicateM />} color={theme.palette['grey-600']} />,
        text: texts.itemActionDuplicate,
      });
    }
    if (item.canDelete) {
      menuItems.push({
        type: ItemType.DANGER,
        onClick: handleRemove,
        prefixel: <Icon component={<TrashM />} />,
        text: texts.itemActionDelete,
      });
    }
    return menuItems;
  }, [
    enterEditMode,
    handleDuplicate,
    handleRemove,
    item.canDelete,
    item.canDuplicate,
    item.canUpdate,
    texts.itemActionDelete,
    texts.itemActionDuplicate,
    texts.itemActionRename,
    theme.palette,
  ]);

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
              overlay={<DropdownMenu dataSource={dropdownMenuDataSource} />}
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

const FilterItem = Object.assign(withTheme(FilterItemComponent), {
  AdditionalSuffix: S.AdditionalSuffix,
  ContentWrapper: S.ContentWrapper,
  DraggerWrapper: S.DraggerWrapper,
  DropdownTrigger: S.DropdownTrigger,
  DropdownWrapper: S.DropdownWrapper,
  FilterDropdownTrigger: S.FilterDropdownTrigger,
  IconWrapper: S.IconWrapper,
  ItemContainer: S.ItemContainer,
  ItemHeader: S.ItemHeader,
  ItemHeaderPrefix: S.ItemHeaderPrefix,
  ItemHeaderSuffix: S.ItemHeaderSuffix,
  MoveItemButtons: S.MoveItemButtons,
  ToggleContentWrapper: S.ToggleContentWrapper,
});

export default FilterItem;

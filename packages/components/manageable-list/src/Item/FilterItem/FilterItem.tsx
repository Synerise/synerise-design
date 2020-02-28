import * as React from 'react';
import { withTheme } from 'styled-components';
import {
  CheckS,
  CircleShapeM,
  DuplicateM,
  RenameM,
  OptionHorizontalM,
  TrashM,
  WarningFillM,
} from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Popconfirm from '@synerise/ds-popconfirm';
import ModalProxy from '@synerise/ds-modal';
import Result from '@synerise/ds-result';
import Button from '@synerise/ds-button';
import Dropdown from '@synerise/ds-dropdown';
import * as S from '../ContentItem/ContentItem.styles';
import { SelectFilterItem, MenuList, MenuItem, ItemHeader } from './FilterItem.styles';
import ItemName from '../ItemName/ItemName';
import { ItemProps } from '../Item';
import ItemMeta from '../ItemMeta/ItemMeta';

interface FilterItemProps {
  item: ItemProps;
  greyBackground?: boolean;
  onRemove?: (removeParams: { id: string }) => void;
  onDuplicate?: (duplicateParams: { id: string }) => void;
  onUpdate?: (updateParams: { id: string; name: string }) => void;
  onSelect: (selectParams: { id: string }) => void;
  selected: boolean;
  texts: {
    [k: string]: string | React.ReactNode;
  };
  theme: { [k: string]: string };
  searchQuery?: string;
}

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
}: FilterItemProps) => {
  const [editMode, setEditMode] = React.useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = React.useState(false);

  const updateName = React.useCallback(
    (updateParams: { id: string; name: string }): void => {
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
      <S.ItemContainer opened={false} greyBackground={greyBackground} key={item.id} data-testid="filter-item">
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
            {item.user && item.created && <ItemMeta user={item.user} created={item.created} />}
            <Dropdown
              overlay={
                <MenuList>
                  {item.canUpdate && (
                    <MenuItem onClick={enterEditMode}>
                      <Icon component={<RenameM />} /> Edit name
                    </MenuItem>
                  )}
                  {item.canDuplicate && (
                    <MenuItem onClick={handleDuplicate}>
                      <Icon component={<DuplicateM />} /> Duplicate
                    </MenuItem>
                  )}
                  {item.canDelete && (
                    <MenuItem danger onClick={handleRemove}>
                      <Icon component={<TrashM />} /> Delete
                    </MenuItem>
                  )}
                </MenuList>
              }
            >
              <Button type="ghost" mode="single-icon">
                <Icon component={<OptionHorizontalM />} />
              </Button>
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
                {texts.cancel}
              </Button>
              <Button type="primary" onClick={(): void => onRemove && onRemove({ id: item.id })}>
                {texts.deleteLabel}
              </Button>
            </>
          }
        />
      </ModalProxy>
    </>
  );
};

export default withTheme(FilterItem);

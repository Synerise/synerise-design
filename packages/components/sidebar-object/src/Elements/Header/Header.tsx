import React, { useState, useRef, useMemo } from 'react';

import Typography from '@synerise/ds-typography';
import Drawer from '@synerise/ds-drawer';
import Button from '@synerise/ds-button';
import Icon, {
  AngleDownM,
  AngleUpM,
  CloseM,
  CopyClipboardM,
  DuplicateM,
  EditM,
  FolderM,
  OptionHorizontalM,
  TrashM,
} from '@synerise/ds-icon';
import Dropdown from '@synerise/ds-dropdown';
import Menu, { MenuItemProps } from '@synerise/ds-menu';
import { useOnClickOutside } from '@synerise/ds-utils';

import { ButtonVariant, HeaderProps, HeaderType } from './Header.types';
import * as S from './Header.style';

const Header = ({
  avatar,
  preffix,
  tabs,
  onMove,
  onDuplicate,
  onDelete,
  onEdit,
  onId,
  texts,
  onCloseClick,
  inputObject,
  inputObjectIdKey = 'id',
  inlineEditInputProps = {},
  onArrowUp,
  onArrowDown,
  name = '',
  onRename,
  additionalNode,
  type = HeaderType.READONLY,
  typeButtons,
  onCancelClick,
  onApplyClick,
}: HeaderProps) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setDropdownVisible(false);
  });
  const renderBackTitle = (titleType: typeof type) => {
    if (titleType === HeaderType.EDITABLE) {
      return (
        <S.StyledInlineEdit
          disabled={!onRename}
          input={{
            name: texts.name,
            value: name,
            maxLength: 120,
            placeholder: texts.inlineEditPlaceholder,
            onChange: event => {
              onRename && onRename(event.target.value);
            },
            ...inlineEditInputProps,
          }}
        />
      );
    }
    return <S.SingleTitle>{name}</S.SingleTitle>;
  };
  const renderMenu = !!(onEdit || onDelete || onDuplicate || onMove || onId);
  const renderMenuDivider = !!((onEdit || onDelete || onDuplicate || onMove) && onId);
  const menuDataSource = useMemo(() => {
    const menuItems: MenuItemProps[] = [];
    onEdit &&
      menuItems.push({
        onClick: () => {
          setDropdownVisible(!dropdownVisible);
          onEdit(inputObject);
        },
        prefixel: <Icon component={<EditM />} />,
        text: texts.editIcon,
      });

    onDuplicate &&
      menuItems.push({
        onClick: () => {
          setDropdownVisible(!dropdownVisible);
          onDuplicate(inputObject);
        },
        prefixel: <Icon component={<DuplicateM />} />,

        text: texts.duplicateIcon,
      });

    onMove &&
      menuItems.push({
        onClick: () => {
          setDropdownVisible(!dropdownVisible);
          onMove(inputObject);
        },
        prefixel: <Icon component={<FolderM />} />,
        text: texts.moveIcon,
      });

    onDelete &&
      menuItems.push({
        onClick: () => {
          setDropdownVisible(!dropdownVisible);
          onDelete(inputObject);
        },
        type: 'danger',
        prefixel: <Icon component={<TrashM />} />,
        text: texts.deleteIcon,
      });

    renderMenuDivider && menuItems.push({ type: 'divider' });

    onId &&
      menuItems.push({
        onClick: () => {
          setDropdownVisible(!dropdownVisible);
          onId(inputObject);
        },
        style: { padding: '0 12px' },
        prefixel: <Icon component={<CopyClipboardM />} />,
        text: `ID: ${inputObject[inputObjectIdKey]}`,
      });
    return menuItems;
  }, [
    dropdownVisible,
    inputObject,
    inputObjectIdKey,
    onDelete,
    onDuplicate,
    onEdit,
    onId,
    onMove,
    renderMenuDivider,
    texts.deleteIcon,
    texts.duplicateIcon,
    texts.editIcon,
    texts.moveIcon,
  ]);

  const renderActionButtons = (typesOfButtons: typeof typeButtons) => {
    if (typesOfButtons === ButtonVariant.WITH_NAVIGATION) {
      return (
        <>
          {onArrowUp && (
            <S.ButtonWrapper>
              <Button onClick={onArrowUp} type="ghost" mode="single-icon">
                <Icon size={20} component={<AngleUpM />} />
              </Button>
            </S.ButtonWrapper>
          )}
          {onArrowDown && (
            <S.ButtonWrapper>
              <Button onClick={onArrowDown} type="ghost" mode="single-icon">
                <Icon size={20} component={<AngleDownM />} />
              </Button>
            </S.ButtonWrapper>
          )}
          {renderMenu && (
            <Dropdown
              visible={dropdownVisible}
              placement="bottomLeft"
              overlay={
                <S.DropdownWrapper ref={ref}>
                  <Menu asDropdownMenu style={{ width: '100%' }} dataSource={menuDataSource} />
                </S.DropdownWrapper>
              }
            >
              <S.ButtonWrapper data-testid="sidebar-object-dropdown-menu-trigger">
                <Button onClick={() => setDropdownVisible(!dropdownVisible)} type="ghost" mode="single-icon">
                  <Icon component={<OptionHorizontalM />} />
                </Button>
              </S.ButtonWrapper>
            </Dropdown>
          )}
          <S.ButtonWrapper>
            <Button type="ghost" mode="single-icon" onClick={onCloseClick}>
              <Icon component={<CloseM />} />
            </Button>
          </S.ButtonWrapper>
        </>
      );
    }
    if (typesOfButtons === ButtonVariant.TWO_BUTTONS) {
      return (
        <S.ButtonsWrapper>
          <S.ButtonWrapper>
            <Button type="ghost" onClick={onCancelClick}>
              {' '}
              {texts.cancelButton}{' '}
            </Button>
          </S.ButtonWrapper>
          <S.ButtonWrapper>
            <Button type="primary" onClick={onApplyClick}>
              {' '}
              {texts.applyButton}{' '}
            </Button>
          </S.ButtonWrapper>
        </S.ButtonsWrapper>
      );
    }
    return null;
  };
  return (
    <Drawer.DrawerHeaderWithoutPadding>
      <Drawer.DrawerHeader>
        <S.DrawerHeaderBar withTabs={!!tabs}>
          {preffix}
          {avatar}
          <Typography.Title style={{ flex: 2, marginLeft: '15px' }} level={4}>
            {renderBackTitle(type)}
          </Typography.Title>
          {renderActionButtons(typeButtons)}
        </S.DrawerHeaderBar>
        {additionalNode}
        {tabs}
      </Drawer.DrawerHeader>
    </Drawer.DrawerHeaderWithoutPadding>
  );
};
export default Header;

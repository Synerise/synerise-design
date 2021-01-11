import * as React from 'react';
import Drawer from '@synerise/ds-drawer';
import Icon from '@synerise/ds-icon';
import Typography from 'antd/lib/typography';
import Button from '@synerise/ds-button';
import {
  AngleDownM,
  AngleUpM,
  CopyClipboardM,
  DuplicateM,
  EditM,
  FolderM,
  OptionHorizontalM,
  TrashM,
  CloseM,
} from '@synerise/ds-icon/dist/icons';

import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import { useOnClickOutside } from '@synerise/ds-utils';
import { ButtonVariant, HeaderProps, HeaderType } from './Header.types';
import * as S from './Header.style';
import { DropdownWrapper, MenuWrapper } from './Header.style';

const Header: React.FC<HeaderProps> = ({
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
  typeButtons = ButtonVariant.TWO_BUTTONS,
  onCancelClick,
  onApplyClick,
}) => {
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setDropdownVisible(false);
  });
  const renderBackTitle = (titleType: typeof type): React.ReactNode => {
    if (titleType === HeaderType.EDITABLE) {
      return (
        <S.StyledInlineEdit
          disabled={!onRename}
          input={{
            name: texts.name,
            value: name,
            maxLength: 120,
            placeholder: texts.inlineEditPlaceholder,
            onChange: (event): void => {
              onRename && onRename(event.target.value);
            },
            ...inlineEditInputProps,
          }}
        />
      );
    }
    return <S.SingleTitle>{name}</S.SingleTitle>;
  };
  const renderActionButtons = (typesOfButtons: typeof typeButtons): React.ReactNode => {
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
          <Dropdown
            visible={dropdownVisible}
            placement="bottomLeft"
            overlay={
              <DropdownWrapper ref={ref}>
                <Menu asDropdownMenu style={{ width: '100%' }}>
                  {onEdit && (
                    <Menu.Item
                      onClick={(): void => {
                        setDropdownVisible(!dropdownVisible);
                        onEdit(inputObject);
                      }}
                      prefixel={<Icon component={<EditM />} />}
                    >
                      {texts.editIcon}
                    </Menu.Item>
                  )}
                  {onDuplicate && (
                    <Menu.Item
                      onClick={(): void => {
                        setDropdownVisible(!dropdownVisible);
                        onDuplicate(inputObject);
                      }}
                      prefixel={<Icon component={<DuplicateM />} />}
                    >
                      {texts.duplicateIcon}
                    </Menu.Item>
                  )}
                  {onMove && (
                    <Menu.Item
                      onClick={(): void => {
                        setDropdownVisible(!dropdownVisible);
                        onMove(inputObject);
                      }}
                      prefixel={<Icon component={<FolderM />} />}
                    >
                      {texts.moveIcon}
                    </Menu.Item>
                  )}
                  {onDelete && (
                    <Menu.Item
                      onClick={(): void => {
                        setDropdownVisible(!dropdownVisible);
                        onDelete(inputObject);
                      }}
                      type="danger"
                      prefixel={<Icon component={<TrashM />} />}
                    >
                      {texts.deleteIcon}
                    </Menu.Item>
                  )}
                  {onId && (
                    <MenuWrapper>
                      <Menu.Item
                        onClick={(): void => {
                          setDropdownVisible(!dropdownVisible);
                          onId(inputObject);
                        }}
                        style={{ padding: '0 12px' }}
                        prefixel={<Icon component={<CopyClipboardM />} />}
                      >{`ID: ${inputObject[inputObjectIdKey]}`}</Menu.Item>
                    </MenuWrapper>
                  )}
                </Menu>
              </DropdownWrapper>
            }
          >
            <S.ButtonWrapper>
              <Button onClick={(): void => setDropdownVisible(!dropdownVisible)} type="ghost" mode="single-icon">
                <Icon component={<OptionHorizontalM />} />
              </Button>
            </S.ButtonWrapper>
          </Dropdown>
          <S.ButtonWrapper>
            <Button type="ghost" mode="single-icon" onClick={onCloseClick}>
              <Icon component={<CloseM />} />
            </Button>
          </S.ButtonWrapper>
        </>
      );
    }
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

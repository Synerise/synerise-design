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
import { HeaderProps } from './Header.types';
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
  onArrowUp,
  onArrowDown,
  name = '',
  onRename,
}) => {
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setDropdownVisible(false);
  });
  const renderActionButtons = (): React.ReactNode => {
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
          overlayStyle={{ boxShadow: '0 4px 17px -3px rgba(191,191,191,1)' }}
          visible={dropdownVisible}
          placement="bottomLeft"
          overlay={
            <DropdownWrapper ref={ref}>
              <Menu style={{ padding: '8px 8px' }}>
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
                <MenuWrapper>
                  {onId && (
                    <Menu.Item
                      onClick={(): void => {
                        setDropdownVisible(!dropdownVisible);
                        onId(inputObject);
                      }}
                      style={{ padding: '0 12px' }}
                      prefixel={<Icon component={<CopyClipboardM />} />}
                    >{`ID: ${inputObject.id}`}</Menu.Item>
                  )}
                </MenuWrapper>
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
  };
  return (
    <Drawer.DrawerHeaderWithoutPadding>
      <Drawer.DrawerHeader>
        <S.DrawerHeaderBar>
          {preffix}
          {avatar}
          <Typography.Title style={{ flex: 2, marginLeft: '15px' }} level={4}>
            <S.StyledInlineEdit
              disabled={!!onRename}
              input={{
                name: texts.name,
                value: name,
                maxLength: 120,
                placeholder: texts.inlineEditPlaceholder,
                onChange: (event): void => {
                  onRename && onRename(event.target.value);
                },
              }}
            />
          </Typography.Title>
          {renderActionButtons()}
        </S.DrawerHeaderBar>
        {tabs}
      </Drawer.DrawerHeader>
    </Drawer.DrawerHeaderWithoutPadding>
  );
};
export default Header;

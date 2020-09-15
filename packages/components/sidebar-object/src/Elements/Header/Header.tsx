import * as React from 'react';
import Drawer from '@synerise/ds-drawer';
import Icon from '@synerise/ds-icon';
import Typography from 'antd/lib/typography';
import InlineEdit from '@synerise/ds-inline-edit';
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
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import Menu from '@synerise/ds-menu';
import { HeaderProps } from './Header.types';
import * as S from './Header.style';
import { MenuWrapper } from './Header.style';

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
}) => {
  const [value, setValue] = React.useState<string>('Winter Campaign');
  const renderActionButtons = (): React.ReactNode => {
    return (
      <>
        <Tooltip title="next">
          <S.ButtonWrapper>
            <Button type="ghost" mode="single-icon">
              <Icon size={20} component={<AngleUpM />} />
            </Button>
          </S.ButtonWrapper>
        </Tooltip>
        <Tooltip title="previous">
          <S.ButtonWrapper>
            <Button type="ghost" mode="single-icon">
              <Icon size={20} component={<AngleDownM />} />
            </Button>
          </S.ButtonWrapper>
        </Tooltip>
        <Dropdown
          overlayStyle={{ boxShadow: '0 4px 17px -3px rgba(191,191,191,1)' }}
          overlay={
            <Menu style={{ padding: '8px 16px' }}>
              {onEdit && <Menu.Item prefixel={<Icon component={<EditM />} />}>{texts.editIcon}</Menu.Item>}
              {onDuplicate && <Menu.Item prefixel={<Icon component={<DuplicateM />} />}>{texts.duplicateIcon}</Menu.Item>}
              {onMove && <Menu.Item prefixel={<Icon component={<FolderM />} />}>{texts.moveIcon}</Menu.Item>}
              <MenuWrapper>
                {onDelete && (
                  <Menu.Item type="danger" prefixel={<Icon component={<TrashM />} />}>
                    {texts.deleteIcon}
                  </Menu.Item>
                )}
              </MenuWrapper>
              {onId && <Menu.Item prefixel={<Icon component={<CopyClipboardM />} />}>${`ID: ${inputObject}`}</Menu.Item>}
            </Menu>
          }
        >
          <S.ButtonWrapper>
            <Button type="ghost" mode="single-icon">
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
            <InlineEdit
              input={{
                name: texts.name,
                value: value,
                maxLength: 120,
                placeholder: texts.namePlaceholder,
                onChange: (event): void => setValue(event.target.value),
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

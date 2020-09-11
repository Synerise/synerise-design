import * as React from 'react';
import Drawer from '@synerise/ds-drawer';
import Icon from '@synerise/ds-icon';
import Typography from 'antd/lib/typography';
import InlineEdit from '@synerise/ds-inline-edit';
import Button from '@synerise/ds-button';
import {
  AngleDownM,
  AngleDownS,
  AngleUpM,
  CopyClipboardM,
  DuplicateM,
  EditM,
  FolderM,
  OptionHorizontalM,
  TrashM,
} from '@synerise/ds-icon/dist/icons';

import Dropdown from '@synerise/ds-dropdown';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import Menu from '@synerise/ds-menu';
import CloseM from '@synerise/ds-icon/dist/icons/CloseM';
import DropdownOverlay from './Dropdown/DropdownOverlay';
import { HeaderProps } from './Header.types';
import * as S from './Header.style';
import { MenuWrapper } from './Header.style';

const Header: React.FC<HeaderProps> = ({
  avatar,
  name,
  preffix,
  tabs,
  exampleFolders,
  onMove,
  onDuplicate,
  onDelete,
  onEdit,
  onId,
  parentFolder,
}) => {
  const renderActionButtons = actionClickHandler => {
    return (
      <React.Fragment>
        <Tooltip title="next">
          <S.ButtonWrapper>
            <Button type='ghost' mode="single-icon">
              <Icon size={20} component={<AngleUpM />} />
            </Button>
          </S.ButtonWrapper>
        </Tooltip>
        <Tooltip title="previous">
          <S.ButtonWrapper>
            <Button type='ghost' mode="single-icon">
              <Icon size={20} component={<AngleDownM />} />
            </Button>
          </S.ButtonWrapper>
        </Tooltip>
        <Dropdown
          overlayStyle={{ boxShadow: '0 4px 17px -3px rgba(191,191,191,1)' }}
          overlay={
            <Menu style={{ padding: '8px 16px' }}>
              {onEdit && <Menu.Item prefixel={<Icon component={<EditM />} />}>Edit</Menu.Item>}
              {onDuplicate && <Menu.Item prefixel={<Icon component={<DuplicateM />} />}>Duplicate</Menu.Item>}
              {onMove && <Menu.Item prefixel={<Icon component={<FolderM />} />}>Move to</Menu.Item>}
              <MenuWrapper>
                {onDelete && (
                  <Menu.Item type="danger" prefixel={<Icon component={<TrashM />} />}>
                    Delete
                  </Menu.Item>
                )}
              </MenuWrapper>
              {onId && <Menu.Item prefixel={<Icon component={<CopyClipboardM />} />}>ID: 3254-3434-5232...</Menu.Item>}
            </Menu>
          }
        >
          <S.ButtonWrapper>
            <Button type='ghost' mode="single-icon">
              <Icon component={<OptionHorizontalM />} />
            </Button>
          </S.ButtonWrapper>
        </Dropdown>
        <S.ButtonWrapper>
          <Button type='ghost' mode="single-icon" onClick={actionClickHandler}>
            <Icon component={<CloseM />} />
          </Button>
        </S.ButtonWrapper>
      </React.Fragment>
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
                name: 'name-of-input',
                value: name,
                maxLength: 120,
                placeholder: 'This is placeholder',
              }}
            />
          </Typography.Title>
          {renderActionButtons()}
        </S.DrawerHeaderBar>
        {tabs}
      </Drawer.DrawerHeader>
      <S.HeaderWrapper>
        Folder:{' '}
        <Dropdown
          overlayStyle={{ boxShadow: '0 4px 17px -3px rgba(191,191,191,1)' }}
          overlay={<DropdownOverlay parentFolder={parentFolder} data={exampleFolders}></DropdownOverlay>}
        >
          <Button type="ghost">
            {parentFolder.name}
            <Icon component={<AngleDownS />} />
          </Button>
        </Dropdown>
      </S.HeaderWrapper>
    </Drawer.DrawerHeaderWithoutPadding>
  );
};
export default Header;

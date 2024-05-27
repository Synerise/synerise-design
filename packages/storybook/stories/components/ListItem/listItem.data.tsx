import React, { useRef, useState } from 'react';

import Tooltip from '@synerise/ds-tooltip';
import Icon, {
  CheckS,
  CloseS,
  DuplicateM,
  EditM,
  EditS,
  FolderM,
  OptionHorizontalM,
  ShowM,
  TaskCheckM,
  TrashM,
  UserS,
  WarningFillS,
} from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import { Label } from '@synerise/ds-input';
import Dropdown from '@synerise/ds-dropdown';
import Checkbox from '@synerise/ds-checkbox';
import Menu from '@synerise/ds-menu';
import { useOnClickOutside } from '@synerise/ds-utils';

import * as S from './styles';
import Badge from '@synerise/ds-badge';
import Avatar from '@synerise/ds-avatar';

import { avatarImage } from '../../constants/images';
import { controlFromOptionsArray } from '../../utils';

export const suffixType = {
  renameAndDelete: 'rename,delete',
  delete: 'delete',
  check: 'check',
  warning: 'warning',
  icon: 'icon',
  switch: 'switch',
  label: 'label',
  dropdown: 'dropdown',
  select: 'select',
  rename: 'rename',
  none: 'none',
};

export const prefixType = {
  singleIcon: 'singleIcon',
  twoIcons: 'twoIcons',
  avatar: 'avatar',
  checkbox: 'checkbox',
  none: 'none',
};

export const prefixArgTypes = {
  prefixType: controlFromOptionsArray('select', Object.values(prefixType)),
  suffixType: controlFromOptionsArray('select', Object.values(suffixType)),
};

const ActionsMenu = ({ onSelectClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setDropdownVisible(false);
  });
  const [dropdownVisible, setDropdownVisible] = useState(false);
  return (
    <Dropdown
      visible={dropdownVisible}
      placement="bottomCenter"
      align={{ offset: [-38, 8] }}
      overlay={
        <div style={{ width: '167px' }} ref={ref}>
          <Menu asDropdownMenu style={{ width: '100%' }}>
            <Menu.Item
              onClick={(e): void => {
                setDropdownVisible(!dropdownVisible);
              }}
              prefixel={<Icon component={<EditM />} />}
            >
              Rename
            </Menu.Item>
            <Menu.Item
              onClick={(): void => {
                setDropdownVisible(!dropdownVisible);
              }}
              prefixel={<Icon component={<DuplicateM />} />}
            >
              Duplicate
            </Menu.Item>
            <Menu.Item
              onClick={(): void => {
                onSelectClick();
                setDropdownVisible(!dropdownVisible);
              }}
              prefixel={<Icon component={<TaskCheckM />} />}
            >
              Select
            </Menu.Item>
            <Menu.Item
              onClick={(): void => {
                setDropdownVisible(!dropdownVisible);
              }}
              type="danger"
              prefixel={<Icon component={<TrashM />} />}
            >
              Delete
            </Menu.Item>
          </Menu>
        </div>
      }
    >
      <S.HoverableIconWrapper>
        <Icon
          color={theme.palette['grey-400']}
          onClick={(e): void => {
            e.stopPropagation();
            setDropdownVisible(!dropdownVisible);
          }}
          component={<OptionHorizontalM />}
        />
      </S.HoverableIconWrapper>
    </Dropdown>
  );
};

const CheckboxWithTooltip = ({ checked, onChecked }) => {
  return (
    <Tooltip type="default" title={'Checkbox'}>
      <div onClick={e => e.stopPropagation()}>
        <Checkbox checked={checked} onChange={e => onChecked(e.target.checked)} />
      </div>
    </Tooltip>
  );
};

const Rename = ({ onSelectEdit }) => {
  return (
    <Tooltip type="default" trigger="hover" title={'Rename'}>
      <S.HoverableIconWrapper>
        <Icon
          onClick={(e): void => {
            onSelectEdit();
            e.stopPropagation();
          }}
          color={theme.palette['grey-600']}
          component={<EditS />}
        />
      </S.HoverableIconWrapper>
    </Tooltip>
  );
};
const RenameWithDelete = ({ onClickEdit }) => {
  return (
    <>
      <Tooltip type="default" trigger="hover" title={'Rename'}>
        <S.HoverableIconWrapper>
          <Icon
            onClick={(e): void => {
              onClickEdit();
              e.stopPropagation();
            }}
            color={theme.palette['grey-600']}
            component={<EditS />}
          />
        </S.HoverableIconWrapper>
      </Tooltip>
      <Tooltip type="default" trigger="hover" title={'Delete'}>
        <div>
          <Icon color={theme.palette['red-600']} component={<CloseS />} />
        </div>
      </Tooltip>
    </>
  );
};
const SwitchWithTooltip = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Tooltip type="default" trigger="hover" title={checked ? 'Switch off' : 'Switch on'}>
      <ExtendedAntdSwitchComponent
        onChange={(value, event) => {
          event.stopPropagation();
          setChecked(value);
        }}
        defaultChecked={false}
        checked={checked}
        id={'toggle'}
      />
    </Tooltip>
  );
};

export const renderPrefix = (prefixElementType: string, isChecked?: boolean, onChecked?: (value: boolean) => void) => {
  switch (prefixElementType) {
    case prefixType.twoIcons:
      return (
        <>
          <Tooltip type="default" title={'Delete'}>
            <div>
              <Icon color={theme.palette['grey-700']} component={<FolderM />} />
            </div>
          </Tooltip>
          <Tooltip type="default" title={'Delete'}>
            <div>
              <Icon color={theme.palette['grey-700']} style={{ marginLeft: '8px' }} component={<ShowM />} />
            </div>
          </Tooltip>
        </>
      );
    case prefixType.singleIcon:
      return <Icon color={theme.palette['grey-700']} component={<ShowM />} />;
    case prefixType.avatar:
      return (
        <Badge status="active">
          <Avatar size="small" src={avatarImage} shape="circle" hasStatus />
        </Badge>
      );
    case prefixType.checkbox:
      return <CheckboxWithTooltip checked={isChecked} onChecked={onChecked} />;
    default:
      return null;
  }
};

export function renderSuffix(
  suffixElementType: string,
  selectSuffixCallback?: () => void,
  clickSuffixCallback?: () => void
) {
  switch (suffixElementType) {
    case suffixType.renameAndDelete:
      return <RenameWithDelete onClickEdit={clickSuffixCallback} />;
    case suffixType.rename:
      return <Rename onSelectEdit={selectSuffixCallback} />;
    case suffixType.dropdown:
      return <ActionsMenu onSelectClick={selectSuffixCallback} />;
    case suffixType.delete:
      return (
        <Tooltip type="default" title={'Delete'}>
          <div>
            <Icon color={theme.palette['red-600']} component={<CloseS />} />
          </div>
        </Tooltip>
      );
    case suffixType.check:
      return <Icon color={theme.palette['green-600']} component={<CheckS />} />;
    case suffixType.warning:
      return <Icon color={theme.palette['orange-600']} component={<WarningFillS />} />;
    case suffixType.icon:
      return (
        <S.HoverableIconWrapper className="icon-suffix">
          <Icon color={theme.palette['grey-600']} component={<UserS />} />
        </S.HoverableIconWrapper>
      );
    case suffixType.label:
      return (
        <Label
          label={
            <div style={{ color: theme.palette['grey-400'], lineHeight: '18px' }}>
              <span>Text</span>
            </div>
          }
        />
      );
    case suffixType.select:
      return (
        <Label
          label={
            <Tooltip type="default" trigger="hover" title={'Select product'}>
              <div style={{ lineHeight: '18px', marginRight: '4px', color: theme.palette['blue-600'] }}>
                <span>select</span>
              </div>
            </Tooltip>
          }
        />
      );
    case suffixType.switch:
      return <SwitchWithTooltip />;
    case suffixType.none:
      return null;
    default:
      return null;
  }
}

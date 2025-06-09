import React, { useRef, useState } from 'react';
import Avatar, { ObjectAvatar } from '@synerise/ds-avatar';
import Badge from '@synerise/ds-badge';
import { RawSwitch} from '@synerise/ds-switch';
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
import { Label } from '@synerise/ds-input';
import { theme } from '@synerise/ds-core';
import Tooltip from '@synerise/ds-tooltip';
import { DropdownWrapper } from '@synerise/ds-sidebar-object/dist/Elements/Header/Header.style';
import Menu from '@synerise/ds-menu';
import Dropdown from '@synerise/ds-dropdown';
import Checkbox from '@synerise/ds-checkbox';
import { useOnClickOutside } from '@synerise/ds-utils';
import * as S from './Menu.styles';

import { avatar10 } from '../../constants';

export const TEXT_PLACEHOLDER = 'Option';


export const suffixType = {
  renameAndDelete: 'rename,delete',
  delete: 'delete',
  check: 'check',
  warning: 'warning',
  icon: 'icon',
  switch: 'switch',
  label: 'label',
  none: 'none',
  dropdown: 'dropdown',
  select: 'select',
  rename: 'rename',
};

export const prefixType = {
  singleIcon: 'singleIcon',
  twoIcons: 'twoIcons',
  avatar: 'avatar',
  checkbox: 'checkbox',
  none: 'none',
};

export const CheckboxWithTooltip = ({ checked, onChecked }) => {
  return (
    <Tooltip type="default" title={'Checkbox'}>
      <div style={{ padding: '0 4px' }} onClick={e => e.stopPropagation()}>
        <Checkbox checked={checked} onChange={e => onChecked(e.target.checked)} />
      </div>
    </Tooltip>
  );
};
export const Rename = ({ onSelectEdit }) => {
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
export const RenameWithDelete = ({ onClickEdit }) => {
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
export const SwitchWithTooltip = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Tooltip type="default" trigger="hover" title={checked ? 'Switch off' : 'Switch on'}>
      <RawSwitch
        onChange={(value, event) => {
          event.stopPropagation();
          setChecked(value);
        }}
        defaultChecked={false}
        checked={checked}
      />
    </Tooltip>
  );
};
export const ActionsMenu = ({ onSelectClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setDropdownVisible(false);
  });
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const menuData = [
    { text: 'Rename' , onClick: () => {
        setDropdownVisible(!dropdownVisible);
      }, prefixel: <Icon component={<EditM />} />},
    { text: 'Duplicate', onClick: () => {
        setDropdownVisible(!dropdownVisible);
      }, prefixel: <Icon component={<DuplicateM />} />},
    { text: 'Select', onClick: () => {
        setDropdownVisible(!dropdownVisible);
      }, prefixel: <Icon component={<TaskCheckM />} />},
    { text: 'Delete' , onClick: () => {
        setDropdownVisible(!dropdownVisible);
      }, prefixel: <Icon component={<TrashM />} />},
  ];
  return (
    <Dropdown
      visible={dropdownVisible}
      placement="bottomCenter"
      align={{ offset: [-38, 8] }}
      overlay={
        <DropdownWrapper style={{ width: '167px' }} ref={ref}>
          <Menu dataSource={menuData} asDropdownMenu style={{ width: '100%' }}/>
        </DropdownWrapper>
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


export const renderSuffix = (
  suffixElementType: string,
  selectSuffixCallback?: () => void,
  clickSuffixCallback?: () => void
) => {
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
};

export const renderPrefix = (prefixIconType: string, isChecked?: boolean, onChecked?: (value: boolean) => void) => {
  switch (prefixIconType) {
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
          <Avatar size="small" src={avatar10} shape="circle" hasStatus />
        </Badge>
      );
    case prefixType.checkbox:
      return <CheckboxWithTooltip checked={isChecked} onChecked={onChecked} />;
    default:
      return null;
  }
};



export const simpleText = [{ text: 'Option' }];

export const multipleItems = [
  { text: 'Option A' },
  { text: 'Option B' },
  { text: 'Option C' },
  { text: 'Option D' },
  { text: 'Option E' },
  { text: 'Option F' },
  { text: 'Option G' },
  { text: 'Option H' },
  { text: 'Option I' },
];


export const ordered = [
  { text: TEXT_PLACEHOLDER, key: '1' },
  { text: TEXT_PLACEHOLDER, key: '2' },
  { text: TEXT_PLACEHOLDER, key: '3' },
  { text: TEXT_PLACEHOLDER, key: '4' },
];



export const deleteState = [
  {
    text: 'Delete',
    type: 'danger',
    prefixel: (
      <Icon
        onClick={() => {
          alert('Clicked');
        }}
        component={<TrashM />}
      />
    ),
  },
];

export const MenuPrefixAndSuffixVariants = [
  {
    typePrefixel: prefixType.checkbox,
    typeSuffixel: suffixType.check,
  },
  {
    typePrefixel: prefixType.avatar,
    typeSuffixel: suffixType.switch,
  },
  {
    typePrefixel: prefixType.twoIcons ,
    typeSuffixel: suffixType.select,
  },
  {
    typePrefixel: prefixType.singleIcon,
    typeSuffixel: suffixType.renameAndDelete,
  },
  {
    typePrefixel: prefixType.none,
    typeSuffixel: suffixType.dropdown,
  },
  {
    typePrefixel: prefixType.checkbox,
    typeSuffixel: suffixType.delete,
  },
  {
    typePrefixel: prefixType.singleIcon,
    typeSuffixel: suffixType.rename,
  },
  {
    typePrefixel: prefixType.twoIcons,
    typeSuffixel: suffixType.warning,
  },
  {
    typePrefixel: prefixType.none,
    typeSuffixel: suffixType.icon,
  },
  {
    typePrefixel: prefixType.avatar,
    typeSuffixel: suffixType.none,
  },
];



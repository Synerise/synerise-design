import * as React from 'react';
import AntdSwitch, { SwitchProps } from 'antd/lib/switch';
import Avatar, { ObjectAvatar } from '@synerise/ds-avatar';
import Badge from '@synerise/ds-badge';
import Icon from '@synerise/ds-icon';
import {
  CheckS,
  CloseS,
  CopyClipboardM,
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
} from '@synerise/ds-icon/dist/icons';
import Label from '@synerise/ds-input/dist/Label/Label';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { VisibilityTrigger } from '@synerise/ds-menu/dist/Menu.types';
import Tooltip from '@synerise/ds-tooltip';
import * as S from './stories.styles';
import DSFlag from '@synerise/ds-flag';
import { DropdownWrapper } from '@synerise/ds-sidebar-object/dist/Elements/Header/Header.style';
import Menu from '@synerise/ds-menu';
import Dropdown from '@synerise/ds-dropdown';
import { useOnClickOutside } from '@synerise/ds-utils';
import { boolean } from '@storybook/addon-knobs';
import Checkbox from '@synerise/ds-checkbox/dist';

export const TEXT_PLACEHOLDER = 'Option';
export const DESCRIPTION_PLACEHOLDER = 'Description';

import { image as IMG_SRC } from '../Avatar/constants';

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
export const CheckboxWithTooltip = ({checked, onChecked}) => {
  return (
    <Tooltip type="default" title={'Checkbox'}>
      <div style={{padding: '0 4px'}} onClick={(e)=> e.stopPropagation() }>
        <Checkbox checked={checked} onChange={(e)=> onChecked(e.target.checked)} />
      </div>
    </Tooltip>
  );
};
export const Rename = ({onSelectEdit}) => {
  return (
    <Tooltip type="default" trigger="hover" title={'Rename'}>
      <S.HoverableIconWrapper>
        <Icon onClick={(e): void => {
          onSelectEdit();
          e.stopPropagation();}} color={theme.palette['grey-600']} component={<EditS />} />
      </S.HoverableIconWrapper>
    </Tooltip>
  );
};
export const SwitchWithTooltip = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Tooltip type="default" trigger="hover" title={'Switch on'}>
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
export const ActionsMenu = ({ onSelectClick }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setDropdownVisible(false);
  });
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  return (
    <Dropdown
      visible={dropdownVisible}
      placement="bottomCenter"
      overlay={
        <DropdownWrapper style={{ width: '167px' }} ref={ref}>
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


export const suffixVisibilityTrigger = {
  default: VisibilityTrigger.NONE,
  hover: VisibilityTrigger.HOVER,
};
export const ExtendedAntdSwitchComponent = (AntdSwitch as any) as React.ComponentType<SwitchProps & { id: string }>;

export function renderSuffix(suffixElementType: string, selectSuffixCallback?: () => void) {
  switch (suffixElementType) {
    case suffixType.renameAndDelete:
      return (
        <React.Fragment>
          <Tooltip type="default" trigger="hover" title={'Rename'}>
            <S.HoverableIconWrapper>
              <Icon color={theme.palette['grey-600']} component={<EditS />} />
            </S.HoverableIconWrapper>
          </Tooltip>
          <Tooltip type="default" trigger="hover" title={'Delete'}>
            <div>
              <Icon color={theme.palette['red-600']} component={<CloseS />} />
            </div>
          </Tooltip>
        </React.Fragment>
      );
    case suffixType.rename:
      return (
        <Rename onSelectEdit={selectSuffixCallback}/>
      );
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
      break;
  }
}

export const renderPrefixIcon = (prefixIconType: string, isChecked?: boolean, onChecked?: ()=> void,) => {
  switch (prefixIconType) {
    case prefixType.twoIcons:
      return (
        <React.Fragment>
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
        </React.Fragment>
      );
      break;
    case prefixType.singleIcon:
      return <Icon color={theme.palette['grey-700']} component={<ShowM />} />;
      break;
    case prefixType.avatar:
      return (
        <Badge status="active">
          <Avatar size="small" src={IMG_SRC} shape="circle" hasStatus={boolean('Has status', true)} />
        </Badge>
      );
      break;
    case prefixType.checkbox:
      return (<CheckboxWithTooltip checked={isChecked} onChecked={onChecked} />);
      break;
    default:
      return null;
  }
};

export const remapCopyValueFromText = data =>
  data.map(item => ({
    ...item,
    ...(item.copyValue && { copyValue: item.text }),
  }));

export const simpleText = [{ text: 'Option' }];

export const textWithIcon = [{ text: TEXT_PLACEHOLDER }];

export const ordered = [
  { text: TEXT_PLACEHOLDER, key: '1' },
  { text: TEXT_PLACEHOLDER, key: '2' },
  { text: TEXT_PLACEHOLDER, key: '3' },
  { text: TEXT_PLACEHOLDER, key: '4' },
];

export const submenu = [
  {
    text: 'Parent 1',
    subMenu: [{ text: 'Child 1', ordered: true }, { text: 'Child 2', ordered: true }, { text: 'Child 3' }],
  },
  {
    text: 'Parent 1',
    subMenu: [{ text: 'Child 1', ordered: true }, { text: 'Child 2', ordered: true }, { text: 'Child 3' }],
  },
];

export const avatar = [
  {
    text: TEXT_PLACEHOLDER,
    prefixel: (
      <ObjectAvatar objectName="A" size="small" tooltip={false} />
    ),
  },
];

export const avatarSmall = [
  {
    text: TEXT_PLACEHOLDER,
    prefixel: (
      <Badge status="active">
        <Avatar size="small" src={IMG_SRC} shape="circle" />
      </Badge>
    ),
    description: 'description',
  },
];

export const avatarMedium = [
  {
    text: TEXT_PLACEHOLDER,
    prefixel: <Avatar size="medium" src={IMG_SRC} shape="circle" />,
    description: 'description',
  },
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

export const withCheckBox = [{}];

export const copyable = [
  {
    text: 'Item',
    prefixel: <Icon color={theme.palette['grey-700']} component={<CopyClipboardM />} />,
    copyable: true,
    copyHint: 'Copy to clipboard',
    copyValue: 'Item',
    copyTooltip: 'Copied!',
  },
];

export const withFlag = [
  {
    text: TEXT_PLACEHOLDER,
    prefixel: <DSFlag country={'pl'} />,
  },
];

import * as React from 'react';
import AntdSwitch, { SwitchProps } from 'antd/lib/switch';
import Avatar from '@synerise/ds-avatar';
import Badge from '@synerise/ds-badge';
import Icon from '@synerise/ds-icon';
import {
  CheckS,
  CloseS,
  CopyClipboardM,
  EditS,
  FolderM,
  ShowM,
  TrashM,
  UserS,
  WarningFillS,
} from '@synerise/ds-icon/dist/icons';
import Label from '@synerise/ds-input/dist/Label/Label';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Menu from '@synerise/ds-menu';

export const TEXT_PLACEHOLDER = 'Option';
export const DESCRIPTION_PLACEHOLDER = 'Description';
const IMG_SRC = 'https://www.w3schools.com/howto/img_avatar.png';

export const suffixType = {
  renameAndDelete: 'rename,delete',
  delete: 'delete',
  check: 'check',
  warning: 'warning',
  icon: 'icon',
  switch: 'switch',
  label: 'label',
  none: 'none',
};

export const iconPrefixType = {
  singleIcon: 'singleIcon',
  twoIcons: 'twoIcons',
};

export const ExtendedAntdSwitchComponent = (AntdSwitch as any) as React.ComponentType<SwitchProps & { id: string }>;

export function renderSuffix(suffixElementType: string) {
  switch (suffixElementType) {
    case suffixType.renameAndDelete:
      return (
        <React.Fragment>
          <Icon color={theme.palette['grey-600']} component={<EditS />} />
          <Icon color={theme.palette['red-600']} component={<CloseS />} />
        </React.Fragment>
      );
    case suffixType.delete:
      return <Icon color={theme.palette['red-600']} component={<CloseS />} />;
    case suffixType.check:
      return <Icon color={theme.palette['green-600']} component={<CheckS />} />;
    case suffixType.warning:
      return <Icon color={theme.palette['orange-600']} component={<WarningFillS />} />;
    case suffixType.icon:
      return <Icon color={theme.palette['grey-600']} component={<UserS />} />;
    case suffixType.label:
      return (
        <Label
          label={
            <div style={{ lineHeight: '18px'}}>
              <span>[key:value]</span>
            </div>
          }
        />
      );
    case suffixType.switch:
      return (
        <React.Fragment>
          <ExtendedAntdSwitchComponent id={'toggle'} />
        </React.Fragment>
      );
    case suffixType.none:
      return null;
    default:
      return null;
      break;
  }
}

export const renderPrefixIcon = (prefixIconType: string) => {
  switch (prefixIconType) {
    case iconPrefixType.twoIcons:
      return (
        <React.Fragment>
          <Icon component={<FolderM />} />
          <Icon style={{ marginLeft: '8px' }} component={<ShowM />} />
        </React.Fragment>
      );
      break;
    default:
      return <Icon component={<ShowM />} />;
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
  { text: TEXT_PLACEHOLDER },
  { text: TEXT_PLACEHOLDER },
  { text: TEXT_PLACEHOLDER },
  { text: TEXT_PLACEHOLDER },
];
export const largeList = new Array(30).fill({ text: TEXT_PLACEHOLDER });

export const parent = [
  {
    text: 'Parent 1',
    subMenu: [{ text: 'Child 1', ordered: true }, { text: 'Child 2', ordered: true }, { text: 'Child 3' }],
  },
  { text: 'Parent 2', subMenu: [{ text: 'Child 1' }, { text: 'Child 2' }, { text: 'Child 3' }] },
];

export const parentWithIcon = [
  {
    text: 'Parent 1',
    subMenu: [{ text: 'Child 1', ordered: true }, { text: 'Child 2', ordered: true }, { text: 'Child 3' }],
  },
  {
    text: 'Parent 2',
    prefixel: <Icon color={theme.palette['grey-600']} component={<UserS />} />,
    subMenu: [
      { text: 'Child 1', subMenu: [{ text: 'Child 1' }, { text: 'Child 2' }, { text: 'Child 3' }] },
      { text: 'Child 2' },
      { text: 'Child 3' },
    ],
  },
];

export const avatar = [
  {
    text: TEXT_PLACEHOLDER,
    prefixel: (
      <Badge status="active">
        <Avatar size="small" backgroundColor="green" backgroundColorHue="400" shape="square">
          AK
        </Avatar>
      </Badge>
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

export const withCopyable = [
  {
    text: 'Item',
    prefixel: <Icon component={<CopyClipboardM />} />,
    copyable: true,
    copyHint: 'Copy to clipboard',
    copyValue: 'Item',
  },
];
export const withParent = [
  {
    parent: true,
  },
];

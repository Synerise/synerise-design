import React, { ChangeEvent, useRef, useState } from 'react';

import { faker } from '@faker-js/faker';
import Avatar from '@synerise/ds-avatar';
import Badge from '@synerise/ds-badge';
import Checkbox, {
  CheckboxBaseProps,
  type CheckboxTristateChangeEvent,
} from '@synerise/ds-checkbox';
import { theme } from '@synerise/ds-core';
import Dropdown from '@synerise/ds-dropdown';
import DSFlag from '@synerise/ds-flag';
import { FormFieldLabel } from '@synerise/ds-form-field';
import Icon, {
  CheckS,
  CloseS,
  DuplicateM,
  EditM,
  EditS,
  FolderM,
  OptionHorizontalM,
  ShowM,
  StarFillM,
  StarM,
  TaskCheckM,
  TrashM,
  UserS,
  WarningFillS,
} from '@synerise/ds-icon';
import { type ListItemProps } from '@synerise/ds-list-item';
import Menu from '@synerise/ds-menu';
import { RawSwitch } from '@synerise/ds-switch';
import Tooltip from '@synerise/ds-tooltip';
import { useOnClickOutside } from '@synerise/ds-utils';

import { AVATAR_IMAGE } from '../../constants/images';
import { controlFromOptionsArray } from '../../utils';
import * as S from './styles';

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
  star: 'star',
  rename: 'rename',
  none: 'none',
} as const;

export const prefixType = {
  singleIcon: 'singleIcon',
  twoIcons: 'twoIcons',
  avatar: 'avatar',
  checkbox: 'checkbox',
  none: 'none',
} as const;

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
  const menuItems = [
    {
      onClick: () => {
        setDropdownVisible(!dropdownVisible);
      },
      prefixel: <Icon component={<EditM />} />,
      text: 'Rename',
    },
    {
      onClick: () => {
        setDropdownVisible(!dropdownVisible);
      },
      prefixel: <Icon component={<DuplicateM />} />,
      text: 'Duplicate',
    },
    {
      onClick: () => {
        onSelectClick();
        setDropdownVisible(!dropdownVisible);
      },
      prefixel: <Icon component={<TaskCheckM />} />,
      text: 'Select',
    },
    {
      onClick: () => {
        setDropdownVisible(!dropdownVisible);
      },
      type: 'danger',
      prefixel: <Icon component={<TrashM />} />,
      text: 'Delete',
    },
  ];

  return (
    <Dropdown
      open={dropdownVisible}
      placement="bottomCenter"
      align={{ offset: [-38, 8] }}
      overlay={
        <div style={{ width: '167px' }} ref={ref}>
          <Menu
            asDropdownMenu
            style={{ width: '100%' }}
            dataSource={menuItems}
          />
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

const CheckboxWithTooltip = ({
  checked,
  onChecked,
}: {
  checked?: boolean;
  onChecked?: (val: boolean) => void;
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const handleChange: CheckboxBaseProps['onChange'] = (e) => {
    onChecked ? onChecked(e.target.checked) : setIsChecked(e.target.checked);
  };
  const checkedMerged = checked !== undefined ? checked : isChecked;
  return (
    <Tooltip type="default" title={'Checkbox'}>
      <div onClick={(e) => e.stopPropagation()}>
        <Checkbox checked={checkedMerged} onChange={handleChange} />
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

export const StarWithTooltip = () => {
  const [checked, setChecked] = useState(false);
  const iconComponent = checked ? <StarFillM /> : <StarM />;
  const iconColor = checked
    ? theme.palette['yellow-600']
    : theme.palette['grey-600'];
  const handleClick = () => {
    setChecked(!checked);
  };
  return (
    <Tooltip type="default" title={'Star'}>
      <div onClick={(e) => e.stopPropagation()}>
        <Icon
          onClick={handleClick}
          color={iconColor}
          component={iconComponent}
          data-testid="star-icon"
        />
      </div>
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
    <Tooltip
      type="default"
      trigger="hover"
      title={checked ? 'Switch off' : 'Switch on'}
    >
      <RawSwitch
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

export const renderPrefix = (
  prefixElementType: string,
  isChecked?: boolean,
  onChecked?: (value: boolean) => void,
) => {
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
              <Icon
                color={theme.palette['grey-700']}
                style={{ marginLeft: '8px' }}
                component={<ShowM />}
              />
            </div>
          </Tooltip>
        </>
      );
    case prefixType.singleIcon:
      return <Icon color={theme.palette['grey-700']} component={<ShowM />} />;
    case prefixType.avatar:
      return (
        <Badge status="active">
          <Avatar size="small" src={AVATAR_IMAGE} shape="circle" hasStatus />
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
  clickSuffixCallback?: () => void,
) {
  switch (suffixElementType) {
    case suffixType.star:
      return <StarWithTooltip />;
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
      return (
        <Icon
          color={theme.palette['orange-600']}
          component={<WarningFillS />}
        />
      );
    case suffixType.icon:
      return (
        <S.HoverableIconWrapper className="icon-suffix">
          <Icon color={theme.palette['grey-600']} component={<UserS />} />
        </S.HoverableIconWrapper>
      );
    case suffixType.label:
      return (
        <FormFieldLabel
          label={
            <div
              style={{ color: theme.palette['grey-400'], lineHeight: '18px' }}
            >
              <span>Text</span>
            </div>
          }
        />
      );
    case suffixType.select:
      return (
        <FormFieldLabel
          label={
            <Tooltip type="default" trigger="hover" title={'Select product'}>
              <div
                style={{
                  lineHeight: '18px',
                  marginRight: '4px',
                  color: theme.palette['blue-600'],
                }}
              >
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

type MakeItemProps = ListItemProps & {
  suffixType?: keyof typeof suffixType;
  prefixType?: keyof typeof prefixType;
};
const makeItem = ({
  suffixType,
  prefixType,
  ...props
}: MakeItemProps): ListItemProps => {
  const prefix = prefixType && renderPrefix(prefixType);
  const suffix = suffixType && renderSuffix(suffixType);
  return {
    prefixel: prefix,
    suffixel: suffix,
    itemKey: faker.string.uuid(),
    key: faker.string.uuid(),
    ...props,
  };
};

const SUB_ITEMS: ListItemProps[] = [
  makeItem({ text: 'Sub Item 1' }),
  makeItem({ text: 'Sub Item 2' }),
  makeItem({ text: 'Sub Item 3' }),
];

export const LIST_ITEMS: ListItemProps[] = [
  makeItem({ text: 'Prefixes', type: 'header' }),
  makeItem({ text: 'Icon', prefixType: 'singleIcon' }),
  makeItem({ text: 'Two icons', prefixType: 'twoIcons' }),
  makeItem({ text: 'Avatar', prefixType: 'avatar' }),
  makeItem({ text: 'Checkbox', prefixType: 'checkbox' }),
  makeItem({ text: 'Flag', prefixel: <DSFlag country="de" /> }),

  makeItem({ type: 'divider' }),

  makeItem({ text: 'Suffixes', type: 'header' }),
  makeItem({ text: 'Switch suffix', suffixType: 'switch' }),
  makeItem({ text: 'Select suffix', suffixType: 'select' }),
  makeItem({ text: 'Check suffix', suffixType: 'check' }),
  makeItem({ text: 'Delete suffix', suffixType: 'delete' }),
  makeItem({ text: 'Dropdown suffix', suffixType: 'dropdown' }),
  makeItem({ text: 'Icon suffix', suffixType: 'icon' }),
  makeItem({ text: 'Label suffix', suffixType: 'label' }),
  makeItem({ text: 'Rename suffix', suffixType: 'rename' }),
  makeItem({ text: 'Rename and delete suffix', suffixType: 'renameAndDelete' }),
  makeItem({ text: 'Star suffix', suffixType: 'star' }),
  makeItem({ text: 'Warning suffix', suffixType: 'warning' }),
  makeItem({ text: 'With submenu', subMenu: SUB_ITEMS }),

  makeItem({ type: 'divider' }),

  makeItem({ text: 'Header type', type: 'header' }),
  makeItem({
    text: 'Danger type',
    type: 'danger',
    prefixel: <Icon component={<TrashM />} />,
  }),
];

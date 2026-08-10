import React from 'react';

import Avatar from '@synerise/ds-avatar';
import Badge from '@synerise/ds-badge';
import { FormFieldLabel } from '@synerise/ds-form-field';
import Icon, {
  CheckS,
  CloseS,
  FolderM,
  ShowM,
  UserS,
  WarningFillS,
} from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import { AVATAR_IMAGE as IMG_SRC } from '../../constants';
import * as S from './AccordionMenu.styles';
import {
  ActionsMenu,
  CheckboxWithTooltip,
  Rename,
  RenameWithDelete,
  SwitchWithTooltip,
} from './Menu.data';

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

export const initialSelectedKeys = {
  'p1-Child 1': false,
  'p1-Child 2': false,
  'p1-Child 3': false,
  'p2-Child 1': false,
  'p2-Child 2': false,
  'p2-Child 3': false,
  'p3-Child 1': false,
  'p3-Child 2': false,
  'p3-Child 3': false,
};

export const parentChilds = {
  parent1: ['p1-Child 1', 'p1-Child 2', 'p1-Child 3'],
  parent2: ['p2-Child 1', 'p2-Child 2', 'p2-Child 3'],
  parent3: ['p3-Child 1', 'p3-Child 2', 'p3-Child 3'],
};

export function renderSuffix(
  suffixElementType: string,
  selectSuffixCallback?: () => void,
  clickSuffixCallback?: () => void,
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
            <Icon
              color="var(--ds-color-icon-danger-default)"
              component={<CloseS />}
            />
          </div>
        </Tooltip>
      );
    case suffixType.check:
      return (
        <Icon
          color="var(--ds-color-icon-success-default)"
          component={<CheckS />}
        />
      );
    case suffixType.warning:
      return (
        <Icon
          color="var(--ds-color-icon-warning-default)"
          component={<WarningFillS />}
        />
      );
    case suffixType.icon:
      return (
        <S.HoverableIconWrapper className="icon-suffix">
          <Icon
            color="var(--ds-color-icon-base-default)"
            component={<UserS />}
          />
        </S.HoverableIconWrapper>
      );
    case suffixType.label:
      return (
        <FormFieldLabel
          label={
            <div
              style={{
                color: 'var(--ds-color-text-base-disabled)',
                lineHeight: '18px',
              }}
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
                  color: 'var(--ds-color-text-brand-default)',
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

export const renderPrefixIcon = (
  prefixIconType: string,
  isChecked?: boolean,
  onChecked?: (value: boolean) => void,
) => {
  switch (prefixIconType) {
    case prefixType.twoIcons:
      return (
        <React.Fragment>
          <Tooltip type="default" title={'Delete'}>
            <div>
              <Icon
                color="var(--ds-color-icon-base-default)"
                component={<FolderM />}
              />
            </div>
          </Tooltip>
          <Tooltip type="default" title={'Delete'}>
            <div>
              <Icon
                color="var(--ds-color-icon-base-default)"
                style={{ marginLeft: '8px' }}
                component={<ShowM />}
              />
            </div>
          </Tooltip>
        </React.Fragment>
      );
    case prefixType.singleIcon:
      return (
        <Icon color="var(--ds-color-icon-base-default)" component={<ShowM />} />
      );
    case prefixType.avatar:
      return (
        <Badge status="active">
          <Avatar size="small" src={IMG_SRC} shape="circle" hasStatus={true} />
        </Badge>
      );
    case prefixType.checkbox:
      return <CheckboxWithTooltip checked={isChecked} onChecked={onChecked} />;
    default:
      return null;
  }
};

import React from 'react';

import Tooltip from '@synerise/ds-tooltip';
import Icon, { CheckS, CloseS, FolderM, ShowM, UserS, WarningFillS } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import { FormFieldLabel } from '@synerise/ds-form-field';
import Badge from '@synerise/ds-badge';
import Avatar from '@synerise/ds-avatar';

import * as S from './AccordionMenu.styles';
import { AVATAR_IMAGE as IMG_SRC } from '../../constants';
import { ActionsMenu, CheckboxWithTooltip, Rename, RenameWithDelete, SwitchWithTooltip } from './Menu.data';

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
        <FormFieldLabel
          label={
            <div style={{ color: theme.palette['grey-400'], lineHeight: '18px' }}>
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

export const renderPrefixIcon = (prefixIconType: string, isChecked?: boolean, onChecked?: (value: boolean) => void) => {
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
    case prefixType.singleIcon:
      return <Icon color={theme.palette['grey-700']} component={<ShowM />} />;
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

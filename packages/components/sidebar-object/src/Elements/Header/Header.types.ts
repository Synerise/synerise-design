import * as React from 'react';
import { InputProps } from '@synerise/ds-inline-edit/dist/InlineEdit.types';

export type HeaderProps = {
  avatar: React.ReactNode;
  preffix: React.ReactNode;
  tabs: React.ReactNode;
  additionalNode?: React.ReactNode;
  type?: type;
  typeButtons?: typeButtons;
  nextTooltip?: React.ReactNode | string;
  previousTooltip?: React.ReactNode | string;
  crudsTooltip?: React.ReactNode | string;
  closeTooltip?: React.ReactNode | string;
  onEdit?: (inputObject: object) => void;
  onDuplicate?: (inputObject: object) => void;
  onMove?: (inputObject: object) => void;
  onDelete?: (inputObject: object) => void;
  onId?: (inputObject: object) => void;
  texts: HeaderTexts;
  onCloseClick?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  inputObject: {
    [key: string]: string | React.ReactNode;
  } & object;
  inputObjectIdKey?: string;
  inlineEditInputProps?: InputProps;
  name?: string | number;
  onRename?: (name: string) => void;
  onCancelClick?: () => void;
  onApplyClick?: () => void;
};

export type HeaderTexts = {
  name: string;
  inlineEditPlaceholder: string;
  deleteIcon: string;
  duplicateIcon: string;
  moveIcon: string;
  editIcon: string;
  singleTitle: string;
  cancelButton: string;
  applyButton: string;
  addFolder: string;
};
export type type = {
  type?: 'readonly' | 'editable';
};
export type typeButtons = {
  typeButtons?: 'twoButtons' | 'withNavigation';
};

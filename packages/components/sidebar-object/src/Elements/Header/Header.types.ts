import * as React from 'react';
import { InputProps } from '@synerise/ds-inline-edit/dist/InlineEdit.types';

export type HeaderProps = {
  avatar: React.ReactNode;
  preffix: React.ReactNode;
  tabs: React.ReactNode;
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
    id: string;
    [key: string]: string | React.ReactNode;
  } & object;
  inlineEditInputProps?: InputProps;
  name?: string | number;
  onRename?: (name: string) => void;
};

export type HeaderTexts = {
  name: string;
  inlineEditPlaceholder: string;
  deleteIcon: string;
  duplicateIcon: string;
  moveIcon: string;
  editIcon: string;
};

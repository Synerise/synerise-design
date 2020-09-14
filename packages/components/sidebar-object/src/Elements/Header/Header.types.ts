import * as React from 'react';

export type HeaderProps = {
  value?: string;
  avatar: React.ReactNode;
  name: string;
  preffix: React.ReactNode;
  tabs: React.ReactNode;
  nextTooltip?: React.ReactNode | string;
  previousTooltip?: React.ReactNode | string;
  crudsTooltip?: React.ReactNode | string;
  closeTooltip?: React.ReactNode | string;
  onEdit: (inputObject: object) => void;
  onDuplicate: (inputObject: object) => void;
  onMove: (inputObject: object) => void;
  onDelete: (inputObject: object) => void;
  onId: (inputObject: object) => void;
  texts: HeaderTexts;
  onCloseClick: () => void;
  activeTab: number;
};

export type HeaderTexts = {
  value: string;
  name: string;
  inlineEditPlaceholder: string;
  namePlaceholder: string;
  search: string;
};

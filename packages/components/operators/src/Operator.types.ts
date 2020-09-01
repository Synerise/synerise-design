import * as React from 'react';

export type OperatorsItem = {
  name: string;
  icon: React.ReactNode;
  group?: string;
  groupId: React.ReactText;
  groupName: string;
  id: React.ReactText;
  logic?: string;
  value?: string;
  subGroups?: OperatorsGroup[];
};

export type OperatorsGroup = {
  defaultGroup?: boolean;
  icon: React.ReactNode;
  id: React.ReactText;
  itemType?: string;
  name: string;
  tooltip?: string;
  subGroups?: OperatorsGroup[];
};

export type OperatorsProps = {
  value: OperatorsItem;
  onChange: (item: OperatorsItem | OperatorsGroup) => void;
  groups: OperatorsGroup[];
  items: OperatorsItem[];
};

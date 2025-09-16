export type BaseItemType = {
  id: string | number | null;
  groupId?: string | number;
  subtitle?: string;
  name: string;
};

export type BaseGroupType<SubGroupType> = {
  id: string | number;
  name: string;
  subGroups?: SubGroupType[];
};

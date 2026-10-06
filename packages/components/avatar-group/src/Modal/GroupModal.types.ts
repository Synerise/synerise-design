import type { DataSource, GroupModalSettings } from '../AvatarGroup.types';

export type GroupModalProps = GroupModalSettings & {
  visible: boolean;
  hideModal: () => void;
  showStatus: boolean;
  dataSource: DataSource[];
};

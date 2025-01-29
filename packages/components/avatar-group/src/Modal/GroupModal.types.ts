import { GroupModalSettings, DataSource } from '../AvatarGroup.types';

export type GroupModalProps = GroupModalSettings & {
  visible: boolean;
  hideModal: () => void;
  showStatus: boolean;
  dataSource: readonly DataSource[];
};

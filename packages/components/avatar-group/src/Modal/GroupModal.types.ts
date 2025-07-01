import { type DataSource, type GroupModalSettings } from '../AvatarGroup.types';

export type GroupModalProps = GroupModalSettings & {
  visible: boolean;
  hideModal: () => void;
  showStatus: boolean;
  dataSource: readonly DataSource[];
};

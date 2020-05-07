import Modal from '@synerise/ds-modal/dist/Modal';
import * as React from 'react';
import { Column } from '../ColumnManagerItem/ColumManagerIte.types';
import { GroupSettings } from '../ColumnManager.types';

interface Props {
  hide: () => void;
  onOk: (settings: GroupSettings) => void;
  visible: boolean;
  settings?: GroupSettings;
  column?: Column;
}

const ColumnManagerGroupSettings: React.FC<Props> = ({ hide, visible, column, onOk }: Props) => {
  const handleOk = React.useCallback(() => {
    const settings = {
      column,
      settings: {
        type: {},
      },
    };
    onOk(settings);
  }, [onOk, column]);

  return (
    <Modal onCancel={hide} visible={visible} onOk={handleOk}>
      <span>{column?.name}</span>
    </Modal>
  );
};

export default ColumnManagerGroupSettings;

import * as React from 'react';
import ModalProxy from '@synerise/ds-modal';
import Button from '@synerise/ds-button';
import Radio from '@synerise/ds-radio';
import { RadioChangeEvent } from 'antd/es/radio';
import Select from '@synerise/ds-select';
import { SelectValue } from 'antd/es/select';
import * as S from './DeleteModal.styles';
import { DeleteModalProps, DeleteMode } from './DeleteModal.types';
import { FolderItem } from '../../Folders.types';

const DeleteModal: React.FC<DeleteModalProps> = ({ visible, onClose, deletedItem, folders }: DeleteModalProps) => {
  const [mode, setMode] = React.useState<DeleteMode>('move-to-default');
  const [destination, setDestination] = React.useState<FolderItem | undefined>(undefined);

  const renderSelect = (): React.ReactNode | false =>
    mode === 'move-to-other' && (
      <S.SelectWrapper>
        <Select
          className="destination-folder-select"
          label="Choose folder"
          value={destination?.id}
          onChange={(id: SelectValue): void => {
            setDestination(folders.find(item => item.id === id));
          }}
        >
          {folders
            .filter(i => !!deletedItem && i.id !== deletedItem.id)
            .map(item => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
        </Select>
      </S.SelectWrapper>
    );
  const disablePrimaryButton = (mode === 'move-to-other' && !destination);
  return (
    <ModalProxy
      visible={visible}
      footer={
        <S.Footer>
          <Button type="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="custom-color" color="red" disabled={disablePrimaryButton}>
            Remove folder
          </Button>
        </S.Footer>
      }
      onCancel={onClose}
      title={<div>Remove folder</div>}
    >
      <S.DeleteMessage>
        <strong>Are you sure you want to remove folder?</strong>
        <span>You are going to delete all the content</span>
      </S.DeleteMessage>
      <S.ModePicker>
        <Radio.Group
          value={mode}
          defaultValue="move-to-default"
          onChange={(e: RadioChangeEvent): void => setMode(e.target.value)}
        >
          <Radio value="move-to-default">Move to default</Radio>
          <Radio value="move-to-other">Move to other</Radio>
          {renderSelect()}
          <Radio value="delete-all">Delete all</Radio>
        </Radio.Group>
      </S.ModePicker>
    </ModalProxy>
  );
};

export default DeleteModal;

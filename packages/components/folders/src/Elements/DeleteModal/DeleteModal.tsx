import * as React from 'react';
import ModalProxy from '@synerise/ds-modal';
import Button from '@synerise/ds-button';
import Radio from '@synerise/ds-radio';
import { RadioChangeEvent } from 'antd/es/radio';
import Select from '@synerise/ds-select';
import { SelectValue } from 'antd/es/select';
import Scrollbar from '@synerise/ds-scrollbar';
import * as S from './DeleteModal.styles';
import { DeleteModalProps, DeleteMode } from './DeleteModal.types';
import { FolderItem } from '../../Folders.types';
import { sortAlphabetically } from '../../utils';

const DeleteModal: React.FC<DeleteModalProps> = ({
  visible,
  onClose,
  deletedItem,
  onConfirm,
  folders,
  texts,
}: DeleteModalProps) => {
  const [mode, setMode] = React.useState<DeleteMode>('move-to-default');
  const [destination, setDestination] = React.useState<FolderItem | undefined>(undefined);

  const handleConfirm = React.useCallback(() => {
    onConfirm && onConfirm({ mode, destination });
    onClose && onClose();
  }, [mode, destination, onConfirm, onClose]);
  const renderSelect = (): React.ReactNode | false =>
    mode === 'move-to-other' && (
      <S.SelectWrapper>
        <Select
          className="destination-folder-select"
          label={texts.chooseDestinationFolder}
          value={destination?.name}
          onChange={(id: SelectValue): void => {
            setDestination(folders.find(item => item.id === id));
          }}
          dropdownRender={(menu: React.ReactNode): React.ReactElement => <Scrollbar maxHeight={256}>{menu}</Scrollbar>}
          dropdownStyle={{ padding: '8px 0 8px 8px' }}
          listHeight="100%"
        >
          {folders
            .sort(sortAlphabetically)
            .filter(i => !!deletedItem && i.id !== deletedItem.id)
            .map(item => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
        </Select>
      </S.SelectWrapper>
    );
  const disablePrimaryButton = mode === 'move-to-other' && !destination;
  return (
    <ModalProxy
      visible={visible}
      footer={
        <S.Footer>
          <Button type="ghost" onClick={onClose}>
            {texts.cancel}
          </Button>
          <Button type="custom-color" color="red" onClick={handleConfirm} disabled={disablePrimaryButton}>
            {texts.deleteFolderLabel}
          </Button>
        </S.Footer>
      }
      onCancel={onClose}
      title={<div>{texts.deleteFolderLabel}</div>}
    >
      <S.ModalBody className="ds-folders-delete">
        <S.DeleteMessage>
          <strong>{texts.deleteFolderConfirmationMessage}</strong>
          <span>{texts.deleteFolderDescription}</span>
        </S.DeleteMessage>
        <S.ModePicker>
          <Radio.Group
            value={mode}
            defaultValue="move-to-default"
            onChange={(e: RadioChangeEvent): void => setMode(e.target.value)}
          >
            <Radio value="move-to-default">{texts.moveToDefault}</Radio>
            <Radio value="move-to-other">{texts.moveToOtherFolder}</Radio>
            {renderSelect()}
            <Radio value="delete-all">{texts.deleteAllContent}</Radio>
          </Radio.Group>
        </S.ModePicker>
      </S.ModalBody>
    </ModalProxy>
  );
};

export default DeleteModal;

import * as React from 'react';
import { DeleteModalProps } from './DeleteModal.types';
import * as S from './DeleteModal.styles';
import ModalProxy from '@synerise/ds-modal';
import Button from '@synerise/ds-button';

const DeleteModal: React.FC<DeleteModalProps> = ({ visible, onClose }: DeleteModalProps) => {
  return (
    <ModalProxy
      visible={visible}
      footer={
        <S.Footer>
          <Button type="ghost" onClick={onClose}>Cancel</Button>
          <Button type="custom-color" color="red">
            Remove folder
          </Button>
        </S.Footer>
      }
      onCancel={onClose}
      title={<div>Action</div>}
    >
      <div>Elo</div>
    </ModalProxy>
  );
};

export default DeleteModal;

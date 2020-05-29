import * as React from 'react';
import { AddS, CloseS, DragHandleM, DuplicateS, EditS, TrashS } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import * as S from './Cruds.styles';

export interface Action {
  icon: React.ReactNode;
  onClick: () => void;
  tooltip?: React.ReactNode | string;
}
export interface CrudsProps {
  disabled?: boolean;
  onDelete: any;
  onClick: () => void;
  onAdd: any;
  onEdit: any;
  onDuplicate: any;
  onMove: any;
  onRemove: any;
}

const Cruds: React.FC<CrudsProps> = ({ onDelete, onClick, onAdd, onEdit, onDuplicate, onMove, onRemove }) => {
  return (
    <S.CrudsContainer onClick={onClick} className="ds-cruds">
      {onAdd && (
        <Tooltip title="Add">
          <S.IconWrapper className="add" onClick={onAdd}>
            <Icon component={<AddS />} />
          </S.IconWrapper>
        </Tooltip>
      )}
      {onEdit && (
        <Tooltip title="Edit">
          <S.IconWrapper className="edit" onClick={onEdit}>
            <Icon component={<EditS />} />
          </S.IconWrapper>
        </Tooltip>
      )}
      {onDuplicate && (
        <Tooltip title="Duplicate">
          <S.IconWrapper className="duplicate" onClick={onDuplicate}>
            <Icon component={<DuplicateS />} />
          </S.IconWrapper>
        </Tooltip>
      )}
      {onDelete && (
        <Tooltip title="Delete">
          <S.IconWrapper className="delete" onClick={onDelete}>
            <Icon component={<TrashS />} />
          </S.IconWrapper>
        </Tooltip>
      )}
      {onMove && (
        <Tooltip title="Move">
          <S.IconWrapper className="move" onClick={onMove}>
            <Icon component={<DragHandleM />} />
          </S.IconWrapper>
        </Tooltip>
      )}
      {onRemove && (
        <Tooltip title="Remove">
          <S.IconWrapper className="remove" onClick={onRemove}>
            <Icon component={<CloseS />} />
          </S.IconWrapper>
        </Tooltip>
      )}
    </S.CrudsContainer>
  );
};
export default Cruds;

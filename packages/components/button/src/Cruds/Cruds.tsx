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
  addTooltip: React.ReactNode | string;
  editTooltip: React.ReactNode | string;
  duplicateTooltip: React.ReactNode | string;
  removeTooltip: React.ReactNode | string;
  moveTooltip: React.ReactNode | string;
  deleteTooltip: React.ReactNode | string;
  disabled?: boolean;
  onDelete: () => void;
  onClick: () => void;
  onAdd: () => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onMove: () => void;
  onRemove: () => void;
}

const Cruds: React.FC<CrudsProps> = ({
  onDelete,
  onClick,
  onAdd,
  onEdit,
  onDuplicate,
  onMove,
  onRemove,
  addTooltip,
  editTooltip,
  duplicateTooltip,
  removeTooltip,
  moveTooltip,
  deleteTooltip,
}) => {
  return (
    <S.CrudsContainer onClick={onClick} className="ds-cruds">
      {onAdd && (
        <Tooltip title={addTooltip}>
          <S.IconWrapper className="add" onClick={onAdd}>
            <Icon component={<AddS />} />
          </S.IconWrapper>
        </Tooltip>
      )}
      {onEdit && (
        <Tooltip title={editTooltip}>
          <S.IconWrapper className="edit" onClick={onEdit}>
            <Icon component={<EditS />} />
          </S.IconWrapper>
        </Tooltip>
      )}
      {onDuplicate && (
        <Tooltip title={duplicateTooltip}>
          <S.IconWrapper className="duplicate" onClick={onDuplicate}>
            <Icon component={<DuplicateS />} />
          </S.IconWrapper>
        </Tooltip>
      )}
      {onDelete && (
        <Tooltip title={deleteTooltip}>
          <S.IconWrapper className="delete" onClick={onDelete}>
            <Icon component={<TrashS />} />
          </S.IconWrapper>
        </Tooltip>
      )}
      {onMove && (
        <Tooltip title={moveTooltip}>
          <S.IconWrapper className="move" onClick={onMove}>
            <Icon component={<DragHandleM />} />
          </S.IconWrapper>
        </Tooltip>
      )}
      {onRemove && (
        <Tooltip title={removeTooltip}>
          <S.IconWrapper className="remove" onClick={onRemove}>
            <Icon component={<CloseS />} />
          </S.IconWrapper>
        </Tooltip>
      )}
    </S.CrudsContainer>
  );
};
export default Cruds;

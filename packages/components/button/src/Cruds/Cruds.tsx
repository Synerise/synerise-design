import * as React from 'react';
import { AddS, CloseS, DragHandleM, DuplicateS, EditS, TrashS } from '@synerise/ds-icon/dist/icons';
import * as S from './Cruds.styles';
import SingleCrud from './Singlecrud';

export interface CrudsProps {
  addTooltip?: React.ReactNode | string;
  editTooltip?: React.ReactNode | string;
  duplicateTooltip?: React.ReactNode | string;
  removeTooltip?: React.ReactNode | string;
  moveTooltip?: React.ReactNode | string;
  deleteTooltip?: React.ReactNode | string;
  onDelete?: () => void;
  onAdd?: () => void;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onMove?: () => void;
  onRemove?: () => void;
}

const Cruds: React.FC<CrudsProps> = ({
  onDelete,
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
    <S.CrudsContainer className="ds-cruds">
      {onAdd && <SingleCrud title={addTooltip} className="add" onClick={onAdd} icon={<AddS />} />}

      {onEdit && <SingleCrud title={editTooltip} className="edit" onClick={onEdit} icon={<EditS />} />}
      {onDuplicate && (
        <SingleCrud title={duplicateTooltip} className="duplicate" onClick={onDuplicate} icon={<DuplicateS />} />
      )}
      {onDelete && <SingleCrud title={deleteTooltip} className="delete" onClick={onDelete} icon={<TrashS />} />}
      {onMove && <SingleCrud title={moveTooltip} className="move" onClick={onMove} icon={<DragHandleM />} />}
      {onRemove && <SingleCrud title={removeTooltip} className="remove" onClick={onRemove} icon={<CloseS />} />}
    </S.CrudsContainer>
  );
};
export default Cruds;

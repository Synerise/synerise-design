import * as React from 'react';
import { AddS, CloseS, DragHandleM, DuplicateS, EditS, TrashS } from '@synerise/ds-icon/dist/icons';
import * as S from './Cruds.styles';
import SingleAction from './SingleAction';
import { CrudsProps } from './Cruds.types';

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
      {onAdd && <SingleAction title={addTooltip} className="add" onClick={onAdd} icon={<AddS />} />}

      {onEdit && <SingleAction title={editTooltip} className="edit" onClick={onEdit} icon={<EditS />} />}
      {onDuplicate && (
        <SingleAction title={duplicateTooltip} className="duplicate" onClick={onDuplicate} icon={<DuplicateS />} />
      )}
      {onDelete && <SingleAction title={deleteTooltip} className="delete" onClick={onDelete} icon={<TrashS />} />}
      {onMove && <SingleAction title={moveTooltip} className="move" onClick={onMove} icon={<DragHandleM />} />}
      {onRemove && <SingleAction title={removeTooltip} className="remove" onClick={onRemove} icon={<CloseS />} />}
    </S.CrudsContainer>
  );
};
export default Cruds;

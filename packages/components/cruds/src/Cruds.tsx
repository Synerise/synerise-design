import * as React from 'react';
import { AddS, CloseS, DragHandleM, DuplicateS, EditS, TrashS } from '@synerise/ds-icon/dist/icons';
import * as S from './Cruds.styles';
import SingleAction from './SingleAction';
import { CrudsProps, CrudsSubComponents } from './Cruds.types';
import { SingleActionProps } from './SingleAction.types';

const Cruds: React.FC<CrudsProps> & CrudsSubComponents = ({
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
  ...rest
}) => {
  return (
    <S.CrudsContainer className="ds-cruds" {...rest}>
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

Cruds.CustomAction = (props: SingleActionProps): React.ReactElement<SingleActionProps> =>
  SingleAction(props) as React.ReactElement<SingleActionProps>;

export default Cruds;

import * as React from 'react';
import { AddS, CloseS, DragHandleM, DuplicateS, EditS, TrashS, ArrowDownS, ArrowUpS } from '@synerise/ds-icon';
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
  onMoveUp,
  onMoveDown,
  moveDownInactive,
  moveUpInactive,
  addTooltip,
  editTooltip,
  duplicateTooltip,
  removeTooltip,
  moveTooltip,
  moveUpTooltip,
  moveDownTooltip,
  deleteTooltip,
  ...rest
}) => {
  return (
    <S.CrudsContainer className="ds-cruds" {...rest}>
      {onMoveUp && (
        <SingleAction
          title={moveUpTooltip}
          inactive={moveUpInactive}
          className="moveup"
          onClick={onMoveUp}
          icon={<ArrowUpS />}
        />
      )}
      {onMoveDown && (
        <SingleAction
          title={moveDownTooltip}
          inactive={moveDownInactive}
          className="movedown"
          onClick={onMoveDown}
          icon={<ArrowDownS />}
        />
      )}
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

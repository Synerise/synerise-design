import React from 'react';

import {
  AddS,
  ArrowDownS,
  ArrowUpS,
  CloseS,
  DragHandleM,
  DuplicateS,
  EditS,
  ShowM,
  TrashS,
} from '@synerise/ds-icon';

import * as S from './Cruds.styles';
import { type CrudsProps, type CrudsSubComponents } from './Cruds.types';
import SingleAction from './SingleAction';
import { type SingleActionProps } from './SingleAction.types';

const Cruds: React.FC<CrudsProps> & CrudsSubComponents = ({
  onDelete,
  onAdd,
  onPreview,
  onEdit,
  onDuplicate,
  onMove,
  onRemove,
  onMoveUp,
  onMoveDown,
  moveDownInactive,
  moveUpInactive,
  addTooltip,
  previewTooltip,
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
          data-testid="ds-cruds-moveup"
        />
      )}
      {onMoveDown && (
        <SingleAction
          title={moveDownTooltip}
          inactive={moveDownInactive}
          className="movedown"
          onClick={onMoveDown}
          icon={<ArrowDownS />}
          data-testid="ds-cruds-movedown"
        />
      )}
      {onAdd && (
        <SingleAction
          title={addTooltip}
          className="add"
          onClick={onAdd}
          icon={<AddS />}
          data-testid="ds-cruds-add"
        />
      )}

      {onEdit && (
        <SingleAction
          title={editTooltip}
          className="edit"
          onClick={onEdit}
          icon={<EditS />}
          data-testid="ds-cruds-edit"
        />
      )}
      {onPreview && (
        <SingleAction
          title={previewTooltip}
          className="preview"
          onClick={onPreview}
          icon={<ShowM />}
          data-testid="ds-cruds-preview"
        />
      )}
      {onDuplicate && (
        <SingleAction
          title={duplicateTooltip}
          className="duplicate"
          onClick={onDuplicate}
          icon={<DuplicateS />}
          data-testid="ds-cruds-duplicate"
        />
      )}
      {onDelete && (
        <SingleAction
          title={deleteTooltip}
          className="delete"
          onClick={onDelete}
          icon={<TrashS />}
          data-testid="ds-cruds-delete"
        />
      )}
      {onMove && (
        <SingleAction
          title={moveTooltip}
          className="move"
          onClick={onMove}
          icon={<DragHandleM />}
          data-testid="ds-cruds-move"
        />
      )}
      {onRemove && (
        <SingleAction
          title={removeTooltip}
          className="remove"
          onClick={onRemove}
          icon={<CloseS />}
          data-testid="ds-cruds-remove"
        />
      )}
    </S.CrudsContainer>
  );
};

Cruds.CustomAction = (
  props: SingleActionProps,
): React.ReactElement<SingleActionProps> =>
  SingleAction(props) as React.ReactElement<SingleActionProps>;

export default Cruds;

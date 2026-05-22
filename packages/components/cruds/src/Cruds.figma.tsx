// @ts-nocheck
import figma from '@figma/code-connect';

import Cruds from './Cruds';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=148-2011&m=dev';

figma.connect(Cruds, FIGMA_URL, {
  props: {
    onAdd: figma.boolean('icon1Visibility', {
      true: () => {},
      false: undefined,
    }),
    onEdit: figma.boolean('icon2Visibility', {
      true: () => {},
      false: undefined,
    }),
    onDuplicate: figma.boolean('icon3Visibility', {
      true: () => {},
      false: undefined,
    }),
    onDelete: figma.boolean('icon4Visibility', {
      true: () => {},
      false: undefined,
    }),
    onMoveUp: figma.boolean('icon5Visibility', {
      true: () => {},
      false: undefined,
    }),
    onMoveDown: figma.boolean('icon6Visibility', {
      true: () => {},
      false: undefined,
    }),
    onPreview: figma.boolean('icon7Visibility', {
      true: () => {},
      false: undefined,
    }),
    onRemove: figma.boolean('icon8Visibility', {
      true: () => {},
      false: undefined,
    }),
    onMove: figma.boolean('icon9Visibility', {
      true: () => {},
      false: undefined,
    }),
  },
  example: ({
    onAdd,
    onEdit,
    onDuplicate,
    onDelete,
    onMoveUp,
    onMoveDown,
    onPreview,
    onRemove,
    onMove,
  }) => (
    <Cruds
      onAdd={onAdd}
      onEdit={onEdit}
      onDuplicate={onDuplicate}
      onDelete={onDelete}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
      onPreview={onPreview}
      onRemove={onRemove}
      onMove={onMove}
      addTooltip="Add"
      editTooltip="Edit"
      duplicateTooltip="Duplicate"
      deleteTooltip="Delete"
      moveUpTooltip="Move up"
      moveDownTooltip="Move down"
      previewTooltip="Preview"
      removeTooltip="Remove"
      moveTooltip="Move"
    />
  ),
});

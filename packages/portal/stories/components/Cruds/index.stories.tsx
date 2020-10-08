import * as React from 'react';

import Cruds from '@synerise/ds-cruds';
import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';

const crudsoptions = {
  Multiple: 'Multiple',
  Add: 'Add',
  Edit: 'Edit',
  Duplicate: 'Duplicate',
  Delete: 'Delete',
  Remove: 'Remove',
  Move: 'Move',
};

const getCrudsKnobs = () => ({
  type: select('Set type', crudsoptions, 'Multiple'),
});

const stories = {
  default: () => {
    const crudProps = getCrudsKnobs();
    const props = {
      ...crudProps,
      style: {
        margin: 4,
      },
    } as object;
    return (
<div>
  <Cruds
    {...props}
    onAdd={crudProps.type === 'Add' || crudProps.type === 'Multiple' ? action('onAdd event triggered') : null}
    addTooltip="Add"
    onDelete={
      crudProps.type === 'Delete' || crudProps.type === 'Multiple' ? action('onDelete event triggered') : null
    }
    deleteTooltip="Delete"
    onDuplicate={
      crudProps.type === 'Duplicate' || crudProps.type === 'Multiple'
        ? action('onDuplicate event triggered')
        : null
    }
    duplicateTooltip="Duplicate"
    onEdit={crudProps.type === 'Edit' || crudProps.type === 'Multiple' ? action('onEdit event triggered') : null}
    editTooltip="Edit"
    onMove={crudProps.type === 'Move' ? action('onMove event triggered') : null}
    moveTooltip="Move"
    onRemove={crudProps.type === 'Remove' ? action('onRemove event triggered') : null}
    removeTooltip="Remove"
  />
</div>
);
  }
};

export default {
name: 'Components/Cruds',
  config: {},
  stories,
  Component: Cruds,
}

import * as React from 'react';
import { action } from '@storybook/addon-actions';
import Cruds from '@synerise/ds-cruds';
import mdx from './Cruds.mdx';

const CRUDS_OPTIONS = {
  Multiple: 'Multiple',
  Add: 'Add',
  Edit: 'Edit',
  Duplicate: 'Duplicate',
  Delete: 'Delete',
  Remove: 'Remove',
  Move: 'Move',
};

const getCrudsKnobs = ({
  type:{
    options:['Multiple', 'Add', 'Edit', 'Duplicate', 'Delete','Remove', 'Move'],
    control: {
      type: 'select',
      labels: {
        Multiple: 'Multiple',
        Add: 'Add',
        Edit: 'Edit',
        Duplicate: 'Duplicate',
        Delete: 'Delete',
        Remove: 'Remove',
        Move: 'Move',
      }
    },
    defaultValue:"Multiple"
  }
});

export default {
  title: 'Components/Cruds',
  component: Cruds,
  parameters: {
    docs: { page: mdx },
  },
};

const Template = (args) => <Cruds {...args } 
    onAdd={args.type === 'Add' || args.type === 'Multiple' ? action('onAdd event triggered') : null}
    addTooltip="Add"
    onDelete={args.type === 'Delete' || args.type === 'Multiple' ? action('onDelete event triggered') : null}
    deleteTooltip="Delete"
    onDuplicate={ args.type === 'Duplicate' || args.type === 'Multiple' ? action('onDuplicate event triggered') : null}
    duplicateTooltip="Duplicate"
    onEdit={args.type === 'Edit' || args.type === 'Multiple' ? action('onEdit event triggered') : null}
    editTooltip="Edit"
    onMove={args.type === 'Move' ? action('onMove event triggered') : null }
    moveTooltip="Move"
    onRemove={args.type === 'Remove' ? action('onRemove event triggered') : null}
    removeTooltip="Remove"
    style= {{
      margin: 4,
    }}
    />
export const Basic = (args) => <Cruds {...args } 
onAdd={args.type === 'Add' || args.type === 'Multiple' ? action('onAdd event triggered') : null}
addTooltip="Add"
onDelete={args.type === 'Delete' || args.type === 'Multiple' ? action('onDelete event triggered') : null}
deleteTooltip="Delete"
onDuplicate={ args.type === 'Duplicate' || args.type === 'Multiple' ? action('onDuplicate event triggered') : null}
duplicateTooltip="Duplicate"
onEdit={args.type === 'Edit' || args.type === 'Multiple' ? action('onEdit event triggered') : null}
editTooltip="Edit"
onMove={args.type === 'Move' ? action('onMove event triggered') : null }
moveTooltip="Move"
onRemove={args.type === 'Remove' ? action('onRemove event triggered') : null}
removeTooltip="Remove"
style= {{
  margin: 4,
}}
/>

Basic.args={
  type:'Multiple',
}
Basic.argTypes={
  
  type:{
    options:['Multiple', 'Add', 'Edit', 'Duplicate', 'Delete','Remove', 'Move'],
    control: {
      type: 'select',
      labels: {
        Multiple: 'Multiple',
        Add: 'Add',
        Edit: 'Edit',
        Duplicate: 'Duplicate',
        Delete: 'Delete',
        Remove: 'Remove',
        Move: 'Move',
      }
    },
    defaultValue:"Multiple",
    default:"Multiple"
  },
  addTooltip:{control:''},

}


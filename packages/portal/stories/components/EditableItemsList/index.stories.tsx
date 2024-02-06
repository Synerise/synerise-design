import * as React from 'react';
import { useState } from "react";
import { boolean, number, text } from '@storybook/addon-knobs';
import EditableItemsList from '@synerise/ds-editable-items-list';
import { theme } from '@synerise/ds-core';
import InputNumber from '@synerise/ds-input-number';
import { Text } from '@synerise/ds-typography';
import Select from '@synerise/ds-select';
import Icon, { Add3M } from '@synerise/ds-icon';
import { v4 as uuidv4 } from 'uuid';
import { action } from '@storybook/addon-actions';

type RowData = {
  numberValue: number | null;
  selectedOption: string | null |  undefined;
};

const inputStyle = {
  flex: 1,
  width: '100px',
};

const selectStyle = {
  width: '200px',
};

const renderRowElement = (index: number, data: RowData) => (
  <React.Fragment key={index}>
    <Text size="small">Show me only</Text>
    <InputNumber
      style={inputStyle}
      defaultValue={data.numberValue}
    />
    <Text size="small">items with the same</Text>
    <Select
      style={selectStyle}
      defaultValue={data.selectedOption || ''}
    >
      <Select.Option value="1">Option 1</Select.Option>
      <Select.Option value="2">Option 2</Select.Option>
      <Select.Option value="3">Option 3</Select.Option>
    </Select>
  </React.Fragment>
);

const stories = {
  default: () => {
    const [items, setItems] = useState([
      { numberValue: 10, selectedOption: '2', id: 'uuid1' },
      { numberValue: 3, selectedOption: '3', id: 'uuid2' }
    ]);
    const addButtonLabel = text('Add Button Label', 'Add another');
    const showDefaultIcon = boolean('Show Default Add Icon', true);

    const handleAdd = () => {
      if (items.length < number('Max Row Length', 4)) {
        const newItem = { id: uuidv4() };
        setItems([...items, newItem]);
        action('onAdd')(newItem);
      }
    };

    return (
      <EditableItemsList<RowData>
        items={items}
        addButtonLabel={<div>{addButtonLabel}</div>}
        addButtonIcon={showDefaultIcon ? <Icon component={<Add3M />} size={24} color={theme.palette['blue-600']} /> : undefined}
        renderRowElement={(index, data) => renderRowElement(index, data)}
        minRowLength={number('Min Row Length', 3)}
        maxRowLength={number('Max Row Length', 4)}
        deleteTooltip={text('Tooltip Message', 'Your tooltip message here')}
        onDelete={(id, index) => {
          setItems(items.filter((item, i) => i !== index));
          action('onDelete')(id);
        }}
        onAdd={handleAdd}
      />
    );
  },
};

export default {
  name: 'Components/EditableItemsList',
  stories,
  Component: EditableItemsList,
};
import React, { useState } from 'react';
import { isEqual } from 'lodash';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Collector, { CollectorProps, CollectorValue } from '@synerise/ds-collector';

import { BOOLEAN_CONTROL, CLASSNAME_ARG_CONTROL, fixedWrapper588, REACT_NODE_AS_STRING, STRING_CONTROL } from '../../utils';
import { SUGGESTIONS_SAME_LABEL, SUGGESTIONS, TEXTS } from './Collector.const';
import { HeaderWrapper } from './Collestor.styles';

export default {
  title: 'Components/Collector',
  component: Collector,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [fixedWrapper588],
  render: ({suggestions, ...args}) => {
    const [selected, setSelected] = useState<CollectorValue[]>(args.selected || []);
    const handleItemSelect = (item: CollectorValue) => {
      if (!selected.find(i => isEqual(i, item))) {
        setSelected([...selected, item]);
      }
      args.onItemSelect?.(item);
    };
    const handleMultipleItemsSelect = (items: CollectorValue[]) => {
      const itemsToAdd = items.filter(item => {
        return !selected.find(i => isEqual(i, item));
      });
      setSelected([...selected, ...itemsToAdd]);
      args.onMultipleItemsSelect?.(items);
    };
    const handleItemDeselect = (item: CollectorValue) => {
      setSelected(selected.filter(i => !isEqual(i, item)));
      args.onItemDeselect?.(item);
    };
    const handleCancel = () => {
      setSelected([]);
      args.onCancel?.();
    };
    const handleConfirm = (items: CollectorValue[]) => {
      setSelected([]);
      args.onConfirm?.(items);
    };
    const handleAdd = (value: string) => {
      args.onItemAdd?.(value);
      return {
        text: value,
      };
    };
    const filteredSuggestions = suggestions.filter(suggestion => !selected.includes(suggestion))
    return (
      <Collector
        {...args}
        texts={TEXTS}
        selected={selected}
        onItemSelect={handleItemSelect}
        onItemAdd={handleAdd}
        onMultipleItemsSelect={handleMultipleItemsSelect}
        onItemDeselect={handleItemDeselect}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        suggestions={filteredSuggestions}
      />
    );
  },
  argTypes: {
    allowCustomValue: BOOLEAN_CONTROL,
    allowCustomValues: BOOLEAN_CONTROL,
    allowPaste: BOOLEAN_CONTROL,
    disableButtonPanel: BOOLEAN_CONTROL,
    disabled: BOOLEAN_CONTROL,
    disableSearch: BOOLEAN_CONTROL,
    className: CLASSNAME_ARG_CONTROL,
    enableCustomFilteringSuggestions: BOOLEAN_CONTROL,
    error: BOOLEAN_CONTROL,
    errorText: REACT_NODE_AS_STRING,
    fixedHeight: BOOLEAN_CONTROL,
    hideDropdownOnClickOutside: BOOLEAN_CONTROL,
    keepSearchQueryOnSelect: BOOLEAN_CONTROL,
    label: REACT_NODE_AS_STRING,
    description: REACT_NODE_AS_STRING,
    listHeader: REACT_NODE_AS_STRING,
    searchValue: STRING_CONTROL,
    showCount: BOOLEAN_CONTROL,
    showNavigationHints: BOOLEAN_CONTROL,
  },
  args: {
    onCategorySelect: fn(),
    onCancel: fn(),
    onConfirm: fn(),
    onItemAdd: fn(),
    onItemDeselect: fn(),
    onItemSelect: fn(),
    onMultipleItemsSelect: fn(),
    onSearchValueChange: fn(),
    allowMultipleValues: true,
    suggestions: SUGGESTIONS
  },
} as Meta<CollectorProps>;

type Story = StoryObj<CollectorProps>;

export const Default: Story = {};
export const WithLabelAndDescription: Story = {
  args: {
    label: 'Label',
    description: 'Description',
  },
};

export const WithError: Story = {
  args: {
    ...WithLabelAndDescription.args,
    error: true,
    errorText: 'Error message',
  },
};

export const WithCounter: Story = {
  args: {
    ...WithLabelAndDescription.args,
    showCount: true,
  },
};
export const AllowCustomValues: Story = {
  args: {
    ...WithLabelAndDescription.args,
    allowCustomValue: true,
  },
};

export const DuplicateLabels: Story = {
  args: {
    ...WithLabelAndDescription.args,
    allowCustomValue: true,
    suggestions: SUGGESTIONS_SAME_LABEL
  },
};
export const AllowPaste: Story = {
  args: {
    ...WithLabelAndDescription.args,
    description:
      'Paste values separated by a semicolon ;',
    allowMultipleValues: true,
    allowPaste: true,
    valuesSeparator: ';',
    allowCustomValue: true,
  },
};


export const DropdownCustomisation: Story = {
  args: {
    ...WithLabelAndDescription.args,
    showNavigationHints: true,
    fixedHeight: true,
    listHeader: <HeaderWrapper>Custom list header</HeaderWrapper>,
  },
};
export const FixedHeight: Story = {
  args: {
    ...WithLabelAndDescription.args,
    selected: SUGGESTIONS.slice(1, 8),
    fixedHeight: true,
  },
};
export const VariableHeight: Story = {
  args: {
    ...WithLabelAndDescription.args,
    selected: SUGGESTIONS.slice(1, 12),
  },
};

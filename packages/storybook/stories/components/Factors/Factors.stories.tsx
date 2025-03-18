import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { within, userEvent, expect, fn, waitFor } from '@storybook/test';

import Icon, { CalculatorM, EditM, ParagraphM, SegmentM, VarTypeStringM } from '@synerise/ds-icon';
import Factors, { ParameterValueType, ALL_FACTOR_TYPES, FactorsProps, FactorValueComponentProps } from '@synerise/ds-factors';
import {
  BOOLEAN_CONTROL,
  controlFromOptionsArray,
  fixedWrapper300,
  flexColumnWrapper
} from '../../utils';
import { FACTORS_GROUPS, FACTORS_ITEMS, FACTORS_ITEMS_ADDITONAL_DATA, FACTORS_TEXTS, SELECTED_PARAMETER } from './Factors.data';
import Button from '@synerise/ds-button';
import { ITEMS_IN_SECTIONS, SECTIONS } from '../ItemPicker/ItemPicker.data';
import ItemPicker, { BaseItemType, ItemPickerPropsNew } from '@synerise/ds-item-picker';
import { ListItemProps } from '@synerise/ds-list-item';
import { SelectedItem } from '../ItemPicker/ItemPicker.stories';

const FactorsMeta = {
  title: 'Components/Filter/Factors',
  component: Factors,
  tags: ['autodocs'],
  decorators: [fixedWrapper300],
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  render: args => {
    const [{ value, selectedFactorType }, updateArgs] = useArgs();
    const handleSelectFactorType = factorType => {
      updateArgs({
        value: '',
        selectedFactorType: factorType,
      });
      args.setSelectedFactorType?.(factorType);
    };
    const handleChangeValue = newValue => {
      updateArgs({ value: newValue });
      args.onChangeValue?.(newValue);
    };
    return (
      <div data-popup-container>
        <Factors
          {...args}
          value={value}
          onChangeValue={handleChangeValue}
          setSelectedFactorType={handleSelectFactorType}
          selectedFactorType={selectedFactorType}
        />
      </div>
    );
  },
  argTypes: {
    onDeactivate: {
      action: 'onDeactivate',
    },
    onChangeValue: {
      action: 'onChangeValue',
    },
    setSelectedFactorType: {
      action: 'setSelectedFactorType',
    },
    readOnly: BOOLEAN_CONTROL,
    preventAutoloadData: BOOLEAN_CONTROL,
    opened: BOOLEAN_CONTROL,
    allowClear: BOOLEAN_CONTROL,
    loading: BOOLEAN_CONTROL,
    error: BOOLEAN_CONTROL,
    withoutTypeSelector: BOOLEAN_CONTROL,
    selectedFactorType: controlFromOptionsArray('select', ALL_FACTOR_TYPES),

  },
  args: {
    value: '',
    defaultFactorType: 'text',
    textType: 'default',
    opened: false,
    allowClear: false,
    parameters: {
      buttonLabel: 'Parameter',
      buttonIcon: <VarTypeStringM />,
      groups: FACTORS_GROUPS,
      items: FACTORS_ITEMS,
    },
    texts: FACTORS_TEXTS,
  },
} as Meta<FactorsProps>;

export default FactorsMeta;

type Story = StoryObj<FactorsProps>;

export const Default: Story = {};

export const ParameterTypeRenderEmptyGroups: Story = {
  args: {
    ...FactorsMeta.args,
    selectedFactorType: 'parameter',
    value: SELECTED_PARAMETER,
    parameters: {
      buttonLabel: 'Parameter',
      buttonIcon: <VarTypeStringM />,
      groups: FACTORS_GROUPS,
      items: FACTORS_ITEMS,
      renderEmptyGroups: true
    }
  }
};

export const ParameterType: Story = {
  args: {
    ...FactorsMeta.args,
    selectedFactorType: 'parameter',
    value: SELECTED_PARAMETER,
    parameters: {
      buttonLabel: 'Parameter',
      buttonIcon: <VarTypeStringM />,
      groups: FACTORS_GROUPS,
      items: FACTORS_ITEMS,
    }
  }
};

type ItemType = typeof ITEMS_IN_SECTIONS[number];
type RenderTriggerType = Required<ItemPickerPropsNew<ItemType, undefined>>['renderTrigger'];
type TriggerProps = Parameters<RenderTriggerType>[0];

const mapParameterValueTypeToListItem = (item: ParameterValueType) => {
  const listItem: ItemType = {
    id: item.id as string,
    text: item.name,
    informationCardProps: {
      title: item.name,
      subtitle: item.type
    }
  }
  return listItem
}

const mapPickerTypeToFactorValueType = (item: ItemType) => {
  const result: ParameterValueType = {
    id: item.id as string,
    type: 'some type',
    name: item.text,
    icon: <EditM />
  }
  return result
}

const CustomParameterFactorValueComponent = ({ onActivate, getPopupContainerOverride, readOnly, onDeactivate, onChange, onParamsClick, opened, value}: FactorValueComponentProps) => {
  const selectedItem = mapParameterValueTypeToListItem(value as ParameterValueType);
  const renderTrigger = ({ selected, disabled }: Partial<TriggerProps>) => (
    <Button groupVariant='right-rounded' disabled={disabled} color={selected && 'green'} mode={selected? 'icon-label' : ''} type={selected? 'custom-color' : "secondary"}>{selected ? (<><Icon component={<VarTypeStringM />} /> {selected.text}</>) : 'Choose parameter'}</Button>
  );
  const [localOpen, setLocalOpen] = useState(opened);
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      onActivate?.();
    } else {
      onDeactivate?.();
    }
    setLocalOpen(isOpen);
  };
  const handleChange = (item: ItemType) => {
    onChange(mapPickerTypeToFactorValueType(item));
    setLocalOpen(false)
  }
  return readOnly ? (
    renderTrigger({ selected: selectedItem, disabled: true })
  ) : (
    <ItemPicker
      dropdownProps={{
        onOpenChange: handleOpenChange,
        getPopupContainer: getPopupContainerOverride,
        open: localOpen,
      }}
      selectedItem={selectedItem}
      onChange={handleChange}
      isNewVersion
      items={ITEMS_IN_SECTIONS}
      sections={SECTIONS}
      renderTrigger={renderTrigger}
    />
  );
}

export const CustomisedParameterType: Story = {
  args: {
    ...FactorsMeta.args,
    selectedFactorType: 'parameter',
    value: SELECTED_PARAMETER,
    customFactorValueComponents: {
      parameter: {
        component: CustomParameterFactorValueComponent
      }
    },
    parameters: {
      buttonLabel: 'Parameter',
      buttonIcon: <VarTypeStringM />,
      groups: FACTORS_GROUPS,
      items: FACTORS_ITEMS,
    }
  }
};


export const ParameterTypeSearch: Story = {
  args: {
    ...FactorsMeta.args,
    selectedFactorType: 'parameter',
    value: SELECTED_PARAMETER,
    parameters: {
      buttonLabel: 'Parameter',
      buttonIcon: <VarTypeStringM />,
      groups: FACTORS_GROUPS,
      items: [...FACTORS_ITEMS, ...FACTORS_ITEMS_ADDITONAL_DATA],
    }
  }
};

export const Open: Story = {
  args: {
    opened: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const typeDropdownTrigger = canvas.getByRole('button');
    await userEvent.click(typeDropdownTrigger);
    await waitFor(() => expect(canvas.getAllByRole('menuitem')).toHaveLength(ALL_FACTOR_TYPES.length));
  },
};

export const AllTypes: Story = {
  decorators: [flexColumnWrapper],
  parameters: {
    controls: {
        include: ['readOnly', 'error']
    }
  },
  args: {
    onChangeValue: fn()
  },
  render: (args) => {
    return (
      <>
        {ALL_FACTOR_TYPES.map((factorType, index) => (
          <div data-popupindex-container style={{position: 'relative', zIndex: 100-index}}>
            <Factors {...FactorsMeta.args} {...args} selectedFactorType={factorType} />
          </div>
        ))}
      </>
    );
  },
};

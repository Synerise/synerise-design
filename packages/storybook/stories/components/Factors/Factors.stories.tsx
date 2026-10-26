import { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import Button from '@synerise/ds-button';
import Factors, {
  ALL_FACTOR_TYPES,
  FactorsProps,
  FactorValueComponentProps,
  ParameterValueType,
} from '@synerise/ds-factors';
import Icon, { EditM, VarTypeStringM } from '@synerise/ds-icon';
import ItemPicker, { ItemPickerPropsNew } from '@synerise/ds-item-picker';

import {
  BOOLEAN_CONTROL,
  controlFromOptionsArray,
  fixedWrapper300,
  flexColumnWrapper,
} from '../../utils';
import { ITEMS_IN_SECTIONS, SECTIONS } from '../ItemPicker/ItemPicker.data';
import { SelectedItem } from '../ItemPicker/ItemPicker.stories';
import {
  FACTORS_GROUPS,
  FACTORS_ITEMS,
  FACTORS_ITEMS_ADDITONAL_DATA,
  FACTORS_TEXTS,
  SELECTED_PARAMETER,
} from './Factors.data';

const FactorsMeta = {
  title: 'Components/Filter/Factors',
  component: Factors,

  decorators: [fixedWrapper300],
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  render: (args) => {
    const [opened, setOpened] = useState(args.opened);
    const [value, setValue] = useState(args.value);
    const [selectedFactorType, setSelectedFactorType] = useState(
      args.selectedFactorType,
    );

    const handleSelectFactorType = (factorType) => {
      setSelectedFactorType(factorType);
      args.setSelectedFactorType?.(factorType);
    };
    const handleChangeValue = (newValue) => {
      setValue(newValue);
      args.onChangeValue?.(newValue);
    };
    const handleActivate = () => {
      setOpened(true);
      args.onActivate?.();
    };
    const handleDeactivate = () => {
      setOpened(false);
      args.onDeactivate?.();
    };
    return (
      <div data-popup-container>
        <Factors
          {...args}
          opened={opened}
          value={value}
          onChangeValue={handleChangeValue}
          setSelectedFactorType={handleSelectFactorType}
          selectedFactorType={selectedFactorType}
          onActivate={handleActivate}
          onDeactivate={handleDeactivate}
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
    timeZone: {
      ...BOOLEAN_CONTROL,
      description:
        'Passed to the Date factor input. Enables timezone-aware date picking. `true` uses the provider timezone; a string uses a specific IANA timezone.',
    },
  },
  args: {
    onActivate: fn(),
    onChangeValue: fn(),
    onDeactivate: fn(),
    onParamsClick: fn(),
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

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Factors
  selectedFactorType="text"
  value=""
  onChangeValue={handleChange}
  defaultFactorType="text"
/>`,
      },
    },
  },
};

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
      renderEmptyGroups: true,
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<Factors
  selectedFactorType="parameter"
  value={selectedParameter}
  onChangeValue={handleChange}
  parameters={{
    buttonLabel: 'Parameter',
    buttonIcon: <VarTypeStringM />,
    groups: groups,
    items: items,
    renderEmptyGroups: true,
  }}
/>`,
      },
    },
  },
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
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<Factors
  selectedFactorType="parameter"
  value={selectedParameter}
  onChangeValue={handleChange}
  parameters={{
    buttonLabel: 'Parameter',
    buttonIcon: <VarTypeStringM />,
    groups: groups,
    items: items,
  }}
/>`,
      },
    },
  },
};

export const RelativeDate: Story = {
  args: {
    ...FactorsMeta.args,
    selectedFactorType: 'relativeDate',
    value: {
      temporalUnit: 'HOURS',
      temporalModifier: -10,
    },
    relativeDateProps: {
      availableUnits: ['HOURS', 'DAYS', 'WEEKS', 'MONTHS'],
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<Factors
  selectedFactorType="relativeDate"
  value={{ temporalUnit: 'HOURS', temporalModifier: -10 }}
  onChangeValue={handleChange}
  relativeDateProps={{
    availableUnits: ['HOURS', 'DAYS', 'WEEKS', 'MONTHS'],
  }}
/>`,
      },
    },
  },
};

type ItemType = (typeof ITEMS_IN_SECTIONS)[number];
type RenderTriggerType = Required<
  ItemPickerPropsNew<ItemType, undefined>
>['renderTrigger'];
type TriggerProps = Parameters<RenderTriggerType>[0];

const mapParameterValueTypeToListItem = (item: ParameterValueType) => {
  const listItem: ItemType = {
    id: item.id as string,
    text: item.name,
    informationCardProps: {
      title: item.name,
      subtitle: item.type,
    },
  };
  return listItem;
};

const mapPickerTypeToFactorValueType = (item: ItemType) => {
  const result: ParameterValueType = {
    id: item.id as string,
    type: 'some type',
    name: item.text,
    icon: <EditM />,
  };
  return result;
};

const CustomParameterFactorValueComponent = ({
  onActivate,
  getPopupContainerOverride,
  readOnly,
  onDeactivate,
  onChange,
  onParamsClick,
  opened,
  value,
}: FactorValueComponentProps) => {
  const selectedItem = mapParameterValueTypeToListItem(
    value as ParameterValueType,
  );
  const renderTrigger = ({ selected, disabled }: Partial<TriggerProps>) => (
    <Button
      groupVariant="right-rounded"
      disabled={disabled}
      color={selected && 'green'}
      mode={selected ? 'icon-label' : ''}
      type={selected ? 'custom-color' : 'secondary'}
    >
      {selected ? (
        <>
          <Icon component={<VarTypeStringM />} /> {selected.text}
        </>
      ) : (
        'Choose parameter'
      )}
    </Button>
  );
  const [localOpen, setLocalOpen] = useState(opened);
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      onActivate?.();
    }
    setLocalOpen(isOpen);
  };
  const handleChange = (item: ItemType) => {
    onChange(mapPickerTypeToFactorValueType(item));
    setLocalOpen(false);
  };
  return readOnly ? (
    renderTrigger({ selected: selectedItem, disabled: true })
  ) : (
    <ItemPicker
      dropdownProps={{
        onOpenChange: handleOpenChange,
        onDismiss: () => {
          onDeactivate?.();
        },
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
};

export const CustomisedParameterType: Story = {
  args: {
    ...FactorsMeta.args,
    selectedFactorType: 'parameter',
    value: SELECTED_PARAMETER,
    customFactorValueComponents: {
      parameter: {
        component: CustomParameterFactorValueComponent,
      },
    },
    parameters: {
      buttonLabel: 'Parameter',
      buttonIcon: <VarTypeStringM />,
      groups: FACTORS_GROUPS,
      items: FACTORS_ITEMS,
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<Factors
  selectedFactorType="parameter"
  value={selectedParameter}
  onChangeValue={handleChange}
  customFactorValueComponents={{
    parameter: { component: CustomParameterInput },
  }}
/>`,
      },
    },
  },
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
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<Factors
  selectedFactorType="parameter"
  value={selectedParameter}
  onChangeValue={handleChange}
  parameters={{
    buttonLabel: 'Parameter',
    buttonIcon: <VarTypeStringM />,
    groups: groups,
    items: items,
  }}
/>`,
      },
    },
  },
};

export const ArrayString: Story = {
  args: {
    ...FactorsMeta.args,
    selectedFactorType: 'array',
    value: ['item A', 'item B'],
    opened: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<Factors
  selectedFactorType="array"
  value={['item A', 'item B']}
  onChangeValue={handleChange}
/>`,
      },
    },
  },
};

export const ArrayNumeric: Story = {
  args: {
    ...FactorsMeta.args,
    selectedFactorType: 'array',
    value: [123123, 345345, 3454, 34234, 234],
    opened: true,
    arrayProps: {
      itemType: 'number',
      limit: 20,
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<Factors
  selectedFactorType="array"
  value={[123, 345, 789]}
  onChangeValue={handleChange}
  arrayProps={{ itemType: 'number', limit: 20 }}
/>`,
      },
    },
  },
};

export const Open: Story = {
  args: {
    opened: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const typeDropdownTrigger = canvas.getByRole('button');
    await userEvent.click(typeDropdownTrigger);
    await waitFor(() =>
      expect(canvas.getAllByRole('menuitem')).toHaveLength(
        ALL_FACTOR_TYPES.length,
      ),
    );
  },
};

export const AllTypes: Story = {
  decorators: [flexColumnWrapper],
  parameters: {
    controls: {
      include: ['readOnly', 'error'],
    },
  },
  args: {
    onChangeValue: fn(),
  },
  render: (args) => {
    return (
      <>
        {ALL_FACTOR_TYPES.map((factorType, index) => (
          <div
            data-popupindex-container
            style={{ position: 'relative', zIndex: 100 - index }}
          >
            <Factors
              {...FactorsMeta.args}
              {...args}
              selectedFactorType={factorType}
            />
          </div>
        ))}
      </>
    );
  },
};

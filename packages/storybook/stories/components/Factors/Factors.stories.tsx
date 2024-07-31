import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { within, userEvent, expect, fn, waitFor } from '@storybook/test';

import { VarTypeStringM } from '@synerise/ds-icon';
import Factors, { ALL_FACTOR_TYPES, FactorsProps } from '@synerise/ds-factors';
import {
  BOOLEAN_CONTROL,
  controlFromOptionsArray,
  fixedWrapper300,
  flexColumnWrapper
} from '../../utils';
import { FACTORS_GROUPS, FACTORS_ITEMS, FACTORS_ITEMS_ADDITONAL_DATA, FACTORS_TEXTS, SELECTED_PARAMETER } from './Factors.data';

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
    const [{ opened, value, selectedFactorType }, updateArgs] = useArgs();
    const handleSelectFactorType = factorType => {
      updateArgs({
        value: '',
        selectedFactorType: factorType,
      });
      args.setSelectedFactorType?.(factorType);
    };
    const handleChangeValue = newValue => {
      updateArgs({ value: newValue, opened: false });
      args.onChangeValue?.(newValue);
    };
    const handleActivate = () => {
      updateArgs({ opened: true })
      args.onActivate?.();
    }
    const handleDeactivate = () => {
      updateArgs({ opened: false })
      args.onDeactivate?.();
    }
    return (
      <div data-popup-container>
        <Factors
          {...args}
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
    includeTimezoneOffset: BOOLEAN_CONTROL
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

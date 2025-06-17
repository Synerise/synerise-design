import React, { ReactNode, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconPicker from '@synerise/ds-icon-picker';
import { fn } from 'storybook/test';
import Button from '@synerise/ds-button';
import Icon, { Add3M } from '@synerise/ds-icon';

import { centeredPaddedWrapper, fixedWrapper300, REACT_NODE_AS_STRING, STRING_CONTROL } from '../../utils';
import { PICKER_DATA } from './IconPicker.data';
import type { DSSource, FASource, DataSource, SourceType, FAValue, IconPickerProps } from '@synerise/ds-icon-picker';

type Story<Source extends SourceType = DataSource[]> = StoryObj<IconPickerProps<Source>>;

const isFAValue = (icon: FAValue | ReactNode): icon is FAValue => {
  return Array.isArray(icon)
}

export default {
  component: IconPicker,
  title: 'Components/Pickers/IconPicker',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [centeredPaddedWrapper],
  render: args => {
    const [icon, setIcon] = useState<ReactNode | null>(null);
    const handleSelect = (selectedIcon: ReactNode) => {
      setIcon(selectedIcon);
      args.onSelect?.(selectedIcon);
    };

    const renderSelected = () => {
      if (args.data === 'font-awesome' && isFAValue(icon)) {
        return <FontAwesomeIcon icon={icon} />
      }
      return icon
    }

    return (
      <>
        <IconPicker
          {...args}
          selectedIcon={renderSelected()}
          onClear={() => { setIcon(!icon) }}
          onSelect={handleSelect}
        />
      </>
    );
  },
  argTypes: {
    placeholder: STRING_CONTROL,
    noResultMsg: REACT_NODE_AS_STRING,
    clearTooltip: REACT_NODE_AS_STRING,
    data: {
      control: false
    }
  },
  args: {
    placeholder: 'search',
    trigger: ['click'],
    noResultMsg: 'No results',
    clearTooltip: 'clear',
    data: PICKER_DATA,
    onSelect: fn()
  },
} as Meta<IconPickerProps<SourceType>>;

export const Default: Story = {};

export const CustomTrigger: Story = {
  render: args => {
    const [icon, setIcon] = useState<ReactNode | null>(null);
    const handleSelect = (selectedIcon: ReactNode) => {
      setIcon(selectedIcon);
      args.onSelect?.(selectedIcon);
    };

    const renderSelected = () => {
      if (args.data === 'font-awesome' && isFAValue(icon)) {
        return <FontAwesomeIcon icon={icon} />
      }
      return icon
    }

    return (
      <>
        {icon && (<div>Selected: {renderSelected()}</div>)}
        <IconPicker
          {...args}
          button={
            <Button type="primary" mode="icon-label">
              <Icon component={<Add3M />} />
              Select icon
            </Button>
          }
          onSelect={handleSelect}
        />
      </>
    );
  },
  argTypes: {
    placeholder: STRING_CONTROL,
    noResultMsg: REACT_NODE_AS_STRING,
    data: {
      control: false
    }
  },
  args: {
    placeholder: 'search',
    trigger: ['click'],
    noResultMsg: 'No results',
    data: PICKER_DATA,
    onSelect: fn()
  },
};
export const DesignSystemIcons: Story<DSSource> = {
  args: {
    data: 'design-system'
  }
};
export const FontAwesomeIcons: Story<FASource> = {
  args: {
    data: 'font-awesome'
  }
};

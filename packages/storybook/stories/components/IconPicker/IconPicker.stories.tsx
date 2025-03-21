import React, { ReactNode, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import IconPicker, { IconPickerProps } from '@synerise/ds-icon-picker';

import { centeredPaddedWrapper, fixedWrapper300 } from '../../utils';
import Button from '@synerise/ds-button';
import Icon, { Add3M } from '@synerise/ds-icon';
import { PICKER_DATA } from './IconPicker.data';

type Story = StoryObj<IconPickerProps>;

export default {
  component: IconPicker,
  title: 'Components/Pickers/IconPicker',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [fixedWrapper300, centeredPaddedWrapper],
  render: args => {
    const [icon, setIcon] = useState<ReactNode | null>(null);
    const handleSelect = (selectedIcon: ReactNode) => {
      setIcon(selectedIcon);
      args.onSelect?.(selectedIcon);
    };
    return (
      <>
        <>Selected: {icon}</>
        <IconPicker
          {...args}
          button={
            <Button type="primary" mode="icon-label">
              <Icon component={<Add3M />} />
              Add icon
            </Button>
          }
          data={PICKER_DATA}
          placeholder={'search'}
          onSelect={handleSelect}
          trigger={['click']}
          noResultMsg={'No results'}
        />
      </>
    );
  },
  argTypes: {},
  args: {},
} as Meta<IconPickerProps>;

export const Default: Story = {};

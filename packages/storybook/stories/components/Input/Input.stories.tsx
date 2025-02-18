import React, { ChangeEvent, ReactNode, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import { Input } from '@synerise/ds-input';
import type { InputProps } from '@synerise/ds-input';
import Icon, { FileM, SearchM } from '@synerise/ds-icon';

import { addonType, renderAddonComponent } from './Input.utils';
import { Modal } from './Input.styles';

import { BOOLEAN_CONTROL, centeredPaddedWrapper, controlFromOptionsArray, fixedWrapper300 } from '../../utils';

const defaultRender = (args: InputProps) => {
  const [{ value }, updateArgs] = useArgs();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateArgs({ value: event.target.value });
  };

  return <Input {...args} value={value} onChange={onChange} />;
};

export default {
  title: 'Components/InputElements/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [fixedWrapper300, centeredPaddedWrapper],
  render: defaultRender,
  argTypes: {
    disabled: BOOLEAN_CONTROL,
    readOnly: BOOLEAN_CONTROL,

    autoResize: {
      control: 'select',
      options: ['false', 'min & max width', 'stretch to fit'],
      mapping: {
        'false': false,
        'min & max width': { minWidth: '150px', maxWidth:'300px' },
        'stretch to fit': { minWidth: '150px', stretchToFit: true }
      }
    }
  }
} as Meta<InputProps>;

type Story = StoryObj<InputProps>;

export const Default: Story = {
  args: {
    value: 'Sample text',
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: 'Placeholder text',
  },
};

export const Readonly: Story = {
  args: {
    ...Default.args,
    readOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const WithLabelAndDescription: Story = {
  args: {
    label: 'Input Label',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    tooltip: 'Label Tooltip',
  },
};

export const WithCounter: Story = {
  args: {
    ...WithLabelAndDescription.args,
    value: 'Sample text',
    counterLimit: 100,
  },
};


export const WithCustomCounter: Story = {
  args: {
    ...WithLabelAndDescription.args,
    value: 'Sample text',
    renderCustomCounter: (count?: number) => count !== undefined && <>{count} characters billed as 1 SMS</>,
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: true,
  },
};
export const WithErrorMessage: Story = {
  args: {
    ...WithLabelAndDescription.args,
    errorText: 'An error occurred',
  },
};

export const WithIcon: Story = {
  args: {
    ...WithLabelAndDescription.args,
    icon1: <Icon component={<FileM />} />,
  },
};

export const WithTwoIcons: Story = {
  args: {
    ...WithLabelAndDescription.args,
    icon1: <Icon component={<FileM />} />,
    icon2: <Icon component={<SearchM />} />,
    icon1Tooltip: <>Laptop icon</>,
    icon2Tooltip: <>Search icon</>,
  },
};

export const Autoresize: Story = {
  args: {
    ...Default.args,
    autoResize: {
      minWidth: '100px',
      maxWidth: '300px',
    },
  },
};

export const AutoresizeWithinParent: Story = {
  args: {
    ...Default.args,
    autoResize: {
      minWidth: '100px',
      stretchToFit: true,
    },
  },
};

export const AutoresizeInModal: Story = {
  render: (args, storyContext) => {
    const [open, setOpen] = useState(false);
    const RenderedInput = defaultRender(args);

    return storyContext.viewMode === 'story' ? (
      <Modal
        size="small"
        visible={true}
        title={'Title'}
        bodyStyle={{ padding: '20px 100px' }}
        onCancel={() => setOpen(!open)}
        onOk={() => setOpen(open)}
      >
        {RenderedInput}
      </Modal>
    ) : <></>;
  },
  args: {
    ...WithLabelAndDescription.args,
    autoResize: {
      minWidth: '100px',
      stretchToFit: true,
    },
  },
};

export const WithPrefixAndSuffix: StoryObj<
  InputProps & { prefixType?: string; prefixLabel?: string; suffixType?: string; suffixLabel?: string }
> = {
  render: args => {
    const { prefixLabel, prefixType, suffixType, suffixLabel, ...rest } = args;

    return defaultRender({
      ...rest,
      prefixel: renderAddonComponent(prefixType, prefixLabel),
      suffixel: renderAddonComponent(suffixType, suffixLabel),
    });
  },
  argTypes: {
    prefixType: controlFromOptionsArray('select', Object.values(addonType)),
    suffixType: controlFromOptionsArray('select', Object.values(addonType)),
  },
  args: {
    ...WithLabelAndDescription.args,
    prefixType: addonType.label,
    suffixType: addonType.label,
    prefixLabel: 'prefix',
    suffixLabel: 'suffix',
  },
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 'large',
  },
};

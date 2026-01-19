import React from 'react';
import { action } from 'storybook/actions';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '@synerise/ds-button';
import Checkbox from '@synerise/ds-checkbox';
import FieldSet from '@synerise/ds-field-set';
import { ExpanderWrapper } from '@synerise/ds-field-set/dist/FieldSet.styles';
import { Input } from '@synerise/ds-input';
import Radio from '@synerise/ds-radio';
import Select from '@synerise/ds-select';
import { RawSwitch } from '@synerise/ds-switch';

import {
  BOOLEAN_CONTROL,
  STRING_CONTROL,
  centeredPaddedWrapper,
  controlFromOptionsArray,
  reactNodeAsSelect,
} from '../../utils';

export default {
  component: FieldSet,
  title: 'Components/FieldSet',
  tags: ['autodocs'],
  decorators: [centeredPaddedWrapper],
  render: (args) => {
    return <FieldSet {...args} />;
  },
  argTypes: {
    title: STRING_CONTROL,
    description: STRING_CONTROL,
    divider: BOOLEAN_CONTROL,
    expandable: BOOLEAN_CONTROL,
    defaultExpanded: BOOLEAN_CONTROL,
    triggerType: controlFromOptionsArray('select', ['expander', 'switch']),
    prefix: {
      ...reactNodeAsSelect(['expander', 'switch'], {
        expander: (
          <ExpanderWrapper description={true}>
            <Button.Expander expanded={true} />
          </ExpanderWrapper>
        ),
        switch: <RawSwitch defaultChecked={true} />,
      }),
    },
    component: {
      ...reactNodeAsSelect(['checkbox', 'radioButton', 'input', 'select'], {
        checkbox: (
          <Checkbox.Group
            onChange={(values) => console.log('Checked values', values)}
          >
            <Checkbox description="Deliver your campaign" value="A">
              Batch delivery
            </Checkbox>
            <Checkbox description="Lorem ipsum dolor sit amet" value="B">
              Enable a control group
            </Checkbox>
          </Checkbox.Group>
        ),
        radioButton: (
          <Radio.Group onChange={action('onChange')} defaultValue="A">
            <Radio
              description="Deliver your campaign to a large list in batches to prevent website-crushing click flods"
              value="A"
            >
              Batch delivery
            </Radio>
            <Radio
              description="A control group is a defined percentage of your audience who
            won’t receive this campaign so you can better understand performance"
              value="B"
            >
              Enable a control group
            </Radio>
          </Radio.Group>
        ),
        input: (
          <div style={{ width: '700px' }}>
            <Input
              placeholder="Placeholder"
              label="Label"
              description="Description"
            />
            <Input
              placeholder="Placeholder"
              label="Label"
              description="Description"
            />
          </div>
        ),
        select: (
          <div style={{ width: '700px' }}>
            <Select
              defaultValue="Select"
              label="Label"
              description="Description"
              children={<Select.Option value="Select">Select</Select.Option>}
            />
            <Select
              defaultValue="Select"
              label="Label"
              description="Description"
              children={<Select.Option value="Select">Select</Select.Option>}
            />
          </div>
        ),
      }),
    },
  },
} as Meta<typeof FieldSet>;

type Story = StoryObj<typeof FieldSet>;

export const Default: Story = {
  args: {
    title: 'Advanced option',
    divider: true,
  },
};

export const withDescription: Story = {
  ...Default,
  args: {
    title: 'Advanced option',
    description: 'This section is for advanced users only',
    divider: true,
  },
};

export const withPrefix: Story = {
  ...withDescription,
  args: {
    title: 'Advanced option',
    description: 'This section is for advanced users only',
    prefix: 'expander',
    component: 'checkbox',
    divider: true,
  },
};

export const Expandable: Story = {
  tags: ['new'],
  ...withDescription,
  args: {
    title: 'Advanced option',
    description: 'This section is for advanced users only',
    expandable: true,
    component: 'checkbox',
    divider: true,
  },
};
export const Switchable: Story = {
  tags: ['new'],
  ...withDescription,
  args: {
    title: 'Advanced option',
    description: 'This section is for advanced users only',
    expandable: true,
    triggerType: 'switch',
    component: 'checkbox',
    divider: true,
  },
};

export const withSecondLevel: Story = {
  ...Default,
  args: {
    title: 'Advanced option',
    description: 'This section is for advanced users only',
    component: 'checkbox',
    divider: true,
  },
};

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FieldSet from '@synerise/ds-field-set';
import { ExpanderWrapper } from '@synerise/ds-field-set/dist/FieldSet.styles';
import Button from '@synerise/ds-button';
import Checkbox from '@synerise/ds-checkbox';
import { RawSwitch } from '@synerise/ds-switch';
import Radio from '@synerise/ds-radio';
import { Input } from '@synerise/ds-input';
import Select from '@synerise/ds-select';

import { BOOLEAN_CONTROL, centeredPaddedWrapper, reactNodeAsSelect, STRING_CONTROL } from '../../utils';

export default {
  component: FieldSet,
  title: 'Components/FieldSet',
  tags: ['autodocs'],
  decorators: [centeredPaddedWrapper],
  render: args => {
    return <FieldSet {...args} />;
  },
  argTypes: {
    title: STRING_CONTROL,
    description: STRING_CONTROL,
    divider: BOOLEAN_CONTROL,
    expandable: BOOLEAN_CONTROL,
    defaultExpanded: BOOLEAN_CONTROL,
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
          <Checkbox.Group onChange={values => console.log('Checked values', values)}>
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
            <Input placeholder="Placeholder" label="Label" description="Description" />
            <Input placeholder="Placeholder" label="Label" description="Description" />
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

export const withExpander: Story = {
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
  ...withDescription,
  args: {
    title: 'Advanced option',
    description: 'This section is for advanced users only',
    expandable: true,
    component: 'checkbox',
    divider: true,
  },
};

export const withSwitch: Story = {
  ...withDescription,
  args: {
    title: 'Advanced option',
    description: 'This section is for advanced users only',
    prefix: 'switch',
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

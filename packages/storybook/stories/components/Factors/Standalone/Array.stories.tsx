import { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { fn } from 'storybook/test';

import Button from '@synerise/ds-button';
import {
  ArrayFactor,
  type ArrayFactorProps,
  type ArrayItemType,
  ArrayModal,
  useFactorsTexts,
} from '@synerise/ds-factors';
import Icon, { EditM } from '@synerise/ds-icon';

import {
  BOOLEAN_CONTROL,
  controlFromOptionsArray,
  fixedWrapper300,
  NUMBER_CONTROL,
} from '../../../utils';
import { NO_SNAPSHOT } from '../../../utils/chromatic';
import { StoryMatrix } from '../../../utils/StoryMatrix';
import { ARRAY_VALUE, ARRAY_VALUE_NUMERIC } from '../Factors.data';

type ArrayFactorStoryProps = ArrayFactorProps<ArrayItemType>;
type Story = StoryObj<ArrayFactorStoryProps>;

const ControlledArrayFactor = ({
  value: initialValue,
  onChange,
  ...props
}: ArrayFactorStoryProps) => {
  const [value, setValue] = useState(initialValue);
  return (
    <ArrayFactor<ArrayItemType>
      {...props}
      value={value}
      onChange={(nextValue) => {
        setValue(nextValue);
        onChange(nextValue);
      }}
    />
  );
};

export default {
  title: 'Components/Filter/Factors/Standalone/Array',
  component: ArrayFactor,
  decorators: [fixedWrapper300],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The array factor without `Factors`: no type selector and no fixed minimum width. Its trigger sizes to the label, capped at the container. Partial `texts` are merged with the `DS.FACTORS.*` defaults.',
      },
    },
  },
  render: (args) => <ControlledArrayFactor {...args} />,
  argTypes: {
    itemType: controlFromOptionsArray('inline-radio', ['string', 'number']),
    readOnly: BOOLEAN_CONTROL,
    error: BOOLEAN_CONTROL,
    limit: NUMBER_CONTROL,
  },
  args: {
    itemType: 'string',
    onChange: fn(),
    onActivate: fn(),
    onDeactivate: fn(),
  },
} as Meta<ArrayFactorStoryProps>;

export const Default: Story = {
  parameters: NO_SNAPSHOT,
};

export const WithValue: Story = {
  parameters: NO_SNAPSHOT,
  args: { value: ARRAY_VALUE },
};

export const NumberItems: Story = {
  parameters: NO_SNAPSHOT,
  args: { itemType: 'number', value: ARRAY_VALUE_NUMERIC },
};

export const WithError: Story = {
  parameters: NO_SNAPSHOT,
  args: { value: ARRAY_VALUE, error: true },
};

export const ReadOnly: Story = {
  parameters: NO_SNAPSHOT,
  args: { value: ARRAY_VALUE, readOnly: true },
};

const matrixCell = (args: Partial<ArrayFactorStoryProps>) => () => (
  <div style={{ width: '300px' }}>
    <ArrayFactor<ArrayItemType> onChange={() => {}} {...args} />
  </div>
);

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryMatrix
      stories={{
        Default: matrixCell({}),
        WithValue: matrixCell({ value: ARRAY_VALUE }),
        NumberItems: matrixCell({
          itemType: 'number',
          value: ARRAY_VALUE_NUMERIC,
        }),
        WithError: matrixCell({ value: ARRAY_VALUE, error: true }),
        ReadOnly: matrixCell({ value: ARRAY_VALUE, readOnly: true }),
      }}
    />
  ),
};

const CustomTriggerExample = () => {
  const [value, setValue] = useState<string[]>(['item A', 'item B']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const texts = useFactorsTexts({ array: { modalTitle: 'Edit values' } });

  const handleApply = (nextValue: string[]) => {
    setValue(nextValue);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="ghost"
        mode="icon-label"
        onClick={() => setIsModalOpen(true)}
      >
        <Icon component={<EditM />} />
        Edit value
      </Button>
      <ArrayModal
        visible={isModalOpen}
        itemType="string"
        value={value}
        texts={texts}
        onApply={handleApply}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
};

export const CustomTrigger: Story = {
  parameters: {
    ...NO_SNAPSHOT,
    controls: { disable: true },
    docs: {
      description: {
        story:
          'For a layout with its own button, `ArrayModal` is the editor alone. It takes complete texts, from `useFactorsTexts`.',
      },
      source: {
        code: `import { ArrayModal, useFactorsTexts } from '@synerise/ds-factors';

const texts = useFactorsTexts({ array: { modalTitle: 'Edit values' } });

<Button onClick={() => setIsModalOpen(true)}>Edit value</Button>
<ArrayModal
  visible={isModalOpen}
  itemType="string"
  value={value}
  texts={texts}
  onApply={handleApply}
  onCancel={() => setIsModalOpen(false)}
/>`,
      },
    },
  },
  render: () => <CustomTriggerExample />,
};

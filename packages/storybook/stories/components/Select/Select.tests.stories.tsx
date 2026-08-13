import React, { type ReactNode } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import Select from '@synerise/ds-select';

import { OPTIONS } from './data';

/**
 * Visual-regression stories for ds-select — every state stacked so idle / filled /
 * error / disabled / readOnly / search / multiple / tags chrome can be compared,
 * plus open-dropdown snapshots. Hidden from the standard sidebar (`visualtests`).
 */
const meta: Meta<typeof Select> = {
  title: 'Components/Select Tests',
  component: Select,
  tags: ['visualtests'],
  parameters: { layout: 'padded' },
};

export default meta;

type Story = StoryObj<typeof Select>;

const Stack = ({ children }: { children: ReactNode }) => (
  <div
    style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}
  >
    {children}
  </div>
);

export const States: Story = {
  render: () => (
    <Stack>
      <Select label="Default" placeholder="Placeholder" options={OPTIONS} />
      <Select label="Filled" defaultValue="a" options={OPTIONS} allowClear />
      <Select
        label="Search"
        showSearch
        placeholder="Search…"
        options={OPTIONS}
      />
      <Select
        label="Multiple"
        mode="multiple"
        defaultValue={['a', 'b']}
        options={OPTIONS}
      />
      <Select
        label="Tags"
        mode="tags"
        defaultValue={['first', 'second']}
        tokenSeparators={[',']}
      />
      <Select
        label="Error"
        error
        errorText="Required"
        placeholder="Placeholder"
        options={OPTIONS}
      />
      <Select label="Disabled" disabled defaultValue="a" options={OPTIONS} />
      <Select label="Read only" readOnly defaultValue="a" options={OPTIONS} />
      <Select label="Grey" grey placeholder="Placeholder" options={OPTIONS} />
      <Select
        label="Large"
        size="large"
        placeholder="Placeholder"
        options={OPTIONS}
      />
    </Stack>
  ),
};

export const OpenSingle: Story = {
  render: () => (
    <div data-popup-container style={{ width: 320 }}>
      <Select
        label="Open"
        defaultOpen
        options={OPTIONS}
        placeholder="Placeholder"
      />
    </div>
  ),
};

export const OpenMultiple: Story = {
  render: () => (
    <div data-popup-container style={{ width: 320 }}>
      <Select
        label="Open multiple"
        mode="multiple"
        defaultOpen
        defaultValue={['a']}
        options={OPTIONS}
      />
    </div>
  ),
};

export const OpenLoading: Story = {
  render: () => (
    <div data-popup-container style={{ width: 320 }}>
      <Select label="Loading" loading defaultOpen options={OPTIONS} />
    </div>
  ),
};

export const TagLimits: Story = {
  render: () => (
    <Stack>
      <Select
        label="Max tag count (2)"
        mode="multiple"
        defaultValue={['a', 'b', 'c', 'd', 'e']}
        maxTagCount={2}
        options={OPTIONS}
      />
      <Select
        label="Max tag count + custom placeholder"
        mode="multiple"
        defaultValue={['a', 'b', 'c', 'd']}
        maxTagCount={1}
        maxTagPlaceholder={(omitted) => `+${omitted.length} more`}
        options={OPTIONS}
      />
      <Select
        label="Max tag text length (10)"
        mode="multiple"
        defaultValue={['f', 'a']}
        maxTagTextLength={10}
        options={OPTIONS}
      />
    </Stack>
  ),
};

/** Responsive fit-to-width chips at three fixed widths (deterministic for Chromatic). */
export const TagsResponsive: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {[480, 280, 140].map((width) => (
        <div key={width} style={{ width }}>
          <Select
            label={`Responsive (${width}px)`}
            mode="multiple"
            defaultValue={['a', 'b', 'c', 'd', 'e']}
            maxTagCount="responsive"
            options={OPTIONS}
          />
        </div>
      ))}
    </div>
  ),
};

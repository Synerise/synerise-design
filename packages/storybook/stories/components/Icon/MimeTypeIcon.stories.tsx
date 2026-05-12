import React, { useMemo, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { MimeTypeIcon } from '@synerise/ds-icon';

import {
  CLASSNAME_ARG_CONTROL,
  NUMBER_CONTROL,
  STRING_CONTROL,
  centeredPaddedWrapper,
  gappedColumnDecorator,
} from '../../utils';
import { TYPES } from './MimeTypeIcon.data';

export default {
  title: 'Components/Icon/MimeTypeIcon',
  component: MimeTypeIcon,
  decorators: [centeredPaddedWrapper],
  render: (args) => {
    return <MimeTypeIcon {...args} />;
  },
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    size: NUMBER_CONTROL,
    type: STRING_CONTROL,
    color: { control: 'color' },
  },
} as Meta<typeof MimeTypeIcon>;

type Story = StoryObj<typeof MimeTypeIcon>;

export const Default: Story = {
  args: {
    type: 'image/svg',
  },
};

export const AllTypes: Story = {
  decorators: [gappedColumnDecorator],
  render: (args) => <AllTypesList args={args} />,
};

const AllTypesList: React.FC<{
  args: React.ComponentProps<typeof MimeTypeIcon>;
}> = ({ args }) => {
  const [query, setQuery] = useState('');
  const filteredTypes = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return TYPES;
    return TYPES.filter((type) => type.toLowerCase().includes(normalized));
  }, [query]);

  return (
    <>
      <input
        type="search"
        placeholder="Search icons by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search icons by name"
        style={{
          width: '100%',
          maxWidth: 320,
          padding: '8px 12px',
          border: '1px solid #e0e0e0',
          borderRadius: 4,
          fontSize: 14,
          boxSizing: 'border-box',
        }}
      />
      {filteredTypes.map((type) => (
        <div key={type} style={{ width: '200px' }}>
          <MimeTypeIcon {...args} type={type} /> - {type}
        </div>
      ))}
    </>
  );
};

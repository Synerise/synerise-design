import React, { useMemo, useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import Icon from '@synerise/ds-icon';
import type { BaseIconProps } from '@synerise/ds-icon';
import * as large from '@synerise/ds-icon/dist/icons/L';
import * as medium from '@synerise/ds-icon/dist/icons/M';
import * as xLarge from '@synerise/ds-icon/dist/icons/XL';
import * as additional from '@synerise/ds-icon/dist/icons/additional';
import * as color from '@synerise/ds-icon/dist/icons/colorIcons';

import {
  CLASSNAME_ARG_CONTROL,
  STYLE_ARG_CONTROL,
  reactNodeAsSelect,
} from '../../utils';
import { IconWrapper, IconsWrapper } from './Icon.stories.styles';

const iconNames = Object.keys(medium);
const iconOptions = iconNames.reduce(
  (icons, current) => ({ ...icons, [current]: current }),
  {},
);

type IconStoryProps = Omit<BaseIconProps, 'component'> & { component: string };

export default {
  title: 'Components/Icon',
  tags: ['autodocs'],
  component: Icon,
  render: ({ component, color, size, stroke }) => {
    const IconComponent = medium[component];
    return (
      <IconWrapper noBorder>
        <Icon
          component={
            <IconComponent
              style={{ stroke: stroke ? 'currentColor' : 'none' }}
            />
          }
          color={color}
          size={size}
        />
      </IconWrapper>
    );
  },
  args: {
    size: 40,
    stroke: false,
    component: iconNames[0],
  },
  argTypes: {
    style: STYLE_ARG_CONTROL,
    className: CLASSNAME_ARG_CONTROL,
    color: { control: 'color' },
    size: { control: 'number' },
    stroke: { control: 'boolean' },
    component: {
      ...reactNodeAsSelect(iconNames, iconOptions),
    },
  },
} as Meta<IconStoryProps>;

export const SingleIcon: StoryObj<typeof Icon> = {};

export const ListIcon: StoryObj<typeof Icon> = {
  render: (args) => <IconList icons={medium} color={args.color} size={24} />,
  args: {
    color: '',
  },
  argTypes: {
    color: { control: 'color' },
  },
};

export const AdditionalIcon: StoryObj<typeof Icon> = {
  render: (args) => (
    <IconList icons={additional} color={args.color} size={48} />
  ),
};

export const AdditionalL: StoryObj<typeof Icon> = {
  render: (args) => <IconList icons={large} color={args.color} size={48} />,
};

export const AdditionalXL: StoryObj<typeof Icon> = {
  render: (args) => <IconList icons={xLarge} color={args.color} size={96} />,
};

export const AdditionalColor: StoryObj<typeof Icon> = {
  render: () => <IconList icons={color} color="" size={48} />,
};

const SEARCH_INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  maxWidth: 320,
  padding: '8px 12px',
  marginBottom: 16,
  border: '1px solid #e0e0e0',
  borderRadius: 4,
  fontSize: 14,
  boxSizing: 'border-box',
};

const IconList: React.FC<{
  icons: Record<string, React.ComponentType>;
  color?: string;
  size: number;
  noBorder?: boolean;
}> = ({ icons, color = '', size, noBorder }) => {
  const [query, setQuery] = useState('');
  const filteredEntries = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const entries = Object.entries(icons);
    if (!normalized) return entries;
    return entries.filter(([key]) => key.toLowerCase().includes(normalized));
  }, [icons, query]);

  return (
    <div>
      <input
        type="search"
        placeholder="Search icons by name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={SEARCH_INPUT_STYLE}
        aria-label="Search icons by name"
      />
      <IconsWrapper>
        {filteredEntries.map(([key, IconComponent]) => (
          <IconWrapper key={key} noBorder={noBorder}>
            <Icon component={<IconComponent />} color={color} size={size} />
            <br />
            <p>{key}</p>
          </IconWrapper>
        ))}
      </IconsWrapper>
    </div>
  );
};

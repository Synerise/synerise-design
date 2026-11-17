import { Meta, StoryObj } from '@storybook/react-vite';
import React, { type ReactElement, useMemo, useState } from 'react';

import type { BaseIconProps } from '@synerise/ds-icon';
import Icon from '@synerise/ds-icon';
import * as additional from '@synerise/ds-icon/dist/icons/additional';
import * as color from '@synerise/ds-icon/dist/icons/colorIcons';
import * as large from '@synerise/ds-icon/dist/icons/L';
import * as medium from '@synerise/ds-icon/dist/icons/M';
import * as objectIcons from '@synerise/ds-icon/dist/icons/objectIcons';
import * as xLarge from '@synerise/ds-icon/dist/icons/XL';

import {
  CLASSNAME_ARG_CONTROL,
  reactNodeAsSelect,
  STYLE_ARG_CONTROL,
} from '../../utils';
import { NO_SNAPSHOT } from '../../utils/chromatic';
import { IconsWrapper, IconWrapper } from './Icon.stories.styles';

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

export const ObjectIcon: StoryObj<typeof Icon> = {
  parameters: { ...NO_SNAPSHOT },
  render: () => <IconList icons={objectIcons} size={24} />,
};

type ObjectIconComponent = (
  props: object,
) => ReactElement<{ className: string }>;

// Each generated object icon carries its category as `ds-object-icon-<category>` on the svg.
const categoryOf = (Component: ObjectIconComponent) =>
  Component({}).props.className.match(/ds-object-icon-(\S+)/)?.[1] ?? 'other';

// Design's order (the numbering of the delivered files), not alphabetical.
const OBJECT_ICON_CATEGORIES = [
  'analytics',
  'campaigns',
  'automation',
  'ai',
  'content',
  'data',
  'profiles',
  'settings',
];

const OBJECT_ICONS_BY_CATEGORY = Object.entries(
  objectIcons as Record<string, ObjectIconComponent>,
).reduce<Record<string, [string, ObjectIconComponent][]>>(
  (groups, [name, Component]) => {
    const category = categoryOf(Component);
    return {
      ...groups,
      [category]: [...(groups[category] ?? []), [name, Component]],
    };
  },
  {},
);

// Light tokens live on :root only, so the first panel follows the page theme and the second is forced dark.
const ObjectIconPanel = ({ dark = false }: { dark?: boolean }) => (
  <div
    data-ds-theme={dark ? 'dark' : undefined}
    style={{
      flex: 1,
      padding: 16,
      background: 'var(--ds-color-background-base-default)',
      color: 'var(--ds-color-text-base-subtle)',
      fontSize: 11,
    }}
  >
    <strong>{dark ? 'dark' : 'page theme'}</strong>
    {OBJECT_ICON_CATEGORIES.map((category) => (
      <div key={category} style={{ marginTop: 12 }}>
        <div style={{ marginBottom: 4 }}>{category}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {(OBJECT_ICONS_BY_CATEGORY[category] ?? []).map(
            ([name, Component]) => (
              <div
                key={name}
                title={name}
                style={{
                  width: 112,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Icon component={<Component />} />
                <span>{name.replace(/^Object|M$/g, '')}</span>
              </div>
            ),
          )}
        </div>
      </div>
    ))}
  </div>
);

/** Every object icon by category, in the page theme and in the dark theme side by side. */
export const ObjectIconMatrix: StoryObj<typeof Icon> = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <ObjectIconPanel />
      <ObjectIconPanel dark />
    </div>
  ),
};

const SEARCH_INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  maxWidth: 320,
  padding: '8px 12px',
  marginBottom: 16,
  border: '1px solid var(--ds-color-border-base-default)',
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

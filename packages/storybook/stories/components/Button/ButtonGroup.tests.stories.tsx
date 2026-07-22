import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '@synerise/ds-button';
import ButtonGroup from '@synerise/ds-button-group';
import { theme } from '@synerise/ds-core';
import Icon, { AngleDownS } from '@synerise/ds-icon';

import { fixedWrapper588 } from '../../utils';

/**
 * Visual-test-only stories for ButtonGroup — hidden from the default sidebar via
 * the `visualtests` tag (see `.storybook/main.ts`).
 */
const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/Button/ButtonGroup/Tests',
  component: ButtonGroup,
  decorators: [fixedWrapper588],
  tags: ['visualtests'],
};

export default meta;

const SPLIT_MODE_VARIANTS = [
  'primary',
  'custom-color',
  'tertiary',
  'tertiary-white',
  'ghost-primary',
  'ghost',
  'ghost-white',
  'secondary',
] as const;

const DARK_BG_VARIANTS = new Set<string>(['tertiary-white', 'ghost-white']);

/**
 * Audit matrix for the `splitMode` `border-left` divider rules in
 * `ButtonGroup.styles.ts` (lines ~43–145). Those rules paint a hard-coded 1px
 * divider between adjacent `single-icon` buttons, coloured per variant
 * (white-alpha on primary/custom-color/tertiary-white, grey-alpha on tertiary,
 * none on ghost/ghost-white/ghost-primary/secondary), clear it on hover/focus,
 * and switch it to red-600 in the `error` variant.
 *
 * Rows = the eight variants the CSS names. Columns:
 *  - **splitMode** — the divider the CSS draws.
 *  - **compact only** — the SAME pair with `splitMode` off, so the seam comes
 *    only from `compact` border-sharing (`margin-left: -1px`) + the buttons' own
 *    (tokenised) borders. Compare against column 1 to judge whether the
 *    hard-coded splitMode divider still adds anything.
 *  - **splitMode disabled** / **splitMode error** — the remaining branches.
 *
 * The `-white` variants sit on a dark strip so their divider is visible.
 */
export const SplitModeDividerCases: StoryObj<typeof ButtonGroup> = {
  name: 'Split-mode divider cases (audit)',
  render: () => {
    const icon = <Icon component={<AngleDownS />} />;

    const pair = (
      type: (typeof SPLIT_MODE_VARIANTS)[number],
      opts: { disabled?: boolean; error?: boolean } = {},
    ) => (
      <ButtonGroup splitMode error={opts.error} buttonsPosition="left">
        <Button type={type} color="green" disabled={opts.disabled}>
          Label
        </Button>
        <Button
          type={type}
          color="green"
          mode="single-icon"
          disabled={opts.disabled}
        >
          {icon}
        </Button>
      </ButtonGroup>
    );

    const compactOnly = (type: (typeof SPLIT_MODE_VARIANTS)[number]) => (
      <ButtonGroup buttonsPosition="left">
        <Button type={type} color="green">
          Label
        </Button>
        <Button type={type} color="green" mode="single-icon">
          {icon}
        </Button>
      </ButtonGroup>
    );

    const cell = (type: string, node: React.ReactNode) => (
      <div
        style={{
          padding: 8,
          borderRadius: 4,
          background: DARK_BG_VARIANTS.has(type)
            ? theme.palette['grey-800']
            : undefined,
        }}
      >
        {node}
      </div>
    );

    const headerStyle = { fontSize: 12, fontWeight: 600 } as const;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '130px repeat(4, max-content)',
          gap: 12,
          alignItems: 'center',
        }}
      >
        <div />
        <div style={headerStyle}>splitMode</div>
        <div style={headerStyle}>compact only</div>
        <div style={headerStyle}>splitMode disabled</div>
        <div style={headerStyle}>splitMode error</div>
        {SPLIT_MODE_VARIANTS.map((type) => (
          <React.Fragment key={type}>
            <div style={{ fontSize: 12 }}>{type}</div>
            {cell(type, pair(type))}
            {cell(type, compactOnly(type))}
            {cell(type, pair(type, { disabled: true }))}
            {cell(type, pair(type, { error: true }))}
          </React.Fragment>
        ))}
      </div>
    );
  },
  args: {
    splitMode: true,
    buttonsPosition: 'left',
  },
};

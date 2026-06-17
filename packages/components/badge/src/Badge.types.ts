import { type CSSProperties, type ReactNode } from 'react';

import { type DefaultColor } from '@synerise/ds-core';
import {
  type LiteralStringUnion,
  type PassthroughAttributes,
} from '@synerise/ds-utils';

export const color = [
  'red',
  'green',
  'grey',
  'yellow',
  'blue',
  'pink',
  'mars',
  'orange',
  'fern',
  'cyan',
  'purple',
  'violet',
  'white',
  'transparent',
] as const;

export type Color = (typeof color)[number];

export type ColorHue =
  | '900'
  | '800'
  | '700'
  | '600'
  | '500'
  | '400'
  | '300'
  | '200'
  | '100'
  | '050';

export type Status =
  | 'active'
  | 'inactive'
  | 'blocked'
  | 'processing'
  | 'warning'
  | undefined;

export type BadgeOwnProps = {
  /**
   * Content the badge is positioned over. When omitted, the badge renders inline (standalone).
   */
  children?: ReactNode;
  /**
   * When set, the badge renders as a status/dot badge aligned next to this label (delegating to
   * `BadgeWithLabel`). Restores the legacy antd `status` + `text` API. Takes precedence over
   * `count` / `children` — only `status`, `customColor`, `flag`, `pulsing`, `dot`, `className` and
   * `style` apply in this mode.
   */
  text?: ReactNode;
  /**
   * DS status — drives the dot / count colour.
   */
  status?: Status;
  /**
   * Renders the dot with `::before`/`::after` halo rings. Requires dot/status to be active.
   */
  flag?: boolean;
  /**
   * Adds a repeating pulse animation to the halo rings. Only visible when `flag` or `status` is set.
   */
  pulsing?: boolean;
  /**
   * Adds a white outline ring around the count badge.
   */
  outlined?: boolean;
  /**
   * Overrides the badge colour. Accepts a palette token (`'blue'` → `blue-600`, or a full key like
   * `'blue-600'`), or any raw CSS colour (`'#FF0000'`, `'rgb(…)'`, …) for colours outside the palette.
   */
  customColor?: LiteralStringUnion<Color | DefaultColor>;
  /**
   * Number (or node) shown inside the count badge.
   */
  count?: ReactNode;
  /**
   * Forces dot mode. Auto-enabled when `status` is provided.
   */
  dot?: boolean;
  /**
   * Maximum number before the count is shown as `N+`.
   */
  overflowCount?: number;
  /**
   * `[x, y]` pixel offset of the badge relative to its children.
   */
  offset?: [number | string, number | string];
  className?: string;
  style?: CSSProperties;
};

export type BadgeProps = BadgeOwnProps & PassthroughAttributes;

import { type CSSProperties, type ReactNode } from 'react';

import { type LiteralStringUnion } from '@synerise/ds-utils';

export type ButtonGroupProps = {
  /** Size class applied to the group container */
  size?: 'small' | 'middle' | 'large';
  /** Additional CSS class name */
  className?: string;
  /** overwrite with inline styles */
  style?: CSSProperties;
  /** Button elements to render inside the group */
  children?: ReactNode;
  /** Heading displayed above the button row */
  title?: string;
  /** Helper text displayed below the button row */
  description?: string;
  /** Stretches the container and buttons to full width */
  fullWidth?: boolean;
  /** Horizontal alignment of the button row
   * @default center
   */
  buttonsPosition?: LiteralStringUnion<'left' | 'center' | 'right'>;
  /** CSS-only disabled state — suppresses hover effects in splitMode. Disable buttons individually for true disabled behavior. */
  disabled?: boolean;
  /** Adds 1px borders between adjacent single-icon buttons */
  splitMode?: boolean;
  /** In splitMode, switches borders to red error color */
  error?: boolean;
  /** Zero gap with shared corners (true) or 8px gap with individual rounded corners (false)
   * @default true
   */
  compact?: boolean;
};

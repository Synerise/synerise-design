import { type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';

import { type OpenChangeReason } from '@floating-ui/react';
import {
  type LegacyDropdownPlacement,
  type PopoverOptions,
  type PopoverTriggerType,
} from '@synerise/ds-popover';
import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type DropdownProps = Omit<
  WithHTMLAttributes<
    HTMLDivElement,
    DropdownSharedProps & {
      /**
       * @deprecated all dropdowns are destroyed when hidden
       */
      destroyPopupOnHide?: boolean;
    }
  >,
  'style'
>;
/**
 * bottom and bottomCenter are the same - legacy types
 * top and topCenter are the same - legacy types
 */
export type DropdownPlacement = LegacyDropdownPlacement;

export type DropdownSize =
  | 'small'
  | 'medium'
  | 'large'
  | 'auto'
  | 'match-trigger'
  | 'min-match-trigger';

export type DropdownSharedProps = {
  disabled?: boolean;
  asChild?: boolean;
  overlayStyle?: CSSProperties;
  overlayClassName?: string;
  overlayHTMLAttributes?: HTMLAttributes<HTMLDivElement>;
  placement?: DropdownPlacement;
  getPopupContainer?: (trigger: HTMLElement) => HTMLElement;
  trigger?: PopoverTriggerType | PopoverTriggerType[];
  size?: DropdownSize | number;
  overlay?: ReactNode;
  hideOnItemClick?: string | boolean;
  /**
   * @deprecated use overlay prop
   */
  dropdownRender?: () => ReactNode;
  /**
   * use this prop if you need a controlled component
   */
  open?: boolean;
  /**
   * use this prop if you need a controlled component
   */
  onOpenChange?: (isOpen: boolean) => void;
  /** this callback fires if the dropdown is closed by clicking outside */
  onDismiss?: (event?: Event, reason?: OpenChangeReason) => void;
  footer?:
    | ReactNode
    | {
        left?: ReactNode;
        right?: ReactNode;
      };
  children: ReactNode;
  /**
   * @deprecated this should not be needed anymore
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  align?: any;
  popoverProps?: Partial<PopoverOptions>;
  popoverTriggerProps?: Omit<HTMLAttributes<HTMLSpanElement>, 'onClick'>;
};

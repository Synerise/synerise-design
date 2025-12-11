import { type HTMLAttributes, type ReactNode, type RefObject } from 'react';

import { type DropdownProps } from '../../Dropdown.types';

export type DropdownOverlayProps = Pick<
  DropdownProps,
  'size' | 'overlayStyle' | 'hideOnItemClick' | 'overlayClassName'
> & {
  content: ReactNode;
  triggerRef: RefObject<HTMLElement>;
  htmlAttributes?: HTMLAttributes<HTMLDivElement>;
  handleItemClick?: () => void;
};

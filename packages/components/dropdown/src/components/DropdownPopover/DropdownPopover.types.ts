import { type DropdownProps } from '../../Dropdown.types';

export type DropdownPopoverProps = Pick<
  DropdownProps,
  | 'asChild'
  | 'children'
  | 'onDismiss'
  | 'onOpenChange'
  | 'getPopupContainer'
  | 'placement'
  | 'popoverProps'
  | 'popoverTriggerProps'
  | 'overlay'
  | 'overlayClassName'
  | 'overlayHTMLAttributes'
  | 'overlayStyle'
  | 'open'
  | 'hideOnItemClick'
  | 'size'
  | 'trigger'
> & {
  handleOpenChange: (newVal: boolean) => void;
  handleItemClick?: () => void;
  handleTriggerClick: () => void;
  setActiveIndex: (index: number | null) => void;
  activeIndex: number | null;
};

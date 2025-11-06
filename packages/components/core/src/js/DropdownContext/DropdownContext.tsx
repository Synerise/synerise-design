import { createContext } from 'react';

export type DropdownContextProps = {
  isOpen: boolean;
  activeIndex: number | null;
  setIsOpen: (newOpen: boolean) => void;
  hideOnItemClick?: string | boolean;
};

export const DropdownContext = createContext<DropdownContextProps | undefined>(
  undefined,
);

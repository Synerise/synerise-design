import { createContext } from 'react';

type MenuContextType =
  | {
      isOpened: boolean;
      activeItem: string;
      setOpened: (opened: boolean) => void;
      setActiveItem: (subMenu: string) => void;
    }
  | undefined;

const MenuContext = createContext<MenuContextType>(undefined);

export default MenuContext;

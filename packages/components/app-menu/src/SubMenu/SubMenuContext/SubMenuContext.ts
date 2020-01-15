import { createContext } from 'react';

type SubMenuContextType =
  | {
      id: string;
      isActive: boolean;
      setOpened: (opened: boolean) => void;
    }
  | undefined;

const SubMenuContext = createContext<SubMenuContextType>(undefined);

export default SubMenuContext;

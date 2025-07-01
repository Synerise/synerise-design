export type SubMenuContextType =
  | {
      id: string;
      isActive: boolean;
      setOpened: (opened: boolean) => void;
    }
  | undefined;

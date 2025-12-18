import { useContext } from 'react';

import MenuContext from '../MenuContext/MenuContext';

export const useMenu = () => {
  const menuContext = useContext(MenuContext);
  if (!menuContext) {
    throw new Error('Cannot use useMenu hook outside MenuContext');
  }
  return menuContext;
};

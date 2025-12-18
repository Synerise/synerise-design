import { useContext } from 'react';

import SubMenuContext from '../SubMenu/SubMenuContext/SubMenuContext';

export const useSubMenu = () => {
  const subMenuContext = useContext(SubMenuContext);
  if (!subMenuContext) {
    throw new Error('Cannot use useMenu hook outside MenuContext');
  }
  return subMenuContext;
};

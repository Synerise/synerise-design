import { useContext } from 'react';

import { DropdownContext } from './DropdownContext';

export const useDropdown = () => {
  return useContext(DropdownContext);
};

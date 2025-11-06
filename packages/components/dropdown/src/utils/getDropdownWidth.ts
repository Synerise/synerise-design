import { type DropdownSize } from '../Dropdown.types';

export const getDropdownWidth = (size?: DropdownSize | number) => {
  if (typeof size === 'number') {
    return size;
  }
  switch (size) {
    case 'small':
      return 216;
    case 'large':
      return 588;
    case 'medium':
      return 282;
    case 'auto':
    case 'match-trigger':
    case 'min-match-trigger':
    default:
      return null;
  }
};

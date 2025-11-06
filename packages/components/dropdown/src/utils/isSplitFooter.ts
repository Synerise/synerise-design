import type {
  DropdownFooterProps,
  DropdownFooterSplit,
} from '../components/DropdownFooter/DropdownFooter.types';

export const isSplitFooter = (
  footer: DropdownFooterProps['footer'],
): footer is DropdownFooterSplit => {
  return !!(
    footer &&
    typeof footer === 'object' &&
    ('left' in footer || 'right' in footer)
  );
};

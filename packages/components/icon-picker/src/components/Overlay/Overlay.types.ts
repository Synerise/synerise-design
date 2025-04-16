import type {
  FilterElement,
  IconPickerProps,
  SelectItemHandler,
  SourceType,
  ValueTypeForSource,
} from '../../IconPicker.types';

export type OverlayType<Source extends SourceType> = Pick<IconPickerProps<Source>, 'noResultMsg' | 'placeholder'> & {
  value: string;
  data: FilterElement<ValueTypeForSource<Source>>[];
  onSelect: SelectItemHandler<Source>;
  onSearchChange: (value: string) => void;
  onClearInput?: () => void;
  focus: boolean;
};

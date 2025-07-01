import type { AutosizeInputProps } from '../AutosizeInput.types';

type CalculateWidthProps = {
  sizerWidth?: number;
  hasValue?: boolean;
  placeholderIsMinWidth?: AutosizeInputProps['placeholderIsMinWidth'];
  placeholderWidth?: number | null;
  minWidth?: number;
  placeholder?: AutosizeInputProps['placeholder'];
};

const calculateInputWidth = ({
  sizerWidth,
  hasValue,
  placeholderIsMinWidth,
  placeholderWidth,
  minWidth,
  placeholder,
}: CalculateWidthProps) => {
  let width = 0;
  if (sizerWidth && hasValue) {
    /* If the input field has content, update the sizer to match its width  */
    width = sizerWidth;
    if (
      placeholderIsMinWidth &&
      placeholderWidth &&
      sizerWidth < placeholderWidth
    ) {
      width = placeholderWidth;
    }
    if (minWidth !== undefined && width < minWidth) {
      width = minWidth;
    }
  } else if (placeholder && placeholderWidth) {
    width = placeholderWidth;
  } else {
    width = minWidth || 0;
  }
  return width;
};

export default calculateInputWidth;

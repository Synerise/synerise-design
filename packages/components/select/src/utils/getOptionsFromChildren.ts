import { Children, type ReactNode, isValidElement } from 'react';

import { Option, type OptionProps } from '../Option';
import { type RawValueType, type SelectOption } from '../Select.types';

/**
 * Maps declarative `<Select.Option>` children to the internal option shape.
 * Only direct `Option` children are considered; anything else is ignored.
 * `label`/`title` are preserved so the selector display (`optionLabelProp`) and
 * client-side filtering (`optionFilterProp`) can pick the right field.
 */
export const getOptionsFromChildren = (children: ReactNode): SelectOption[] => {
  const options: SelectOption[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child) || child.type !== Option) {
      return;
    }
    const optionProps = child.props as OptionProps;
    const {
      value,
      disabled,
      title,
      label,
      children: optionLabel,
      style,
    } = optionProps;
    // antd parity: when `value` is omitted, fall back to the element's React key.
    const resolvedValue = (value ?? child.key ?? undefined) as RawValueType;
    const option: SelectOption = {
      value: resolvedValue,
      key: resolvedValue,
      disabled,
      title,
      label: label ?? optionLabel,
      children: optionLabel,
      style,
    };
    // antd parity: forward native `data-*` / `aria-*` attributes to the rendered row.
    Object.entries(optionProps).forEach(([key, val]) => {
      if (key.startsWith('data-') || key.startsWith('aria-')) {
        option[key as `data-${string}`] = val;
      }
    });
    options.push(option);
  });

  return options;
};

/** Resolve the display node for a selected value from the options list. */
export const findOption = (
  options: SelectOption[],
  value: SelectOption['value'],
): SelectOption | undefined => options.find((option) => option.value === value);

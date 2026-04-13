import React, { type ReactNode } from 'react';

type ItemPickerProps = {
  children?: ReactNode;
  placeholder?: string;
  onChange?: (...args: unknown[]) => void;
  selectedItem?: unknown;
  'data-testid'?: string;
};

type ItemPickerListProps = {
  dataSource?: unknown[];
  'data-testid'?: string;
};

type ItemPickerTriggerProps = {
  children?: ReactNode;
  'data-testid'?: string;
};

/**
 * Factory function for ItemPicker mock.
 * Mocks the entire @synerise/ds-item-picker package including ItemPicker, ItemPickerNew,
 * ItemPickerLegacy, ItemPickerList, ItemPickerTrigger, and findSectionById.
 *
 * @example
 * ```typescript
 * import { itemPickerMockFactory } from '@synerise/ds-mocks/ItemPicker/vi';
 *
 * vi.mock('@synerise/ds-item-picker', itemPickerMockFactory);
 * ```
 */
export const itemPickerMockFactory = () => {
  const ItemPicker = vi.fn(
    ({ children, 'data-testid': dataTestId }: ItemPickerProps) => (
      <div data-testid={dataTestId || 'ds-item-picker'}>{children}</div>
    ),
  );

  const ItemPickerNew = vi.fn(
    ({ children, 'data-testid': dataTestId }: ItemPickerProps) => (
      <div data-testid={dataTestId || 'ds-item-picker-new'}>{children}</div>
    ),
  );

  const ItemPickerLegacy = vi.fn(
    ({ children, 'data-testid': dataTestId }: ItemPickerProps) => (
      <div data-testid={dataTestId || 'ds-item-picker-legacy'}>{children}</div>
    ),
  );

  const ItemPickerList = vi.fn(
    ({ 'data-testid': dataTestId }: ItemPickerListProps) => (
      <div data-testid={dataTestId || 'ds-item-picker-list'} />
    ),
  );

  const ItemPickerTrigger = vi.fn(
    ({ children, 'data-testid': dataTestId }: ItemPickerTriggerProps) => (
      <div data-testid={dataTestId || 'ds-item-picker-trigger'}>{children}</div>
    ),
  );

  const findSectionById = vi.fn(() => undefined);

  return {
    default: ItemPicker,
    ItemPickerNew,
    ItemPickerLegacy,
    ItemPickerList,
    ItemPickerTrigger,
    findSectionById,
  };
};

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

export const mockItemPicker = () => {
  jest.mock('@synerise/ds-item-picker', () => {
    const ItemPicker = jest.fn(
      ({ children, 'data-testid': dataTestId }: ItemPickerProps) => (
        <div data-testid={dataTestId || 'ds-item-picker'}>{children}</div>
      ),
    );

    const ItemPickerNew = jest.fn(
      ({ children, 'data-testid': dataTestId }: ItemPickerProps) => (
        <div data-testid={dataTestId || 'ds-item-picker-new'}>{children}</div>
      ),
    );

    const ItemPickerLegacy = jest.fn(
      ({ children, 'data-testid': dataTestId }: ItemPickerProps) => (
        <div data-testid={dataTestId || 'ds-item-picker-legacy'}>
          {children}
        </div>
      ),
    );

    const ItemPickerList = jest.fn(
      ({ 'data-testid': dataTestId }: ItemPickerListProps) => (
        <div data-testid={dataTestId || 'ds-item-picker-list'} />
      ),
    );

    const ItemPickerTrigger = jest.fn(
      ({ children, 'data-testid': dataTestId }: ItemPickerTriggerProps) => (
        <div data-testid={dataTestId || 'ds-item-picker-trigger'}>
          {children}
        </div>
      ),
    );

    const findSectionById = jest.fn(() => undefined);

    return {
      __esModule: true,
      default: ItemPicker,
      ItemPickerNew,
      ItemPickerLegacy,
      ItemPickerList,
      ItemPickerTrigger,
      findSectionById,
    };
  });
};

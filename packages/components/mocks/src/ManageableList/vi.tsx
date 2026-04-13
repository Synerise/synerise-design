import React from 'react';

type MockManageableListItem = {
  id?: string | number;
  name?: string;
  [key: string]: unknown;
};

type MockManageableListProps = {
  items?: MockManageableListItem[];
  onItemAdd?: (item: MockManageableListItem) => void;
  onItemRemove?: (item: MockManageableListItem) => void;
  onItemEdit?: (item: MockManageableListItem) => void;
  onItemSelect?: (item: MockManageableListItem) => void;
  onChangeOrder?: (items: MockManageableListItem[]) => void;
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
};

type MockContentItemProps = {
  item?: MockManageableListItem;
  'data-testid'?: string;
};

type MockFilterItemProps = {
  item?: MockManageableListItem;
  'data-testid'?: string;
};

type MockSimpleItemProps = {
  item?: MockManageableListItem;
  'data-testid'?: string;
};

type MockAddItemProps = {
  onItemAdd?: () => void;
  'data-testid'?: string;
};

/**
 * Factory function for ManageableList mock.
 * Mocks the entire @synerise/ds-manageable-list package including ManageableList, ContentItem, FilterItem, SimpleItem, and AddItem.
 *
 * @example
 * ```typescript
 * import { manageableListMockFactory } from '@synerise/ds-mocks/ManageableList/vi';
 *
 * vi.mock('@synerise/ds-manageable-list', manageableListMockFactory);
 * ```
 */
export const manageableListMockFactory = () => {
  const ManageableList = vi.fn(
    ({
      items,
      onItemAdd: _onItemAdd,
      onItemRemove: _onItemRemove,
      onItemEdit: _onItemEdit,
      onItemSelect: _onItemSelect,
      onChangeOrder: _onChangeOrder,
      children,
      className,
      'data-testid': dataTestId,
    }: MockManageableListProps) => {
      const testId = dataTestId || 'ds-manageable-list';
      return (
        <div
          data-testid={testId}
          className={`ds-manageable-list ${className || ''}`}
        >
          {items?.map((item, index) => (
            <div key={item.id ?? index} data-testid={`${testId}-item-${index}`}>
              {item.name}
            </div>
          ))}
          {children}
        </div>
      );
    },
  );

  const ContentItem = vi.fn(
    ({ item, 'data-testid': dataTestId }: MockContentItemProps) => {
      const testId = dataTestId || 'ds-manageable-list-content-item';
      return (
        <div data-testid={testId} className="ds-manageable-list-content-item">
          {item?.name}
        </div>
      );
    },
  );

  const FilterItem = vi.fn(
    ({ item, 'data-testid': dataTestId }: MockFilterItemProps) => {
      const testId = dataTestId || 'ds-manageable-list-filter-item';
      return (
        <div data-testid={testId} className="ds-manageable-list-filter-item">
          {item?.name}
        </div>
      );
    },
  );

  const SimpleItem = vi.fn(
    ({ item, 'data-testid': dataTestId }: MockSimpleItemProps) => {
      const testId = dataTestId || 'ds-manageable-list-simple-item';
      return (
        <div data-testid={testId} className="ds-manageable-list-simple-item">
          {item?.name}
        </div>
      );
    },
  );

  const AddItem = vi.fn(
    ({ onItemAdd, 'data-testid': dataTestId }: MockAddItemProps) => {
      const testId = dataTestId || 'ds-manageable-list-add-item';
      return (
        <button
          data-testid={testId}
          className="ds-manageable-list-add-item"
          onClick={onItemAdd}
        >
          Add item
        </button>
      );
    },
  );

  return {
    default: ManageableList,
    ContentItem,
    FilterItem,
    SimpleItem,
    AddItem,
  };
};

/**
 * Factory function for minimal ManageableList mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-manageable-list', manageableListMinimalMockFactory);
 * ```
 */
export const manageableListMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  ContentItem: vi.fn(() => null),
  FilterItem: vi.fn(() => null),
  SimpleItem: vi.fn(() => null),
  AddItem: vi.fn(() => null),
});

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

export const mockManageableList = () => {
  jest.mock('@synerise/ds-manageable-list', () => {
    const ManageableList = jest.fn(
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
              <div
                key={item.id ?? index}
                data-testid={`${testId}-item-${index}`}
              >
                {item.name}
              </div>
            ))}
            {children}
          </div>
        );
      },
    );

    const ContentItem = jest.fn(
      ({ item, 'data-testid': dataTestId }: MockContentItemProps) => {
        const testId = dataTestId || 'ds-manageable-list-content-item';
        return (
          <div data-testid={testId} className="ds-manageable-list-content-item">
            {item?.name}
          </div>
        );
      },
    );

    const FilterItem = jest.fn(
      ({ item, 'data-testid': dataTestId }: MockFilterItemProps) => {
        const testId = dataTestId || 'ds-manageable-list-filter-item';
        return (
          <div data-testid={testId} className="ds-manageable-list-filter-item">
            {item?.name}
          </div>
        );
      },
    );

    const SimpleItem = jest.fn(
      ({ item, 'data-testid': dataTestId }: MockSimpleItemProps) => {
        const testId = dataTestId || 'ds-manageable-list-simple-item';
        return (
          <div data-testid={testId} className="ds-manageable-list-simple-item">
            {item?.name}
          </div>
        );
      },
    );

    const AddItem = jest.fn(
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
      __esModule: true,
      default: ManageableList,
      ContentItem,
      FilterItem,
      SimpleItem,
      AddItem,
    };
  });
};

export const mockManageableListMinimal = () => {
  jest.mock('@synerise/ds-manageable-list', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    ContentItem: jest.fn(() => null),
    FilterItem: jest.fn(() => null),
    SimpleItem: jest.fn(() => null),
    AddItem: jest.fn(() => null),
  }));
};

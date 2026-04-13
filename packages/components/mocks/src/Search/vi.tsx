import React from 'react';

type MockSearchProps = {
  children?: React.ReactNode;
  className?: string;
  value?: string;
  parameterValue?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  onParameterValueChange?: (value: string, parameter: unknown) => void;
  onClear?: () => void;
  clearTooltip?: string;
  parameters?: unknown[];
  recent?: unknown[];
  suggestions?: unknown[] | null;
  parametersDisplayProps?: unknown;
  recentDisplayProps?: unknown;
  suggestionsDisplayProps?: unknown;
  textLookupConfig?: Record<string, string>;
  searchWidth?: number;
  dropdownMaxHeight?: number;
  'data-testid'?: string;
};

type MockSearchInputProps = {
  children?: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  disabled?: boolean;
  disableInput?: boolean;
  alwaysExpanded?: boolean;
  clearTooltip?: React.ReactNode;
  'data-testid'?: string;
};

type MockSearchHeaderProps = {
  headerText?: string;
  tooltip?: string;
  'data-testid'?: string;
};

type MockSearchItemListProps = {
  data?: unknown[];
  itemRender?: (item: unknown) => React.ReactNode;
  rowHeight?: number;
  highlight?: string;
  onItemClick?: (item: unknown) => void;
  'data-testid'?: string;
};

type MockSearchButtonProps = {
  inputOpen?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  'data-testid'?: string;
};

/**
 * Factory function for Search mock with all sub-components.
 * Use directly with vi.mock() to avoid hoisting issues.
 *
 * @example
 * ```typescript
 * import { searchMockFactory } from '@synerise/ds-mocks/Search/vi';
 *
 * vi.mock('@synerise/ds-search', searchMockFactory);
 * ```
 */
export const searchMockFactory = () => ({
  default: vi.fn(
    ({
      className,
      value,
      placeholder,
      onValueChange,
      onClear,
      parameters,
      recent,
      suggestions,
      textLookupConfig,
      'data-testid': dataTestId,
    }: MockSearchProps) => {
      const testId = dataTestId || 'ds-search';
      const textKey = textLookupConfig?.parameters || 'text';
      return (
        <div className={`ds-search ${className || ''}`} data-testid={testId}>
          <input
            data-testid={`${testId}-input`}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onValueChange?.(e.target.value)}
          />
          {value && (
            <button data-testid={`${testId}-clear`} onClick={onClear}>
              Clear
            </button>
          )}
          {parameters && parameters.length > 0 && (
            <div data-testid={`${testId}-parameters`}>
              {parameters.map((param: Record<string, unknown>, i: number) => (
                <div key={i} data-testid={`${testId}-parameter-${i}`}>
                  {(param[textKey] as string) ||
                    (param.text as string) ||
                    String(param)}
                </div>
              ))}
            </div>
          )}
          {recent && recent.length > 0 && (
            <div data-testid={`${testId}-recent`}>
              {recent.map((item: Record<string, unknown>, i: number) => (
                <div key={i} data-testid={`${testId}-recent-${i}`}>
                  {(item[textLookupConfig?.recent || 'text'] as string) ||
                    String(item)}
                </div>
              ))}
            </div>
          )}
          {suggestions && suggestions.length > 0 && (
            <div data-testid={`${testId}-suggestions`}>
              {suggestions.map((item: Record<string, unknown>, i: number) => (
                <div key={i} data-testid={`${testId}-suggestion-${i}`}>
                  {(item[textLookupConfig?.suggestions || 'text'] as string) ||
                    String(item)}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    },
  ),
  SearchInput: vi.fn(
    ({
      value,
      onChange,
      onClear,
      placeholder,
      disabled,
      clearTooltip,
      'data-testid': dataTestId,
    }: MockSearchInputProps) => {
      const testId = dataTestId || 'ds-search-input';
      return (
        <div data-testid={testId}>
          <input
            data-testid={`${testId}-field`}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.value)}
          />
          {value && (
            <button data-testid={`${testId}-clear`} onClick={onClear}>
              {clearTooltip || 'Clear'}
            </button>
          )}
        </div>
      );
    },
  ),
  SearchHeader: vi.fn(
    ({
      headerText,
      tooltip,
      'data-testid': dataTestId,
    }: MockSearchHeaderProps) => (
      <div data-testid={dataTestId || 'ds-search-header'}>
        {headerText}
        {tooltip && (
          <span data-testid="ds-search-header-tooltip">{tooltip}</span>
        )}
      </div>
    ),
  ),
  SearchItems: vi.fn(
    ({
      data,
      itemRender,
      onItemClick,
      'data-testid': dataTestId,
    }: MockSearchItemListProps) => (
      <div data-testid={dataTestId || 'ds-search-items'}>
        {data?.map((item: unknown, i: number) => (
          <div
            key={i}
            data-testid={`ds-search-item-${i}`}
            className="ds-search-item"
            onClick={() => onItemClick?.(item)}
          >
            {itemRender ? itemRender(item) : String(item)}
          </div>
        ))}
      </div>
    ),
  ),
  SearchItemList: vi.fn(
    ({
      data,
      itemRender,
      onItemClick,
      'data-testid': dataTestId,
    }: MockSearchItemListProps) => (
      <div data-testid={dataTestId || 'ds-search-items'}>
        {data?.map((item: unknown, i: number) => (
          <div
            key={i}
            data-testid={`ds-search-item-${i}`}
            className="ds-search-item"
            onClick={() => onItemClick?.(item)}
          >
            {itemRender ? itemRender(item) : String(item)}
          </div>
        ))}
      </div>
    ),
  ),
  SearchButton: vi.fn(
    ({
      onClick,
      disabled,
      'data-testid': dataTestId,
    }: MockSearchButtonProps) => (
      <button
        data-testid={dataTestId || 'ds-search-button'}
        onClick={onClick}
        disabled={disabled}
      >
        Search
      </button>
    ),
  ),
  renderSearchList: vi.fn(() => null),
});

/**
 * Factory function for minimal Search mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-search', searchMinimalMockFactory);
 * ```
 */
export const searchMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  SearchInput: vi.fn(() => null),
  SearchHeader: vi.fn(() => null),
  SearchItems: vi.fn(() => null),
  SearchItemList: vi.fn(() => null),
  SearchButton: vi.fn(() => null),
  renderSearchList: vi.fn(() => null),
});

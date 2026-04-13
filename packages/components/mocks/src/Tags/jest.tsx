import React from 'react';

import type { TagsProps } from '@synerise/ds-tags';

export type MockTagsProps = TagsProps & {
  'data-testid'?: string;
};

export const mockTags = () => {
  jest.mock('@synerise/ds-tags', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        selected = [],
        data,
        addable,
        removable,
        creatable,
        disabled,
        onSelectedChange,
        onCreate,
        title,
        className,
        'data-testid': dataTestId,
      }: MockTagsProps) => {
        const testId = dataTestId || 'ds-tags';
        return (
          <div
            data-testid={testId}
            className={`ds-tags ${className || ''}`}
            data-addable={addable}
            data-removable={removable}
            data-creatable={creatable}
            data-disabled={disabled}
          >
            {title && <div data-testid={`${testId}-title`}>{title}</div>}
            <div data-testid={`${testId}-selected`}>
              {selected.map((tag, index) => (
                <div
                  key={tag.id ?? index}
                  data-testid={`${testId}-tag-${index}`}
                >
                  {tag.name}
                  {removable && !disabled && (
                    <button
                      data-testid={`${testId}-tag-${index}-remove`}
                      onClick={() =>
                        onSelectedChange?.(
                          selected.filter((_, i) => i !== index),
                          { type: 'REMOVE', tag },
                        )
                      }
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
            {addable && data && !disabled && (
              <div data-testid={`${testId}-add`}>
                {data
                  .filter((tag) => !selected.some((s) => s.id === tag.id))
                  .map((tag, index) => (
                    <button
                      key={tag.id ?? index}
                      data-testid={`${testId}-add-tag-${index}`}
                      onClick={() =>
                        onSelectedChange?.([...selected, tag], {
                          type: 'ADD',
                          tag,
                        })
                      }
                    >
                      {tag.name}
                    </button>
                  ))}
              </div>
            )}
            {creatable && !disabled && (
              <button
                data-testid={`${testId}-create`}
                onClick={() => onCreate?.('New Tag')}
              >
                Create
              </button>
            )}
          </div>
        );
      },
    ),
    AddTags: jest.fn(
      ({ 'data-testid': dataTestId }: Record<string, unknown>) => (
        <div data-testid={dataTestId || 'ds-add-tags'} />
      ),
    ),
    TagsStyles: {},
    Tag: jest.fn(
      ({ name, 'data-testid': dataTestId }: Record<string, unknown>) => (
        <div data-testid={(dataTestId as string) || 'ds-tag'}>
          {name as string}
        </div>
      ),
    ),
    TagShape: {},
  }));
};

export const mockTagsMinimal = () => {
  jest.mock('@synerise/ds-tags', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    AddTags: jest.fn(() => null),
    TagsStyles: {},
    Tag: jest.fn(() => null),
    TagShape: {},
  }));
};

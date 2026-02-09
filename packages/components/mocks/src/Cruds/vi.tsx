import React from 'react';

import type { CrudsProps } from '@synerise/ds-cruds/dist/Cruds.types';

export type MockCrudsProps = CrudsProps & {
  'data-testid'?: string;
};

/**
 * Factory function for Cruds mock.
 * Use directly with vi.mock() to avoid hoisting issues.
 *
 * @example
 * ```typescript
 * import { crudsMockFactory } from '@synerise/ds-mocks/Cruds/vi';
 *
 * vi.mock('@synerise/ds-cruds', crudsMockFactory);
 * ```
 */
export const crudsMockFactory = () => ({
  default: vi.fn(
    ({
      onAdd,
      onEdit,
      onDelete,
      onRemove,
      onDuplicate,
      onMoveUp,
      onMoveDown,
      'data-testid': dataTestId,
    }: MockCrudsProps) => (
      <div data-testid={dataTestId || 'ds-cruds'} className="ds-cruds">
        {onAdd && (
          <button
            data-testid={`${dataTestId || 'ds-cruds'}-add`}
            onClick={onAdd}
          >
            Add
          </button>
        )}
        {onEdit && (
          <button
            data-testid={`${dataTestId || 'ds-cruds'}-edit`}
            onClick={onEdit}
          >
            Edit
          </button>
        )}
        {onDuplicate && (
          <button
            data-testid={`${dataTestId || 'ds-cruds'}-duplicate`}
            onClick={onDuplicate}
          >
            Duplicate
          </button>
        )}
        {onDelete && (
          <button
            data-testid={`${dataTestId || 'ds-cruds'}-delete`}
            onClick={onDelete}
          >
            Delete
          </button>
        )}
        {onRemove && (
          <button
            data-testid={`${dataTestId || 'ds-cruds'}-remove`}
            onClick={onRemove}
          >
            Remove
          </button>
        )}
        {onMoveUp && (
          <button
            data-testid={`${dataTestId || 'ds-cruds'}-move-up`}
            onClick={onMoveUp}
          >
            Up
          </button>
        )}
        {onMoveDown && (
          <button
            data-testid={`${dataTestId || 'ds-cruds'}-move-down`}
            onClick={onMoveDown}
          >
            Down
          </button>
        )}
      </div>
    ),
  ),
});

/**
 * Factory function for minimal Cruds mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-cruds', crudsMinimalMockFactory);
 * ```
 */
export const crudsMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});

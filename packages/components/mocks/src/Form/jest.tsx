import React, { type ReactNode } from 'react';

import type { EditListProps, EditableParam } from '@synerise/ds-form';

export type { EditableParam };

export type MockEditableListProps = EditListProps & {
  'data-testid'?: string;
};

export type MockFieldSetProps = {
  className?: string;
  heading: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  withLine?: boolean;
  'data-testid'?: string;
};

export const mockForm = () => {
  jest.mock('@synerise/ds-form', () => {
    const FieldSet = jest.fn(
      ({
        heading,
        description,
        children,
        withLine,
        'data-testid': dataTestId,
      }: MockFieldSetProps) => {
        const testId = dataTestId || 'ds-fieldset';
        return (
          <div
            data-testid={testId}
            className="ds-fieldset"
            data-with-line={withLine}
          >
            {heading && <div data-testid={`${testId}-heading`}>{heading}</div>}
            {description && (
              <div data-testid={`${testId}-description`}>{description}</div>
            )}
            {children}
          </div>
        );
      },
    );

    const Form = Object.assign(
      jest.fn(() => null),
      { FieldSet },
    );

    return {
      __esModule: true,
      default: Form,
      EditableList: jest.fn(
        ({
          value = [],
          onClickDelete,
          leftColumnName,
          rightColumnName,
          addButtonConfig,
          renderLeftColumn,
          renderRightColumn,
          renderActions,
          'data-testid': dataTestId,
        }: MockEditableListProps) => {
          const testId = dataTestId || 'ds-editable-list';

          const renderRowActions = (
            param: EditableParam,
            index: number,
            params: EditableParam[],
          ) => {
            if (typeof renderActions === 'function') {
              return renderActions(param, index, params, {
                onClickDelete,
              });
            }

            if (renderActions === false) {
              return null;
            }

            return (
              <button
                data-testid={`${testId}-delete-${index}`}
                onClick={() => onClickDelete?.(param, index)}
              >
                Delete
              </button>
            );
          };

          return (
            <div data-testid={testId} className="ds-editable-list">
              <div data-testid={`${testId}-header`}>
                {leftColumnName && <span>{leftColumnName}</span>}
                {rightColumnName && <span>{rightColumnName}</span>}
              </div>
              <div data-testid={`${testId}-rows`}>
                {value.map((param: EditableParam, index: number) => (
                  <div key={index} data-testid={`${testId}-row-${index}`}>
                    {renderLeftColumn ? (
                      renderLeftColumn(param, index)
                    ) : (
                      <span>{param.name}</span>
                    )}
                    {renderRightColumn ? (
                      renderRightColumn(param, index)
                    ) : (
                      <span>{param.value}</span>
                    )}
                    {renderRowActions(param, index, value)}
                  </div>
                ))}
              </div>
              {addButtonConfig && (
                <button
                  data-testid={`${testId}-add`}
                  onClick={addButtonConfig.onClickAddRow}
                  disabled={addButtonConfig.disableAddButton}
                >
                  {addButtonConfig.textAddButton || 'Add'}
                </button>
              )}
            </div>
          );
        },
      ),
    };
  });
};

export const mockFormMinimal = () => {
  jest.mock('@synerise/ds-form', () => {
    const Form = Object.assign(
      jest.fn(() => null),
      {
        FieldSet: jest.fn(() => null),
      },
    );

    return {
      __esModule: true,
      default: Form,
      EditableList: jest.fn(() => null),
    };
  });
};

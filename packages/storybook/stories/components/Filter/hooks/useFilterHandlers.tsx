import React, { createRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

import Button from '@synerise/ds-button';
import CompletedWithin, { PeriodValue } from '@synerise/ds-completed-within';
import { ContextGroup, ContextItem } from '@synerise/ds-context-selector';
import { theme } from '@synerise/ds-core';
import DateRangePicker, { DateRange } from '@synerise/ds-date-range-picker';
import { SavedFilter } from '@synerise/ds-date-range-picker/dist/RangeFilter/Shared/FilterDropdown/FilterDropdown.types';
import { Expression } from '@synerise/ds-filter';
import Icon, { CalendarM } from '@synerise/ds-icon';
import Tag, { TagShape } from '@synerise/ds-tag';
import Tooltip from '@synerise/ds-tooltip';

import { ExpressionWithSteps } from '../Filter.types';
import { DEFAULT_EXPRESSION, renderDateRange } from '../Filter.data';
import { ConditionExample } from '../ConditionExample';

export const useFilterHandlers = ({ isDateFilterOn, conditionFooterRelativeDateRange, ...args }) => {
  const [expressions, setExpressions] = useState<ExpressionWithSteps[]>(args.expressions);
  const [filters, setFilters] = useState<SavedFilter[]>([]);

  const expressionRefs = {};
  expressions.forEach((exp: Expression) => {
    expressionRefs[exp.id] = createRef();
  });

  const renderStepFooter = (expression: ExpressionWithSteps) => {
    const handleCompletedWithin = (completedWithinValue: PeriodValue) => {
      setExpressions(
        expressions.map(exp => {
          if (exp.id === expression.id) {
            return {
              ...exp,
              footer: {
                ...exp.footer,
                completedWithinValue,
              },
            };
          }
          return exp;
        })
      );
    };

    const handleDateRange = (dateRange: DateRange) => {
      setExpressions(
        expressions.map(exp => {
          if (exp.id === expression.id) {
            return {
              ...exp,
              footer: {
                ...exp.footer,
                dateRange,
              },
            };
          }
          return exp;
        })
      );
    };

    const dateRangePickerTrigger = !expression?.footer?.dateRange ? (
      <Tooltip
        description="Filter by time elapsed between completing the first and last step in the funnel."
        type={'largeSimple'}
      >
        <Button type="tertiary" mode="icon-label" readOnly={args.readOnly}>
          <Icon component={<CalendarM />} />
          In date range
        </Button>
      </Tooltip>
    ) : (
      <Button type="tertiary" mode="label-icon" readOnly={args.readOnly}>
        {renderDateRange(expression?.footer?.dateRange)}
        <Icon component={<CalendarM />} />
      </Button>
    );

    const dateFilterProps = isDateFilterOn
      ? {
        savedFilters: filters,
        onFilterSave: setFilters,
      }
      : {};

    return (
      <>
        {expression?.footer?.completedWithinValue && (
          <CompletedWithin
            value={expression.footer.completedWithinValue}
            onSetValue={handleCompletedWithin}
            placeholder="Completed within"
            readOnly={args.readOnly}
          />
        )}
        {expression?.footer?.dateRange && (
          <DateRangePicker
            // @ts-ignore
            onApply={handleDateRange}
            value={expression.footer.dateRange}
            popoverTrigger={dateRangePickerTrigger}
            showRelativePicker={conditionFooterRelativeDateRange}
            relativeModes={['PAST']}
            showFilter={isDateFilterOn}
            showTime
            {...dateFilterProps}
          />
        )}
      </>
    );
  };

  const jumpToExpression = (expressionId: string) => {
    if (expressionRefs[expressionId] && expressionRefs[expressionId].current) {
      expressionRefs[expressionId].current.scrollIntoView();
    }
  };

  const renderHeaderRightSide = expressions => {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
        {expressions.map((expression, index) => {
          if (expression.type === 'STEP') {
            return (
              <>
                <Tag
                  shape={TagShape.SINGLE_CHARACTER_ROUND}
                  name={String.fromCharCode(index + 65)}
                  color={theme.palette['grey-200']}
                  onClick={(): void => {
                    jumpToExpression(expression.id);
                  }}
                />
                {expression.logic && index + 1 < expressions.length && <>{expression.logic?.data?.value}</>}
              </>
            );
          }
        })}
      </div>
    );
  };

  const renderStepContent = (expression: ExpressionWithSteps, hoverDisabled?: boolean) => {
    const handleChangeExpressionSteps = expressionSteps => {
      setExpressions(
        expressions.map(exp => {
          if (exp.id === expression.id) {
            return {
              ...exp,
              expressionSteps,
            };
          }
          return exp;
        })
      );
      args.onExpressionStepChange?.();
    };

    return (
      <ConditionExample
        ref={expressionRefs[expression.id]}
        onChange={handleChangeExpressionSteps}
        steps={expression.expressionSteps || []}
        hoverDisabled={hoverDisabled}
        readOnly={args.readOnly}
      />
    );
  };

  const renderStepHeaderRightSide = (_expression: Expression, index: number, options?: { placeholder?: boolean }) => {
    const isDragPlaceholder = options?.placeholder
    return (
      <Tag
        shape={TagShape.SINGLE_CHARACTER_ROUND}
        name={String.fromCharCode(index + 65)}
        color={isDragPlaceholder ? theme.palette['blue-600'] : theme.palette['grey-200']}
        asPill
      />
    );
  };
  const handleChangeLogic = (id: string, logic: string) => {
    setExpressions(
      expressions.map(exp => {
        if (exp.type === 'STEP' && exp.logic && exp.logic.id === id) {
          return {
            ...exp,
            logic: {
              ...exp.logic,
              data: {
                ...exp.logic.data,
                value: logic,
              },
            },
          };
        }
        if (exp.type === 'LOGIC' && exp.id === id) {
          return {
            ...exp,
            data: {
              ...exp.data,
              value: logic,
            },
          };
        }
        return exp;
      })
    );
    args.onChangeLogic?.(id, logic);
  };

  const handleChangeStepMatching = (id: string, stepMatching: boolean) => {
    setExpressions(
      expressions.map(exp => {
        if (exp.id === id) {
          return {
            ...exp,
            data: {
              ...exp.data,
              matching: stepMatching,
            },
          };
        }
        return exp;
      })
    );
    args.onChangeStepMatching?.(id, stepMatching);
  };

  const handleChangeStepName = (id: string, name: string) => {
    setExpressions(
      expressions.map(exp => {
        if (exp.id === id) {
          return {
            ...exp,
            data: {
              ...exp.data,
              name,
            },
          };
        }
        return exp;
      })
    );
    args.onChangeStepName?.(id, name);
  };

  const handleDeleteStep = (id: string) => {
    setExpressions(expressions.filter(exp => exp.id !== id));
    args.onDeleteStep?.(id);
  };

  const handleDuplicateStep = (id: string) => {
    const expressionDuplicate = expressions.find(exp => exp.id === id);
    expressionDuplicate?.type === 'STEP' &&
      setExpressions([
        ...expressions,
        {
          ...expressionDuplicate,
          id: uuid(),
          logic: expressionDuplicate.logic ? { ...expressionDuplicate.logic, id: uuid() } : undefined,
        },
      ]);
    args.onDuplicateStep?.(id);
  };

  const handleAddStep = (subject?: ContextItem | ContextGroup) => {
    setExpressions([...expressions, DEFAULT_EXPRESSION(subject)]);
  };

  const handleChangeOrder = (expressions: Expression[]) => {
    setExpressions(expressions);
  };

  return {
    handleAddStep,
    handleChangeLogic,
    handleChangeOrder,
    handleChangeStepMatching,
    handleChangeStepName,
    handleDeleteStep,
    handleDuplicateStep,
    expressions,
    setExpressions,
    renderHeaderRightSide,
    renderStepContent,
    renderStepFooter,
    renderStepHeaderRightSide
  };
};

import * as React from 'react';
import { useState } from 'react';
import Filter from '@synerise/ds-filter';
import { Tag, TagShape } from '@synerise/ds-tags';
import { v4 as uuid } from 'uuid';
import { withState } from '@dump247/storybook-state';
import { ConditionExample } from '../StepCard/data/Condition';
import { DEFAULT_STEP } from '../Condition/data/index.data';
import CompletedWithin from '@synerise/ds-completed-within';
import Tooltip from '@synerise/ds-tooltip';
import { dateRangePickerTexts } from '../StepCard/data/stepCard.data';
import DateRangePicker, { fnsFormat } from '@synerise/ds-date-range-picker';
import Button from '@synerise/ds-button';
import Icon, { CalendarM } from '@synerise/ds-icon';
import { CONTEXT_TEXTS } from '../ContextSelector/data/index.data';
import { CONTEXT_CLIENT_GROUPS, CONTEXT_CLIENT_ITEMS } from '../ContextSelector/data/client.data';
import ContextSelector from '@synerise/ds-context-selector';
import { theme } from '@synerise/ds-core';
import { boolean, number } from '@storybook/addon-knobs';
import { utils } from '@synerise/ds-date-range-picker';
import Layout from '@synerise/ds-layout';

const DEFAULT_EXPRESSION = (subject = undefined) => ({
  type: 'STEP',
  id: uuid(),
  data: {
    name: '',
    matching: true,
  },
  logic: {
    type: 'LOGIC',
    id: uuid(),
    data: {
      value: 'AND',
    },
  },
  footer: {
    completedWithinValue: {
      period: undefined,
      value: undefined,
    },
    dateRange: {
      from: undefined,
      to: undefined,
      ...utils.DEFAULT_RANGE,
    },
  },
  expressionType: 'event', // or 'attribute'
  expressionSteps: [DEFAULT_STEP(subject)],
});

const DEFAULT_STATE = {
  expressions: [DEFAULT_EXPRESSION(), DEFAULT_EXPRESSION()],
  matching: true,
};

const stories = {
  default: withState(DEFAULT_STATE)(({ store }) => {
    const handleChangeLogic = (id, logic) => {
      const expressions = store.state.expressions.map(exp => {
        if (exp.type === 'STEP' && exp.logic.id === id) {
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
      });
      store.set({
        expressions,
      });
    };

    const handleChangeStepMatching = (id, matching) => {
      const expressions = store.state.expressions.map(exp => {
        if (exp.id === id) {
          return {
            ...exp,
            data: {
              ...exp.data,
              matching,
            },
          };
        }
        return exp;
      });
      store.set({ expressions });
    };

    const handleChangeStepName = (id, name) => {
      const expressions = store.state.expressions.map(exp => {
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
      });
      store.set({ expressions });
    };

    const handleDeleteStep = id => {
      const expressions = store.state.expressions.filter(exp => exp.id !== id);
      store.set({ expressions });
    };

    const handleDuplicateStep = id => {
      const expression = store.state.expressions.find(exp => exp.id === id);
      store.set({
        expressions: [
          ...store.state.expressions,
          { ...expression, id: uuid(), logic: { ...expression.logic, id: uuid() } },
        ],
      });
    };

    const renderStepFooter = expression => {
      const handleCompletedWithin = completedWithinValue => {
        const expressions = store.state.expressions.map(exp => {
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
        });
        store.set({
          expressions,
        });
      };

      const handleDateRange = value => {
        const expressions = store.state.expressions.map(exp => {
          if (exp.id === expression.id) {
            return {
              ...exp,
              footer: {
                ...exp.footer,
                dateRange: value,
              },
            };
          }
          return exp;
        });

        store.set({
          expressions,
        });
      };

      const dateRangePickerTrigger = !expression?.footer?.dateRange?.from ? (
        <Tooltip
          description="Filter by time elapsed between completing the first and last step in the funnel."
          type={'largeSimple'}
        >
          <Button type="tertiary" mode="icon-label">
            <Icon component={<CalendarM />} />
            In date range
          </Button>
        </Tooltip>
      ) : (
        <Button type="tertiary" mode="label-icon">
          {fnsFormat(expression.footer.dateRange.from, 'MMM D, YYYY')}
          {` - `}
          {fnsFormat(expression.footer.dateRange.to, 'MMM D, YYYY')}
          <Icon component={<CalendarM />} />
        </Button>
      );
      const isDateFilterOn = boolean('Show filter', false);
      const [filters, setFilters] = useState([]);
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
            />
          )}
          {expression?.footer?.dateRange && (
            <DateRangePicker
              onApply={handleDateRange}
              texts={dateRangePickerTexts}
              value={expression.footer.dateRange}
              popoverTrigger={dateRangePickerTrigger}
              showRelativePicker={boolean('Set relative filter', true)}
              relativeModes={['PAST', 'FUTURE', 'SINCE']}
              showFilter={isDateFilterOn}
              showTime
              popoverProps={{ destroyTooltipOnHide: boolean('Destroy tooltip on hide', false, 'DateRangePicker') }}
              {...dateFilterProps}
            />
          )}
        </>
      );
    };

    const readOnly = boolean('Set readOnly', false);

    const expressionRefs = {};
    store.state.expressions.forEach(exp => {
      expressionRefs[exp.id] = React.createRef();
    });

    const jumpToExpression = expressionId => {
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

    const renderStepContent = (expression, hoverDisabled) => {
      const handleChangeExpressionSteps = expressionSteps => {
        const expressions = store.state.expressions.map(exp => {
          if (exp.id === expression.id) {
            return {
              ...exp,
              expressionSteps,
            };
          }
          return exp;
        });

        store.set({ expressions });
      };

      return (
        <ConditionExample
          ref={expressionRefs[expression.id]}
          onChange={handleChangeExpressionSteps}
          steps={expression.expressionSteps}
          hoverDisabled={hoverDisabled}
          readOnly={readOnly}
        />
      );
    };

    const renderStepHeaderRightSide = (expression, index): React.ReactNode => {
      return (
        <Tag
          shape={TagShape.SINGLE_CHARACTER_ROUND}
          name={String.fromCharCode(index + 65)}
          color={theme.palette['grey-200']}
          asPill
        />
      );
    };

    const handleAddStep = subject => {
      store.set({ expressions: [...store.state.expressions, DEFAULT_EXPRESSION(subject)] });
    };

    const handleChangeMatching = matching => {
      store.set({ matching });
    };

    const handleChangeOrder = expressions => {
      store.set({ expressions });
    };

    const showStepTags = boolean('Show step card tags', true);

    const maxConditionsLimit = number('Set max conditions limit', 0);

    return (
      <div
        style={{
          padding: 24,
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          position: 'absolute',
          top: '0',
          left: '0',
          backgroundColor: theme.palette['grey-050'],
        }}
      >
        
        <Layout nativeScroll={boolean('Use native scroll', false)} mainSidebarWithDnd={boolean('Use scrollbar with drag and drop?', true)}>
          <div style={{width:'1000px'}}>
            <Filter
            maxConditionsLimit={maxConditionsLimit}
            expressions={store.state.expressions}
            getMoveByLabel={offset => {
              if (offset < 0) {
                return `Move ${Math.abs(offset)} up...`;
              } else {
                return `Move ${Math.abs(offset)} down...`;
              }
            }}
            addFilterComponent={({ isLimitExceeded }) => (
              <ContextSelector
                disabled={isLimitExceeded}
                texts={{ ...CONTEXT_TEXTS, buttonLabel: 'Add filter' }}
                onSelectItem={handleAddStep}
                selectedItem={undefined}
                items={CONTEXT_CLIENT_ITEMS}
                groups={CONTEXT_CLIENT_GROUPS}
                addMode={true}
              />
            )}
            onChangeLogic={handleChangeLogic}
            onChangeOrder={handleChangeOrder}
            onChangeStepMatching={handleChangeStepMatching}
            onChangeStepName={handleChangeStepName}
            onDeleteStep={handleDeleteStep}
            onDuplicateStep={handleDuplicateStep}
            // renderStepFooter={renderStepFooter}
            renderStepContent={renderStepContent}
            renderStepHeaderRightSide={showStepTags && renderStepHeaderRightSide}
            renderHeaderRightSide={showStepTags && renderHeaderRightSide}
            matching={{
              onChange: handleChangeMatching,
              matching: store.state.matching,
              sentence: 'find all items #MATCHING_TOGGLE# this condition',
              readOnly,
            }}
            texts={{
              step: {
                matching: 'Performed',
                notMatching: 'Not performed',
                conditionType: 'event',
                namePlaceholder: 'Unnamed',
                moveTooltip: 'Move',
                deleteTooltip: 'Delete',
                duplicateTooltip: 'Duplicate',
                moveUpTooltip: 'Move up',
                moveDownTooltip: 'Move down',
              },
              matching: {
                matching: 'matching',
                notMatching: 'not matching',
              },
              addFilter: 'Add filter',
              dropMeHere: 'Drop me here',
              conditionsLimit: 'Conditions limit',
            }}
            visibilityConfig={{
              isStepCardHeaderVisible: boolean('Show step card header', true),
            }}
            readOnly={readOnly}
          />
          </div>
        </Layout>
      </div>
    );
  }),
  minWidth: () => {
    const [exprs, setExprs] = React.useState(DEFAULT_STATE.expressions);
    React.useEffect(() => {
      const cond = {
        id: 'aa845890-156d-4641-9366-d40280562d39',
        parameter: {
          value: {
            id: 'aa845890-156d-4641-9366-d40280562d37',
            name: 'City',
          },
        },
        operator: {
          value: {
            id: 'DATE_EQUAL',
            value: 'DATE_EQUAL',
            logic: 'EQUAL',
            name: 'Equal',
            groupId: 'DATE_ONE',
            group: 'DATE_ONE',
            groupName: 'Date',
            availableFactors: ['date', 'parameter', 'dynamicKey'],
          },
        },
        factor: {
          selectedFactorType: '',
          defaultFactorType: 'text',
          value: '123456789',
        },
      };
      exprs[0].expressionSteps[0].conditions.push(cond);
    }, []);
    return (
      <>
        <Filter
          expressions={exprs}
          onChangeOrder={console.info}
          addFilterComponent={
            <button
              onClick={(ev, subj = 'subj') => {
                setExprs([...exprs, DEFAULT_EXPRESSION(subj)]);
              }}
            >
              +
            </button>
          }
          renderStepContent={(expr, hoverDisabled) => {
            const idx = exprs.indexOf(expr);
            function updateSteps(steps) {
              console.info(steps);
              const newExprs = [...exprs];
              newExprs[idx] = { ...newExprs[idx], expressionSteps: steps };
              setExprs(newExprs);
              return newExprs;
            }
            return (
              <ConditionExample
                onChange={updateSteps}
                steps={expr.expressionSteps}
                hoverDisabled={hoverDisabled}
                readOnly={false}
              />
            );
          }}
          texts={{
            addFilter: 'Add filter',
          }}
        />
      </>
    );
  },
};

export default {
  name: 'Components/Filter/Filter',
  config: {},
  stories,
  Component: Filter,
};

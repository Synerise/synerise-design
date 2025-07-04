import { v4 as uuid } from 'uuid';

import type { ConditionStep } from '@synerise/ds-condition';
import type { ContextGroup, ContextItem } from '@synerise/ds-context-selector';
import { DateRange, fnsFormat, utils } from '@synerise/ds-date-range-picker';

import {
  DEFAULT_STEP,
  STEPS_POPULATED,
  STEPS_POPULATED_FACTOR_ERRORS,
  STEPS_POPULATED_OPERATOR_ERRORS,
  STEPS_POPULATED_PARAMETER_ERRORS,
} from '../Condition/Condition.data';
import type { ExpressionWithSteps } from './Filter.types';

const COMPLETED_WITHIN_VALUE = {
  period: undefined,
  value: undefined,
};

export const renderDateRange = (value: DateRange) => {
  if (value.type === 'ABSOLUTE') {
    if (value.from && value.to)
      return `${fnsFormat(new Date(value.from), 'MMM d, yyyy')} - ${fnsFormat(new Date(value.to), 'MMM d, yyyy')}`;
    if (!value.from && !value.to)
      return value.translationKey?.toLocaleUpperCase();
    return 'In date range';
  }
  return value.translationKey && value.translationKey !== 'custom'
    ? value.translationKey
    : `${value.duration.value} ${value.duration.type.toLocaleLowerCase()} before ${
        value.offset.value
      } ${value.offset.type.toLocaleLowerCase()}`;
};

export const DEFAULT_EXPRESSION = (
  subject?: ContextItem | ContextGroup,
): ExpressionWithSteps => ({
  type: 'STEP' as const,
  id: uuid(),
  data: {
    name: '',
    matching: true,
  },
  logic: {
    type: 'LOGIC' as const,
    id: uuid(),
    data: {
      value: 'AND',
    },
  },
  expressionType: 'event',
  expressionSteps: [DEFAULT_STEP(subject)],
  footer: {
    completedWithinValue: {
      ...COMPLETED_WITHIN_VALUE,
    },
    dateRange: {
      from: undefined,
      to: undefined,
      ...utils.DEFAULT_RANGE,
    },
  },
});

export const FILTER_TEXTS = {
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
};

const FILTER_EXPRESSION_STEPS: ConditionStep[] = [...STEPS_POPULATED];

const FILTER_EXPRESSION_STEP = FILTER_EXPRESSION_STEPS[0];

const FILTER_EXPRESSION_STEP_FACTOR_ERRORS = {
  ...STEPS_POPULATED_FACTOR_ERRORS[0],
};
const FILTER_EXPRESSION_STEP_OPERATOR_ERRORS = {
  ...STEPS_POPULATED_OPERATOR_ERRORS[0],
};
const FILTER_EXPRESSION_STEP_PARAMETER_ERRORS = {
  ...STEPS_POPULATED_PARAMETER_ERRORS[0],
};

export const EXPRESSIONS: ExpressionWithSteps[] = [
  {
    type: 'STEP' as const,
    id: 'af8cadc2-efeb-4be6-a988-ty8b92e4ec4c',
    data: {
      name: 'Step 1 name',
      matching: true,
    },
    logic: {
      type: 'LOGIC',
      id: 'c5287f4e-6081-4b51-b317-2982582618ff',
      data: {
        value: 'OR',
      },
    },
    expressionType: 'event' as const,
    expressionSteps: FILTER_EXPRESSION_STEPS,
    footer: {
      completedWithinValue: {
        ...COMPLETED_WITHIN_VALUE,
      },
      dateRange: {
        translationKey: 'today',
        type: 'RELATIVE',
        key: 'TODAY',
        duration: {
          type: 'DAYS',
          value: 1,
        },
        offset: {
          type: 'DAYS',
          value: 0,
        },
        future: false,
      } as DateRange,
    },
  },
  {
    type: 'STEP',
    id: '8fad8b12-1ca6-4924-8ac0-44d07213888e',
    data: {
      name: 'Step 2 name',
      matching: false,
    },
    logic: {
      type: 'LOGIC',
      id: '38b9bada-50aa-483a-b4a9-470ce5e59263',
      data: {
        value: 'AND',
      },
    },
    expressionType: 'event',
    expressionSteps: [
      FILTER_EXPRESSION_STEP,
      FILTER_EXPRESSION_STEP_FACTOR_ERRORS,
    ],
    footer: {
      completedWithinValue: {
        ...COMPLETED_WITHIN_VALUE,
      },
      dateRange: {
        from: '2024-07-30T22:00:00.000Z',
        to: '2024-08-29T21:59:59.999Z',
        translationKey: 'custom',
        type: 'RELATIVE',
        offset: {
          value: 0,
          type: 'DAYS',
        },
        duration: {
          value: 30,
          type: 'DAYS',
        },
      },
    },
  },
];
export const EXPRESSIONS_WITH_ERRORS: ExpressionWithSteps[] = [
  {
    type: 'STEP' as const,
    id: 'af8cadc2-efeb-4be6-a988-bf8b92e4ec4c',
    data: {
      name: 'Step 1 name',
      matching: true,
    },
    logic: {
      type: 'LOGIC',
      id: 'c5287f4e-6081-4b51-b312-2982582618ff',
      data: {
        value: 'OR',
      },
    },
    expressionType: 'event' as const,
    expressionSteps: [
      FILTER_EXPRESSION_STEP_PARAMETER_ERRORS,
      FILTER_EXPRESSION_STEP_OPERATOR_ERRORS,
      FILTER_EXPRESSION_STEP_FACTOR_ERRORS,
    ],
    footer: {
      completedWithinValue: {
        ...COMPLETED_WITHIN_VALUE,
      },
      dateRange: {
        translationKey: 'today',
        type: 'RELATIVE',
        key: 'TODAY',
        duration: {
          type: 'DAYS',
          value: 1,
        },
        offset: {
          type: 'DAYS',
          value: 0,
        },
        future: false,
      } as DateRange,
    },
  },
];

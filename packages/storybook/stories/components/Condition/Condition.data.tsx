import React from 'react';
import { v4 as uuid } from 'uuid';

import { NotificationsM, VarTypeStringM } from '@synerise/ds-icon';
import type { ConditionStep, StepConditions } from '@synerise/ds-condition';
import type { ContextGroup, ContextItem } from '@synerise/ds-context-selector';
import type { OperatorsItem } from '@synerise/ds-operators';
import type { DefinedFactorTypes } from '@synerise/ds-factors/dist/Factors.types'

import { CONTEXT_ITEMS, CONTEXT_GROUPS, CONTEXT_TEXTS } from '../ContextSelector/data/context.data';
import { OPERATORS_GROUPS, OPERATORS_ITEMS } from '../Operators/data/index.data';

import {
  FACTORS_TEXTS,
  FACTORS_GROUPS as PARAMETER_GROUPS,
  FACTORS_ITEMS as PARAMETER_ITEMS,
} from '../Factors/Factors.data';

export const SUBJECT_ITEMS = [...new Array(30)].map((_i, index) => ({
  id: index,
  name: `Attribute #${index}`,
  icon: <NotificationsM />,
}));

export const CONDITION_TEXTS = {
  stepNamePlaceholder: 'Unnamed step',
  removeConditionRowTooltip: 'Remove',
  addFirstConditionRowButton: 'where',
  addConditionRowButton: 'and where',
  dropLabel: 'Drop me here',
  addStep: 'And then...',
  duplicateTooltip: 'Duplicate',
  removeTooltip: 'Remove',
  moveTooltip: 'Move',
};

export const DEFAULT_CONDITION_ROW = (): StepConditions => ({
  id: uuid(),
  parameter: {
    ...DEFAULT_PARAMETER_VALUE,
  },
  operator: {
    ...DEFAULT_OPERATOR_VALUE,
  },
  factor: {
    ...DEFAULT_FACTOR_VALUE,
  },
});

export const DEFAULT_ACTION_ATTRIBUTE_VALUE = {
  value: '',
  texts: FACTORS_TEXTS,
  availableFactorTypes: ['parameter' as const],
  selectedFactorType: 'parameter' as const,
  defaultFactorType: 'parameter' as const,
  withoutTypeSelector: true,

  parameters: {
    buttonLabel: 'Parameter',
    buttonIcon: <VarTypeStringM />,
    groups: PARAMETER_GROUPS,
    items: PARAMETER_ITEMS,
  },
};

export const DEFAULT_FACTOR_VALUE = {
  inputProps: {
    autoResize: { stretchToFit: true, minWidth: '200px' },
  },
  selectedFactorType: '',
  defaultFactorType: 'text',
  value: '',
  formulaEditor: <div>Formula editor</div>,
  allowClear: false,
  autocompleteText: {
    options: ['First name', 'Last name', 'City', 'Age', 'Points'],
  },
  onParamsClick: () => {
    console.log('factor params click');
  },
  parameters: {
    buttonLabel: 'Parameter',
    buttonIcon: <VarTypeStringM />,
    groups: PARAMETER_GROUPS,
    items: PARAMETER_ITEMS,
  },
  textType: 'autocomplete',
  texts: FACTORS_TEXTS,
};

export const DEFAULT_OPERATOR_VALUE = {
  value: undefined,
  items: OPERATORS_ITEMS,
  groups: OPERATORS_GROUPS,
};

export const DEFAULT_PARAMETER_VALUE = {
  value: '',
  availableFactorTypes: ['parameter' as const],
  selectedFactorType: 'parameter' as const,
  defaultFactorType: 'parameter' as const,
  withoutTypeSelector: true,
  onParamsClick: () => {
    console.log('param params click');
  },
  parameters: {
    buttonLabel: 'Parameter',
    buttonIcon: <VarTypeStringM />,
    groups: PARAMETER_GROUPS,
    items: PARAMETER_ITEMS,
  },

  texts: FACTORS_TEXTS,
};

export const getAvailableFactorTypes = (operator?: OperatorsItem): DefinedFactorTypes[] | undefined => {
  const operatorIdString = operator?.id.toString() || '';
  if (operatorIdString.includes('BOOL') || operatorIdString.includes('MATCHES_CURRENT')) {
    return undefined;
  }
  if (operatorIdString.includes('STRING')) {
    return ['text', 'parameter', 'contextParameter', 'dynamicKey', 'formula', 'array'];
  }
  if (operatorIdString.includes('NUMBER')) {
    return ['number', 'parameter', 'contextParameter', 'dynamicKey', 'formula', 'array'];
  }
  if (operatorIdString.includes('DATE')) {
    return ['date', 'dateRange'];
  }
  return ['text', 'number', 'parameter', 'contextParameter', 'dynamicKey', 'formula', 'array', 'date', 'dateRange'];
};

export const DEFAULT_CONTEXT_VALUE = {
  type: 'event' as const,
  items: SUBJECT_ITEMS,
  groups: CONTEXT_GROUPS,
  texts: CONTEXT_TEXTS,
};

export const DEFAULT_STEP = (subject?: ContextItem | ContextGroup): ConditionStep => ({
  id: uuid(),
  stepName: '',
  context: {
    ...DEFAULT_CONTEXT_VALUE,
    selectedItem: subject as ContextItem,
  },
  actionAttribute: { ...DEFAULT_ACTION_ATTRIBUTE_VALUE },
  conditions: [],
});

export const STEPS_POPULATED = [
  {
    id: 'aedd3f2a-d944-4e7c-967f-aa74cd0cb407',
    stepName: '',
    context: {
      type: 'event' as const,
      items: CONTEXT_ITEMS,
      groups: CONTEXT_GROUPS,
      texts: CONTEXT_TEXTS,
      selectedItem: {
        ...CONTEXT_ITEMS[3],
      },
    },
    conditions: [
      {
        id: '3fa1111f-59b5-4d40-8ea8-ebc4123238c2',
        parameter: {
          ...DEFAULT_PARAMETER_VALUE,
          value: {
            type: '',
            ...PARAMETER_ITEMS[1],
          },
        },
        operator: {
          ...DEFAULT_OPERATOR_VALUE,
          value: {
            ...OPERATORS_ITEMS[2],
          },
          availableFactors: getAvailableFactorTypes(OPERATORS_ITEMS[2]),
        },
        factor: {
          ...DEFAULT_FACTOR_VALUE,
          selectedFactorType: 'text' as const,
          value: 'Anna',
          availableFactorTypes: getAvailableFactorTypes(OPERATORS_ITEMS[2]),
        },
      },
      {
        id: '3fa1111f-59b5-4d40-8ea8-ebc4177238c2',
        parameter: {
          ...DEFAULT_PARAMETER_VALUE,
          value: {
            type: '',
            ...PARAMETER_ITEMS[1],
          },
        },
        operator: {
          ...DEFAULT_OPERATOR_VALUE,
          value: {
            ...OPERATORS_ITEMS[2],
          },
          availableFactors: getAvailableFactorTypes(OPERATORS_ITEMS[2]),
        },
        factor: {
          ...DEFAULT_FACTOR_VALUE,
          selectedFactorType: 'text' as const,
          value: '1,2,3,4,5,671,2,3,4,5,671,2,3,4,5,671,2,3,4,5,671,2,3,4,5,671,2,3,4,5,671,2,3,4,5,671,2,3,4,5,67',
          availableFactorTypes: getAvailableFactorTypes(OPERATORS_ITEMS[2]),
        },
      },

      {
        id: '3fa1111f-59b5-4d40-8ea8-ebc4083238c2',
        parameter: {
          ...DEFAULT_PARAMETER_VALUE,
          value: {
            type: '',
            ...PARAMETER_ITEMS[1],
          },
        },
        operator: {
          ...DEFAULT_OPERATOR_VALUE,
          value: {
            ...OPERATORS_ITEMS[2],
          },
          availableFactors: getAvailableFactorTypes(OPERATORS_ITEMS[2]),
        },
        factor: {
          ...DEFAULT_FACTOR_VALUE,
          selectedFactorType: 'text' as const,
          value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat ligula neque, non semper ipsum.',
          availableFactorTypes: getAvailableFactorTypes(OPERATORS_ITEMS[2]),
        },
      },
      {
        id: 'e095c92b-6fa5-433c-92a7-1985bc91fe3f',
        parameter: {
          ...DEFAULT_PARAMETER_VALUE,
          value: {
            type: '',
            ...PARAMETER_ITEMS[4],
          },
        },
        operator: {
          ...DEFAULT_OPERATOR_VALUE,
          value: {
            ...OPERATORS_ITEMS[10],
          },
          availableFactors: getAvailableFactorTypes(OPERATORS_ITEMS[10]),
        },
        factor: {
          ...DEFAULT_FACTOR_VALUE,
          selectedFactorType: 'number' as const,
          value: 20,
          availableFactorTypes: getAvailableFactorTypes(OPERATORS_ITEMS[10]),
        },
      },
      {
        id: 'dd304007-1d25-42de-9256-01d095373f88',
        parameter: {
          ...DEFAULT_PARAMETER_VALUE,
          value: {
            type: '',
            ...PARAMETER_ITEMS[7],
          },
        },
        operator: {
          ...DEFAULT_OPERATOR_VALUE,
          value: {
            ...OPERATORS_ITEMS[14],
            availableFactors: getAvailableFactorTypes(OPERATORS_ITEMS[14]),
          },
        },
        factor: {
          ...DEFAULT_FACTOR_VALUE,
          selectedFactorType: 'date' as const,
          value: '2024-08-11T22:00:00.000Z',
          availableFactorTypes: getAvailableFactorTypes(OPERATORS_ITEMS[14]),
        },
      },
      {
        id: '65a52f83-8771-418e-8248-67f44ffd660d',
        parameter: {
          ...DEFAULT_PARAMETER_VALUE,
          value: {
            type: '',
            ...PARAMETER_ITEMS[5],
          },
        },
        operator: {
          ...DEFAULT_OPERATOR_VALUE,
          value: {
            ...OPERATORS_ITEMS[22],
            availableFactors: getAvailableFactorTypes(OPERATORS_ITEMS[22]),
          },
        },
      },
      {
        id: '181fe79e-67a1-4508-a948-981928388868',
        parameter: {
          ...DEFAULT_PARAMETER_VALUE,
          value: {
            type: '',
            ...PARAMETER_ITEMS[3],
          },
        },
        operator: {
          ...DEFAULT_OPERATOR_VALUE,
          value: {
            ...OPERATORS_ITEMS[7],
            availableFactors: getAvailableFactorTypes(OPERATORS_ITEMS[7]),
          },
        },
        factor: {
          ...DEFAULT_FACTOR_VALUE,
          selectedFactorType: 'parameter' as const,
          value: {
            type: '',
            ...PARAMETER_ITEMS[4],
          },
          availableFactorTypes: getAvailableFactorTypes(OPERATORS_ITEMS[7]),
        },
      },
      {
        id: '56e1eb0b-0050-4a5e-af56-819d89279361',
        parameter: {
          ...DEFAULT_PARAMETER_VALUE,
          value: {
            type: '',
            ...PARAMETER_ITEMS[4],
          },
        },
        operator: {
          ...DEFAULT_OPERATOR_VALUE,
          value: {
            ...OPERATORS_ITEMS[2],
            availableFactors: getAvailableFactorTypes(OPERATORS_ITEMS[2]),
          },
        },
        factor: {
          ...DEFAULT_FACTOR_VALUE,
          selectedFactorType: 'formula' as const,
          value: '',
          availableFactorTypes: getAvailableFactorTypes(OPERATORS_ITEMS[2]),
        },
      },
      {
        id: '073e5227-0deb-4979-8a29-9e68f948eb0f',
        parameter: {
          ...DEFAULT_PARAMETER_VALUE,
          value: {
            type: '',
            ...PARAMETER_ITEMS[8],
          },
        },
        operator: {
          ...DEFAULT_OPERATOR_VALUE,
          value: {
            ...OPERATORS_ITEMS[2],
            availableFactors: getAvailableFactorTypes(OPERATORS_ITEMS[2]),
          },
        },
        factor: {
          ...DEFAULT_FACTOR_VALUE,
          selectedFactorType: 'contextParameter' as const,
          value: {
            type: '',
            ...PARAMETER_ITEMS[2],
          },
          availableFactorTypes: getAvailableFactorTypes(OPERATORS_ITEMS[2]),
        },
      },
      {
        id: '75efa0d3-23dd-48e0-a02b-8700a69815ba',
        parameter: {
          ...DEFAULT_PARAMETER_VALUE,
          value: {
            type: '',
            ...PARAMETER_ITEMS[1],
          },
        },
        operator: {
          ...DEFAULT_OPERATOR_VALUE,
          value: {
            ...OPERATORS_ITEMS[10],
          },
          availableFactors: getAvailableFactorTypes(OPERATORS_ITEMS[10]),
        },
        factor: {
          ...DEFAULT_FACTOR_VALUE,
          selectedFactorType: 'array' as const,
          defaultFactorType: 'text' as const,
          value: '1,2,3,4,5,67',
          availableFactorTypes: getAvailableFactorTypes(OPERATORS_ITEMS[10]),
        },
      },

      {
        id: '75efa0d3-23dd-48e0-a02b-8700a69815qa',
        parameter: {
          ...DEFAULT_PARAMETER_VALUE,
          value: {
            type: '',
            ...PARAMETER_ITEMS[1],
          },
        },
        operator: {
          ...DEFAULT_OPERATOR_VALUE,
          value: {
            ...OPERATORS_ITEMS[10],
          },
          availableFactors: getAvailableFactorTypes(OPERATORS_ITEMS[10]),
        },
        factor: {
          ...DEFAULT_FACTOR_VALUE,
          selectedFactorType: 'array' as const,
          defaultFactorType: 'text' as const,
          value: '1,2,3,4,5,671,2,3,4,5,671,2,3,4,5,671,2,3,4,5,671,2,3,4,5,671,2,3,4,5,671,2,3,4,5,671,2,3,4,5,67',
          availableFactorTypes: getAvailableFactorTypes(OPERATORS_ITEMS[10]),
        },
      },
    ],
  },
  {
    id: 'f1a1a3fa-807e-4ece-b0f8-6f2c01bbfbc2',
    stepName: '',
    context: {
      ...DEFAULT_CONTEXT_VALUE,
      type: 'event' as const,
    },
    conditions: [],
  },
];

export const STEPS_POPULATED_PARAMETER_ERRORS = STEPS_POPULATED.map(step => ({
  ...step,
  conditions: step.conditions.map(condition => ({
    ...condition,
    parameter: {
      ...condition.parameter,
      errorText: 'Condition parameter error text',
    },
  })),
}));

export const STEPS_POPULATED_OPERATOR_ERRORS = STEPS_POPULATED.map(step => ({
  ...step,
  conditions: step.conditions.map(condition => ({
    ...condition,
    operator: {
      ...condition.operator,
      errorText: 'Condition operator error text',
    },
  })),
}));

export const STEPS_POPULATED_FACTOR_ERRORS = STEPS_POPULATED.map(step => ({
  ...step,
  conditions: step.conditions.map(condition => ({
    ...condition,
    factor: {
      ...condition.factor,
      errorText: 'Condition factor error text',
    },
  })),
}));

export const STEPS_POPULATED_ACTION_ATTRIBUTE = STEPS_POPULATED.map(step => ({
  ...step,
  actionAttribute: {
    ...DEFAULT_ACTION_ATTRIBUTE_VALUE,
    error: true, errorText: 'Action attribute error text',
    value: {
      type: '',
      ...PARAMETER_ITEMS[2],
    },
  }
}));


export const STEPS_POPULATED_CONTEXT_ERROR = STEPS_POPULATED.map(step => ({
  ...step,
  actionAttribute: {
    ...DEFAULT_ACTION_ATTRIBUTE_VALUE,
    value: {
      type: '',
      ...PARAMETER_ITEMS[2],
    },
  },
  context: {
    ...step.context,
    error: true,
    errorText: 'Context error text',
  }
}));

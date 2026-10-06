import { Meta, StoryObj } from '@storybook/react-vite';
import React, { useRef } from 'react';
import { fn } from 'storybook/test';

import Button from '@synerise/ds-button';
import type { ConditionStep, StepConditions } from '@synerise/ds-condition';
import {
  ConditionAddButton,
  ConditionEntity,
  ConditionGroup,
  ConditionRemove,
  ConditionRow,
  ConditionRows,
  ConditionSlot,
} from '@synerise/ds-condition-blocks';
import ContextSelector from '@synerise/ds-context-selector';
import Factors, { type ParameterValueType } from '@synerise/ds-factors';
import Icon, { Add2M } from '@synerise/ds-icon';
import Operators from '@synerise/ds-operators';

import { fixedWrapper1200 } from '../../../utils';
import { STEPS_POPULATED } from '../../Condition/Condition.data';

type ErrorTarget = 'none' | 'entity' | 'row';
type AttributeConditionsArgs = { errorTarget: ErrorTarget };

/**
 * A 1:1 recreation of `Components/Filter/Condition/Tests → Populated`, assembled from
 * ds-condition-blocks layout primitives (ConditionGroup / ConditionRows / ConditionRow /
 * ConditionSlot / ConditionConnector / ConditionAddButton / ConditionRemove) wrapping the SAME
 * slot components ds-condition uses internally: `ds-context-selector` for the entity,
 * `ds-factors` for the parameter (2nd) and factor value (4th), and `ds-operators` for the
 * operator (3rd) — fed by the shared `STEPS_POPULATED` data.
 *
 * Every dropdown is portaled into the outermost `ConditionGroup` node (via its ref passed as
 * `getPopupContainer`) so their popovers share one stacking context — fixes popover z-index.
 */
const meta: Meta<AttributeConditionsArgs> = {
  decorators: [fixedWrapper1200],
  title: 'Components/Filter/ConditionBlocks/Examples',
  parameters: { layout: 'centered', chromatic: { diffThreshold: 0.15 } },
  tags: ['visualtests'],
  argTypes: {
    errorTarget: {
      name: 'Error slot',
      control: 'inline-radio',
      options: ['none', 'entity', 'row'],
      labels: {
        none: 'No errors',
        entity: 'Entity error message',
        row: 'ConditionRow error message',
      },
    },
  },
};

export default meta;

const noop = fn();
const INPUT_PROPS = { autoResize: { minWidth: '173px', stretchToFit: true } };
const STEP: ConditionStep = STEPS_POPULATED[0];
const ERROR_MESSAGE = 'This field is required';

type GetPopupContainer = (node?: HTMLElement) => HTMLElement;

// Same slot-visibility rules ds-condition's ConditionRow applies.
const showOperator = (condition: StepConditions): boolean =>
  Boolean(
    (!condition.parameter ||
      (condition.parameter?.value &&
        (condition.parameter.value as ParameterValueType).name !== '')) &&
      condition.operator,
  );

const showFactor = (condition: StepConditions): boolean =>
  Boolean(
    condition.factor !== undefined &&
      condition.operator?.value &&
      condition.factor?.availableFactorTypes !== null,
  );

const renderRow = (
  condition: StepConditions,
  index: number,
  getPopupContainer: GetPopupContainer,
  errorMessage?: string,
) => (
  <ConditionRow
    key={condition.id}
    connector={{ first: index === 0 }}
    errorMessage={errorMessage}
  >
    {condition.parameter && (
      // 2nd item — ds-factors locked to the "parameter" type (the attribute selector).
      <ConditionSlot variant="shrink" minWidth={120}>
        <Factors
          selectedFactorType="parameter"
          defaultFactorType="parameter"
          value=""
          {...condition.parameter}
          inputProps={INPUT_PROPS}
          fluidMinWidth={48}
          getPopupContainerOverride={getPopupContainer}
          onActivate={noop}
          onDeactivate={noop}
          onChangeValue={noop}
        />
      </ConditionSlot>
    )}
    {showOperator(condition) && (
      // 3rd item — ds-operators.
      <ConditionSlot variant="rigid">
        <Operators
          groups={[]}
          items={[]}
          {...condition.operator}
          getPopupContainerOverride={getPopupContainer}
          onActivate={noop}
          onDeactivate={noop}
          onChange={noop}
          errorText={condition.operator?.errorText}
        />
      </ConditionSlot>
    )}
    {showFactor(condition) && (
      // 4th item — ds-factors as the value editor (text/number/date/parameter/formula/array/…).
      <ConditionSlot variant="fill">
        <Factors
          selectedFactorType="text"
          defaultFactorType="text"
          value=""
          {...condition.factor}
          parameters={
            condition.factor?.parameters && {
              ...condition.factor.parameters,
              selectedButtonColored:
                condition.factor.parameters?.selectedButtonColored === undefined
                  ? true
                  : condition.factor.parameters.selectedButtonColored,
            }
          }
          inputProps={INPUT_PROPS}
          fluidMinWidth={48}
          getPopupContainerOverride={getPopupContainer}
          setSelectedFactorType={noop}
          onChangeValue={noop}
          onActivate={noop}
          onDeactivate={noop}
          factorKey={condition.id}
        />
        <ConditionRemove />
      </ConditionSlot>
    )}
  </ConditionRow>
);

const addButton = (label: string) => (
  <Button type="ghost" mode="icon-label">
    <Icon component={<Add2M />} />
    {label}
  </Button>
);

const AttributeConditionsStory = ({ errorTarget }: AttributeConditionsArgs) => {
  const groupRef = useRef<HTMLDivElement>(null);
  // Portal every dropdown into the outermost group node so their popovers share one
  // stacking context (fixes popover z-index issues).
  const getPopupContainer: GetPopupContainer = () =>
    groupRef.current ?? document.body;

  return (
    <ConditionGroup ref={groupRef}>
      {/* 1st item — the real ds-context-selector, wrapped so it can show an entity-level error. */}
      <ConditionEntity
        errorMessage={errorTarget === 'entity' ? ERROR_MESSAGE : undefined}
      >
        <ContextSelector
          {...STEP.context}
          isError={errorTarget === 'entity'}
          onSelectItem={noop}
          onActivate={noop}
          onDeactivate={noop}
          getPopupContainerOverride={getPopupContainer}
        />
      </ConditionEntity>
      <ConditionRows>
        {STEP.conditions.map((condition, index) =>
          renderRow(
            condition,
            index,
            getPopupContainer,
            errorTarget === 'row' && index === 0 ? ERROR_MESSAGE : undefined,
          ),
        )}
        <ConditionAddButton withConnector>
          {addButton('and where')}
        </ConditionAddButton>
      </ConditionRows>
    </ConditionGroup>
  );
};

/** Recreation of `components-filter-condition-tests--populated` using the building blocks. */
export const AttributeConditions: StoryObj<AttributeConditionsArgs> = {
  name: 'Attribute Conditions',
  args: { errorTarget: 'none' },
  render: (args) => <AttributeConditionsStory {...args} />,
};

export const AttributeConditionsContextError: StoryObj<AttributeConditionsArgs> =
  {
    name: 'Attribute Conditions with context error',
    args: { errorTarget: 'entity' },
    render: (args) => <AttributeConditionsStory {...args} />,
  };

export const AttributeConditionsConditionsError: StoryObj<AttributeConditionsArgs> =
  {
    name: 'Attribute Conditions with row error',
    args: { errorTarget: 'row' },
    render: (args) => <AttributeConditionsStory {...args} />,
  };

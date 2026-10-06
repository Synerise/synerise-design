import { Meta, StoryObj } from '@storybook/react-vite';
import React, { useRef, useState } from 'react';
import { fn } from 'storybook/test';

import Button from '@synerise/ds-button';
import {
  ConditionAddButton,
  ConditionEntity,
  ConditionGroup,
  ConditionRemove,
  ConditionRow,
  ConditionRows,
  ConditionSlot,
  ConditionTextSlot,
} from '@synerise/ds-condition-blocks';
import ContextSelector from '@synerise/ds-context-selector';
import DatePicker from '@synerise/ds-date-picker';
import Factors, { type FactorValueType } from '@synerise/ds-factors';
import Icon, {
  Add2M,
  AngleDownS,
  CalendarM,
  NotificationsM,
  VarTypeStringM,
} from '@synerise/ds-icon';
import { Input } from '@synerise/ds-input';
import InputNumber from '@synerise/ds-input-number';
import ItemPicker, { type BaseItemType } from '@synerise/ds-item-picker';
import Operators from '@synerise/ds-operators';

import { fixedWrapper1200 } from '../../../utils';
import {
  DEFAULT_FACTOR_VALUE,
  DEFAULT_OPERATOR_VALUE,
  DEFAULT_PARAMETER_VALUE,
  getAvailableFactorTypes,
  STEPS_POPULATED,
} from '../../Condition/Condition.data';
import { OPERATORS_ITEMS } from '../../Operators/data/index.data';

/**
 * Examples composed from ds-condition-blocks primitives, reproducing the target
 * filtering-condition layouts. The blocks are presentational — the implementation passes the
 * actual chip (`ConditionEntity`), add control (`ConditionAddButton`) and value input (via a
 * `ConditionSlot`).
 */

const renderContextButton = (label: string, color: string) => (
  <Button type="custom-color" color={color} mode="label-icon">
    {label}
    <Icon component={<AngleDownS />} />
  </Button>
);

const renderAddButton = (label: string) => (
  <Button type="ghost" mode="icon-label">
    <Icon component={<Add2M />} />
    {label}
  </Button>
);

const renderDropdownTriggerWithIcon = (
  icon: React.ReactNode,
  label: string,
  color: string,
) => (
  <Button type="custom-color" color={color} mode="two-icons">
    <Icon component={icon} />
    {label}
    <Icon component={<AngleDownS />} />
  </Button>
);

const renderDropdownTrigger = (label: React.ReactNode) => (
  <Button type="secondary" mode="label-icon">
    {label}
    <Icon component={<AngleDownS />} />
  </Button>
);

const meta: Meta = {
  decorators: [fixedWrapper1200],
  title: 'Components/Filter/ConditionBlocks/Examples',
  parameters: { layout: 'centered' },
  tags: ['visualtests'],
};

export default meta;

const noop = fn();
const INPUT_PROPS = { autoResize: { minWidth: '173px', stretchToFit: true } };
const STEP = STEPS_POPULATED[0];
const IN_OPERATOR = OPERATORS_ITEMS.find((operator) => operator.name === 'In');

const ATTRIBUTE_ITEMS: BaseItemType[] = [
  { text: 'color' },
  { text: 'size' },
  { text: 'brand' },
];

const OPERATOR_ITEMS: BaseItemType[] = [
  { text: 'In' },
  { text: 'Not in' },
  { text: 'Equal' },
];

/**
 * Classic factor / operator / parameter row (screenshots 1, 3, 6). The factor and operator are
 * `ds-button` triggers that open a (new-version) `ds-item-picker`; the value is a `ds-factors`
 * array (no type selector) that reads "0 items" while empty.
 */
const ClassicRowStory = () => {
  const [attribute, setAttribute] = useState<BaseItemType | undefined>(
    ATTRIBUTE_ITEMS[0],
  );
  const [operator, setOperator] = useState<BaseItemType | undefined>(
    OPERATOR_ITEMS[0],
  );
  const [items, setItems] = useState<FactorValueType>([]);

  return (
    <ConditionGroup>
      <ConditionEntity>
        {renderContextButton('eobuwie', 'green')}
      </ConditionEntity>
      <ConditionRows>
        <ConditionRow connector={{ first: true, last: true }}>
          <ConditionSlot variant="rigid">
            <ItemPicker
              isNewVersion
              items={ATTRIBUTE_ITEMS}
              selectedItem={attribute}
              onChange={setAttribute}
              renderTrigger={({ selected, openDropdown }) => (
                <Button
                  type="secondary"
                  mode="label-icon"
                  onClick={openDropdown}
                >
                  {selected?.text ?? 'color'}
                  <Icon component={<AngleDownS />} />
                </Button>
              )}
            />
          </ConditionSlot>
          <ConditionSlot variant="rigid">
            <ItemPicker
              isNewVersion
              items={OPERATOR_ITEMS}
              selectedItem={operator}
              onChange={setOperator}
              renderTrigger={({ selected, openDropdown }) => (
                <Button
                  type="secondary"
                  mode="label-icon"
                  onClick={openDropdown}
                >
                  {selected?.text ?? 'In'}
                  <Icon component={<AngleDownS />} />
                </Button>
              )}
            />
          </ConditionSlot>
          <ConditionSlot variant="fill">
            <Factors
              selectedFactorType="array"
              defaultFactorType="array"
              withoutTypeSelector
              value={items}
              onChangeValue={setItems}
              arrayProps={{ itemType: 'string' }}
              texts={{ array: { triggerLabel: '0 items' } }}
              // inputProps={INPUT_PROPS}
              fluidMinWidth={48}
            />
            <ConditionRemove />
          </ConditionSlot>
        </ConditionRow>
      </ConditionRows>
    </ConditionGroup>
  );
};

export const ClassicRow: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: `<ConditionGroup>
  <ConditionEntity>
    <Button type="custom-color" color="green" mode="label-icon">
      eobuwie
      <Icon component={<AngleDownS />} />
    </Button>
  </ConditionEntity>
  <ConditionRows>
    <ConditionRow connector={{ first: true, last: true }}>
      {/* attribute — a ds-button that opens a new-version ds-item-picker */}
      <ConditionSlot variant="rigid">
        <ItemPicker
          isNewVersion
          items={ATTRIBUTE_ITEMS}
          selectedItem={attribute}
          onChange={setAttribute}
          renderTrigger={({ selected, openDropdown }) => (
            <Button type="secondary" mode="label-icon" onClick={openDropdown}>
              {selected?.text ?? 'color'}
              <Icon component={<AngleDownS />} />
            </Button>
          )}
        />
      </ConditionSlot>
      {/* operator — same ItemPicker pattern */}
      <ConditionSlot variant="rigid">
        <ItemPicker isNewVersion items={OPERATOR_ITEMS} /* … */ />
      </ConditionSlot>
      {/* value — ds-factors array type, no type selector, "0 items" while empty */}
      <ConditionSlot variant="fill">
        <Factors
          selectedFactorType="array"
          withoutTypeSelector
          value={items}
          onChangeValue={setItems}
          arrayProps={{ itemType: 'string' }}
          texts={{ array: { triggerLabel: '0 items' } }}
        />
        <ConditionRemove />
      </ConditionSlot>
    </ConditionRow>
  </ConditionRows>
</ConditionGroup>`,
      },
    },
  },
  render: () => <ClassicRowStory />,
};

/** A row whose value slot holds a stretch-to-fit ds-input passed by the implementation. */
export const RowWithValueInput: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: `<ConditionGroup>
  <ConditionEntity>
    <Button type="custom-color" color="cyan" mode="label-icon">
      Page Visit
      <Icon component={<AngleDownS />} />
    </Button>
  </ConditionEntity>
  <ConditionRows>
    <ConditionRow connector={{ first: true, last: true }}>
      <ConditionSlot variant="shrink" minWidth={120}>
        <Button type="secondary" mode="label-icon">
          action_page
          <Icon component={<AngleDownS />} />
        </Button>
      </ConditionSlot>
      <ConditionSlot variant="rigid">
        <Button type="secondary" mode="label-icon">
          Contain
          <Icon component={<AngleDownS />} />
        </Button>
      </ConditionSlot>
      <ConditionSlot variant="fill">
        <Input
          resetMargin
          autoResize={{ minWidth: '173px', stretchToFit: true }}
          placeholder="Value"
        />
        <ConditionRemove />
      </ConditionSlot>
    </ConditionRow>
  </ConditionRows>
</ConditionGroup>`,
      },
    },
  },
  render: () => (
    <ConditionGroup>
      <ConditionEntity>
        {renderContextButton('Page Visit', 'cyan')}
      </ConditionEntity>
      <ConditionRows>
        <ConditionRow connector={{ first: true, last: true }}>
          <ConditionSlot variant="shrink" minWidth={120}>
            {renderDropdownTrigger('action_page')}
          </ConditionSlot>
          <ConditionSlot variant="rigid">
            {renderDropdownTrigger('Contain')}
          </ConditionSlot>
          <ConditionSlot variant="fill">
            <Input
              resetMargin
              autoResize={{ minWidth: '173px', stretchToFit: true }}
              placeholder="Value"
            />
            <ConditionRemove />
          </ConditionSlot>
        </ConditionRow>
      </ConditionRows>
    </ConditionGroup>
  ),
};

/** Entity + multiple rows + add action (screenshot 5, single group). */
export const GroupWithAggregate: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: `<ConditionGroup>
  <ConditionEntity>
    <Button type="custom-color" color="green" mode="label-icon">
      academy.certificate
      <Icon component={<AngleDownS />} />
    </Button>
  </ConditionEntity>
  <ConditionRows>
    {['Unnamed aggregate', 'Unnamed aggregate', 'sanchoo test 18'].map(
      (name, index, all) => (
        <ConditionRow key={name} connector={{ first: index === 0 }}>
          <ConditionSlot variant="shrink" minWidth={120}>
            <Button type="secondary" mode="label-icon">
              {name}
              <Icon component={<AngleDownS />} />
            </Button>
          </ConditionSlot>
          <ConditionSlot variant="rigid">
            <Button type="secondary" mode="label-icon">
              {index === all.length - 1 ? 'Equal' : 'Not equal'}
              <Icon component={<AngleDownS />} />
            </Button>
          </ConditionSlot>
          <ConditionSlot variant="fill">
            <Input
              resetMargin
              autoResize={{ minWidth: '173px', stretchToFit: true }}
              placeholder="Value"
            />
            <ConditionRemove />
          </ConditionSlot>
        </ConditionRow>
      ),
    )}
    <ConditionAddButton withConnector>
      <Button type="ghost" mode="icon-label">
        <Icon component={<Add2M />} />
        and where
      </Button>
    </ConditionAddButton>
  </ConditionRows>
</ConditionGroup>`,
      },
    },
  },
  render: () => (
    <ConditionGroup>
      <ConditionEntity>
        {renderContextButton('academy.certificate', 'green')}
      </ConditionEntity>
      <ConditionRows>
        {['Unnamed aggregate', 'Unnamed aggregate', 'sanchoo test 18'].map(
          (name, index, all) => (
            // eslint-disable-next-line react/no-array-index-key
            <ConditionRow
              key={`${name}-${index}`}
              connector={{ first: index === 0 }}
            >
              <ConditionSlot variant="shrink" minWidth={120}>
                {renderDropdownTrigger(name)}
              </ConditionSlot>
              <ConditionSlot variant="rigid">
                {renderDropdownTrigger(
                  index === all.length - 1 ? 'Equal' : 'Not equal',
                )}
              </ConditionSlot>
              <ConditionSlot variant="fill">
                <Input
                  resetMargin
                  autoResize={{ minWidth: '173px', stretchToFit: true }}
                  placeholder="Value"
                />
                <ConditionRemove />
              </ConditionSlot>
            </ConditionRow>
          ),
        )}
        <ConditionAddButton withConnector>
          {renderAddButton('and where')}
        </ConditionAddButton>
      </ConditionRows>
    </ConditionGroup>
  ),
};

/** Free-form text interleaved with controls (screenshot 2). */
export const FreeFormItems: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: `<ConditionRows>
  {[
    { count: 3, attribute: 'brand' },
    { count: 1, attribute: 'size' },
  ].map((item) => (
    <ConditionRow key={item.attribute} align="center" gap={12}>
      <ConditionTextSlot>Show only</ConditionTextSlot>
      <ConditionSlot variant="rigid">
        <InputNumber
          defaultValue={item.count}
          autoResize={{ stretchToFit: true }}
        />
      </ConditionSlot>
      <ConditionTextSlot>items with the same</ConditionTextSlot>
      <ConditionSlot variant="fill">
        <Button type="secondary" mode="label-icon">
          {item.attribute}
          <Icon component={<AngleDownS />} />
        </Button>
        <ConditionRemove />
      </ConditionSlot>
    </ConditionRow>
  ))}
  <ConditionAddButton>
    <Button type="ghost" mode="icon-label">
      <Icon component={<Add2M />} />
      Add another
    </Button>
  </ConditionAddButton>
</ConditionRows>`,
      },
    },
  },
  render: () => (
    <ConditionRows>
      {[
        { count: 3, attribute: 'brand' },
        { count: 1, attribute: 'size' },
      ].map((item, _index) => (
        <ConditionRow key={item.attribute} align="center" gap={12}>
          <ConditionTextSlot>Show only</ConditionTextSlot>
          <ConditionSlot variant="rigid">
            <InputNumber
              defaultValue={item.count}
              autoResize={{ stretchToFit: true }}
            />
          </ConditionSlot>
          <ConditionTextSlot>items with the same</ConditionTextSlot>
          <ConditionSlot variant="fill">
            {renderDropdownTrigger(item.attribute)}
            <ConditionRemove />
          </ConditionSlot>
        </ConditionRow>
      ))}
      <ConditionAddButton>{renderAddButton('Add another')}</ConditionAddButton>
    </ConditionRows>
  ),
};

/** Free-form schedule row (screenshot 4). */
export const FreeFormSchedule: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: `<ConditionRow align="center" gap={12}>
  <ConditionSlot variant="rigid">
    <Button type="secondary" mode="label-icon">
      One time
      <Icon component={<AngleDownS />} />
    </Button>
  </ConditionSlot>
  <ConditionTextSlot>at</ConditionTextSlot>
  <ConditionSlot variant="fill">
    <DatePicker
      showTime
      onApply={fn()}
      value={new Date(2026, 7, 1, 13, 15)}
    />
  </ConditionSlot>
</ConditionRow>`,
      },
    },
  },
  render: () => (
    <ConditionRow align="center" gap={12}>
      <ConditionSlot variant="rigid">
        {renderDropdownTrigger('One time')}
      </ConditionSlot>
      <ConditionTextSlot>at</ConditionTextSlot>
      <ConditionSlot variant="fill">
        <DatePicker
          showTime
          onApply={fn()}
          value={new Date(2026, 7, 1, 13, 15)}
        />
      </ConditionSlot>
    </ConditionRow>
  ),
};

/** Empty condition — the entity and just the first "where" add button (no rows yet). */
export const EmptyCondition: StoryObj = {
  parameters: {
    docs: {
      source: {
        code: `<ConditionGroup>
  <ConditionEntity>
    <Button type="custom-color" color="cyan" mode="two-icons">
      <Icon component={<NotificationsM />} />
      Transaction
      <Icon component={<AngleDownS />} />
    </Button>
  </ConditionEntity>
  <ConditionRows>
    <ConditionAddButton
      withConnector
      connectorProps={{ first: true, last: true }}
    >
      <Button type="ghost" mode="icon-label">
        <Icon component={<Add2M />} />
        where
      </Button>
    </ConditionAddButton>
  </ConditionRows>
</ConditionGroup>`,
      },
    },
  },
  render: () => (
    <ConditionGroup>
      <ConditionEntity>
        {renderDropdownTriggerWithIcon(
          <NotificationsM />,
          'Transaction',
          'cyan',
        )}
      </ConditionEntity>
      <ConditionRows>
        <ConditionAddButton
          withConnector
          connectorProps={{ first: true, last: true }}
        >
          {renderAddButton('where')}
        </ConditionAddButton>
      </ConditionRows>
    </ConditionGroup>
  ),
};

/**
 * Event attribute: the real `ds-context-selector` (event) plus its action attribute
 * (`ds-factors` parameter, no type selector), then a row of parameter / operator (`ds-operators`)
 * / value (`ds-factors` array, with type selector) — the same slot components ds-condition uses.
 */
const EventAttributeStory = () => {
  const groupRef = useRef<HTMLDivElement>(null);
  const getPopupContainer = () => groupRef.current ?? document.body;
  const [arrayValue, setArrayValue] = useState<FactorValueType>([]);

  return (
    <ConditionGroup ref={groupRef}>
      <ConditionEntity>
        <ContextSelector
          {...STEP.context}
          isError={false}
          onSelectItem={noop}
          onActivate={noop}
          onDeactivate={noop}
          getPopupContainerOverride={getPopupContainer}
        />
        <Factors
          {...DEFAULT_PARAMETER_VALUE}
          parameters={{
            ...DEFAULT_PARAMETER_VALUE.parameters,
            buttonLabel: 'TIMESTAMP',
            buttonIcon: <CalendarM />,
          }}
          inputProps={INPUT_PROPS}
          fluidMinWidth={48}
          getPopupContainerOverride={getPopupContainer}
          onActivate={noop}
          onDeactivate={noop}
          onChangeValue={noop}
        />
      </ConditionEntity>
      <ConditionRows>
        <ConditionRow connector={{ first: true }}>
          <ConditionSlot variant="shrink" minWidth={120}>
            <Factors
              selectedFactorType="parameter"
              defaultFactorType="parameter"
              value=""
              {...DEFAULT_PARAMETER_VALUE}
              parameters={{
                ...DEFAULT_PARAMETER_VALUE.parameters,
                buttonLabel: 'action_page',
                buttonIcon: <VarTypeStringM />,
              }}
              inputProps={INPUT_PROPS}
              fluidMinWidth={48}
              getPopupContainerOverride={getPopupContainer}
              onActivate={noop}
              onDeactivate={noop}
              onChangeValue={noop}
            />
          </ConditionSlot>
          <ConditionSlot variant="rigid">
            <Operators
              {...DEFAULT_OPERATOR_VALUE}
              value={IN_OPERATOR}
              getPopupContainerOverride={getPopupContainer}
              onActivate={noop}
              onDeactivate={noop}
              onChange={noop}
            />
          </ConditionSlot>
          <ConditionSlot variant="fill">
            <Factors
              {...DEFAULT_FACTOR_VALUE}
              selectedFactorType="array"
              defaultFactorType="text"
              value={arrayValue}
              availableFactorTypes={getAvailableFactorTypes(IN_OPERATOR)}
              arrayProps={{ itemType: 'string' }}
              inputProps={INPUT_PROPS}
              fluidMinWidth={48}
              getPopupContainerOverride={getPopupContainer}
              setSelectedFactorType={noop}
              onChangeValue={setArrayValue}
              onActivate={noop}
              onDeactivate={noop}
            />
            <ConditionRemove />
          </ConditionSlot>
        </ConditionRow>
        <ConditionAddButton withConnector>
          {renderAddButton('and where')}
        </ConditionAddButton>
      </ConditionRows>
    </ConditionGroup>
  );
};

export const WithEventAttribute: StoryObj = {
  name: 'With Event Attribute',
  parameters: {
    docs: {
      source: {
        code: `<ConditionGroup>
  <ConditionEntity>
    {/* event context */}
    <ContextSelector {...context} />
    {/* action attribute — ds-factors parameter, no type selector */}
    <Factors {...parameterProps} parameters={{ ...parameters, buttonLabel: 'TIMESTAMP' }} />
  </ConditionEntity>
  <ConditionRows>
    <ConditionRow connector={{ first: true }}>
      {/* attribute — ds-factors parameter, no type selector */}
      <ConditionSlot variant="shrink" minWidth={120}>
        <Factors {...parameterProps} parameters={{ ...parameters, buttonLabel: 'action_page' }} />
      </ConditionSlot>
      {/* operator — ds-operators */}
      <ConditionSlot variant="rigid">
        <Operators {...operatorProps} value={IN_OPERATOR} />
      </ConditionSlot>
      {/* value — ds-factors array, with type selector */}
      <ConditionSlot variant="fill">
        <Factors {...factorProps} selectedFactorType="array" value={arrayValue} />
        <ConditionRemove />
      </ConditionSlot>
    </ConditionRow>
    <ConditionAddButton withConnector>{/* add button */}</ConditionAddButton>
  </ConditionRows>
</ConditionGroup>`,
      },
    },
  },
  render: () => <EventAttributeStory />,
};

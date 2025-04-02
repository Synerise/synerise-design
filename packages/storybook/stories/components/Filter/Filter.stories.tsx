import React, { useState } from 'react';
import { fn } from '@storybook/test';

import ContextSelector from '@synerise/ds-context-selector';
import { theme } from '@synerise/ds-core';
import Filter from '@synerise/ds-filter';
import Layout from '@synerise/ds-layout';

import { CONTEXT_TEXTS } from '../ContextSelector/data/context.data';
import { CONTEXT_CLIENT_GROUPS, CONTEXT_CLIENT_ITEMS } from '../ContextSelector/data/client.data';

import type { FilterMeta, FilterStory } from './Filter.types';
import { DEFAULT_EXPRESSION, FILTER_TEXTS } from './Filter.data';
import { useFilterHandlers } from './hooks/useFilterHandlers';

import { BOOLEAN_CONTROL, controlFromOptionsArray, fixedWrapper300, NUMBER_CONTROL } from '../../utils';

export default {
  component: Filter,
  title: 'Components/Filter/Filter',
  tags: ['autodocs'],
  decorators: [fixedWrapper300],
  argTypes: {
    maxConditionsLimit: NUMBER_CONTROL,
    readOnly: BOOLEAN_CONTROL,
    layoutNativeScroll: { BOOLEAN_CONTROL, table: { category: 'Story options' } },
    showStepTags: { BOOLEAN_CONTROL, table: { category: 'Story options' } },
    isDateFilterOn: { BOOLEAN_CONTROL, table: { category: 'Story options' } },
    conditionFooterRelativeDateRange: { BOOLEAN_CONTROL, table: { category: 'Story options' } },
    addStepType: {
      ...controlFromOptionsArray('inline-radio', ['Default', 'Custom', undefined]),
      table: { category: 'Story options' },
    },
  },
  render: ({ layoutNativeScroll, onAddStep, onExpressionStepChange, showStepTags, isDateFilterOn, conditionFooterRelativeDateRange, ...args }) => {
    const {
      expressions,
      handleChangeLogic,
      handleAddStep,
      handleChangeOrder,
      handleChangeStepMatching,
      handleChangeStepName,
      handleDeleteStep,
      handleDuplicateStep,
      renderStepFooter,
      renderHeaderRightSide,
      renderStepContent,
      renderStepHeaderRightSide,
    } = useFilterHandlers({ ...args, isDateFilterOn, conditionFooterRelativeDateRange, onExpressionStepChange });

    const [matching, setMatching] = useState(true);

    const handleChangeMatching = (filterMatching: boolean) => {
      setMatching(filterMatching);
    };

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
        <Layout nativeScroll={layoutNativeScroll} mainSidebarWithDnd>
          <div style={{ width: '1000px' }}>
            <Filter
              {...args}
              expressions={expressions}
              addFilterComponent={({ isLimitExceeded }) => (
                <ContextSelector
                  disabled={isLimitExceeded}
                  texts={{ ...CONTEXT_TEXTS, buttonLabel: 'Add filter' }}
                  onSelectItem={(item) => {onAddStep?.(item); handleAddStep(item)}}
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
              renderStepFooter={renderStepFooter}
              renderStepContent={renderStepContent}
              renderStepHeaderRightSide={showStepTags ? renderStepHeaderRightSide : undefined}
              renderHeaderRightSide={showStepTags ? renderHeaderRightSide : undefined}
              matching={{
                onChange: handleChangeMatching,
                matching,
                sentence: 'find all items #MATCHING_TOGGLE# this condition',
                readOnly: args.readOnly,
              }}
            />
          </div>
        </Layout>
      </div>
    );
  },
  args: {
    onAddStep: fn(),
    onChangeLogic: fn(),
    onChangeOrder: fn(),
    onChangeStepMatching: fn(),
    onChangeStepName: fn(),
    onDeleteStep: fn(),
    onDuplicateStep: fn(),
    onExpressionStepChange: fn(),
    expressions: [DEFAULT_EXPRESSION()],
    getMoveByLabel: (offset: number) => {
      if (offset < 0) {
        return `Move ${Math.abs(offset)} up...`;
      } else {
        return `Move ${Math.abs(offset)} down...`;
      }
    },
    texts: FILTER_TEXTS,
    visibilityConfig: {
      isStepCardHeaderVisible: true,
    },
    conditionFooterRelativeDateRange: true,
    showStepTags: true,
    layoutNativeScroll: true,
    maxConditionsLimit: 5
  },
} as FilterMeta;

export const Default: FilterStory = {};

export const WithActionAttribute: FilterStory = {
  args: {}
};

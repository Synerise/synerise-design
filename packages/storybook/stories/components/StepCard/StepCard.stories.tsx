import React, { useEffect, useMemo, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import StepCard, { StepCardProps } from '@synerise/ds-step-card';

import Tag, { TagShape } from '@synerise/ds-tag';
import { theme } from '@synerise/ds-core';
import Tooltip from '@synerise/ds-tooltip';
import Button from '@synerise/ds-button';
import Icon, { CalendarM } from '@synerise/ds-icon';
import DateRangePicker, { DateRange, fnsFormat } from '@synerise/ds-date-range-picker';
import CompletedWithin, { PeriodValue } from '@synerise/ds-completed-within';

import {
  BOOLEAN_CONTROL,
  NUMBER_CONTROL,
  REACT_NODE_AS_STRING,
  fixedWrapper400,
  CLASSNAME_ARG_CONTROL,
  PREFIXCLS_ARG_CONTROL,
  controlFromOptionsArray,
  centeredPaddedWrapper,
  fixedWrapper800,
} from '../../utils';
import { ConditionExample } from '../Filter/ConditionExample';
import { DEFAULT_STEP } from '../Condition/Condition.data';
import { STEP_CARD_TEXTS } from './StepCard.data';

type StoryProps = StepCardProps & {
  showTagInHeader: boolean;
  showFooter: boolean;
};
export default {
  component: StepCard,
  title: 'Components/Filter/StepCard',
  tags: ['autodocs'],
  decorators: [fixedWrapper800],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    prefixCls: PREFIXCLS_ARG_CONTROL,
    readOnly: BOOLEAN_CONTROL,
    isDraggable: BOOLEAN_CONTROL,
    expressionMoved: BOOLEAN_CONTROL,
    matching: BOOLEAN_CONTROL,
    showTagInHeader: { BOOLEAN_CONTROL, table: { category: 'Story options' } },
    showFooter: { BOOLEAN_CONTROL, table: { category: 'Story options' } },
  },
  render: ({ showTagInHeader, showFooter, ...args }) => {
    const [{ matching, name }, updateArgs] = useArgs();
    const handleChangeMatching = (bool: boolean) => {
      updateArgs({ matching: bool });
      args.onChangeMatching?.(bool);
    };
    const handleChangeName = (newName: string) => {
      updateArgs({ name: newName });
      args.onChangeName?.(newName);
    };

    const [completedWithinValue, setCompletedWithinValue] = useState<PeriodValue>({
      value: undefined,
      period: undefined,
    });
    const [rangeValue, setRangeValue] = useState<DateRange | undefined>(undefined);
    const [steps, setSteps] = useState([DEFAULT_STEP()]);

    const dateRangePickerTrigger = useMemo(() => {
      if (!rangeValue || !rangeValue.from || !rangeValue.to) {
        return (
          <Tooltip
            type="largeSimple"
            description="The main time filter analyzes the occurrence of events or assignment of attributes within a defined date range."
          >
            <Button type="tertiary" mode="icon-label">
              <Icon component={<CalendarM />} />
              In date range
            </Button>
          </Tooltip>
        );
      } else {
        return (
          <Button type="tertiary" mode="label-icon">
            {fnsFormat(new Date(rangeValue.from), 'MMM d, yyyy')}
            {` - `}
            {fnsFormat(new Date(rangeValue.to), 'MMM d, yyyy')}
            <Icon component={<CalendarM />} />
          </Button>
        );
      }
    }, [rangeValue]);

    return (
      <div style={{ width: '100%' }}>
        <StepCard
          {...args}
          name={name}
          matching={matching}
          onChangeMatching={handleChangeMatching}
          onChangeName={handleChangeName}
          footer={
            showFooter && (
              <>
                <CompletedWithin
                  readOnly={args.readOnly}
                  value={completedWithinValue}
                  onSetValue={setCompletedWithinValue}
                  placeholder="Completed within"
                />
                <DateRangePicker
                  // @ts-expect-error
                  onApply={setRangeValue}
                  // @ts-expect-error
                  value={rangeValue}
                  popoverTrigger={dateRangePickerTrigger}
                  readOnly={args.readOnly}
                />
              </>
            )
          }
        >
          <ConditionExample steps={steps} onChange={setSteps} readOnly={args.readOnly} />
        </StepCard>
      </div>
    );
  },
  args: {
    isHeaderVisible: true,
    showFooter: true,
    matching: true,
    showTagInHeader: true,
    texts: STEP_CARD_TEXTS,
    headerRightSide: <Tag shape={TagShape.SINGLE_CHARACTER_ROUND} name="A" color={theme.palette['grey-200']} asPill />,
  },
} as Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Default: Story = {};

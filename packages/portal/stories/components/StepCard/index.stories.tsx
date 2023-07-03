import * as React from 'react';

import StepCard from '@synerise/ds-step-card';
import { Tag, TagShape } from '@synerise/ds-tags';
import { boolean, text } from '@storybook/addon-knobs';
import CompletedWithin from '@synerise/ds-completed-within';
import DateRangePicker from '@synerise/ds-date-range-picker';
import { dateRangePickerTexts } from './data/stepCard.data';
import Icon, { CalendarM } from '@synerise/ds-icon';
import Button from '@synerise/ds-button';
import { default as fnsFormat } from '@synerise/ds-date-range-picker/dist/dateUtils/format';
import { ConditionExample } from './data/Condition';
import { DEFAULT_STEP } from '../Condition/data/index.data';
import { action } from '@storybook/addon-actions';
import { theme } from '@synerise/ds-core';
import Tooltip from '@synerise/ds-tooltip';

const stories = {
  default: () => {
    const [matching, setMatching] = React.useState(false);
    const [name, setName] = React.useState('');
    const [completedWithinValue, setCompletedWithinValue] = React.useState({ value: undefined, period: undefined });
    const [rangeValue, setRangeValue] = React.useState(undefined);
    const [steps, setSteps] = React.useState([DEFAULT_STEP()]);

    const dateRangePickerTrigger = React.useMemo(() => {
      if (!rangeValue) {
        return (
          <Tooltip
            type="largeSimple"
            description={text(
              'Tooltip description',
              'The main time filter analyzes the occurrence of events or assignment of attributes within a defined date range.'
            )}
          >
            <Button type="tertiary" mode="icon-label">
              <Icon component={<CalendarM />} />
              {text('Date range picker placeholder', 'In date range')}
            </Button>
          </Tooltip>
        );
      } else {
        return (
          /** workaround for an issue with displaying '-' instead of date range */
          <Button type="tertiary" mode="label-icon">
            {fnsFormat(new Date(rangeValue.from), 'MMM D, YYYY')}
            {` - `}
            {fnsFormat(new Date(rangeValue.to), 'MMM D, YYYY')}
            <Icon component={<CalendarM />} />
          </Button>
        );
      }
    }, [rangeValue]);

    const readOnly = boolean('Set readOnly', false);

    return (
      <div style={{ width: '100%' }}>
        <StepCard
          matching={matching}
          onChangeMatching={setMatching}
          name={name}
          readOnly={readOnly}
          onChangeName={name => {
            setName(name);
          }}
          onDuplicate={boolean('Duplicate button visible', false) ? action('duplicate') : undefined}
          onDelete={boolean('Delete button visible', false) ? action('delete') : undefined}
          texts={{
            matching: 'Performed',
            notMatching: 'Not performed',
            conditionType: 'event',
            notConditionType: 'not event',
            namePlaceholder: 'Unnamed',
            moveTooltip: 'Move',
            deleteTooltip: 'Delete',
            duplicateTooltip: 'Duplicate',
          }}
          footer={
            boolean('Show footer', true) && (
              <>
                <CompletedWithin
                  value={completedWithinValue}
                  onSetValue={setCompletedWithinValue}
                  placeholder={text('Completed within placeholder', 'Completed within')}
                />
                <DateRangePicker
                  onApply={setRangeValue}
                  texts={dateRangePickerTexts}
                  value={rangeValue}
                  popoverTrigger={dateRangePickerTrigger}
                  readOnly={readOnly}
                />
              </>
            )
          }
          isHeaderVisible={boolean('Show header', true)}
          headerRightSide={
            boolean('Show tag in header', true) && (
              <Tag
                shape={TagShape.SINGLE_CHARACTER_ROUND}
                name="A"
                color={theme.palette['grey-200']}
                asPill
              />
            )
          }
        >
          <ConditionExample steps={steps} onChange={setSteps} readOnly={readOnly} />
        </StepCard>
      </div>
    );
  },
};

export default {
  name: 'Components/Filter/StepCard',
  config: {},
  stories,
  Component: StepCard,
};

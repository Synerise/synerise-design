import * as React from 'react';

import StepCard from '@synerise/ds-step-card';
import { boolean } from '@storybook/addon-knobs';
import CompletedWithin from '@synerise/ds-completed-within';
import DateRangePicker from '@synerise/ds-date-range-picker';
import { dateRangePickerTexts } from './data/stepCard.data';
import { CalendarM } from '@synerise/ds-icon/dist/icons';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { default as fnsFormat } from '@synerise/ds-date-range-picker/dist/dateUtils/format';
import { ConditionExample } from './data/Condition';
import { DEFAULT_STEP } from '../Condition/data/index.data';
import { action } from '@storybook/addon-actions';

const stories = {
  default: () => {
    const [matching, setMatching] = React.useState(false);
    const [name, setName] = React.useState('funnel');
    const [completedWithinValue, setCompletedWithinValue] = React.useState({ value: undefined, period: undefined });
    const [rangeValue, setRangeValue] = React.useState(undefined);
    const [steps, setSteps] = React.useState([DEFAULT_STEP()]);

    const dateRangePickerTrigger = React.useMemo(() => {
      if (!rangeValue) {
        return (
          <Button type="tertiary" mode="single-icon">
            <Icon component={<CalendarM />} />
          </Button>
        );
      } else {
        return (
          <Button type="tertiary" mode="label-icon">
            {fnsFormat(rangeValue.from, 'MMM D, YYYY')}
            {` - `}
            {fnsFormat(rangeValue.to, 'MMM D, YYYY')}
            <Icon component={<CalendarM />} />
          </Button>
        );
      }
    }, [rangeValue]);

    return (
      <StepCard
        matching={matching}
        onChangeMatching={setMatching}
        name={name}
        onChangeName={setName}
        onDuplicate={action('duplicate')}
        onDelete={action('delete')}
        texts={{
          matching: 'Matching',
          notMatching: 'Not matching',
          namePlaceholder: 'Placeholder',
          moveTooltip: 'Move',
          deleteTooltip: 'Delete',
          duplicateTooltip: 'Duplicate',
        }}
        footer={
          boolean('Show footer', true) && (
            <>
              <CompletedWithin value={completedWithinValue} onSetValue={setCompletedWithinValue} />
              <DateRangePicker
                onApply={setRangeValue}
                texts={dateRangePickerTexts}
                value={rangeValue}
                popoverTrigger={dateRangePickerTrigger}
              />
            </>
          )
        }
      >
        <ConditionExample steps={steps} onChange={setSteps} />
      </StepCard>
    );
  },
};

export default {
  name: 'Filter/StepCard',
  config: {},
  stories,
  Component: StepCard,
};

import type { Meta, StoryObj } from '@storybook/react';
import { CompletedWithinProps } from '@synerise/ds-completed-within';
import type { ConditionStep } from '@synerise/ds-condition';
import { ContextGroup, ContextItem } from '@synerise/ds-context-selector';
import { DateRangePickerProps } from '@synerise/ds-date-range-picker';
import type { Expression, FilterProps } from '@synerise/ds-filter';

export type ExpressionWithSteps = Expression & {
  expressionSteps?: ConditionStep[];
  footer?: {
    dateRange?: DateRangePickerProps['value'];
    completedWithinValue?: CompletedWithinProps['value'];
  };
};

export type FilterStoryProps = FilterProps & {
  layoutNativeScroll?: boolean;
  showStepTags?: boolean;
  isDateFilterOn?: boolean;
  onExpressionStepChange?: () => void;
  onAddStep?: (item: ContextItem | ContextGroup) => void;
  conditionFooterRelativeDateRange?: boolean;
};

export type FilterMeta = Meta<FilterStoryProps>;

export type FilterStory = StoryObj<FilterStoryProps>;

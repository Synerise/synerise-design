import { merge } from 'lodash';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import { utils as dateRangePickerUtils } from '@synerise/ds-date-range-picker';
import { type DeepPartial } from '@synerise/ds-utils';

import type { FactorsTexts } from '../Factors.types';

export const useTexts = (
  defaultTexts?: DeepPartial<FactorsTexts>,
): FactorsTexts => {
  const intl = useIntl();

  const texts = useMemo(
    () =>
      merge(
        {
          dateRangePicker: dateRangePickerUtils.getDefaultTexts(intl),
          datePicker: {
            apply: intl.formatMessage({
              id: 'DS.FACTORS.DATE_PICKER.APPLY',
              defaultMessage: 'Apply',
            }),
            clearTooltip: intl.formatMessage({
              id: 'DS.FACTORS.DATE_PICKER.CLEAR_TOOLTIP',
              defaultMessage: 'Clear',
            }),
            inputPlaceholder: intl.formatMessage({
              id: 'DS.FACTORS.DATE_PICKER.INPUT_PLACEHOLDER',
              defaultMessage: 'Select date',
            }),
            now: intl.formatMessage({
              id: 'DS.FACTORS.DATE_PICKER.NOW',
              defaultMessage: 'Now',
            }),
          },
          dynamicKey: {
            keyPlaceholder: intl.formatMessage({
              id: 'DS.FACTORS.DYNAMIC_KEY.KEY_PLACEHOLDER',
              defaultMessage: 'Key',
            }),
            valuePlaceholder: intl.formatMessage({
              id: 'DS.FACTORS.DYNAMIC_KEY.VALUE_PLACEHOLDER',
              defaultMessage: 'Value',
            }),
          },
          relativeDate: {
            currentDatetime: intl.formatMessage({
              id: 'DS.FACTORS.RELATIVE_DATE.CURRENT_DATETIME',
              defaultMessage: 'current datetime',
            }),
            seconds: intl.formatMessage({
              id: 'DS.FACTORS.RELATIVE_DATE.SECONDS',
              defaultMessage: 'Seconds',
            }),
            minutes: intl.formatMessage({
              id: 'DS.FACTORS.RELATIVE_DATE.MINUTE',
              defaultMessage: 'Minutes',
            }),
            hours: intl.formatMessage({
              id: 'DS.FACTORS.RELATIVE_DATE.HOURS',
              defaultMessage: 'Hours',
            }),
            days: intl.formatMessage({
              id: 'DS.FACTORS.RELATIVE_DATE.DAYS',
              defaultMessage: 'Days',
            }),
            weeks: intl.formatMessage({
              id: 'DS.FACTORS.RELATIVE_DATE.WEEKS',
              defaultMessage: 'Weeks',
            }),
            months: intl.formatMessage({
              id: 'DS.FACTORS.RELATIVE_DATE.MONTHS',
              defaultMessage: 'Months',
            }),
            years: intl.formatMessage({
              id: 'DS.FACTORS.RELATIVE_DATE.YEARS',
              defaultMessage: 'Years',
            }),
            before: intl.formatMessage({
              id: 'DS.FACTORS.RELATIVE_DATE.BEFORE',
              defaultMessage: 'Before',
            }),
            after: intl.formatMessage({
              id: 'DS.FACTORS.RELATIVE_DATE.AFTER',
              defaultMessage: 'After',
            }),
            apply: intl.formatMessage({
              id: 'DS.FACTORS.RELATIVE_DATE.APPLY',
              defaultMessage: 'Apply',
            }),
            cancel: intl.formatMessage({
              id: 'DS.FACTORS.RELATIVE_DATE.CANCEL',
              defaultMessage: 'Cancel',
            }),
            triggerPlaceholder: intl.formatMessage({
              id: 'DS.FACTORS.RELATIVE_DATE.TRIGGER_PLACEHOLDER',
              defaultMessage: 'Select date',
            }),
            triggerValue: intl.formatMessage(
              {
                id: 'DS.FACTORS.RELATIVE_DATE.TRIGGER_VALUE',
                defaultMessage:
                  '{value} {interval} {timeRelation} current datetime',
              },
              {
                value: '1',
                interval: 'days',
                timeRelation: 'before',
              },
            ),
          },
          formula: {
            buttonPlaceholder: intl.formatMessage({
              id: 'DS.FACTORS.FORMULA.BUTTON_PLACEHOLDER',
              defaultMessage: 'Formula',
            }),
            defaultName: intl.formatMessage({
              id: 'DS.FACTORS.FORMULA.DEFAULT_NAME',
              defaultMessage: 'Formula',
            }),
          },
          array: {
            triggerLabel: intl.formatMessage({
              id: 'DS.FACTORS.ARRAY.TRIGGER_LABEL',
              defaultMessage: 'Define array',
            }),
            modalTitle: intl.formatMessage({
              id: 'DS.FACTORS.ARRAY.MODAL_TITLE',
              defaultMessage: 'Array',
            }),
            clearButtonLabel: intl.formatMessage({
              id: 'DS.FACTORS.ARRAY.CLEAR_BUTTON',
              defaultMessage: 'Clear all',
            }),
            creatorButtonLabel: intl.formatMessage({
              id: 'DS.FACTORS.ARRAY.CREATOR',
              defaultMessage: 'Creator',
            }),
            rawButtonLabel: intl.formatMessage({
              id: 'DS.FACTORS.ARRAY.RAW_BUTTON_LABEL',
              defaultMessage: 'Raw',
            }),
            searchPlaceholder: intl.formatMessage({
              id: 'DS.FACTORS.ARRAY.SEARCH_PLACEHOLDER',
              defaultMessage: 'Search',
            }),
            collectorPlaceholder: intl.formatMessage({
              id: 'DS.FACTORS.ARRAY.COLLECTOR_PLACEHOLDER',
              defaultMessage:
                'Type value or paste multiple values separated by `,`',
            }),
            collectorAdd: intl.formatMessage({
              id: 'DS.FACTORS.ARRAY.COLLECTOR_ADD',
              defaultMessage: 'Add',
            }),
            collectorCancel: intl.formatMessage({
              id: 'DS.FACTORS.ARRAY.COLLECTOR_CANCEL',
              defaultMessage: 'Cancel',
            }),
            searchClearTooltip: intl.formatMessage({
              id: 'DS.FACTORS.ARRAY.SEARCH_CLEAR_TOOLTIP',
              defaultMessage: 'Clear',
            }),
            deleteItemTooltip: intl.formatMessage({
              id: 'DS.FACTORS.ARRAY.DELETE_ITEM_TOOLTIP',
              defaultMessage: 'Delete',
            }),
            emptyTitle: intl.formatMessage({
              id: 'DS.FACTORS.ARRAY.EMPTY_TITLE',
              defaultMessage: 'No items defined yet',
            }),
            emptyDescription: intl.formatMessage({
              id: 'DS.FACTORS.ARRAY.EMPTY_DESCRIPTION',
              defaultMessage:
                'This is a simple empty state example text. You can easily change it.',
            }),
            emptyResultsTitle: intl.formatMessage({
              id: 'DS.FACTORS.ARRAY.EMPTY_RESULTS_TITLE',
              defaultMessage: 'No items match your query',
            }),
            emptyResultsDescription: intl.formatMessage({
              id: 'DS.FACTORS.ARRAY.EMPTY_RESULTS_DESCRIPTION',
              defaultMessage:
                'This is a simple empty state example text. You can easily change it.',
            }),
            limitPrefix: intl.formatMessage({
              id: 'DS.FACTORS.ARRAY.LIMIT_PREFIX',
              defaultMessage: 'Limit',
            }),
            numericValidationError: intl.formatMessage({
              id: 'DS.FACTORS.ARRAY.NUMERIC_VALIDATION_ERROR',
              defaultMessage: 'Some of the values are not a number',
            }),
            limitReached: intl.formatMessage({
              id: 'DS.FACTORS.ARRAY.LIMIT_REACHED',
              defaultMessage: 'Limit has been reached',
            }),
            limitExceeded: intl.formatMessage({
              id: 'DS.FACTORS.ARRAY.LIMIT_EXCEEDED',
              defaultMessage:
                'Adding these items will exceed maximum items limit',
            }),

            copiedTooltip: intl.formatMessage({
              id: 'DS.FACTORS.ARRAY.COPIED',
              defaultMessage: 'Copied',
            }),
            copyTooltip: intl.formatMessage({
              id: 'DS.FACTORS.ARRAY.COPY-VALUE',
              defaultMessage: 'Copy value',
            }),
          },
          parameter: {
            searchPlaceholder: intl.formatMessage({
              id: 'DS.FACTORS.PARAMETER.SEARCH_PLACEHOLDER',
              defaultMessage: 'Search',
            }),
            noResults: intl.formatMessage({
              id: 'DS.FACTORS.PARAMETER.NO_RESULTS',
              defaultMessage: 'No results',
            }),
            loadingParameter: intl.formatMessage({
              id: 'DS.FACTORS.PARAMETER.LOADING_PARAMETERS',
              defaultMessage: 'Loading parameters',
            }),
            showMore: intl.formatMessage({
              id: 'DS.FACTORS.PARAMETER.SHOW_MORE',
              defaultMessage: 'Show more',
            }),
            recentItemsGroupName: intl.formatMessage({
              id: 'DS.FACTORS.PARAMETER.RECENT',
              defaultMessage: 'Recent',
            }),
            allItemsGroupName: intl.formatMessage({
              id: 'DS.FACTORS.PARAMETER.ALL',
              defaultMessage: 'All',
            }),
          },
          valuePlaceholder: intl.formatMessage({
            id: 'DS.FACTORS.VALUE_PLACEHOLDER',
            defaultMessage: 'Value',
          }),
          modalApply: intl.formatMessage({
            id: 'DS.FACTORS.MODAL_APPLY',
            defaultMessage: 'Apply',
          }),
          modalCancel: intl.formatMessage({
            id: 'DS.FACTORS.MODAL_CANCEL',
            defaultMessage: 'Cancel',
          }),
          modalTitle: intl.formatMessage({
            id: 'DS.FACTORS.MODAL_TITLE',
            defaultMessage: 'Value',
          }),
          factorTypes: {
            text: intl.formatMessage({
              id: 'DS.FACTORS.FACTOR_TYPES.TEXT',
              defaultMessage: 'Text',
            }),
            number: intl.formatMessage({
              id: 'DS.FACTORS.FACTOR_TYPES.NUMBER',
              defaultMessage: 'Number',
            }),
            parameter: intl.formatMessage({
              id: 'DS.FACTORS.FACTOR_TYPES.PARAMETER',
              defaultMessage: 'Parameter',
            }),
            contextParameter: intl.formatMessage({
              id: 'DS.FACTORS.FACTOR_TYPES.CONTEXT_PARAMETER',
              defaultMessage: 'Context parameter',
            }),
            dynamicKey: intl.formatMessage({
              id: 'DS.FACTORS.FACTOR_TYPES.DYNAMIC_KEY',
              defaultMessage: 'Dynamic key',
            }),
            formula: intl.formatMessage({
              id: 'DS.FACTORS.FACTOR_TYPES.FORMULA',
              defaultMessage: 'Formula',
            }),
            array: intl.formatMessage({
              id: 'DS.FACTORS.FACTOR_TYPES.ARRAY',
              defaultMessage: 'Array',
            }),
            date: intl.formatMessage({
              id: 'DS.FACTORS.FACTOR_TYPES.DATE',
              defaultMessage: 'Date',
            }),
            relativeDate: intl.formatMessage({
              id: 'DS.FACTORS.FACTOR_TYPES.RELATIVE_DATE',
              defaultMessage: 'Relative date',
            }),
            dateRange: intl.formatMessage({
              id: 'DS.FACTORS.FACTOR_TYPES.DATE_RANGE',
              defaultMessage: 'Date range',
            }),
          },
        },
        defaultTexts,
      ),
    [defaultTexts, intl],
  );

  return texts;
};

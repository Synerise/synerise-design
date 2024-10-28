import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { BookM, Calendar2M, DynamicKeyM, FormulaM, HashM, ListM, ShowM, TextM } from '@synerise/ds-icon';

import * as S from './style/Factors.style';
import { DefinedFactorTypes, FactorsProps, SelectedFactorType } from './Factors.types';
import FactorTypeSelector from './FactorTypeSelector/FactorTypeSelector';
import FactorValue from './FactorValue/FactorValue';
import DynamicKey from './FactorValue/DynamicKey/DynamicKey';
import DateInput from './FactorValue/Date/Date';
import FormulaInput from './FactorValue/Formula/Formula';
import TextInput from './FactorValue/Text/Text';
import ParameterInput from './FactorValue/Parameter/Parameter';
import NumberInput from './FactorValue/Number/NumberInput';
import DateRangeInput from './FactorValue/DateRange/DateRange';

export const factorTypes: Record<DefinedFactorTypes, SelectedFactorType> = {
  text: {
    icon: <TextM />,
    name: 'Text',
    input: TextInput,
  },
  number: {
    icon: <HashM />,
    name: 'Number',
    input: NumberInput,
  },
  parameter: {
    icon: <BookM />,
    name: 'Parameter',
    input: ParameterInput,
  },
  contextParameter: {
    icon: <ShowM />,
    name: 'Context parameter',
    input: ParameterInput,
  },
  dynamicKey: {
    icon: <DynamicKeyM />,
    name: 'Dynamic key',
    input: DynamicKey,
  },
  formula: {
    icon: <FormulaM />,
    name: 'Formula',
    input: FormulaInput,
  },
  array: {
    icon: <ListM />,
    name: 'Array',
    input: TextInput,
  },
  date: {
    icon: <Calendar2M />,
    name: 'Date',
    input: DateInput,
  },
  dateRange: {
    icon: <Calendar2M />,
    name: 'Date range',
    input: DateRangeInput,
  },
};
// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = (): void => {};

const Factors = ({
  selectedFactorType,
  setSelectedFactorType = NOOP,
  onChangeValue,
  onParamsClick,
  value,
  defaultFactorType = 'text',
  textType = 'Default',
  unavailableFactorTypes,
  availableFactorTypes,
  parameters,
  autocompleteText,
  allowClear = true,
  withoutTypeSelector = false,
  texts,
  formulaEditor,
  opened,
  loading,
  factorKey,
  preventAutoloadData,
  onActivate,
  onDeactivate,
  getPopupContainerOverride,
  error,
  inputProps,
  readOnly,
  getMenuEntryProps,
}: FactorsProps) => {
  const { formatMessage } = useIntl();
  const text = useMemo(
    () => ({
      dateRangePicker: {
        after: formatMessage({ id: `DS.DATE-RANGE-PICKER.AFTER`, defaultMessage: 'after' }),
        allTime: formatMessage({ id: `DS.DATE-RANGE-PICKER.ALL-TIME`, defaultMessage: 'Lifetime' }),
        apply: formatMessage({ id: `DS.DATE-RANGE-PICKER.APPLY`, defaultMessage: 'Apply' }),
        before: formatMessage({ id: `DS.DATE-RANGE-PICKER.BEFORE`, defaultMessage: 'before' }),
        clear: formatMessage({ id: `DS.DATE-RANGE-PICKER.CLEAR`, defaultMessage: 'Clear' }),
        clearRange: formatMessage({ id: `DS.DATE-RANGE-PICKER.CLEAR-RANGE`, defaultMessage: ' Clear range' }),
        copyRange: formatMessage({ id: `DS.DATE-RANGE-PICKER.COPY-RANGE`, defaultMessage: 'Copy range' }),
        custom: formatMessage({ id: `DS.DATE-RANGE-PICKER.CUSTOM`, defaultMessage: 'Custom' }),
        days: formatMessage({ id: `DS.DATE-RANGE-PICKER.DAYS`, defaultMessage: 'Days' }),
        emptyDateError: formatMessage({
          id: `DS.DATE-RANGE-PICKER.EMPTY-DATE-ERROR`,
          defaultMessage: 'Date cannot be empty',
        }),
        endDate: formatMessage({ id: `DS.DATE-RANGE-PICKER.END-DATE`, defaultMessage: 'End date' }),
        endDatePlaceholder: formatMessage({
          id: `DS.DATE-RANGE-PICKER.END-DATE-PLACEHOLDER`,
          defaultMessage: 'End date',
        }),
        filter: formatMessage({ id: `DS.DATE-RANGE-PICKER.FILTER`, defaultMessage: 'Date filter' }),
        hours: formatMessage({ id: `DS.DATE-RANGE-PICKER.HOURS`, defaultMessage: 'Hours' }),
        last3Months: formatMessage({ id: `DS.DATE-RANGE-PICKER.LAST-3-MONTHS`, defaultMessage: 'Last 3 months' }),
        last6Months: formatMessage({ id: `DS.DATE-RANGE-PICKER.LAST-6-MONTHS`, defaultMessage: 'Last 6 months' }),
        last7Days: formatMessage({ id: `DS.DATE-RANGE-PICKER.LAST-7-DAYS`, defaultMessage: 'Last 7 days' }),
        last: formatMessage({ id: `DS.DATE-RANGE-PICKER.LAST`, defaultMessage: 'Last' }),
        lastMonth: formatMessage({ id: `DS.DATE-RANGE-PICKER.LAST-MONTH`, defaultMessage: 'Last month' }),
        lastWeek: formatMessage({ id: `DS.DATE-RANGE-PICKER.LAST-WEEK`, defaultMessage: 'Last week' }),
        lastYear: formatMessage({ id: `DS.DATE-RANGE-PICKER.LAST-YEAR`, defaultMessage: 'Last year' }),
        minutes: formatMessage({ id: `DS.DATE-RANGE-PICKER.MINUTES`, defaultMessage: 'Minutes' }),
        months: formatMessage({ id: `DS.DATE-RANGE-PICKER.MONTHS`, defaultMessage: 'Months' }),
        more: formatMessage({ id: `DS.DATE-RANGE-PICKER.MORE`, defaultMessage: 'More' }),
        next3Months: formatMessage({ id: `DS.DATE-RANGE-PICKER.NEXT-3-MONTHS`, defaultMessage: 'Next 3 months' }),
        next6Months: formatMessage({ id: `DS.DATE-RANGE-PICKER.NEXT-6-MONTHS`, defaultMessage: 'Next 6 months' }),
        next7Days: formatMessage({ id: `DS.DATE-RANGE-PICKER.NEXT-7-DAYS`, defaultMessage: 'Next 7 days' }),
        next: formatMessage({ id: `DS.DATE-RANGE-PICKER.NEXT`, defaultMessage: 'Next' }),
        nextMonth: formatMessage({ id: `DS.DATE-RANGE-PICKER.NEXT-MONTH`, defaultMessage: 'Next month' }),
        nextWeek: formatMessage({ id: `DS.DATE-RANGE-PICKER.NEXT-WEEK`, defaultMessage: 'Next week' }),
        nextYear: formatMessage({ id: `DS.DATE-RANGE-PICKER.NEXT-YEAR`, defaultMessage: 'Next year' }),
        now: formatMessage({ id: `DS.DATE-RANGE-PICKER.NOW`, defaultMessage: 'Now' }),
        pasteRange: formatMessage({ id: `DS.DATE-RANGE-PICKER.PASTE-RANGE`, defaultMessage: 'Paste range' }),
        relativeDateRange: formatMessage({
          id: `DS.DATE-RANGE-PICKER.RELATIVE-DATE-RANGE`,
          defaultMessage: 'Relative date range',
        }),
        remove: formatMessage({ id: `DS.DATE-RANGE-PICKER.REMOVE`, defaultMessage: 'Remove' }),
        savedFiltersTrigger: formatMessage({
          id: `DS.DATE-RANGE-PICKER.SAVED-FILTERS`,
          defaultMessage: 'Saved filters',
        }),
        seconds: formatMessage({ id: `DS.DATE-RANGE-PICKER.SECONDS`, defaultMessage: 'Seconds' }),
        selectDate: formatMessage({ id: `DS.DATE-RANGE-PICKER.SELECT-DATE`, defaultMessage: 'Select date' }),
        selectTime: formatMessage({ id: `DS.DATE-RANGE-PICKER.SELECT-TIME`, defaultMessage: 'Select time' }),
        since: formatMessage({ id: `DS.DATE-RANGE-PICKER.SINCE`, defaultMessage: 'Since' }),
        startDate: formatMessage({ id: `DS.DATE-RANGE-PICKER.START-DATE`, defaultMessage: 'Start date' }),
        startDatePlaceholder: formatMessage({
          id: `DS.DATE-RANGE-PICKER.START-DATE-PLACEHOLDER`,
          defaultMessage: 'Start date',
        }),
        thisMonth: formatMessage({ id: `DS.DATE-RANGE-PICKER.THIS-MONTH`, defaultMessage: 'This month' }),
        thisWeek: formatMessage({ id: `DS.DATE-RANGE-PICKER.THIS-WEEK`, defaultMessage: 'This week' }),
        timestampLast: formatMessage({ id: `DS.DATE-RANGE-PICKER.TIMESTAMP-LAST`, defaultMessage: 'Last' }),
        timestampNext: formatMessage({ id: `DS.DATE-RANGE-PICKER.TIMESTAMP-NEXT`, defaultMessage: 'Next' }),
        timestampTill: formatMessage({ id: `DS.DATE-RANGE-PICKER.TIMESTAMP-TILL`, defaultMessage: 'till' }),
        today: formatMessage({ id: `DS.DATE-RANGE-PICKER.TODAY`, defaultMessage: 'Today' }),
        tomorrow: formatMessage({ id: `DS.DATE-RANGE-PICKER.TOMORROW`, defaultMessage: 'Tomorrow' }),
        weeks: formatMessage({ id: `DS.DATE-RANGE-PICKER.WEEKS`, defaultMessage: 'Weeks' }),
        years: formatMessage({ id: `DS.DATE-RANGE-PICKER.YEARS`, defaultMessage: 'Years' }),
        yesterday: formatMessage({ id: `DS.DATE-RANGE-PICKER.YESTERDAY`, defaultMessage: 'Yesterday' }),
        range: formatMessage({ id: `DS.DATE-RANGE-PICKER.RANGE`, defaultMessage: 'Range' }),
        hour: formatMessage({ id: `DS.DATE-RANGE-PICKER.HOUR`, defaultMessage: 'Hour' }),
      },
      datePicker: {
        apply: formatMessage({ id: 'DS.FACTORS.DATE_PICKER.APPLY', defaultMessage: 'Apply' }),
        clearTooltip: formatMessage({ id: 'DS.FACTORS.DATE_PICKER.CLEAR_TOOLTIP', defaultMessage: 'Clear' }),
        inputPlaceholder: formatMessage({
          id: 'DS.FACTORS.DATE_PICKER.INPUT_PLACEHOLDER',
          defaultMessage: 'Select date',
        }),
        now: formatMessage({ id: 'DS.FACTORS.DATE_PICKER.NOW', defaultMessage: 'Now' }),
      },
      dynamicKey: {
        keyPlaceholder: formatMessage({ id: 'DS.FACTORS.DYNAMIC_KEY.KEY_PLACEHOLDER', defaultMessage: 'Key' }),
        valuePlaceholder: formatMessage({ id: 'DS.FACTORS.DYNAMIC_KEY.VALUE_PLACEHOLDER', defaultMessage: 'Value' }),
      },
      formula: {
        buttonPlaceholder: formatMessage({ id: 'DS.FACTORS.FORMULA.BUTTON_PLACEHOLDER', defaultMessage: 'Formula' }),
        defaultName: formatMessage({ id: 'DS.FACTORS.FORMULA.DEFAULT_NAME', defaultMessage: 'Formula' }),
      },
      parameter: {
        searchPlaceholder: formatMessage({ id: 'DS.FACTORS.PARAMETER.SEARCH_PLACEHOLDER', defaultMessage: 'Search' }),
        noResults: formatMessage({ id: 'DS.FACTORS.PARAMETER.NO_RESULTS', defaultMessage: 'No results' }),
        loadingParameter: formatMessage({
          id: 'DS.FACTORS.PARAMETER.LOADING_PARAMETERS',
          defaultMessage: 'Loading parameters',
        }),
        showMore: formatMessage({ id: 'DS.FACTORS.PARAMETER.SHOW_MORE', defaultMessage: 'Show more' }),
        recentItemsGroupName: formatMessage({ id: 'DS.FACTORS.PARAMETER.RECENT', defaultMessage: 'Recent' }),
        allItemsGroupName: formatMessage({ id: 'DS.FACTORS.PARAMETER.ALL', defaultMessage: 'All' }),
      },
      valuePlaceholder: formatMessage({ id: 'DS.FACTORS.VALUE_PLACEHOLDER', defaultMessage: 'Value' }),
      modalApply: formatMessage({ id: 'DS.FACTORS.MODAL_APPLY', defaultMessage: 'Apply' }),
      modalCancel: formatMessage({ id: 'DS.FACTORS.MODAL_CANCEL', defaultMessage: 'Cancel' }),
      modalTitle: formatMessage({ id: 'DS.FACTORS.MODAL_TITLE', defaultMessage: 'Value' }),
      factorTypes: {
        text: formatMessage({ id: 'DS.FACTORS.FACTOR_TYPES.TEXT', defaultMessage: 'Text' }),
        number: formatMessage({ id: 'DS.FACTORS.FACTOR_TYPES.NUMBER', defaultMessage: 'Number' }),
        parameter: formatMessage({ id: 'DS.FACTORS.FACTOR_TYPES.PARAMETER', defaultMessage: 'Parameter' }),
        contextParameter: formatMessage({
          id: 'DS.FACTORS.FACTOR_TYPES.CONTEXT_PARAMETER',
          defaultMessage: 'Context parameter',
        }),
        dynamicKey: formatMessage({ id: 'DS.FACTORS.FACTOR_TYPES.DYNAMIC_KEY', defaultMessage: 'Dynamic key' }),
        formula: formatMessage({ id: 'DS.FACTORS.FACTOR_TYPES.FORMULA', defaultMessage: 'Formula' }),
        array: formatMessage({ id: 'DS.FACTORS.FACTOR_TYPES.ARRAY', defaultMessage: 'Array' }),
        date: formatMessage({ id: 'DS.FACTORS.FACTOR_TYPES.DATE', defaultMessage: 'Date' }),
        dateRange: formatMessage({ id: 'DS.FACTORS.FACTOR_TYPES.DATE_RANGE', defaultMessage: 'Date range' }),
      },
      ...texts,
    }),
    [texts, formatMessage]
  );

  const factorType = useMemo(() => {
    return selectedFactorType || defaultFactorType;
  }, [selectedFactorType, defaultFactorType]);

  const selectedFactor = useMemo(() => {
    return factorTypes[factorType]
  }, [factorType]);

  return (
    <S.Group
      resetMargin
      compact
      withoutTypeSelector={withoutTypeSelector}
      className={`ds-factors ds-factors-${factorType}`}
    >
      {!withoutTypeSelector && setSelectedFactorType && (
        <FactorTypeSelector
          texts={text.factorTypes}
          selectedFactorType={factorType}
          setSelectedFactorType={setSelectedFactorType}
          selectedFactor={selectedFactor}
          availableFactorTypes={availableFactorTypes}
          unavailableFactorTypes={unavailableFactorTypes}
          readOnly={readOnly}
        />
      )}
      <FactorValue
        value={value}
        onChangeValue={onChangeValue}
        onParamsClick={onParamsClick}
        selectedFactor={selectedFactor}
        selectedFactorType={factorType}
        textType={textType}
        parameters={parameters}
        autocompleteText={autocompleteText}
        withoutTypeSelector={withoutTypeSelector}
        formulaEditor={formulaEditor}
        texts={text}
        opened={opened}
        inputProps={inputProps}
        loading={loading}
        factorKey={factorKey}
        preventAutoloadData={preventAutoloadData}
        getPopupContainerOverride={getPopupContainerOverride}
        onActivate={onActivate}
        onDeactivate={onDeactivate}
        error={error}
        allowClear={allowClear}
        readOnly={readOnly}
        getMenuEntryProps={getMenuEntryProps}
      />
    </S.Group>
  );
};

export default Factors;

import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import ContentItem from '@synerise/ds-manageable-list/dist/Item/ContentItem/ContentItem';
import { Tag, TagShape } from '@synerise/ds-tags';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Button from '@synerise/ds-button';
import { v4 as uuid } from 'uuid';
import { Month, MonthlyFilterProps, MonthlyFilterState } from './MonthlyFilter.types';
import {
  MONTH_DAYS,
  DEFAULT_DAYS_OF_PERIODS,
  DEFAULT_COUNTED_FROM,
  defaultId,
  DAYS_OF_PERIOD_ENUM,
  COUNTED_FROM_ENUM,
  SPACE_UNICODE,
} from '../../constants';
import * as S from './MonthlyFilter.styles';
import TimeWindow from '../../Shared/TimeWindow/TimeWindow';
import { TimeWindowProps } from '../../Shared/TimeWindow/TimeWindow.types';

class MonthlyFilter extends React.PureComponent<MonthlyFilterProps, MonthlyFilterState> {
  static defaultProps = {
    maxEntries: 4,
  };

  state = {
    visible: {
      [defaultId]: true,
    },
  };

  componentDidMount(): void {
    const { value } = this.props;
    value.length && this.handleCollapse(value[0].id);
  }

  setData = (definition: Month[]): void => {
    const { onChange } = this.props;
    return onChange(definition);
  };

  handleAddRow = (): void => {
    const id = uuid();
    const { value, countedFromPeriods, daysOfPeriods } = this.props;
    const defaultPeriod = (daysOfPeriods || DEFAULT_DAYS_OF_PERIODS)[0].value;
    const defaultPeriodType = (countedFromPeriods || DEFAULT_DAYS_OF_PERIODS)[0].value;
    this.setData([...value, { period: defaultPeriod, periodType: defaultPeriodType, definition: {}, id }]);
    this.handleCollapse(id);
  };

  handleRemoveRow = (index: React.ReactText): void => {
    const { value } = this.props;
    const result = value.filter((item, key) => key !== index);
    this.handleRemoveRowCollapse(value[index].id);
    this.setData([...result]);
  };

  handleRemoveRowCollapse = (deletedId: string): void => {
    const { value } = this.props;
    const { visible } = this.state;
    const itemKey = value.findIndex(item => item.id === deletedId);
    const next = value[itemKey + 1];
    const prev = value[itemKey - 1];
    visible[deletedId] && (next || prev) && this.handleCollapse(next ? next.id : prev.id);
  };

  handleTypeChange = (val: string, index: number): void => {
    const { value } = this.props;

    value[index] = {
      ...value[index],
      period: val,
      definition: {},
    };
    this.setData(value);
  };

  handlePeriodTypeChange = (val: string, index: number): void => {
    const { value } = this.props;
    const data = [...value];
    data[index] = {
      ...data[index],
      periodType: val,
    };
    this.setData(data);
  };

  handleDefinitionChange = (definition: Month, index: number): void => {
    const { value } = this.props;
    const data = [...value];
    const currentDefinition: Month = data[index];
    data[index] = {
      ...currentDefinition,
      definition,
    };
    this.setData(data);
  };

  dayWeekFormatter = (index: number, long?: boolean): string => {
    const { intl } = this.props;
    const weekStartIndex = Math.floor(index / 7);
    const dayOfWeek = index - weekStartIndex * 7;
    const weekday = intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.WEEKDAYS_LONG.${dayOfWeek + 1}` });
    const nthWeek = intl.formatMessage({
      id: `DS.DATE-RANGE-PICKER.NTH.${weekStartIndex === 5 ? 'LAST' : weekStartIndex + 1}`,
    });
    return long
      ? `${nthWeek} ${weekday}`
      : intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.WEEKDAYS-SHORT-${dayOfWeek}` });
  };

  dayMonthFormatter = (i: number, long?: boolean): string => {
    const { intl } = this.props;

    const locale = intl.locale.substring(0, 2);
    return long
      ? intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.NTH-DAY-OF-MONTH' }, { nth: MONTH_DAYS(locale)[i] })
      : MONTH_DAYS(locale)[i];
  };

  dayTemplate = (index: number): { week: number; day: number } => {
    const weekStartIndex = Math.floor(index / 7);
    return { week: weekStartIndex, day: index - weekStartIndex * 7 };
  };

  getTimeWindowSettings = (item: Month): Partial<TimeWindowProps> => {
    const { intl } = this.props;
    const settings = {
      [DAYS_OF_PERIOD_ENUM.DAY_OF_MONTH]: {
        numberOfDays: 31,
        reverseGroup: 1,
        inverted: item.periodType === COUNTED_FROM_ENUM.ENDING,
        dayTemplate: (dayOfMonth: number): { day: number } => ({ day: dayOfMonth }),
        dayFormatter: this.dayMonthFormatter,
      },
      [DAYS_OF_PERIOD_ENUM.DAY_OF_WEEK]: {
        numberOfDays: 7 * 5,
        reverseGroup: 7,
        dayTemplate: this.dayTemplate,
        dayFormatter: this.dayWeekFormatter,
        labelInverted: item.periodType === COUNTED_FROM_ENUM.ENDING,
        inverted: item.periodType === COUNTED_FROM_ENUM.ENDING,
        rowLabelFormatter: (rowIndex: number): string =>
          intl.formatMessage({
            id: `DS.DATE-RANGE-PICKER.NTH.${rowIndex + 1}`,
          }),
      },
    };
    return settings[item.period] as Partial<TimeWindowProps>;
  };

  handleCollapse = (id: React.ReactText): void => {
    const { visible } = this.state;
    const updatedVisible = {};
    const visibleKeys = visible ? Object.keys(visible) : [];
    for (let i = 0; i < visibleKeys.length; i += 1) {
      const currentIndex = visibleKeys[i];
      updatedVisible[currentIndex] = false;
    }
    updatedVisible[id] = true;
    this.setState({
      visible: updatedVisible,
    });
  };

  renderDaysOfField = (item: Month, key: number): React.ReactNode => {
    const { intl, daysOfPeriods, disabled } = this.props;
    if (daysOfPeriods?.length === 1) {
      return (
        <S.PeriodMode>
          <FormattedMessage id={daysOfPeriods[0].translationKey} />
        </S.PeriodMode>
      );
    }
    const dataSource = (daysOfPeriods || DEFAULT_DAYS_OF_PERIODS).map(period => ({
      checked: item?.period === period.value,
      text: intl.formatMessage({ id: period.translationKey as string }),
      onSelect: (): void => {
        this.handleTypeChange(period.value as string, key);
      },
    }));

    const daysOfPeriodValue = (daysOfPeriods || DEFAULT_DAYS_OF_PERIODS).find(period => item?.period === period.value);

    return (
      <S.Select
        disabled={disabled}
        expanded={false}
        dropdownOverlayStyle={{
          minWidth: '150px',
        }}
        dropdownProps={{
          getPopupContainer: (): HTMLElement => document.querySelector('.monthly-wrapper') || document.body,
        }}
        placeholder={intl.formatMessage({ id: (daysOfPeriods || DEFAULT_DAYS_OF_PERIODS)[0].translationKey })}
        input={{
          value: daysOfPeriodValue ? intl.formatMessage({ id: daysOfPeriodValue?.translationKey }) : undefined,
          name: 'days-of-period',
          maxLength: 120,
        }}
        inputStyle={{
          display: 'flex',
        }}
        dataSource={dataSource}
        size="small"
      />
    );
  };

  renderCountedFromField = (item: Month, key: number): React.ReactNode => {
    const { intl, countedFromPeriods, disabled } = this.props;

    if (countedFromPeriods?.length === 1) {
      return (
        <S.PeriodMode>
          <FormattedMessage id={countedFromPeriods[0].translationKey} />
        </S.PeriodMode>
      );
    }
    const dataSource = (countedFromPeriods || DEFAULT_COUNTED_FROM).map(i => ({
      checked: item?.periodType === i.value,
      text: intl.formatMessage({ id: i.translationKey as string }),
      onSelect: (): void => {
        this.handlePeriodTypeChange(i.value as string, key);
      },
    }));

    const countedFromValue = (countedFromPeriods || DEFAULT_COUNTED_FROM).find(i => item?.periodType === i.value);

    return (
      <S.Select
        disabled={disabled}
        expanded={false}
        dropdownProps={{
          getPopupContainer: (): HTMLElement => document.querySelector('.monthly-wrapper') || document.body,
        }}
        dropdownOverlayStyle={{
          minWidth: '150px',
        }}
        placeholder={intl.formatMessage({ id: (countedFromPeriods || DEFAULT_COUNTED_FROM)[0].translationKey })}
        input={{
          value: countedFromValue
            ? intl.formatMessage({ id: countedFromValue?.translationKey, defaultMessage: item?.periodType })
            : undefined,
          name: 'counted-from-select',
          maxLength: 120,
        }}
        inputStyle={{
          display: 'flex',
        }}
        dataSource={dataSource}
        size="small"
      />
    );
  };

  render(): JSX.Element {
    const {
      value,
      onRangeCopy,
      onRangePaste,
      onRangeClear,
      rangeClipboard,
      intl,
      texts,
      valueSelectionModes,
      timePickerProps,
      disabled,
      renderRangeFormSuffix,
      maxEntries,
    } = this.props;
    const { visible } = this.state;
    const data = [...value];
    return (
      <S.MonthlyFilterWrapper className="monthly-wrapper">
        {data.map((item, key) => (
          <ContentItem
            key={item.id}
            hideExpander={false}
            onExpand={this.handleCollapse}
            expanded={visible[item.id]}
            onRemove={(): void => this.handleRemoveRow(key)}
            item={{
              tag: (
                <Tag
                  name={String(key + 1)}
                  shape={TagShape.SINGLE_CHARACTER_ROUND}
                  color={theme.palette['grey-100']}
                  textColor={theme.palette['grey-500']}
                />
              ),
              canDelete: !disabled,
              id: item.id as string,
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              name: (
                <S.DropdownHeader className={visible[item.id] ? 'dropdown-header-visible' : 'dropdown-header'}>
                  <S.DropdownLabel>
                    <FormattedMessage id="DS.DATE-RANGE-PICKER.DAYS-OF" defaultMessage="Days of" />
                    {SPACE_UNICODE}
                  </S.DropdownLabel>
                  {this.renderDaysOfField(item, key)}
                  <S.DropdownLabel>
                    {SPACE_UNICODE}
                    <FormattedMessage id="DS.DATE-RANGE-PICKER.COUNTED-FROM" defaultMessage="counted from" />
                    {SPACE_UNICODE}
                  </S.DropdownLabel>
                  {this.renderCountedFromField(item, key)}
                </S.DropdownHeader>
              ),
              nameWrapperClassNames: ['full-width'],
              content: visible[item.id] ? (
                <S.ContentWrapper>
                  <TimeWindow
                    disabled={disabled}
                    readOnly={!!disabled}
                    texts={texts}
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${item.period}_${key}`}
                    showSelectAll
                    invertibleTime
                    numberOfDaysPerRow={7}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-expect-error: FIXME: Type '{ [day: number]: DenormalizedFilter; }' is not assignable to type 'Days'.
                    days={item.definition}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-expect-error: FIXME: Type '(definition: Month) => void' is not assignable to type '(days: Days) => void'.
                    onChange={(definition: Month): void => this.handleDefinitionChange(definition, key)}
                    onRangeClear={onRangeClear}
                    onRangeCopy={onRangeCopy}
                    onRangePaste={onRangePaste}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-expect-error: FIXME: Type 'Partial<FilterDefinition> | undefined' is not assignable to type 'Partial<FilterDefinition>'.
                    rangeClipboard={rangeClipboard}
                    monthlyFilterPeriod={data[key].period}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-expect-error: FIXME: Type 'Partial<FilterDefinition> | undefined' is not assignable to type 'Partial<FilterDefinition>'.
                    valueSelectionModes={valueSelectionModes}
                    renderRangeFormSuffix={renderRangeFormSuffix}
                    timePickerProps={timePickerProps}
                    {...this.getTimeWindowSettings(item)}
                    monthlyFilter
                  />
                </S.ContentWrapper>
              ) : (
                <div />
              ),
            }}
            texts={{
              itemActionDeleteTooltip: intl.formatMessage({
                id: 'DS.DATE-RANGE-PICKER.REMOVE',
                defaultMessage: 'Remove',
              }),
            }}
          />
        ))}
        <S.AddContainer>
          {!disabled && value.length < Number(maxEntries) && (
            <Button.Creator
              label={intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.ADD-RULE', defaultMessage: 'Add rule' })}
              onClick={this.handleAddRow}
              block
            />
          )}
        </S.AddContainer>
      </S.MonthlyFilterWrapper>
    );
  }
}

export default injectIntl(MonthlyFilter);

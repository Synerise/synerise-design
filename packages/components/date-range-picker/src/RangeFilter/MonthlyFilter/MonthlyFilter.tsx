import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import ContentItem from '@synerise/ds-manageable-list/dist/Item/ContentItem/ContentItem';
import { Tag, TagShape } from '@synerise/ds-tags';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Button from '@synerise/ds-button';
import { Month, MonthlyFilterProps } from './MonthlyFilter.types';
import { MONTHLY_TYPES, MONTH_DAYS, PERIODS, PERIODS_TYPE, MAX_RULES_ALLOWED, defaultId } from '../constants';
import * as S from './MonthlyFilter.styles';
import TimeWindow from '../TimeWindow/TimeWindow';
import { TimeWindowProps } from '../TimeWindow/TimeWindow.types';

class MonthlyFilter extends React.PureComponent<MonthlyFilterProps> {
  state = {
    visible: {
      [defaultId]: true,
    },
  };

  componentDidMount(): void {
    const { value } = this.props;
    value.length && this.handleCollapse(value[0].id);
  }

  setData = (definition: string | object): void => {
    const { onChange } = this.props;
    return onChange(definition);
  };

  handleAddRow = (): void => {
    const id = Math.random();
    const { value } = this.props;

    this.setData([
      ...value,
      { period: MONTHLY_TYPES.DAY_OF_MONTH, periodType: PERIODS_TYPE[0].value, definition: {}, id },
    ]);
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

  handleDefinitionChange = (definition: string, index: number): void => {
    const { value } = this.props;
    const data = [...value];
    data[index] = { ...data[index], definition };
    this.setData(data);
  };

  dayWeekFormatter = (index: number, long: boolean): string => {
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

  dayMonthFormatter = (i: number, long: boolean): string => {
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
      [MONTHLY_TYPES.DAY_OF_MONTH]: {
        numberOfDays: 31,
        reverseGroup: 1,
        inverted: item.periodType === 'ending',
        dayTemplate: (dayOfMonth: number): { day: number } => ({ day: dayOfMonth }),
        dayFormatter: this.dayMonthFormatter,
      },
      [MONTHLY_TYPES.DAY_OF_WEEK]: {
        numberOfDays: 7 * 5,
        reverseGroup: 7,
        dayTemplate: this.dayTemplate,
        dayFormatter: this.dayWeekFormatter,
        labelInverted: item.periodType === 'ending',
        inverted: item.periodType === 'ending',
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

  render(): JSX.Element {
    const { value, onRangeCopy, onRangePaste, onRangeClear, rangeClipboard, intl } = this.props;
    const { visible } = this.state;
    const data = [...value];
    return (
      <S.MonthlyFilterWrapper className="monthly-wrapper">
        {data.map((item, key) => (
          <ContentItem
            key={item.id}
            hideExpander={false}
            onExpand={(id): void => this.handleCollapse(id)}
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
              canDelete: true,
              id: item.id,
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              name: (
                <S.DropdownHeader className={visible[item.id] && 'dropdown-header-visible'}>
                  <S.DropdownLabel>
                    <FormattedMessage id="DS.DATE-RANGE-PICKER.RULE" />{' '}
                    <FormattedMessage id="DS.DATE-RANGE-PICKER.DAYS-OF" />
                  </S.DropdownLabel>
                  <S.Select
                    expanded={false}
                    dropdownOverlayStyle={{
                      minWidth: '150px',
                    }}
                    dropdownProps={{
                      getPopupContainer: (): HTMLElement => document.querySelector('.monthly-wrapper') || document.body,
                    }}
                    placeholder={intl.formatMessage({ id: PERIODS[0].translationKey })}
                    input={{
                      name: 'period',
                      maxLength: 120,
                    }}
                    dataSource={PERIODS.map(period => ({
                      checked: data[key]?.period === period.value,
                      text: intl.formatMessage({ id: period.name as string }),
                      onSelect: (): void => {
                        this.handleTypeChange(period.value as string, key);
                      },
                    }))}
                    size="small"
                  />

                  <S.DropdownLabel>
                    <FormattedMessage id="DS.DATE-RANGE-PICKER.COUNTED-FROM" />
                  </S.DropdownLabel>
                  <S.Select
                    expanded={false}
                    dropdownProps={{
                      getPopupContainer: (): HTMLElement => document.querySelector('.monthly-wrapper') || document.body,
                    }}
                    dropdownOverlayStyle={{
                      minWidth: '150px',
                    }}
                    placeholder={intl.formatMessage({ id: PERIODS_TYPE[0].translationKey })}
                    input={{
                      name: 'period-type',
                      maxLength: 120,
                    }}
                    dataSource={PERIODS_TYPE.map(i => ({
                      checked: data[key]?.periodType === i.value,
                      text: intl.formatMessage({ id: i.translationKey as string }),
                      onSelect: (): void => {
                        this.handlePeriodTypeChange(i.value as string, key);
                      },
                    }))}
                    size="small"
                  />
                </S.DropdownHeader>
              ),
              content: visible[item.id] ? (
                <S.ContentWrapper>
                  <TimeWindow
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${item.period}_${key}`}
                    title="Monthly title"
                    showSelectAll
                    invertibleTime
                    numberOfDaysPerRow={7}
                    days={item.definition}
                    onChange={(definition: string): void => this.handleDefinitionChange(definition, key)}
                    onRangeClear={onRangeClear}
                    onRangeCopy={onRangeCopy}
                    onRangePaste={onRangePaste}
                    rangeClipboard={rangeClipboard}
                    monthlyFilterPeriod={data[key].period}
                    {...this.getTimeWindowSettings(item)}
                    monthlyFilter
                  />
                </S.ContentWrapper>
              ) : (
                <div />
              ),
            }}
            texts={{
              itemActionDeleteTooltip: intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.REMOVE' }),
            }}
          />
        ))}
        <S.AddContainer>
          {value.length < MAX_RULES_ALLOWED && (
            <Button.Creator
              label={<FormattedMessage id="DS.DATE-RANGE-PICKER.ADD-RULE" />}
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

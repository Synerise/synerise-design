import * as React from 'react';
import { cloneDeep } from 'lodash';
import ButtonGroup from '@synerise/ds-button-group';
import { injectIntl } from 'react-intl';

import Button from '@synerise/ds-button';
import * as S from './RangeFilter.styles';
import { TYPES, TYPES_DATA } from './constants';
import { denormalizeValue, isValidValue, normalizeValue } from './utils';
import { FilterDefinition, FilterValue, RangeFilterProps, RangeFilterState } from './RangeFilter.types';
import FilterDropdown from './FilterDropdown/FilterDropdown';
import { NamedFilter } from './FilterDropdown/FilterDropdown.types';

class RangeFilter extends React.PureComponent<RangeFilterProps, RangeFilterState> {
  static defaultProps = {
    value: { type: TYPES.DAILY, ...TYPES_DATA.DAILY.definition },
  };

  constructor(props: RangeFilterProps) {
    super(props);
    const valueType = props?.value.type;
    this.state = {
      activeType: valueType,
      [String(valueType)]: { ...denormalizeValue(props.value) },
    } as RangeFilterState;
  }

  handleApply = (): void => {
    const { onApply } = this.props;
    const { activeType } = this.state;
    // eslint-disable-next-line react/destructuring-assignment
    const filter = this.state[String(activeType)];
    console.log('filter', normalizeValue(filter));
    onApply && onApply(normalizeValue(filter as FilterValue));
  };

  handleCancel = (): void => {
    const { onCancel } = this.props;
    onCancel && onCancel();
  };

  handleTypeChange = (type: string): void => {
    // eslint-disable-next-line react/destructuring-assignment
    const previousValue = this.state[type] as FilterValue;
    const previousDefinition = previousValue?.definition;
    this.setState({
      activeType: type,
      [type]: {
        type,
        definition: previousDefinition || cloneDeep(TYPES_DATA[type].definition),
        ...previousValue,
      } as FilterValue,
    });
  };
  handleRangeClear = (): void => {
    console.log('RANGE CLEARED');
    this.setState({rangeClipboard: undefined})
  };
  handleRangeCopy = (range: Partial<FilterDefinition>): void => {
    console.log('RANGE COPIED',range);
    this.setState({rangeClipboard: range})
  };
  render(): JSX.Element {
    const { activeType, rangeClipboard } = this.state;
    // eslint-disable-next-line react/destructuring-assignment
    const activeValue = this.state[activeType] as FilterValue;
    const { definition } = activeValue;
    const Component = activeType && TYPES_DATA[activeType] && TYPES_DATA[activeType].component;
    const { intl, savedFilters } = this.props;
    console.log('SAVED FILTERS', savedFilters);
    return (
      <S.Container>
        <S.Header>
          <S.Title>{intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.DATES_FILTER' })}</S.Title>
          {!!savedFilters?.length && (
            <FilterDropdown
              filters={savedFilters}
              onFilterSelect={(selected: NamedFilter): void => {
                this.setState({ activeType: selected.type, [selected.type]: { ...selected, definition: selected } });
              }}
              label={'Saved filters'}
            />
          )}
        </S.Header>
        <S.Body>
          <ButtonGroup fullWidth size="large">
            {Object.values(TYPES).map(key => (
              <Button
                key={key}
                type={activeType === key ? 'primary' : undefined}
                onClick={(): void => this.handleTypeChange(key)}
              >
                {intl.formatMessage({ id: TYPES_DATA[key].labelTranslationKey })}
              </Button>
            ))}
          </ButtonGroup>
          <S.MainComponentWrapper>
            {Component && (
              <Component
                intl={intl}
                value={definition}
                onChange={(def: FilterDefinition): void => {
                  this.setState({ [activeType]: { ...activeValue, definition: def } });
                }}
                onRangeClear={this.handleRangeClear}
                onRangeCopy={this.handleRangeCopy}
                rangeClipboard={rangeClipboard}
              />
            )}
          </S.MainComponentWrapper>
        </S.Body>
        <S.Footer>
          <Button type="ghost"> Save filter</Button>
          <S.FooterSeparator />
          <Button type="ghost" onClick={this.handleCancel}>
            {intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.CANCEL' })}
          </Button>
          <Button type="primary" disabled={!isValidValue(activeValue as FilterValue)} onClick={this.handleApply}>
            {intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.APPLY' })}
          </Button>
        </S.Footer>
      </S.Container>
    );
  }
}

export default injectIntl(RangeFilter);

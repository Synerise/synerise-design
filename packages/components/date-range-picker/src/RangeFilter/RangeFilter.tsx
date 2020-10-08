import * as React from 'react';
import { cloneDeep } from 'lodash';
import ButtonGroup from '@synerise/ds-button-group';
import { injectIntl } from 'react-intl';
import { v4 as uuid } from 'uuid';
import Button from '@synerise/ds-button';
import * as S from './RangeFilter.styles';
import { TYPES, TYPES_DATA } from './constants';
import { addSuffixToDuplicate, denormalizeValue, isValidValue, normalizeValue } from './utils';
import { FilterDefinition, FilterValue, RangeFilterProps, RangeFilterState } from './RangeFilter.types';
import FilterDropdown from './FilterDropdown/FilterDropdown';
import { SavedFilter } from './FilterDropdown/FilterDropdown.types';
import SaveFilterForm from './SaveFilterForm/SaveFilterForm';

class RangeFilter extends React.PureComponent<RangeFilterProps, RangeFilterState> {
  static defaultProps = {
    value: { type: TYPES.DAILY, ...TYPES_DATA.DAILY.definition },
  };

  constructor(props: RangeFilterProps) {
    super(props);
    const valueType = props?.value?.type;
    this.state = {
      activeType: valueType,
      [String(valueType)]: { ...denormalizeValue(props.value as FilterValue) },
    } as RangeFilterState;
  }

  handleApply = (): void => {
    const { state } = this;
    const { onApply } = this.props;
    const { activeType } = state;
    const filter = state[String(activeType)];
    onApply && onApply(normalizeValue(filter as FilterValue));
  };

  handleCancel = (): void => {
    const { onCancel } = this.props;
    onCancel && onCancel();
  };

  handleTypeChange = (type: string): void => {
    const { state } = this;
    const previousValue = state[type] as FilterValue;
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
    this.setState({ rangeClipboard: undefined });
  };

  handleRangeCopy = (range: Partial<FilterDefinition>): void => {
    this.setState({ rangeClipboard: range });
  };

  handleFilterSave = (filterName: string): void => {
    const { state } = this;
    const { activeType } = state;
    const { onFilterSave, savedFilters } = this.props;
    const currentFilter = state[activeType] as SavedFilter;
    const filterList = savedFilters || [];
    const filter = { ...currentFilter, type: activeType, name: filterName, id: uuid() };
    const filterWithUniqueName = addSuffixToDuplicate(filterList, filter);
    onFilterSave && onFilterSave([...filterList, filterWithUniqueName]);
  };

  handleSavedFilterRemove = (removedFilterId: string): void => {
    const { savedFilters, onFilterSave } = this.props;
    const listWithoutRemovedId = savedFilters ? savedFilters.filter(f => f.id !== removedFilterId) : [];
    onFilterSave && onFilterSave(listWithoutRemovedId);
  };

  handleSavedFilterSelect = (selected: SavedFilter): void => {
    this.setState({
      activeType: selected.type,
      [selected.type]: selected,
    });
  };

  render(): JSX.Element {
    const { state } = this;
    const { activeType, rangeClipboard } = state;
    const activeValue = state[activeType] as FilterValue;
    const { definition } = activeValue;
    const Component = activeType && TYPES_DATA[activeType] && TYPES_DATA[activeType].component;
    const { intl, savedFilters } = this.props;
    return (
      <S.Container>
        <S.Header>
          <S.Title>{intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.DATES_FILTER' })}</S.Title>
          {!!savedFilters?.length && (
            <FilterDropdown
              filters={savedFilters}
              onFilterSelect={this.handleSavedFilterSelect}
              onFilterRemove={this.handleSavedFilterRemove}
              label="Saved filters"
              removeTooltip="Remove"
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
          <SaveFilterForm onFilterSave={this.handleFilterSave} />
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

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default injectIntl(RangeFilter);

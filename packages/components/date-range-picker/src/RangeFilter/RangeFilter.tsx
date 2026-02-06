import cloneDeep from 'lodash.clonedeep';
import React from 'react';
import { injectIntl } from 'react-intl';
import { v4 as uuid } from 'uuid';

import Button from '@synerise/ds-button';
import ButtonGroup from '@synerise/ds-button-group';

import {
  type Translations,
  type TranslationsPlaceholders,
} from '../DateRangePicker.types';
import { getDefaultTexts } from '../utils';
import * as S from './RangeFilter.styles';
import {
  type FilterDefinition,
  type FilterValue,
  type RangeFilterProps,
  type RangeFilterState,
} from './RangeFilter.types';
import FilterDropdown from './Shared/FilterDropdown/FilterDropdown';
import { type SavedFilter } from './Shared/FilterDropdown/FilterDropdown.types';
import SaveFilterForm from './Shared/SaveFilterForm/SaveFilterForm';
import { type RangeFilterType, TYPES, TYPES_DATA } from './constants';
import {
  addSuffixToDuplicate,
  denormalizeValue,
  isValidValue,
  normalizeValue,
} from './utils';

class RangeFilter extends React.PureComponent<
  RangeFilterProps,
  RangeFilterState
> {
  static defaultProps = {
    value: { type: TYPES.DAILY, ...TYPES_DATA.DAILY.definition },
  };

  constructor(props: RangeFilterProps) {
    super(props);
    const allowedFilterTypes = props?.allowedFilterTypes?.length
      ? props?.allowedFilterTypes
      : Object.keys(TYPES);
    const valueType =
      props?.value?.type && allowedFilterTypes.includes(props?.value?.type)
        ? props?.value?.type
        : allowedFilterTypes[0];
    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      activeType: valueType,
      [String(valueType)]: { ...denormalizeValue(props.value as FilterValue) },
    } as RangeFilterState;
  }

  componentDidUpdate = (): void => {
    const { state } = this;
    const { allowedFilterTypes } = this.props;
    const { activeType } = state;
    if (
      allowedFilterTypes?.length &&
      !allowedFilterTypes.includes(activeType)
    ) {
      this.handleTypeChange(allowedFilterTypes[0]);
    }
  };

  handleApply = (): void => {
    const { state } = this;
    const { onApply } = this.props;
    const { activeType } = state;
    const filter = state[String(activeType)];
    onApply && onApply(normalizeValue(filter as FilterValue) as FilterValue);
  };

  handleCancel = (): void => {
    const { onCancel } = this.props;
    onCancel && onCancel();
  };

  handleTypeChange = (type: RangeFilterType): void => {
    const { state } = this;
    const previousValue = state[type] as FilterValue;
    const previousDefinition = previousValue?.definition;
    this.setState({
      activeType: type,
      [type]: {
        definition:
          previousDefinition || cloneDeep(TYPES_DATA[type].definition),
        ...previousValue,
        type,
      } as FilterValue,
    });
  };

  handleRangeCopy = (range?: Partial<FilterDefinition>): void => {
    this.setState({ rangeClipboard: range });
  };

  handleFilterSave = (filterName: string): void => {
    const { state } = this;
    const { activeType } = state;
    const { onFilterSave, savedFilters } = this.props;
    const currentFilter = state[activeType] as SavedFilter;
    const filterList = savedFilters || [];
    const filter = {
      ...currentFilter,
      type: activeType,
      name: filterName,
      id: uuid(),
    };
    const filterWithUniqueName = addSuffixToDuplicate(filterList, filter);
    onFilterSave && onFilterSave([...filterList, filterWithUniqueName]);
  };

  handleSavedFilterRemove = (removedFilterId: string): void => {
    const { savedFilters, onFilterSave } = this.props;
    const listWithoutRemovedId = savedFilters
      ? savedFilters.filter((f) => f.id !== removedFilterId)
      : [];
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
    const Component =
      activeType && TYPES_DATA[activeType] && TYPES_DATA[activeType].component;
    const {
      intl,
      savedFilters,
      onFilterSave,
      texts,
      hideFooter,
      valueSelectionModes,
      allowedFilterTypes,
      rangeDisplayMode,
    } = this.props;

    const allTexts = getDefaultTexts(intl, false, texts);

    const buttonSource: RangeFilterType[] = allowedFilterTypes?.length
      ? allowedFilterTypes
      : (Object.values(TYPES) as RangeFilterType[]);
    buttonSource.sort((a: RangeFilterType, b: RangeFilterType) => {
      return Object.values(TYPES).indexOf(a) < Object.values(TYPES).indexOf(b)
        ? -1
        : 1;
    });
    return (
      <S.Container>
        <S.Header>
          <S.Title>{allTexts.datesFilter}</S.Title>
          {!!savedFilters?.length && (
            <FilterDropdown
              filters={savedFilters}
              onFilterSelect={this.handleSavedFilterSelect}
              onFilterRemove={this.handleSavedFilterRemove}
              label={allTexts.savedFiltersTrigger}
              removeTooltip={allTexts.remove}
            />
          )}
        </S.Header>
        <S.Body>
          {buttonSource.length > 1 && (
            <ButtonGroup fullWidth size="large">
              {buttonSource.map((key) => (
                <Button
                  key={key}
                  type={activeType === key ? 'primary' : undefined}
                  onClick={() => this.handleTypeChange(key)}
                >
                  {
                    allTexts[
                      key.toLowerCase() as
                        | Translations
                        | TranslationsPlaceholders
                    ]
                  }
                </Button>
              ))}
            </ButtonGroup>
          )}
          <S.MainComponentWrapper>
            {Component && (
              <Component
                intl={intl}
                texts={allTexts}
                rangeDisplayMode={rangeDisplayMode}
                // @ts-expect-error - requires type refactor
                value={definition}
                // @ts-expect-error - requires type refactor
                onChange={(def: FilterDefinition): void => {
                  const updatedFilter = {
                    [activeType]: { ...activeValue, definition: def },
                  };
                  this.setState(updatedFilter);
                }}
                onRangeCopy={this.handleRangeCopy}
                // @ts-expect-error - requires type refactor
                rangeClipboard={rangeClipboard}
                // @ts-expect-error - requires type refactor
                valueSelectionModes={valueSelectionModes}
              />
            )}
          </S.MainComponentWrapper>
        </S.Body>
        {!hideFooter && (
          <S.Footer data-testid="range-filter-footer">
            {savedFilters && onFilterSave && (
              <SaveFilterForm
                texts={allTexts}
                onFilterSave={this.handleFilterSave}
              />
            )}
            <S.FooterSeparator />
            <Button
              data-testid="range-filter-cancel-button"
              type="ghost"
              onClick={this.handleCancel}
            >
              {allTexts.cancel}
            </Button>
            <Button
              data-testid="range-filter-apply-button"
              type="primary"
              disabled={!isValidValue(activeValue)}
              onClick={this.handleApply}
            >
              {allTexts.apply}
            </Button>
          </S.Footer>
        )}
      </S.Container>
    );
  }
}

// @ts-ignore
export default injectIntl(RangeFilter);

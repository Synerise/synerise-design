import React, { type ReactElement } from 'react';
import { injectIntl } from 'react-intl';

import Button from '@synerise/ds-button';
import ButtonGroup from '@synerise/ds-button-group';
import { generateUuid } from '@synerise/ds-utils';

import type {
  Translations,
  TranslationsPlaceholders,
} from '../DateRangePicker.types';
import { getDefaultTexts } from '../utils';
import { type FilterAdapter, filterAdapter } from './adapters';
import {
  DEFAULT_RANGE_END,
  DEFAULT_RANGE_START,
  type RangeFilterType,
  TYPES,
} from './constants';
import * as S from './RangeFilter.styles';
import type {
  FilterValue,
  RangeFilterDaily,
  RangeFilterProps,
  RangeFilterState,
  RangeFilterValue,
} from './RangeFilter.types';
import FilterDropdown from './Shared/FilterDropdown/FilterDropdown';
import type { SavedFilter } from './Shared/FilterDropdown/FilterDropdown.types';
import SaveFilterForm from './Shared/SaveFilterForm/SaveFilterForm';
import { addSuffixToDuplicate } from './utils';

const DEFAULT_VALUE: RangeFilterDaily = {
  type: TYPES.DAILY,
  nestingType: 'IN_PLACE',
  from: DEFAULT_RANGE_START,
  to: DEFAULT_RANGE_END,
  inverted: false,
};

const toEditorValue = (value: RangeFilterValue): FilterValue =>
  filterAdapter(value.type).toEditor(value);

const fromEditorValue = (value: FilterValue): RangeFilterValue =>
  filterAdapter(value.type).fromEditor(value);

const isValidEditorValue = (value?: FilterValue): boolean =>
  value ? filterAdapter(value.type).isValid(value) : true;

const TYPE_ORDER = Object.values(TYPES);

const filterState = (filter: FilterValue) =>
  ({ [filter.type]: filter }) as Pick<RangeFilterState, RangeFilterType>;

class RangeFilter extends React.PureComponent<
  RangeFilterProps,
  RangeFilterState
> {
  constructor(props: RangeFilterProps) {
    super(props);
    const allowedFilterTypes = props?.allowedFilterTypes?.length
      ? props?.allowedFilterTypes
      : (Object.keys(TYPES) as RangeFilterType[]);
    const value = props.value ?? DEFAULT_VALUE;
    const valueType = allowedFilterTypes.includes(value.type)
      ? value.type
      : allowedFilterTypes[0];
    // A value of a type that is not allowed is kept under the first allowed type.
    this.state = {
      activeType: valueType,
      [valueType]: toEditorValue(value),
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
    const filter = state[activeType];
    onApply && filter && onApply(fromEditorValue(filter));
  };

  handleCancel = (): void => {
    const { onCancel } = this.props;
    onCancel && onCancel();
  };

  handleTypeChange = (type: RangeFilterType): void => {
    const { state } = this;
    const previousValue = state[type];
    this.setState({
      activeType: type,
      ...filterState(
        previousValue
          ? ({ ...previousValue, type } as FilterValue)
          : filterAdapter(type).defaultValue(),
      ),
    });
  };

  handleRangeCopy = (range?: RangeFilterState['rangeClipboard']): void => {
    this.setState({ rangeClipboard: range });
  };

  handleFilterSave = (filterName: string): void => {
    const { state } = this;
    const { activeType } = state;
    const { onFilterSave, savedFilters } = this.props;
    const currentFilter = state[activeType];
    const filterList = savedFilters || [];
    if (!currentFilter) {
      return;
    }
    const filter: SavedFilter = {
      ...fromEditorValue(currentFilter),
      name: filterName,
      id: generateUuid(),
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

  handleSavedFilterSelect = ({ id, name, ...value }: SavedFilter): void => {
    this.setState({
      activeType: value.type,
      ...filterState(toEditorValue(value)),
    });
  };

  render(): ReactElement {
    const { state } = this;
    const { activeType, rangeClipboard } = state;
    const activeValue = state[activeType];
    const definition = activeValue?.definition;
    // The active value can hold another type's definition: a stored value of a type that is not allowed.
    const { component: Editor, editorProps } = filterAdapter(
      activeType,
    ) as FilterAdapter<RangeFilterType>;
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

    const buttonSource = [
      ...(allowedFilterTypes?.length ? allowedFilterTypes : TYPE_ORDER),
    ].sort((a, b) => (TYPE_ORDER.indexOf(a) < TYPE_ORDER.indexOf(b) ? -1 : 1));
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
            {activeValue && definition && (
              <Editor
                {...editorProps({
                  intl,
                  texts: allTexts,
                  rangeDisplayMode,
                  valueSelectionModes,
                  rangeClipboard,
                  onRangeCopy: this.handleRangeCopy,
                })}
                value={definition}
                onChange={(def) => {
                  this.setState(
                    filterState({
                      ...activeValue,
                      definition: def,
                    } as FilterValue),
                  );
                }}
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
              disabled={!isValidEditorValue(activeValue)}
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

export default injectIntl(RangeFilter);

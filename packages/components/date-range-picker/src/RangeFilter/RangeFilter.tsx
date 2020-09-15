import * as React from 'react';
import { cloneDeep } from 'lodash';
import ButtonGroup from '@synerise/ds-button-group';
import { injectIntl } from 'react-intl';

import Button from '@synerise/ds-button';
import * as S from './RangeFilter.styles';
import { TYPES, TYPES_DATA } from './constants';
import { denormalizeValue, isValidValue, normalizeValue } from './utils';
import { FilterDefinition, FilterValue, RangeFilterProps, RangeFilterState } from './RangeFilter.types';

class RangeFilter extends React.PureComponent<RangeFilterProps, RangeFilterState> {
  static defaultProps = {
    value: { type: TYPES.DAILY, ...TYPES_DATA.DAILY.definition },
  };

  constructor(props: RangeFilterProps) {
    super(props);
    this.state = { value: denormalizeValue(props.value) };
  }

  componentWillReceiveProps(props: RangeFilterProps): void {
    this.setValue(denormalizeValue(props.value) as FilterValue);
  }

  handleApply = (): void => {
    const { onApply } = this.props;
    const { value } = this.state;
    onApply && onApply(normalizeValue(value as FilterValue));
  };

  handleCancel = (): void => {
    const { onCancel } = this.props;
    onCancel && onCancel();
  };

  handleTypeChange = (type: string): void =>
    this.setValue({ type, definition: cloneDeep(TYPES_DATA[type].definition) } as FilterValue);

  setValue = (value: FilterValue): void => this.setState({ value });

  render(): JSX.Element {
    const { value } = this.state;
    const { type, definition } = value;
    const Component = type && TYPES_DATA[type] && TYPES_DATA[type].component;
    const { intl } = this.props;

    return (
      <S.Container>
        <S.Header>
          <S.Title>{intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.DATES_FILTER' })}</S.Title>
        </S.Header>
        <S.Body>
          <ButtonGroup fullWidth style={{ marginBottom: 16 }} size="large">
            {Object.values(TYPES).map(key => (
              <Button
                key={key}
                type={value.type === key ? 'primary' : undefined}
                onClick={(): void => this.handleTypeChange(key)}
              >
                {intl.formatMessage({ id: TYPES_DATA[key].labelTranslationKey })}
              </Button>
            ))}
          </ButtonGroup>
          {Component && (
            <Component
              intl={intl}
              value={definition}
              onChange={(def: FilterDefinition): void => this.setValue({ ...value, definition: def } as FilterValue)}
            />
          )}
        </S.Body>
        <S.Footer>
          <Button onClick={this.handleCancel}>{intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.CANCEL' })}</Button>
          <Button type="primary" disabled={!isValidValue(value as FilterValue)} onClick={this.handleApply}>
            {intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.APPLY' })}
          </Button>
        </S.Footer>
      </S.Container>
    );
  }
}

export default injectIntl(RangeFilter);

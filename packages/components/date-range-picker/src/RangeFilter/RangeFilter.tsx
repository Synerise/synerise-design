import * as React from 'react';
import cloneDeep from 'lodash/cloneDeep';
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
    this.setValue(denormalizeValue(props.value));
  }

  handleApply = (): void => {
    const { onApply } = this.props;
    const { value } = this.state;
    onApply && onApply(normalizeValue(value));
  };

  handleCancel = (): void => {
    const { onCancel } = this.props;
    onCancel && onCancel();
  };

  handleTypeChange = (type: string): void =>
    this.setValue({ type, definition: cloneDeep(TYPES_DATA[type].definition) });

  setValue = (value: FilterValue): void => this.setState({ value });

  render(): JSX.Element {
    const { value } = this.state;
    const { type, definition } = value;
    const Component = type && TYPES_DATA[type] && TYPES_DATA[type].component;
    const { intl } = this.props;

    return (
      <S.Container>
        <S.Header>
          <S.Title>{intl.formatMessage({ id: 'SNRS.DATE.DATES_FILTER' })}</S.Title>
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
              onChange={(def: FilterDefinition): void => this.setValue({ ...value, definition: def })}
            />
          )}
        </S.Body>
        <S.Footer>
          <Button onClick={this.handleCancel}>{intl.formatMessage({ id: 'SNRS.ACTIONS.CANCEL' })}</Button>
          <Button type="primary" disabled={!isValidValue(value)} onClick={this.handleApply}>
            {intl.formatMessage({ id: 'SNRS.ACTIONS.APPLY' })}
          </Button>
        </S.Footer>
      </S.Container>
    );
  }
}

export default injectIntl(RangeFilter);

import * as React from 'react';
import { useIntl } from 'react-intl';

import Button from '@synerise/ds-button';
import { getPopupContainer } from '@synerise/ds-utils';
import Icon, { AngleDownS } from '@synerise/ds-icon';
import Dropdown from '@synerise/ds-dropdown';
import Tooltip from '@synerise/ds-tooltip';

import OperatorsDropdown from './OperatorsDropdown/OperatorsDropdown';
import { OperatorsItem, OperatorsProps } from './Operator.types';
import * as S from './Operators.style';

const Operators: React.FC<OperatorsProps> = ({
  value,
  onChange,
  groups,
  items,
  texts,
  opened,
  getPopupContainerOverride,
  onActivate,
  onDeactivate,
  readOnly = false,
  errorText,
}) => {
  const { formatMessage } = useIntl();
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const text = React.useMemo(
    () => ({
      buttonLabel: formatMessage({ id: 'DS.OPERATORS.BUTTON_LABEL', defaultMessage: 'Choose' }),
      searchPlaceholder: formatMessage({ id: 'DS.OPERATORS.SEARCH_PLACEHOLDER', defaultMessage: 'Search' }),
      noResults: formatMessage({ id: 'DS.OPERATORS.NO_RESULTS', defaultMessage: 'No results' }),
      ...texts,
    }),
    [texts, formatMessage]
  );
  const handleChange = React.useCallback(
    val => {
      onChange(val);
    },
    [onChange]
  );

  React.useEffect(() => {
    setDropdownVisible(Boolean(opened));
    if (opened) {
      onActivate && onActivate();
    }
  }, [onActivate, opened]);

  const handleClick = React.useCallback(() => {
    onActivate && onActivate();
    setDropdownVisible(true);
  }, [onActivate]);

  const onDropdownVisibilityChange = React.useCallback(
    (newValue: boolean) => {
      newValue && onActivate && onActivate();
      !newValue && onDeactivate && onDeactivate();
    },
    [onActivate, onDeactivate]
  );

  const triggerMode = React.useMemo(() => {
    if (value) {
      return readOnly ? 'icon-label' : 'two-icons';
    }

    return readOnly ? 'simple' : 'label-icon';
  }, [value, readOnly]);

  const dropdownTrigger = (
    <Tooltip
      getPopupContainer={getPopupContainerOverride || getPopupContainer}
      title={(value as OperatorsItem)?.name || ''}
      trigger={['hover']}
    >
      <Button
        error={Boolean(errorText)}
        type="secondary"
        mode={triggerMode}
        onClick={!readOnly ? handleClick : undefined}
        readOnly={readOnly}
      >
        {value && <Icon component={(value as OperatorsItem).icon} />}
        <S.Value>{value ? (value as OperatorsItem).name : text.buttonLabel}</S.Value>
        {!readOnly && <Icon component={<AngleDownS />} />}
      </Button>
    </Tooltip>
  );

  const content = readOnly ? (
    dropdownTrigger
  ) : (
    <Dropdown
      visible={dropdownVisible}
      onVisibleChange={onDropdownVisibilityChange}
      getPopupContainer={getPopupContainerOverride || getPopupContainer}
      overlay={
        <OperatorsDropdown
          value={value}
          setDropdownVisible={setDropdownVisible}
          setSelected={handleChange}
          groups={groups}
          items={items}
          texts={text}
        />
      }
    >
      {dropdownTrigger}
    </Dropdown>
  );

  return content;
};
export default Operators;

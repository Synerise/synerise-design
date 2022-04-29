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

  return (
    <div data-popup-container>
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
        <Tooltip
          getPopupContainer={getPopupContainerOverride || getPopupContainer}
          title={(value as OperatorsItem)?.name || ''}
          trigger={['hover']}
        >
          <Button type="secondary" mode={value ? 'two-icons' : 'label-icon'} onClick={handleClick}>
            {value && <Icon component={(value as OperatorsItem).icon} />}
            <S.Value>{value ? (value as OperatorsItem).name : text.buttonLabel}</S.Value>
            <Icon component={<AngleDownS />} />
          </Button>
        </Tooltip>
      </Dropdown>
    </div>
  );
};
export default Operators;

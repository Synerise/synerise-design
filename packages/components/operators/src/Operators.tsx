import * as React from 'react';
import { useIntl } from 'react-intl';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
import Dropdown from '@synerise/ds-dropdown';
import OperatorsDropdown from './OperatorsDropdown/OperatorsDropdown';
import { OperatorsItem, OperatorsProps } from './Operator.types';

const Operators: React.FC<OperatorsProps> = ({ value, onChange, groups, items, texts, opened }) => {
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
    if (opened) {
      setDropdownVisible(true);
    }
  }, [opened]);

  return (
    <Dropdown
      visible={dropdownVisible}
      overlay={
        <OperatorsDropdown
          value={value}
          setDropdownVisible={setDropdownVisible}
          setSelected={handleChange}
          groups={groups}
          items={items}
          texts={text}
          visible={dropdownVisible}
        />
      }
    >
      <Button type="secondary" mode="label-icon" onClick={(): void => setDropdownVisible(true)}>
        {value ? (value as OperatorsItem).name : text.buttonLabel}
        <Icon component={<AngleDownS />} />
      </Button>
    </Dropdown>
  );
};
export default Operators;

import * as React from 'react';
import { useIntl } from 'react-intl';

import Button from '@synerise/ds-button';
import Icon, { AngleDownS } from '@synerise/ds-icon';
import Dropdown from '@synerise/ds-dropdown';
import Tooltip from '@synerise/ds-tooltip';

import OperatorsDropdown from './OperatorsDropdown/OperatorsDropdown';
import { OperatorsItem, OperatorsProps } from './Operator.types';
import * as S from './Operators.style';

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
        />
      }
    >
      <Tooltip title={(value as OperatorsItem)?.name || ''} trigger={['hover']}>
        <Button type="secondary" mode="label-icon" onClick={(): void => setDropdownVisible(true)}>
          <S.Value>{value ? (value as OperatorsItem).name : text.buttonLabel}</S.Value>
          <Icon component={<AngleDownS />} />
        </Button>
      </Tooltip>
    </Dropdown>
  );
};
export default Operators;

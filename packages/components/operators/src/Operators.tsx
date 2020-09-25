import * as React from 'react';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
import Dropdown from '@synerise/ds-dropdown';
import OperatorsDropdown from './OperatorsDropdown/OperatorsDropdown';
import { OperatorsItem, OperatorsProps } from './Operator.types';

const Operators: React.FC<OperatorsProps> = ({ value, onChange, groups, items, texts, opened }) => {
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
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
          texts={texts}
          visible={dropdownVisible}
        />
      }
    >
      <Button type="secondary" mode="label-icon" onClick={(): void => setDropdownVisible(true)}>
        {value ? (value as OperatorsItem).name : texts.buttonLabel}
        <Icon component={<AngleDownS />} />
      </Button>
    </Dropdown>
  );
};
export default Operators;

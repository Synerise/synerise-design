import * as React from 'react';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
import Dropdown from '@synerise/ds-dropdown';
import OperatorsDropdown from './OperatorsDropdown/OperatorsDropdown';
import { OperatorsItem, OperatorsProps } from './Operator.types';

const Operators: React.FC<OperatorsProps> = ({ value, onChange, groups, items }) => {
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const handleChange = React.useCallback(
    val => {
      onChange(val);
    },
    [onChange]
  );

  return (
    <Dropdown
      visible={dropdownVisible}
      overlay={
        <OperatorsDropdown
          setDropdownVisible={setDropdownVisible}
          setSelected={handleChange}
          groups={groups}
          items={items}
        />
      }
    >
      <Button type="secondary" mode="label-icon" onClick={(): void => setDropdownVisible(true)}>
        {(value as OperatorsItem).name || 'Choose'}
        <Icon component={<AngleDownS />} />
      </Button>
    </Dropdown>
  );
};
export default Operators;

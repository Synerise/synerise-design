import * as React from 'react';
import { FilterDropdownProps } from './FilterDropdown.types';
import Button from '@synerise/ds-button';
import Dropdown from '@synerise/ds-dropdown';
import Icon from '@synerise/ds-icon';
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
import Menu from '@synerise/ds-menu';

const FilterDropdown: React.FC<FilterDropdownProps> = ({ label, filters, onFilterSelect }) => {
  const overlay = React.useMemo(
    () => (
      <Menu>
        {filters.map(filter => (
          <Menu.Item
            onSelect={(): void => {
              onFilterSelect && onFilterSelect(filter);
            }}
          >
            {JSON.stringify(filter)}
          </Menu.Item>
        ))}
      </Menu>
    ),
    [filters]
  );
  return (
    <Dropdown overlay={overlay} trigger={['click']}>
      <Button mode="label-icon" type="ghost">
        <span>{label}</span>
        <Icon component={<AngleDownS />} />
      </Button>
    </Dropdown>
  );
};

export default FilterDropdown;

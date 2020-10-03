import * as React from 'react';
import { FilterDropdownProps } from './FilterDropdown.types';
import Button from '@synerise/ds-button';
import Dropdown from '@synerise/ds-dropdown';
import Icon from '@synerise/ds-icon';
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
import * as S from './FilterDropdown.styles';

const FilterDropdown: React.FC<FilterDropdownProps> = ({ label, filters, onFilterSelect }) => {
  const overlay = React.useMemo(
    () => (
      <S.DropdownMenu>
        {filters.map(filter => (
          <S.DropdownMenuItem
            key={filter?.name}
            text={filter.type}
            onClick={(): void => {
              onFilterSelect && onFilterSelect(filter);
            }}
           />
        ))}
      </S.DropdownMenu>
    ),
    [filters]
  );
  return (
    <Dropdown overlay={overlay} trigger={['click']} overlayStyle={{ boxShadow: '0 4px 12px 0 rgba(35, 41, 54, 0.07)' }}>
      <Button mode="label-icon" type="ghost">
        <span>{label}</span>
        <Icon component={<AngleDownS />} />
      </Button>
    </Dropdown>
  );
};

export default FilterDropdown;

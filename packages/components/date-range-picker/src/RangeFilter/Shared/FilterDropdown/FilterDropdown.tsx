import React from 'react';

import Button from '@synerise/ds-button';
import { theme } from '@synerise/ds-core';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { AngleDownS, TrashS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import * as S from './FilterDropdown.styles';
import { type FilterDropdownProps } from './FilterDropdown.types';

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  removeTooltip,
  label,
  filters,
  onFilterSelect,
  onFilterRemove,
}) => {
  const overlay = React.useMemo(
    () => (
      <S.DropdownMenu>
        {filters.map((filter) => (
          <S.DropdownMenuItem
            key={filter?.name}
            text={filter?.name}
            onClick={(): void => {
              onFilterSelect && onFilterSelect(filter);
            }}
            suffixel={
              <Tooltip title={removeTooltip}>
                <S.RemoveIconWrapper
                  onClick={(): void => {
                    onFilterRemove && onFilterRemove(filter?.id);
                  }}
                >
                  <Icon
                    component={<TrashS />}
                    color={theme.palette['red-600']}
                  />
                </S.RemoveIconWrapper>
              </Tooltip>
            }
          />
        ))}
      </S.DropdownMenu>
    ),
    [filters, onFilterRemove, onFilterSelect, removeTooltip],
  );
  return (
    <Dropdown
      overlay={overlay}
      trigger={['click']}
      align={{ points: ['tr', 'br'] }}
      overlayStyle={{ boxShadow: '0 4px 12px 0 rgba(35, 41, 54, 0.07)' }}
      getPopupContainer={(node): HTMLElement =>
        node.parentElement !== null ? node.parentElement : document.body
      }
    >
      <Button mode="label-icon" type="ghost">
        <span>{label}</span>
        <Icon component={<AngleDownS />} />
      </Button>
    </Dropdown>
  );
};

export default FilterDropdown;

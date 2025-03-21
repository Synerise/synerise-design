import React from 'react';
import Icon, { SearchM } from '@synerise/ds-icon';
import { useTheme } from '@synerise/ds-core';
import Dropdown from '@synerise/ds-dropdown';
import { OverlayType } from './Overlay.types';
import List from '../List/List';

const Overlay = ({
  value,
  onSearchChange,
  onClearInput,
  placeholder,
  onSelect,
  data,
  focus,
  noResultMsg,
}: OverlayType) => {
  const theme = useTheme()
  return (
    <>
      <Dropdown.SearchInput
        onSearchChange={onSearchChange}
        onClearInput={onClearInput}
        placeholder={placeholder}
        value={value}
        autofocus={focus}
        iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
      />
      <List onSelect={onSelect} data={data} noResultMsg={noResultMsg} />
    </>
  );
};

export default Overlay;

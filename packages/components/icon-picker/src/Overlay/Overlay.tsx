import React from 'react';
import Icon, { SearchM } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import Dropdown from '@synerise/ds-dropdown/dist/Dropdown';
import { OverlayTypes } from './Overlay.types';
import List from '../List/List';

const Overlay: React.FC<OverlayTypes> = ({
  value,
  onSearchChange,
  onClearInput,
  placeholder,
  onSelect,
  data,
  focus,
  noResultMsg,
}) => {
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

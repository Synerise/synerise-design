import React from 'react';

import { useTheme } from '@synerise/ds-core';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { SearchM } from '@synerise/ds-icon';

import { type SourceType } from '../../IconPicker.types';
import List from '../List/List';
import { type OverlayType } from './Overlay.types';

const Overlay = <Source extends SourceType>({
  value,
  onSearchChange,
  onClearInput,
  placeholder,
  onSelect,
  data,
  focus,
  noResultMsg,
}: OverlayType<Source>) => {
  const theme = useTheme();
  return (
    <>
      <Dropdown.SearchInput
        onSearchChange={onSearchChange}
        onClearInput={onClearInput}
        placeholder={placeholder}
        value={value}
        autofocus={focus}
        iconLeft={
          <Icon component={<SearchM />} color={theme.palette['grey-600']} />
        }
      />
      <List onSelect={onSelect} data={data} noResultMsg={noResultMsg} />
    </>
  );
};

export default Overlay;

import * as React from 'react';
import Icon from '@synerise/ds-icon/dist/Icon';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Dropdown from '@synerise/ds-dropdown/dist/Dropdown';
import { OverlayTypes } from './Overlay.types';

const Overlay: React.FC<OverlayTypes> = ({ value, onSearchChange, onClearInput, placeholder }) => {
  return (
    <Dropdown.SearchInput
      onSearchChange={onSearchChange}
      onClearInput={onClearInput}
      placeholder={placeholder}
      value={value}
      iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
      autofocus
    />
  );
};

export default Overlay;

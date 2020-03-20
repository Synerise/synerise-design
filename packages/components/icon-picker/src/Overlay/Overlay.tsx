import * as React from 'react';
import Icon from '@synerise/ds-icon/dist/Icon';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
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
      <List onSelect={onSelect} data={data} />
    </>
  );
};

export default Overlay;

// @ts-nocheck
import figma from '@figma/code-connect';

import SearchBar from './SearchBar';

const SEARCH_BAR_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=304-4822&m=dev';

figma.connect(SearchBar, SEARCH_BAR_URL, {
  variant: { State: 'Default' },
  props: {
    placeholder: figma.string('^Placeholder.Search'),
    iconLeft: figma.instance('Icon'),
  },
  example: ({ placeholder, iconLeft }) => (
    <SearchBar
      value=""
      placeholder={placeholder}
      iconLeft={iconLeft}
      onSearchChange={() => {}}
    />
  ),
});

figma.connect(SearchBar, SEARCH_BAR_URL, {
  variant: { State: 'Focused Filled' },
  props: {
    placeholder: figma.string('^Placeholder.Search'),
    iconLeft: figma.instance('Icon'),
  },
  example: ({ placeholder, iconLeft }) => (
    <SearchBar
      value={placeholder}
      placeholder="Search"
      iconLeft={iconLeft}
      onSearchChange={() => {}}
      onClearInput={() => {}}
    />
  ),
});

figma.connect(SearchBar, SEARCH_BAR_URL, {
  variant: { State: 'Disabled' },
  props: {
    placeholder: figma.string('^Placeholder.Search'),
    iconLeft: figma.instance('Icon'),
  },
  example: ({ placeholder, iconLeft }) => (
    <SearchBar
      value=""
      placeholder={placeholder}
      iconLeft={iconLeft}
      onSearchChange={() => {}}
      disabled
    />
  ),
});

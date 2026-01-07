import { Meta, StoryObj } from '@storybook/react-webpack5';
import type { ItemPickerProps } from '@synerise/ds-item-picker';

import type { StoryPropsOverlay } from '../ItemPicker.types';
import {
  playActionsAllStory,
  playActionsFolderStory,
  playActionsSectionStory,
  playKeyboardBackStory,
  playKeyboardEscapeClearSearchStory,
  playNestedFoldersSearchResultsShowMoreClickedStory,
  playNestedFoldersSearchResultsShowMoreStory,
  playNestedFoldersSearchResultsStory,
  playNestedFoldersSelectedFolderSearchResultsStory,
  playNestedFoldersSelectedFolderStory,
  playSearchResultsEmptyStory,
  playSearchResultsMultipleSections,
  playSearchResultsSelectedFolderEmptyStory,
  playSearchResultsStory,
  playSelectedFolderSearchResultsStory,
  playSelectedSection,
  playSelectedSectionSearchResultsStory,
} from './ItemPickerList.data';
import ItemPickerMeta, {
  FlatItems,
  Sections,
  SectionsAndFolders,
  SectionsAndNestedFolders,
} from './ItemPickerList.stories';

export default {
  ...ItemPickerMeta,
  title: 'Components/Pickers/ItemPicker/List With Predefined Items/Tests',
  tags: ['visualtests'],
} as Meta<ItemPickerProps>;

export const SearchResults: StoryObj<StoryPropsOverlay> = {
  ...FlatItems,
  parameters: {
    testGoal: 'snapshot flat list search results',
  },
  play: playSearchResultsStory,
};

export const SearchResultsEmpty: StoryObj<StoryPropsOverlay> = {
  ...FlatItems,
  parameters: {
    testGoal: 'snapshot empty search results',
  },
  play: playSearchResultsEmptyStory,
};

export const KeyboardEscapeClearSearch: StoryObj<StoryPropsOverlay> = {
  ...FlatItems,
  parameters: {
    testGoal: 'test keyboard shortcut ESC',
  },
  play: playKeyboardEscapeClearSearchStory,
};

export const KeyboardBack: StoryObj<StoryPropsOverlay> = {
  ...SectionsAndFolders,
  parameters: {
    testGoal: 'test keyboard shortcut BACK',
  },
  play: playKeyboardBackStory,
};

export const ActionsAll: StoryObj<StoryPropsOverlay> = {
  ...FlatItems,
  parameters: {
    testGoal: 'snapshot listing actions in default view',
    expectedResults: 3,
  },
  play: playActionsAllStory,
};

export const ActionsInSection: StoryObj<StoryPropsOverlay> = {
  ...Sections,
  args: {
    ...Sections.args,
    recents: undefined,
  },
  parameters: {
    testGoal: 'snapshot listing actions in section view',
    expectedResults: 3,
  },
  play: playActionsSectionStory,
};
export const ActionsInFolder: StoryObj<StoryPropsOverlay> = {
  ...SectionsAndFolders,
  args: {
    ...SectionsAndFolders.args,
    recents: undefined,
  },
  parameters: {
    testGoal: 'snapshot listing actions in folder view',
    expectedResults: 3,
  },
  play: playActionsFolderStory,
};

export const SearchResultsMultipleSections: StoryObj<StoryPropsOverlay> = {
  ...Sections,
  parameters: {
    testGoal: 'snapshot search results in sections',
    expectedResults: 2,
  },
  play: playSearchResultsMultipleSections,
};

export const SelectedSection: StoryObj<StoryPropsOverlay> = {
  ...Sections,
  args: {
    ...Sections.args,
    recents: undefined,
  },
  parameters: {
    testGoal: 'snapshot items in specific section',
  },
  play: playSelectedSection,
};

export const SelectedSectionSearchResults: StoryObj<StoryPropsOverlay> = {
  ...Sections,
  args: {
    ...Sections.args,
    recents: undefined,
  },
  parameters: {
    testGoal: 'snapshot search results in specific section',
  },
  play: playSelectedSectionSearchResultsStory,
};

export const SearchResultsFolders: StoryObj<StoryPropsOverlay> = {
  ...SectionsAndFolders,
  parameters: {
    testGoal: 'snapshot search results in folders',
    expectedResults: 2,
  },
  play: SearchResultsMultipleSections.play,
};

export const SearchResultsSelectedFolder: StoryObj<StoryPropsOverlay> = {
  ...SectionsAndFolders,
  parameters: {
    testGoal: 'snapshot search results in selected folder',
  },
  play: playSelectedFolderSearchResultsStory,
};

export const SearchResultsSelectedFolderEmpty: StoryObj<StoryPropsOverlay> = {
  ...SectionsAndFolders,
  parameters: {
    testGoal: 'snapshot no search results in selected folder',
  },
  play: playSearchResultsSelectedFolderEmptyStory,
};

export const NestedFoldersSearchResults: StoryObj<StoryPropsOverlay> = {
  ...SectionsAndNestedFolders,
  parameters: {
    testGoal: 'snapshot nested & not-nested folder paths flattening',
    searchQuery: '22',
  },
  play: playNestedFoldersSearchResultsStory,
};

export const NestedFoldersSearchResultsShowMore: StoryObj<StoryPropsOverlay> = {
  ...SectionsAndNestedFolders,
  parameters: {
    testGoal: 'snapshot results in nested folders with "show more"',
  },
  play: playNestedFoldersSearchResultsShowMoreStory,
};

export const NestedFoldersSearchResultsShowMoreClicked: StoryObj<StoryPropsOverlay> =
  {
    ...SectionsAndNestedFolders,
    parameters: {
      testGoal: 'snapshot results in "leaf" nested folder',
    },
    play: playNestedFoldersSearchResultsShowMoreClickedStory,
  };

export const NestedFoldersSelectedFolder: StoryObj<StoryPropsOverlay> = {
  ...SectionsAndNestedFolders,
  parameters: {
    testGoal: 'snapshot default view in folder with nested folders',
  },
  play: playNestedFoldersSelectedFolderStory,
};

export const NestedFoldersSelectedFolderSearchResults: StoryObj<StoryPropsOverlay> =
  {
    ...SectionsAndNestedFolders,
    parameters: {
      testGoal: 'snapshot results in folder with nested folders',
    },
    play: playNestedFoldersSelectedFolderSearchResultsStory,
  };

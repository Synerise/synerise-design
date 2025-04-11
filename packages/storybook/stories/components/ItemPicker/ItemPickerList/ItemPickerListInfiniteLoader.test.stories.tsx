import { Meta, StoryObj } from '@storybook/react';

import { within, waitFor, userEvent, fireEvent, expect } from '@storybook/test';
import type { ItemPickerProps } from '@synerise/ds-item-picker';

import ItemPickerMeta, { FlatItems, Sections, SectionsAndFolders, SectionsAndNestedFolders } from './ItemPickerListInfiniteLoader.stories';

export default {
    ...ItemPickerMeta,
    title: 'Components/Pickers/ItemPicker/List With Infinite Loader/Tests',
    tags: ['visualtests'],
} as Meta<ItemPickerProps>;

import type { StoryPropsOverlay } from '../ItemPicker.types';
import { playSearchResultsStory, playSearchResultsEmptyStory, playKeyboardEscapeClearSearchStory, playKeyboardBackStory, playActionsAllStory, playSearchResultsMultipleSections, playSelectedSection, playSelectedSectionSearchResultsStory, playSelectedFolderSearchResultsStory, playSearchResultsSelectedFolderEmptyStory, playNestedFoldersSearchResultsStory, playNestedFoldersSearchResultsShowMoreStory, playNestedFoldersSearchResultsShowMoreClickedStory, playNestedFoldersSelectedFolderStory, playNestedFoldersSelectedFolderSearchResultsStory, playActionsSectionStory, playActionsFolderStory } from './ItemPickerList.data';


const SEARCH_QUERY = 'seg';


export const SearchResults: StoryObj<StoryPropsOverlay> = {
    ...FlatItems,
    parameters: {
        testGoal: 'snapshot flat list search results'
    },
    play: playSearchResultsStory
};

export const SearchResultsEmpty: StoryObj<StoryPropsOverlay> = {
    ...FlatItems,
    parameters: {
        testGoal: 'snapshot empty search results'
    },
    play: playSearchResultsEmptyStory
};

export const KeyboardEscapeClearSearch: StoryObj<StoryPropsOverlay> = {
    ...FlatItems,
    parameters: {
        testGoal: 'test keyboard shortcut ESC'
    },
    play: playKeyboardEscapeClearSearchStory
};

export const KeyboardBack: StoryObj<StoryPropsOverlay> = {
    ...SectionsAndFolders,
    parameters: {
        testGoal: 'test keyboard shortcut BACK'
    },
    play: playKeyboardBackStory
};


export const ActionsAll: StoryObj<StoryPropsOverlay> = {
    ...FlatItems,
    parameters: {
        testGoal: 'snapshot listing actions in default view'
    },
    play: playActionsAllStory
};

export const ActionsInSection: StoryObj<StoryPropsOverlay> = {
    ...Sections,
    args: {
        ...Sections.args,
        recents: undefined
    },
    parameters: {
        testGoal: 'snapshot listing actions in section view'
    },
    play: playActionsSectionStory
};
export const ActionsInFolder: StoryObj<StoryPropsOverlay> = {
    ...SectionsAndFolders,
    args: {
        ...SectionsAndFolders.args,
        recents: undefined
    },
    parameters: {
        testGoal: 'snapshot listing actions in folder view'
    },
    play: playActionsFolderStory
};

export const SearchResultsMultipleSections: StoryObj<StoryPropsOverlay> = {
    ...Sections,
    parameters: {
        testGoal: 'snapshot search results in sections'
    },
    play: playSearchResultsMultipleSections
};

export const SelectedSection: StoryObj<StoryPropsOverlay> = {
    ...Sections,
    args: {
        ...Sections.args,
        recents: undefined
    },
    parameters: {
        testGoal: 'snapshot items in specific section'
    },
    play: playSelectedSection
};

export const SelectedSectionSearchResults: StoryObj<StoryPropsOverlay> = {
    ...Sections,
    args: {
        ...Sections.args,
        recents: undefined
    },
    parameters: {
        testGoal: 'snapshot search results in specific section'
    },
    play: playSelectedSectionSearchResultsStory
};

export const SearchResultsFolders: StoryObj<StoryPropsOverlay> = {
    ...SectionsAndFolders,
    parameters: {
        testGoal: 'snapshot search results in folders'
    },
    play: SearchResultsMultipleSections.play
};

export const SearchResultsSelectedFolder: StoryObj<StoryPropsOverlay> = {
    ...SectionsAndFolders,
    parameters: {
        testGoal: 'snapshot search results in selected folder'
    },
    play: playSelectedFolderSearchResultsStory
};


export const SearchResultsSelectedFolderEmpty: StoryObj<StoryPropsOverlay> = {
    ...SectionsAndFolders,
    parameters: {
        testGoal: 'snapshot no search results in selected folder'
    },
    play: playSearchResultsSelectedFolderEmptyStory
};


export const NestedFoldersSearchResults: StoryObj<StoryPropsOverlay> = {
    ...SectionsAndNestedFolders,
    parameters: {
        testGoal: 'snapshot nested & not-nested folder paths flattening'
    },
    play: playNestedFoldersSearchResultsStory
};


export const NestedFoldersSearchResultsShowMore: StoryObj<StoryPropsOverlay> = {
    ...SectionsAndNestedFolders,
    parameters: {
        testGoal: 'snapshot results in nested folders with "show more"'
    },
    play: playNestedFoldersSearchResultsShowMoreStory
};

export const NestedFoldersSearchResultsShowMoreClicked: StoryObj<StoryPropsOverlay> = {
    ...SectionsAndNestedFolders,
    parameters: {
        testGoal: 'snapshot results in "leaf" nested folder'
    },
    play: playNestedFoldersSearchResultsShowMoreClickedStory
};

export const NestedFoldersSelectedFolder: StoryObj<StoryPropsOverlay> = {
    ...SectionsAndNestedFolders,
    parameters: {
        testGoal: 'snapshot default view in folder with nested folders'
    },
    play: playNestedFoldersSelectedFolderStory
};

export const NestedFoldersSelectedFolderSearchResults: StoryObj<StoryPropsOverlay> = {
    ...SectionsAndNestedFolders,
    parameters: {
        testGoal: 'snapshot results in folder with nested folders'
    },
    play: playNestedFoldersSelectedFolderSearchResultsStory
};

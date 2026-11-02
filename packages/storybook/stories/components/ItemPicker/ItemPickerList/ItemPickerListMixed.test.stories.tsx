import { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fireEvent, userEvent, waitFor, within } from 'storybook/test';

import type {
  BaseSectionType,
  ItemPickerListProps,
} from '@synerise/ds-item-picker';

import type { MixedStoryItem } from './ItemPickerListMixed.data';
import FoldersMeta, {
  Default,
  EverythingOn,
  LoadingAndErrors,
} from './ItemPickerListMixed.stories';

type FolderListProps = ItemPickerListProps<MixedStoryItem, BaseSectionType>;
type PlayContext = Parameters<
  NonNullable<StoryObj<FolderListProps>['play']>
>[0];

export default {
  ...FoldersMeta,
  title: 'Components/Pickers/ItemPicker/Mixed List/Tests',
  tags: ['visualtests'],
} as Meta<FolderListProps>;

const typeInSearch = async (search: HTMLElement, text: string) => {
  fireEvent.focus(search);
  await userEvent.type(search, text, { delay: 100 });
};

const getCanvas = ({ canvasElement }: PlayContext) =>
  within(canvasElement.parentElement as HTMLElement);

const LOAD_TIMEOUT = { timeout: 3000 };

const backLabel = (canvasElement: HTMLElement) =>
  canvasElement.parentElement?.querySelector(
    '[data-testid="dropdown-back-action-label"]',
  );

export const OpenFolderAndGoBack: StoryObj<FolderListProps> = {
  ...Default,
  parameters: {
    testGoal: 'a folder opens the next level, the back header goes up',
  },
  play: async (context) => {
    const canvas = getCanvas(context);
    await userEvent.click(await canvas.findByText('Folder 1'));
    await waitFor(
      () =>
        expect(backLabel(context.canvasElement)).toHaveTextContent(
          'All / Folder 1',
        ),
      LOAD_TIMEOUT,
    );
    expect(
      canvas.getByPlaceholderText('Search in this folder'),
    ).toBeInTheDocument();

    await userEvent.click(canvas.getByTestId('dropdown-back-action-arrow'));
    await waitFor(
      () => expect(canvas.getByText('Folder 2')).toBeInTheDocument(),
      LOAD_TIMEOUT,
    );
    expect(backLabel(context.canvasElement)).toBeNull();
  },
};

export const KeyboardBetweenLevels: StoryObj<FolderListProps> = {
  ...Default,
  parameters: {
    testGoal: '↓ to a folder, → opens it, ← goes back up',
  },
  play: async (context) => {
    const canvas = getCanvas(context);
    await canvas.findByText('Folder 1');
    await userEvent.click(canvas.getByPlaceholderText('Search'));
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}');
    await waitFor(
      () => expect(document.activeElement).toHaveTextContent('Folder 1'),
      LOAD_TIMEOUT,
    );

    await userEvent.keyboard('{ArrowRight}');
    await waitFor(
      () =>
        expect(backLabel(context.canvasElement)).toHaveTextContent(
          'All / Folder 1',
        ),
      LOAD_TIMEOUT,
    );

    await userEvent.keyboard('{ArrowDown}{ArrowLeft}');
    await waitFor(
      () => expect(backLabel(context.canvasElement)).toBeNull(),
      LOAD_TIMEOUT,
    );
  },
};

export const SearchResults: StoryObj<FolderListProps> = {
  ...Default,
  parameters: {
    testGoal: 'search covers every level, flat under "Results"',
  },
  play: async (context) => {
    const canvas = getCanvas(context);
    await canvas.findByText('Folder 1');
    await typeInSearch(canvas.getByPlaceholderText('Search'), '2.1');
    await waitFor(
      () => expect(canvas.getByText('Results')).toBeInTheDocument(),
      LOAD_TIMEOUT,
    );
    await waitFor(
      () =>
        expect(
          canvas.getAllByText(
            (_, element) => element?.textContent === 'Item 2.1.1',
          ),
        ).not.toHaveLength(0),
      LOAD_TIMEOUT,
    );
  },
};

export const EmptyFolder: StoryObj<FolderListProps> = {
  ...Default,
  parameters: {
    testGoal: 'an empty folder shows its empty state',
  },
  play: async (context) => {
    const canvas = getCanvas(context);
    await userEvent.click(await canvas.findByText('Folder 5'));
    await waitFor(
      () =>
        expect(canvas.getByText('This folder is empty')).toBeInTheDocument(),
      LOAD_TIMEOUT,
    );
  },
};

export const ActionsUnderSlash: StoryObj<FolderListProps> = {
  ...EverythingOn,
  parameters: {
    testGoal: 'an action with showInList false is offered only under "/"',
  },
  play: async (context) => {
    const canvas = getCanvas(context);
    await canvas.findByText('Create item');
    expect(canvas.queryByText('Export list')).toBeNull();

    await typeInSearch(
      canvas.getByPlaceholderText((_, element) =>
        Boolean(element?.matches('input')),
      ),
      '/',
    );
    await waitFor(
      () => expect(canvas.getByText('Export list')).toBeInTheDocument(),
      LOAD_TIMEOUT,
    );
  },
};

export const LoadErrorAndRefresh: StoryObj<FolderListProps> = {
  ...LoadingAndErrors,
  parameters: {
    testGoal: 'a failed load shows the error state, Refresh loads the level',
  },
  play: async (context) => {
    const canvas = getCanvas(context);
    await waitFor(
      () =>
        expect(canvas.getByText(/Items can.t be loaded/)).toBeInTheDocument(),
      { timeout: 4000 },
    );
    await userEvent.click(canvas.getByText('Refresh'));
    await waitFor(
      () => expect(canvas.getByText('Folder 1')).toBeInTheDocument(),
      { timeout: 4000 },
    );
  },
};

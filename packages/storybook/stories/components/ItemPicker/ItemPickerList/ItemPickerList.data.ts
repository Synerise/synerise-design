import { within, waitFor, userEvent, fireEvent, expect } from '@storybook/test';
import { sleep } from '../../../utils';

export const playSearchResultsStory = async ({ canvasElement, step, context }) => {
  await step(context.parameters.testGoal, () => {});
  const canvas = within(canvasElement.parentElement!);
  await waitFor(() => expect(canvas.getByText('Items')).toBeInTheDocument());
  fireEvent.focus(canvas.getByPlaceholderText('Search'));
  await userEvent.type(canvas.getByPlaceholderText('Search'), 'Item', { delay: 100 });
  await waitFor(() => expect(canvas.getByText('Results')).toBeInTheDocument());
};

export const playSearchResultsEmptyStory = async ({ canvasElement, step, context }) => {
  await step(context.parameters.testGoal, () => {});
  const canvas = within(canvasElement.parentElement!);
  await waitFor(() => expect(canvas.getByText('Items')).toBeInTheDocument());
  fireEvent.focus(canvas.getByPlaceholderText('Search'));
  await userEvent.type(canvas.getByPlaceholderText('Search'), 'No matching results', { delay: 100 });
  await waitFor(() => expect(canvas.getByText('No results found')).toBeInTheDocument());
};

export const playKeyboardEscapeClearSearchStory = async ({ canvasElement, step, context }) => {
  await step(context.parameters.testGoal, () => {});
  const canvas = within(canvasElement.parentElement!);
  await waitFor(() => expect(canvas.getByText('Items')).toBeInTheDocument());
  fireEvent.focus(canvas.getByPlaceholderText('Search'));
  await userEvent.type(canvas.getByPlaceholderText('Search'), 'No matching results', { delay: 100 });
  await waitFor(() => expect(canvas.getByText('No results found')).toBeInTheDocument());
  await userEvent.type(canvas.getByPlaceholderText('Search'), '{escape}', { delay: 100 });
  await waitFor(() => expect(canvas.getByText('Items')).toBeInTheDocument());
};

export const playKeyboardBackStory = async ({ canvasElement, step, context }) => {
  await step(context.parameters.testGoal, () => {});
  const canvas = within(canvasElement.parentElement!);
  await waitFor(() => expect(canvas.getByText('Recent')).toBeInTheDocument());
  await sleep(500);
  await userEvent.click(canvas.getByText('Segmentations'));
  await waitFor(() => expect(canvas.getByText('Items')).toBeInTheDocument());
  await sleep(500);
  userEvent.keyboard('{Control>}{ArrowLeft}{/Control}');
  await waitFor(() => expect(canvas.getByText('Recent')).toBeInTheDocument());
};

export const playActionsAllStory = async ({ canvasElement, step, context }) => {
  await step(context.parameters.testGoal, () => {});
  const canvas = within(canvasElement.parentElement!);
  await waitFor(() => expect(canvas.getByText('Recent')).toBeInTheDocument());
  fireEvent.focus(canvas.getByPlaceholderText('Search'));
  await userEvent.type(canvas.getByPlaceholderText('Search'), '/', { delay: 100 });
  await waitFor(() => {
    expect(canvas.getAllByRole('menuitem')).toHaveLength(3);
    expect(canvas.getByText('Actions')).toBeInTheDocument();
    expect(canvas.getByText('Refresh').closest('button')).toBeDisabled();
  });
};

export const playActionsSectionStory = async ({ canvasElement, step, context }) => {
  await step(context.parameters.testGoal, () => {});
  const canvas = within(canvasElement.parentElement!);
  await waitFor(() => expect(canvas.getByText('Segmentations')).toBeInTheDocument());
  await waitFor(() => expect(canvas.getAllByText('Show more')[0]).toBeInTheDocument());
  await sleep(500);
  await userEvent.click(canvas.getAllByText('Show more')[0]);
  await waitFor(() => {
    expect(canvas.getByText('Items')).toBeInTheDocument();
    expect(canvas.getByTestId('dropdown-back-action-label')).toHaveTextContent('Segmentations');
  });
  fireEvent.focus(canvas.getByPlaceholderText('Search'));
  await userEvent.type(canvas.getByPlaceholderText('Search'), '/', { delay: 100 });
  await waitFor(() => {
    expect(canvas.queryByTestId('dropdown-back-action-label')).not.toBeInTheDocument();
    expect(canvas.getAllByRole('menuitem')).toHaveLength(3);
    expect(canvas.getByText('Actions')).toBeInTheDocument();
    expect(canvas.getByText('Refresh').closest('button')).toBeDisabled();
  });
};

export const playActionsFolderStory = async ({ canvasElement, step, context }) => {
  await step(context.parameters.testGoal, () => {});
  const canvas = within(canvasElement.parentElement!);
  await waitFor(() => expect(canvas.getByText('Segmentations')).toBeInTheDocument());
  await sleep(500);
  await userEvent.click(canvas.getByText('Segmentations'));
  await waitFor(() => {
    expect(canvas.getByText('Items')).toBeInTheDocument();
    expect(canvas.getByTestId('dropdown-back-action-label')).toHaveTextContent('Segmentations');
  });
  fireEvent.focus(canvas.getByPlaceholderText('Search'));
  await userEvent.type(canvas.getByPlaceholderText('Search'), '/', { delay: 100 });
  await waitFor(() => {
    expect(canvas.queryByTestId('dropdown-back-action-label')).not.toBeInTheDocument();
    expect(canvas.getAllByRole('menuitem')).toHaveLength(3);
    expect(canvas.getByText('Actions')).toBeInTheDocument();
    expect(canvas.getByText('Refresh').closest('button')).toBeDisabled();
  });
};

export const playSearchResultsMultipleSections = async ({ canvasElement, step, context }) => {
  await step(context.parameters.testGoal, () => {});
  const canvas = within(canvasElement.parentElement!);
  await waitFor(() => expect(canvas.getByText('Recent')).toBeInTheDocument());
  fireEvent.focus(canvas.getByPlaceholderText('Search'));
  await userEvent.type(canvas.getByPlaceholderText('Search'), '12', { delay: 100 });
  await waitFor(() => expect(canvas.getAllByTestId('ds-list-item-highlight').length).toBe(context.parameters.expectedResults))
};

export const playSelectedSection = async ({ canvasElement, step, context }) => {
  await step(context.parameters.testGoal, () => {});
  const canvas = within(canvasElement.parentElement!);
  await waitFor(() => expect(canvas.getByText('Segmentations')).toBeInTheDocument());
  await waitFor(() => expect(canvas.getAllByText('Show more')[0]).toBeInTheDocument());
  await sleep(500);
  await userEvent.click(canvas.getAllByText('Show more')[0]);
  await waitFor(() => {
    expect(canvas.getByText('Items')).toBeInTheDocument();
    expect(canvas.getByTestId('dropdown-back-action-label')).toHaveTextContent('Segmentations');
  });
};

export const playSelectedSectionSearchResultsStory = async ({ canvasElement, step, context }) => {
  await step(context.parameters.testGoal, () => {});
  const canvas = within(canvasElement.parentElement!);
  await waitFor(() => expect(canvas.getByText('Segmentations')).toBeInTheDocument());
  await waitFor(() => expect(canvas.getAllByText('Show more')[0]).toBeInTheDocument());
  await sleep(500);
  await userEvent.click(canvas.getAllByText('Show more')[0]);
  await waitFor(() => {
    expect(canvas.getByText('Items')).toBeInTheDocument();
    expect(canvas.getByTestId('dropdown-back-action-label')).toHaveTextContent('Segmentations');
  });

  fireEvent.focus(canvas.getByPlaceholderText('Search'));
  await userEvent.type(canvas.getByPlaceholderText('Search'), '12', { delay: 100 });

  await waitFor(() => {
    expect(canvas.getByText('Results')).toBeInTheDocument();
    expect(canvas.getByTestId('dropdown-back-action-label')).toHaveTextContent('Segmentations');
  });
};

export const playSelectedFolderSearchResultsStory = async ({ canvasElement, step, context }) => {
  await step(context.parameters.testGoal, () => {});
  const canvas = within(canvasElement.parentElement!);
  const FOLDER_NAME = 'Segmentations';
  await waitFor(() => expect(canvas.getByText(FOLDER_NAME)).toBeInTheDocument());
  await sleep(500);
  await userEvent.click(canvas.getByText(FOLDER_NAME));
  await waitFor(() => {
    expect(canvas.getByText('Items')).toBeInTheDocument();
    expect(canvas.getByTestId('dropdown-back-action-label')).toHaveTextContent(FOLDER_NAME);
  });

  fireEvent.focus(canvas.getByPlaceholderText('Search'));
  await userEvent.type(canvas.getByPlaceholderText('Search'), '12', { delay: 100 });

  await waitFor(() => {
    expect(canvas.getByText('Results')).toBeInTheDocument();
    expect(canvas.getByTestId('dropdown-back-action-label')).toHaveTextContent(FOLDER_NAME);
  });
};

export const playSearchResultsSelectedFolderEmptyStory = async ({ canvasElement, step, context }) => {
  await step(context.parameters.testGoal, () => {});
  const canvas = within(canvasElement.parentElement!);
  await waitFor(() => expect(canvas.getByText('Recent')).toBeInTheDocument());
  await sleep(500);
  await userEvent.click(canvas.getByText('Segmentations'));
  await waitFor(() => expect(canvas.getByText('Items')).toBeInTheDocument());
  fireEvent.focus(canvas.getByPlaceholderText('Search'));
  await userEvent.type(canvas.getByPlaceholderText('Search'), 'No matches', { delay: 100 });

  await waitFor(() => {
    expect(canvas.getByText('Search all folders')).toBeInTheDocument();
    expect(canvas.getByTestId('dropdown-back-action-label')).toHaveTextContent('Segmentations');
  });
};

export const playNestedFoldersSearchResultsStory = async ({ canvasElement, step, context }) => {
  await step(context.parameters.testGoal, () => {});
  const canvas = within(canvasElement.parentElement!);
  fireEvent.focus(canvas.getByPlaceholderText('Search'));
  await userEvent.type(canvas.getByPlaceholderText('Search'), context.parameters.searchQuery || '220');
  await waitFor(() => expect(canvas.getAllByRole('menuitem')).toHaveLength(3));
};

export const playNestedFoldersSearchResultsShowMoreStory = async ({ canvasElement, step, context }) => {
  await step(context.parameters.testGoal, () => {});
  const canvas = within(canvasElement.parentElement!);
  fireEvent.focus(canvas.getByPlaceholderText('Search'));
  await userEvent.type(canvas.getByPlaceholderText('Search'), 'Attr');
  await waitFor(() => expect(canvas.getAllByText('Show more')[0]).toBeInTheDocument());
};

export const playNestedFoldersSearchResultsShowMoreClickedStory = async ({ canvasElement, step, context }) => {
  await step(context.parameters.testGoal, () => {});
  const canvas = within(canvasElement.parentElement!);
  fireEvent.focus(canvas.getByPlaceholderText('Search'));
  await userEvent.type(canvas.getByPlaceholderText('Search'), 'Attr');
  await waitFor(() => expect(canvas.getAllByText('Show more')[0]).toBeInTheDocument());
  await sleep(500);
  await userEvent.click(canvas.getAllByText('Show more')[0]);
  await waitFor(() => {
    expect(canvas.getByText('Results')).toBeInTheDocument();
    expect(canvas.getByTestId('dropdown-back-action-label')).toHaveTextContent('Attributes - Ready to use');
  });
};

export const playNestedFoldersSelectedFolderStory = async ({ canvasElement, step, context }) => {
  await step(context.parameters.testGoal, () => {});
  const canvas = within(canvasElement.parentElement!);
  await waitFor(() => expect(canvas.getByText('Actions')).toBeInTheDocument());
  await sleep(500);
  const FOLDER_NAME = 'Attributes';
  await userEvent.click(await canvas.findByText(FOLDER_NAME));
  await waitFor(() => expect(canvas.getByTestId('dropdown-back-action-label')).toHaveTextContent(FOLDER_NAME));
};

export const playNestedFoldersSelectedFolderSearchResultsStory = async ({ canvasElement, step, context }) => {
  await step(context.parameters.testGoal, () => {});
  const canvas = within(canvasElement.parentElement!);
  await waitFor(() => expect(canvas.getByText('Actions')).toBeInTheDocument());
  await sleep(500);
  const FOLDER_NAME = 'Attributes';
  await userEvent.click(await canvas.findByText(FOLDER_NAME));
  await waitFor(() => expect(canvas.getByTestId('dropdown-back-action-label')).toHaveTextContent(FOLDER_NAME));
  
  fireEvent.focus(canvas.getByPlaceholderText('Search'));
  await userEvent.type(canvas.getByPlaceholderText('Search'), 'Attr');
  await waitFor(() => expect(canvas.getAllByText('Show more')[0]).toBeInTheDocument());
  await sleep(200);
};

import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { getByText, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CodeArea from '../CodeArea';

const LABEL = 'LABEL';
const FULLSCREEN_LABEL = 'FULLSCREEN_LABEL';
const SYNTAX = 'json';
const DESCRIPTION = 'DESCRIPTION';
const TEXTS = {
  fullscreen: 'FULLSCREEN BUTTON',
  closeFullscreen: 'CLOSE FULLSCREEN BUTTON'
}
const CUSTOM_CONTENT = 'Custom footer content';
const customContent = () => CUSTOM_CONTENT;
const SYNTAX_OPTIONS = [
  {
    language: 'json'
  },
  {
    language: 'html'
  }
]
const TEST_IDS = {
  contentBelow: 'code-area-below',
  description: 'code-area-description',
  counterTop: 'code-area-counter-top',
  counterBottom: 'code-area-counter-bottom',
  bottomBar: 'code-area-bottombar',
  label: 'code-area-label',
  syntaxOptions: 'code-area-syntaxoptions'
}


jest.mock('@monaco-editor/react', () => (({ onChange, value, 'data-testid': dataTestId }) => {
  return (
    <input
      type="text"
      onChange={event => onChange(event.target.value)}
      value={value}
      aria-label={dataTestId}
      data-testid={dataTestId}
    />
  );
}));


describe('CodeArea', () => {
  it('should render CodeArea with label', () => {
    renderWithProvider(<CodeArea currentSyntax={SYNTAX} label={LABEL} syntaxOptions={SYNTAX_OPTIONS} />);
    expect(screen.getByText(LABEL)).toBeInTheDocument();
    expect(screen.getByText(SYNTAX)).toBeInTheDocument();
  });

  it('should render CodeArea with custom footer content', () => {
    renderWithProvider(<CodeArea currentSyntax={SYNTAX} renderFooterContent={customContent} syntaxOptions={SYNTAX_OPTIONS} />);
    const bottomBar = screen.getByTestId(TEST_IDS.bottomBar);
    expect(getByText(bottomBar, CUSTOM_CONTENT)).toBeInTheDocument();
  });


  it('should render CodeArea with custom message', () => {
    renderWithProvider(<CodeArea currentSyntax={SYNTAX} renderAdditionalDescription={customContent} />);
    const contentBelow = screen.getByTestId(TEST_IDS.contentBelow);
    expect(getByText(contentBelow, CUSTOM_CONTENT)).toBeInTheDocument();
  });

  it('should render CodeArea with description', () => {
    renderWithProvider(<CodeArea currentSyntax={SYNTAX} description={DESCRIPTION} />);
    expect(screen.getByText(DESCRIPTION)).toBeInTheDocument();
  });

  it('should render CodeArea with counter above', () => {
    renderWithProvider(<CodeArea currentSyntax={SYNTAX} counter={{ limit: 100, placement: 'top' }} />);
    const counterTop = screen.queryByTestId(TEST_IDS.counterTop);
    expect(counterTop).toBeInTheDocument();
    const counterBottom = screen.queryByTestId(TEST_IDS.counterBottom);
    expect(counterBottom).not.toBeInTheDocument();
  });

  it('should render CodeArea with counter below', () => {
    renderWithProvider(<CodeArea currentSyntax={SYNTAX} counter={{ limit: 100, placement: 'bottom' }} />);
    const counterBottom = screen.queryByTestId(TEST_IDS.counterBottom);
    expect(counterBottom).toBeInTheDocument();
    const counterTop = screen.queryByTestId(TEST_IDS.counterTop);
    expect(counterTop).not.toBeInTheDocument();
  });

  it('should render CodeArea with multiple syntax options', async () => {
    const onSyntaxChange = jest.fn();
    renderWithProvider(<CodeArea currentSyntax={SYNTAX} syntaxOptions={SYNTAX_OPTIONS} onSyntaxChange={onSyntaxChange} />);

    const syntaxOptions = screen.getByTestId(TEST_IDS.syntaxOptions);
    const syntaxSelectionTrigger = screen.getByText(SYNTAX);

    expect(syntaxOptions).toBeInTheDocument();
    expect(syntaxSelectionTrigger).toBeInTheDocument();

    userEvent.click(syntaxSelectionTrigger);
    await waitFor(() => {
      const items = screen.getAllByRole('menuitem');
      expect(items.length).toBe(SYNTAX_OPTIONS.length);
    })
  });

  it('should show CodeArea in fullscreen mode', async () => {
    const onFullscreenChange = jest.fn();
    renderWithProvider(<div data-popup-container><CodeArea currentSyntax={SYNTAX} fullscreenLabel={FULLSCREEN_LABEL} allowFullscreen texts={TEXTS} onFullscreenChange={onFullscreenChange} description={DESCRIPTION} /></div>);

    const button = screen.getByText(TEXTS.fullscreen);
    expect(button).toBeInTheDocument();

    userEvent.click(button);

    expect(await screen.findByText(TEXTS.closeFullscreen)).toBeInTheDocument();
    expect(await screen.findByText(FULLSCREEN_LABEL)).toBeInTheDocument();

    expect(onFullscreenChange).toHaveBeenCalledTimes(1);
  });
});
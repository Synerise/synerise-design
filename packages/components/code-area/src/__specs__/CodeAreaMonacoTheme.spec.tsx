import React, { useEffect } from 'react';

import { DSProvider, type ThemeMode, useTheme } from '@synerise/ds-core';
import { render } from '@testing-library/react';

import CodeArea from '../CodeArea';
import { DS_MONACO_THEME_NAME } from '../constants';

const monaco = vi.hoisted(() => ({
  editor: {
    defineTheme: vi.fn(),
    setTheme: vi.fn(),
    onDidChangeMarkers: vi.fn(),
    getModelMarkers: vi.fn(() => []),
    colorize: vi.fn(),
  },
}));

vi.mock('@monaco-editor/react', () => ({
  default: ({ beforeMount }: { beforeMount: (instance: unknown) => void }) => {
    useEffect(() => {
      beforeMount(monaco);
    }, []);
    return <div data-testid="monaco-editor" />;
  },
  loader: { config: vi.fn() },
}));

const FOREGROUND = '--ds-color-text-base-default';

// The map the provider made active. The `vs`/`vs-dark` base, picked from that map's background
// luminance, is what proves the mode — light and dark may share a foreground value.
const activeTokens: { current: { [key: string]: string } } = { current: {} };
const TokenProbe = () => {
  activeTokens.current = useTheme().tokens;
  return null;
};

const renderInMode = (mode: ThemeMode) => (
  <DSProvider onErrorIntl={() => {}} mode={mode}>
    <TokenProbe />
    <CodeArea currentSyntax="json" />
  </DSProvider>
);

const lastDefinedTheme = () => {
  const { calls } = monaco.editor.defineTheme.mock;
  const [name, data] = calls[calls.length - 1];
  return { name, data };
};

describe('CodeArea Monaco theme', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('defines the Monaco theme from the dark tokens in dark mode', () => {
    render(renderInMode('dark'));

    const { name, data } = lastDefinedTheme();
    expect(name).toBe(DS_MONACO_THEME_NAME);
    expect(data.base).toBe('vs-dark');
    expect(data.colors['editor.foreground']).toBe(
      activeTokens.current[FOREGROUND],
    );
    expect(monaco.editor.setTheme).toHaveBeenLastCalledWith(
      DS_MONACO_THEME_NAME,
    );
  });

  it('defines the Monaco theme from the light tokens in light mode', () => {
    render(renderInMode('light'));

    const { data } = lastDefinedTheme();
    expect(data.base).toBe('vs');
    expect(data.colors['editor.foreground']).toBe(
      activeTokens.current[FOREGROUND],
    );
  });

  it('re-defines and re-applies the theme when the mode changes', () => {
    const { rerender } = render(renderInMode('light'));
    expect(lastDefinedTheme().data.base).toBe('vs');
    monaco.editor.setTheme.mockClear();

    rerender(renderInMode('dark'));

    const { name, data } = lastDefinedTheme();
    expect(name).toBe(DS_MONACO_THEME_NAME);
    expect(data.base).toBe('vs-dark');
    expect(data.colors['editor.foreground']).toBe(
      activeTokens.current[FOREGROUND],
    );
    expect(monaco.editor.setTheme).toHaveBeenLastCalledWith(
      DS_MONACO_THEME_NAME,
    );
  });
});

import React, { useEffect, useRef, useState } from 'react';

import Autocomplete, { AutocompleteProps } from '@synerise/ds-autocomplete';

import { renderWithHighlightedText } from './utils';

const SEARCH_LATENCY = 300;

const dataSource = [
  'First position',
  'Second position',
  'Third position',
  'Fourth position',
  'Fifth position',
  'Sixth position',
  'Seventh position',
  'Eighth position',
  'Ninth position',
  'Tenth position',
  'Eleventh position',
  'Twelfth position',
  'Thirteenth position',
  'Fourteenth position',
  'Fifteenth position',
  'Sixteenth position',
];
export const AutocompleteWithState = (props: AutocompleteProps) => {
  const [value, setValue] = useState(props.value);
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (value: string) => {
    let result: Array<string>;
    if (!value || value.indexOf('@') >= 0) {
      result = [];
    } else {
      result = dataSource.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase()),
      );
    }
    setResults(result);
  };

  return (
    <Autocomplete
      {...props}
      value={value}
      onSearch={handleSearch}
      onChange={setValue}
    >
      {results.map((result) => (
        <Autocomplete.Option value={result} key={result}>
          <span style={{ fontWeight: 400 }}>
            {renderWithHighlightedText(value, result)}
          </span>
        </Autocomplete.Option>
      ))}
    </Autocomplete>
  );
};

/**
 * Server-side search: every keystroke empties the option list while the request is in
 * flight and refills it when the response lands. That empty window outlasts the
 * dropdown's exit transition, so the panel genuinely unmounts between keystrokes —
 * the shape that regressed in production and that `AutocompleteWithState` (which
 * filters synchronously) cannot reproduce.
 */
export const AutocompleteWithAsyncState = (props: AutocompleteProps) => {
  const [value, setValue] = useState(props.value);
  const [results, setResults] = useState<string[]>([]);
  const pendingRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(pendingRef.current), []);

  const handleSearch = (query: string) => {
    clearTimeout(pendingRef.current);
    setResults([]);
    if (!query) {
      return;
    }
    pendingRef.current = setTimeout(() => {
      setResults(
        dataSource.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    }, SEARCH_LATENCY);
  };

  return (
    <Autocomplete
      {...props}
      value={value}
      onSearch={handleSearch}
      onChange={setValue}
    >
      {results.map((result) => (
        <Autocomplete.Option value={result} key={result}>
          <span style={{ fontWeight: 400 }}>
            {renderWithHighlightedText(value, result)}
          </span>
        </Autocomplete.Option>
      ))}
    </Autocomplete>
  );
};

/**
 * Options whose label is a custom two-line node (avatar + name + address). Rows render
 * far taller than a plain text row, so this is the case where a fixed row-height cap
 * clipped the list.
 */
export const AutocompleteWithRichOptions = (props: AutocompleteProps) => {
  const [value, setValue] = useState(props.value);
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    setResults(
      query
        ? dataSource.filter((item) =>
            item.toLowerCase().includes(query.toLowerCase()),
          )
        : [],
    );
  };

  return (
    <Autocomplete
      {...props}
      value={value}
      onSearch={handleSearch}
      onChange={setValue}
    >
      {results.map((result) => (
        <Autocomplete.Option value={result} key={result}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#c1d9fa',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {result.charAt(0)}
            </span>
            <span style={{ display: 'flex', flexDirection: 'column' }}>
              <strong>{result}</strong>
              <span style={{ color: '#6a7580' }}>
                {result.toLowerCase().replace(/\s+/g, '.')}@example.com
              </span>
            </span>
          </div>
        </Autocomplete.Option>
      ))}
    </Autocomplete>
  );
};

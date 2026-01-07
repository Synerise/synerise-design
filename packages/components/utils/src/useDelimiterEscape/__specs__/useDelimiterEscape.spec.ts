import { renderHook } from '@testing-library/react';
import { useDelimiterEscape } from '../useDelimiterEscape';
import {
  invalidTestCases,
  splitWithCommaEscapeTestCases,
  validTestCases,
} from './testCases';

describe('useDelimiterEscape', () => {
  describe('default config (comma delimiter, ``` tags)', () => {
    describe('splitWithEscape', () => {
      test.each(splitWithCommaEscapeTestCases)(
        'case: $input',
        ({ input, expected }) => {
          const { result } = renderHook(() => useDelimiterEscape());
          const splitResult = result.current.splitWithEscape(input);
          expect(splitResult).toEqual(expected);
          expect(splitResult.length).toBe(expected.length);
        },
      );
    });

    describe('isValidEscapedString', () => {
      describe('valid cases', () => {
        test.each(validTestCases)('valid: %s', (input) => {
          const { result } = renderHook(() => useDelimiterEscape());
          expect(result.current.isValidEscapedString(input)).toBe(true);
        });
      });

      describe('invalid cases', () => {
        test.each(invalidTestCases)('invalid: %s', (input) => {
          const { result } = renderHook(() => useDelimiterEscape());
          expect(result.current.isValidEscapedString(input)).toBe(false);
        });
      });
    });

    describe('joinWithEscape', () => {
      test('wraps items containing delimiter', () => {
        const { result } = renderHook(() => useDelimiterEscape());
        const items = ['apple', 'ber,ry', 'cherry'];
        const joined = result.current.joinWithEscape(items);
        expect(joined).toBe('apple,```ber,ry```,cherry');
      });

      test('handles empty array', () => {
        const { result } = renderHook(() => useDelimiterEscape());
        const joined = result.current.joinWithEscape([]);
        expect(joined).toBe('');
      });
    });
  });

  describe('custom config (semicolon delimiter, [[ ]] tags)', () => {
    test('splitWithEscape with custom config', () => {
      const { result } = renderHook(() =>
        useDelimiterEscape({
          delimiter: ';',
          openTag: '[[',
          closeTag: ']]',
        }),
      );

      const input = 'apple;[[ber;ry]];cherry';
      const split = result.current.splitWithEscape(input);
      expect(split).toEqual(['apple', 'ber;ry', 'cherry']);
    });

    test('isValidEscapedString with custom config', () => {
      const { result } = renderHook(() =>
        useDelimiterEscape({
          delimiter: ';',
          openTag: '[[',
          closeTag: ']]',
        }),
      );

      expect(result.current.isValidEscapedString('apple;[[ber;ry;cherry')).toBe(false);
      expect(result.current.isValidEscapedString('apple;[[berry]];cherry')).toBe(true);
    });

    test('joinWithEscape with custom config', () => {
      const { result } = renderHook(() =>
        useDelimiterEscape({
          delimiter: ';',
          openTag: '[[',
          closeTag: ']]',
        }),
      );

      const items = ['apple', 'ber;ry', 'cherry'];
      const joined = result.current.joinWithEscape(items);
      expect(joined).toBe('apple;[[ber;ry]];cherry');
    });
  });

  describe('custom config (pipe delimiter, <> tags)', () => {
    test('round-trip with pipe delimiter and angle brackets', () => {
      const { result } = renderHook(() =>
        useDelimiterEscape({
          delimiter: '|',
          openTag: '<',
          closeTag: '>',
        }),
      );

      const original = ['foo', 'bar|baz', 'qux'];
      const joined = result.current.joinWithEscape(original);
      const split = result.current.splitWithEscape(joined);
      expect(split).toEqual(original);
    });
  });
});

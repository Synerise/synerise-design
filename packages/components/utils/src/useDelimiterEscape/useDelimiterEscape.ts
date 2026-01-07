import { useMemo } from 'react';

export interface DelimiterEscapeConfig {
  delimiter?: string;
  openTag?: string;
  closeTag?: string;
}

export interface DelimiterEscapeUtils {
  joinWithEscape: (items: string[]) => string;
  splitWithEscape: (input: string) => string[];
  isValidEscapedString: (input: string) => boolean;
}

export const useDelimiterEscape = (
  config: DelimiterEscapeConfig = {},
): DelimiterEscapeUtils => {
  const { delimiter = ',', openTag = '```', closeTag = '```' } = config;

  return useMemo(() => {
    const joinWithEscape = (items: string[]): string => {
      return items
        .map((item) =>
          item.includes(delimiter) ? `${openTag}${item}${closeTag}` : item,
        )
        .join(delimiter);
    };

    const splitWithEscape = (input: string): string[] => {
      const result: string[] = [];
      let i = 0;
      const openTagLen = openTag.length;
      const closeTagLen = closeTag.length;

      while (i < input.length) {
        let current = '';

        // Check if we're at the start of a potential opening sequence
        if (input.substring(i, i + openTagLen) === openTag) {
          const validOpening = i === 0 || input[i - 1] === delimiter;

          if (validOpening) {
            // This is a valid opening - consume the opening tag
            i += openTagLen;
            current = '';

            // Find the closing tag (must be followed by delimiter or at end)
            while (i < input.length) {
              if (input.substring(i, i + closeTagLen) === closeTag) {
                // Check if this is a valid closing
                const validClosing =
                  i + closeTagLen === input.length ||
                  input[i + closeTagLen] === delimiter;

                if (validClosing) {
                  // Found closing tag
                  i += closeTagLen;
                  break;
                } else {
                  // Not a valid closing - treat as content
                  current += input[i];
                  i++;
                }
              } else {
                current += input[i];
                i++;
              }
            }
            // Push the item without the wrapper tags
            result.push(current);
          } else {
            // Not a valid opening - treat as regular item
            while (i < input.length && input[i] !== delimiter) {
              current += input[i];
              i++;
            }
            if (current) {
              result.push(current);
            }
          }
        } else {
          // Regular item - consume until delimiter
          while (i < input.length && input[i] !== delimiter) {
            current += input[i];
            i++;
          }
          if (current) {
            result.push(current);
          }
        }

        // Skip the delimiter
        if (i < input.length && input[i] === delimiter) {
          i++;
        }
      }

      return result;
    };

    const isValidEscapedString = (input: string): boolean => {
      let inEscapeBlock = false;
      let i = 0;
      const openTagLen = openTag.length;
      const closeTagLen = closeTag.length;
      const delimiterLen = delimiter.length;

      while (i < input.length) {
        if (!inEscapeBlock) {
          // Not in escape block - look for opening tag
          if (input.substring(i, i + openTagLen) === openTag) {
            // Check if this is a valid opening position
            const validOpening =
              i === 0 || input.substring(i - delimiterLen, i) === delimiter;
            if (validOpening) {
              // Valid opening position - enter escape block
              inEscapeBlock = true;
              i += openTagLen;
            } else {
              // Not a valid opening position - treat as regular content
              i++;
            }
          } else {
            i++;
          }
        } else {
          // In escape block - look for closing tag
          if (input.substring(i, i + closeTagLen) === closeTag) {
            // Check if this is a valid closing
            // Valid closing: at end of string or followed by delimiter
            const validClosing =
              i + closeTagLen === input.length ||
              input.substring(
                i + closeTagLen,
                i + closeTagLen + delimiterLen,
              ) === delimiter;

            if (validClosing) {
              // This is a closing tag
              inEscapeBlock = false;
              i += closeTagLen;
            } else {
              // Not a valid closing - treat as regular content
              i++;
            }
          } else {
            i++;
          }
        }
      }

      // Invalid if we're still inside an escape block (unclosed opening tag)
      return !inEscapeBlock;
    };

    return {
      joinWithEscape,
      splitWithEscape,
      isValidEscapedString,
    };
  }, [delimiter, openTag, closeTag]);
};

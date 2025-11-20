// generateObjectLiteral.js
'use strict';

/**
 * Return true when a string is a valid JS identifier (can be used unquoted).
 * (Very small conservative check; doesn't check reserved words.)
 */
function isValidIdentifier(str) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(str);
}

/**
 * Escape single-quoted JS string content (used if we decide to emit quoted values).
 */
function escapeForSingleQuotedString(str) {
  return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

/**
 * Generate a JS object literal (string) from an array of strings.
 *
 * Options:
 *  - multiline: boolean (default true) — pretty-print with newlines and indentation
 *  - indent: number (default 2) — indentation size when multiline
 *  - fallbackToQuoted: boolean (default true) — quote key/value when not a valid identifier
 *  - exportDefault: boolean (default false) — prefix with "export default " for ES modules
 *
 * Example output for ['FOO','bar-baz','Baz'] (multiline):
 * {
 *   FOO: FOO,
 *   "bar-baz": "bar-baz",
 *   Baz: Baz
 * }
 *
 * IMPORTANT: Unquoted values (FOO/Baz) are bare identifiers — they will refer to variables when
 * the code is executed. If you want string values at runtime, use the quoted output or evaluate
 * / transform differently.
 */
function generateObjectLiteral(strings, options = {}) {
  const {
    multiline = true,
    indent = 2,
    fallbackToQuoted = true,
    exportDefault = false,
  } = options;

  if (!Array.isArray(strings)) {
    throw new TypeError('First argument must be an array of strings.');
  }

  const pad = (n) => ' '.repeat(n);

  const entries = strings.map((s) => {
    const key = String(s);
    const validId = isValidIdentifier(key);
    if (validId) {
      // Use unquoted identifier for both key and value
      return { raw: `${key}: ${key}` };
    } else if (fallbackToQuoted) {
      const escaped = escapeForSingleQuotedString(key);
      return { raw: `'${escaped}': '${escaped}'` };
    } else {
      // If user requested no fallback, throw to indicate invalid token
      throw new Error(`String "${key}" is not a valid JS identifier and fallbackToQuoted is false.`);
    }
  });

  if (multiline) {
    const lines = entries.map((e) => `${pad(indent)}${e.raw},`);
    const body = lines.join('\n');
    const obj = `{\n${body}\n}`;
    return exportDefault ? `export default ${obj};` : obj;
  } else {
    const inner = entries.map((e) => e.raw).join(', ');
    const obj = `{ ${inner} }`;
    return exportDefault ? `export default ${obj};` : obj;
  }
}

// Export for CommonJS and ESM-friendly usage
module.exports = {
  generateObjectLiteral,
  isValidIdentifier,
  escapeForSingleQuotedString,
};

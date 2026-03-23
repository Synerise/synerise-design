import type { Plugin } from 'vite';

/**
 * Vite plugin to stub out LESS imports during the main build.
 * Since we compile LESS separately with our custom plugin, we don't want
 * Vite to try to process LESS files during the TypeScript transpilation.
 *
 * This prevents "LESS file not found" errors while maintaining the import
 * statements in the source code for proper CSS file discovery.
 */
export function stubLessImportsPlugin(): Plugin {
  return {
    name: 'vite-plugin-stub-less',
    // Handle LESS imports by returning empty module
    load(id) {
      if (id.endsWith('.less')) {
        // Return an empty ES module - the actual CSS will be compiled separately
        return {
          code: 'export default {}',
          map: null,
        };
      }
      return null;
    },
    // Resolve ~ prefixed imports
    resolveId(source, importer) {
      if (source.endsWith('.less')) {
        // For .less files, return the source as-is to let our loader handle it
        // This prevents Vite from trying to resolve them through node_modules
        return source;
      }
      return null;
    },
  };
}

export default stubLessImportsPlugin;

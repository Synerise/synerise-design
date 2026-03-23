import * as fs from 'fs-extra';
import { glob } from 'glob';
import * as path from 'path';
import type { Plugin } from 'vite';

export interface CopyPluginOptions {
  /** File patterns to copy (e.g., LESS and JSON files) */
  patterns: string[];
  /** Source directory (default: 'src') */
  srcDir?: string;
  /** Destination directory (default: 'dist') */
  destDir?: string;
}

/**
 * Vite plugin to copy files from src to dist.
 * Used by core package to copy LESS and JSON files.
 */
export function copyFilesPlugin(options: CopyPluginOptions): Plugin {
  const { patterns, srcDir = 'src', destDir = 'dist' } = options;

  return {
    name: 'vite-plugin-copy-files',
    // Run after Vite's build is complete
    closeBundle: async () => {
      const cwd = process.cwd();
      const srcPath = path.resolve(cwd, srcDir);
      const destPath = path.resolve(cwd, destDir);

      console.log('[COPY] Copying files...');

      try {
        // Create glob pattern with extensions
        const globPattern =
          patterns.length === 1
            ? path.join(srcPath, patterns[0])
            : path.join(srcPath, `**/*.{${patterns.join(',')}}`);

        // Find all files matching patterns
        const files = await glob(globPattern, { nodir: true });

        if (files.length === 0) {
          console.log('[COPY] No files found matching patterns:', patterns);
          return;
        }

        console.log(`[COPY] Found ${files.length} file(s) to copy`);

        // Copy each file
        for (const file of files) {
          const relativePath = path.relative(srcPath, file);
          const destinationFile = path.join(destPath, relativePath);

          // Ensure destination directory exists
          await fs.ensureDir(path.dirname(destinationFile));

          // Copy file
          await fs.copy(file, destinationFile);

          console.log(`[COPY] Copied: ${relativePath}`);
        }

        console.log('[COPY] Copy complete');
      } catch (error) {
        console.error('[COPY] Copy failed:', error);
        throw error;
      }
    },
  };
}

export default copyFilesPlugin;

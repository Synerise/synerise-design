import { spawn } from 'child_process';
import * as path from 'path';
import type { Plugin } from 'vite';

export interface PreBuildPluginOptions {
  /** Path to the script to execute (relative to package root) */
  script: string;
  /** Script arguments */
  args?: string[];
  /** Description for logging */
  description?: string;
}

/**
 * Vite plugin to run pre-build scripts before the main build process.
 * Used for generating source files (e.g., SVGR for icons, variables for core).
 */
export function preBuildPlugin(options: PreBuildPluginOptions): Plugin {
  const { script, args = [], description } = options;
  let hasRun = false;

  return {
    name: 'vite-plugin-prebuild',
    // Run before Vite starts building
    buildStart: async function () {
      // Only run once per build (buildStart can be called multiple times)
      if (hasRun) {
        return;
      }
      hasRun = true;

      const cwd = process.cwd();
      const scriptPath = path.resolve(cwd, script);

      console.log(`[PRE-BUILD] Running ${description || script}...`);

      return new Promise<void>((resolve, reject) => {
        const child = spawn('node', [scriptPath, ...args], {
          cwd,
          stdio: 'inherit',
          shell: false,
        });

        child.on('error', (error) => {
          console.error(`[PRE-BUILD] Failed to execute ${script}:`, error);
          reject(error);
        });

        child.on('exit', (code) => {
          if (code === 0) {
            console.log(`[PRE-BUILD] ✓ Completed ${description || script}`);
            resolve();
          } else {
            const error = new Error(
              `Pre-build script ${script} exited with code ${code}`,
            );
            console.error(`[PRE-BUILD] ✗ ${error.message}`);
            reject(error);
          }
        });
      });
    },
  };
}

export default preBuildPlugin;

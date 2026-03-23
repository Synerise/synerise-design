import * as fs from 'fs-extra';
import { glob } from 'glob';
import less from 'less';
import LessPluginCleanCSS from 'less-plugin-clean-css';
import NpmImportPlugin from 'less-plugin-npm-import';
import * as path from 'path';
import type { Plugin } from 'vite';

export interface LessPluginOptions {
  /** Pattern to match LESS files (default matches index/variables/core.less files) */
  pattern?: string;
  /** Files to ignore */
  ignore?: string[];
  /** Additional LESS options */
  lessOptions?: any;
}

/**
 * After LESS compilation, find dist JS files with `/* empty css *​/` stubs
 * (left by stubLessImportsPlugin) and replace them with actual CSS imports
 * pointing to the compiled CSS files.
 */
async function injectCssImports(cwd: string): Promise<void> {
  const distDir = path.resolve(cwd, 'dist');
  if (!fs.existsSync(distDir)) return;

  // Find all CSS files in dist/style/
  const cssFiles = await glob('**/style/*.css', { cwd: distDir, nodir: true });
  if (cssFiles.length === 0) return;

  // Find all JS files with empty css stubs
  const jsFiles = await glob('**/*.js', { cwd: distDir, nodir: true });
  const emptyCssRe = /\/\* empty css\s+\*\/\n?/g;

  for (const jsFile of jsFiles) {
    const jsPath = path.join(distDir, jsFile);
    let content = await fs.readFile(jsPath, 'utf-8');
    if (!emptyCssRe.test(content)) continue;

    // Find the closest CSS file relative to this JS file
    const jsDir = path.dirname(jsFile);
    let bestCss: string | null = null;
    let bestDepth = Infinity;

    for (const cssFile of cssFiles) {
      const rel = path.relative(jsDir, path.dirname(cssFile));
      const depth = rel.split(path.sep).filter(Boolean).length;
      if (depth < bestDepth) {
        bestDepth = depth;
        bestCss = cssFile;
      }
    }

    if (bestCss) {
      const relativeCssPath = path.relative(jsDir, bestCss);
      const cssImport = `import "./${relativeCssPath.replace(/\\/g, '/')}";\n`;
      // Replace all empty css stubs with a single import
      content = content.replace(emptyCssRe, '');
      // Insert after the last import statement
      const lastImportIdx = content.lastIndexOf('import ');
      if (lastImportIdx !== -1) {
        const lineEnd = content.indexOf('\n', lastImportIdx);
        content =
          content.slice(0, lineEnd + 1) +
          cssImport +
          content.slice(lineEnd + 1);
      } else {
        content = cssImport + content;
      }
      await fs.writeFile(jsPath, content);
      console.log(`[CSS] Injected ${relativeCssPath} import into ${jsFile}`);
    }
  }
}

/**
 * Vite plugin to compile LESS files to separate CSS files.
 * This maintains backward compatibility where CSS is imported separately
 * (e.g., import '@synerise/ds-button/dist/style/index.css')
 *
 * Also injects CSS imports into dist JS files to replace the empty stubs
 * left by stubLessImportsPlugin, so consumers get styles automatically.
 */
export function lessCompilePlugin(options: LessPluginOptions = {}): Plugin {
  const {
    pattern = '**/*(index|variables|core).less',
    ignore = ['./src/style/variables.less'],
    lessOptions = {},
  } = options;

  const defaultLessOptions = {
    plugins: [
      new NpmImportPlugin({ prefix: '~' }),
      new LessPluginCleanCSS({ keepSpecialComments: 0 }),
    ],
    javascriptEnabled: true,
    ...lessOptions,
  };

  return {
    name: 'vite-plugin-less-compile',
    // Run after Vite's build is complete
    closeBundle: async () => {
      const cwd = process.cwd();
      const fullPattern = path.resolve(cwd, pattern);

      console.log('[LESS] Compiling LESS files...');

      try {
        // Find all LESS files matching the pattern
        const files = await glob(fullPattern, { nodir: true, ignore });

        if (files.length === 0) {
          console.log('[LESS] No LESS files found matching pattern:', pattern);
          return;
        }

        console.log(`[LESS] Found ${files.length} LESS file(s) to compile`);

        // Compile each file
        const compilationPromises = files.map(async (file) => {
          try {
            const lessInput = await fs.readFile(file, 'utf-8');
            const { dir, name } = path.parse(file);

            // Replace 'src' with 'dist' in the output path
            const destinationFile = path.join(
              dir.replace(/[\/\\]src([\/\\]|$)/, '/dist$1'),
              `${name}.css`,
            );

            // Compile LESS
            const output = await less.render(lessInput, {
              paths: [path.dirname(file)],
              ...defaultLessOptions,
            });

            // Write CSS file
            await fs.outputFile(destinationFile, output.css);

            console.log(
              `[LESS] Compiled: ${path.relative(cwd, file)} → ${path.relative(cwd, destinationFile)}`,
            );
          } catch (error) {
            console.error(`[LESS] Error compiling ${file}:`, error);
            throw error;
          }
        });

        await Promise.all(compilationPromises);
        console.log('[LESS] Compilation complete');

        // Inject CSS imports into dist JS files
        await injectCssImports(cwd);
      } catch (error) {
        console.error('[LESS] Compilation failed:', error);
        throw error;
      }
    },
  };
}

export default lessCompilePlugin;

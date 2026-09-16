import type { OutputChunk, Plugin } from 'vite';

/**
 * Strips Vite's `__vitePreload` runtime helper out of a package's build output.
 *
 * Vite only skips emitting that helper for `build.lib` builds:
 *
 *   const getInsertPreload = (environment) =>
 *     environment.config.consumer === 'client' && !config.isWorker && !config.build.lib;
 *
 * These packages are not lib builds — they use `preserveModules` for the 1:1 src->dist
 * output — so Vite treats each of them as an application and wraps every dynamic import
 * in `__vitePreload`, emitting `_virtual/preload-helper.js` alongside it.
 *
 * That breaks any consumer who bundles with Vite. Their Vite re-processes our dynamic
 * imports and injects its *own* `__vitePreload` into the same chunk, on top of the
 * binding our import already put there, and the build dies with "Identifier
 * `__vitePreload` has already been declared". Reproduced identically on Vite 6, 7 and 8.
 *
 * Dropping the wrapper is what a library should ship anyway: the helper only preloads
 * `deps`, which are dist-relative paths that never survive a consumer re-bundling it, and
 * the consumer's own Vite re-wraps the bare dynamic import — so its preload links and its
 * `vite:preloadError` events are the ones that are actually correct.
 *
 * Runs in `generateBundle`, after every `renderChunk` has had its say, and throws if a
 * reference survives — a future Vite changing the emitted shape must fail the build here
 * rather than silently ship a package that no Vite consumer can bundle.
 */

/** `__vitePreload(() => import("./x.js"), <deps>)` -> `import("./x.js")`. */
const PRELOAD_CALL =
  /__vitePreload\(\s*\(\)\s*=>\s*(import\([^()]*\))\s*,\s*(?:[^()]|\([^()]*\))*\)/g;

/** The helper's own import, whose depth varies with the importing module. */
const PRELOAD_IMPORT =
  /^import\s*\{\s*__vitePreload\s*\}\s*from\s*["'][^"']*_virtual\/preload-helper(?:\.js)?["'];?[^\S\n]*\n?/gm;

const HELPER_CHUNK = /(^|\/)_virtual\/preload-helper\.js$/;

const isChunk = (output: { type: string }): output is OutputChunk =>
  output.type === 'chunk';

export function stripPreloadHelperPlugin(): Plugin {
  return {
    name: 'ds-strip-preload-helper',
    generateBundle(_options, bundle) {
      for (const [fileName, output] of Object.entries(bundle)) {
        if (HELPER_CHUNK.test(fileName)) {
          delete bundle[fileName];
          continue;
        }
        if (!isChunk(output) || !output.code.includes('__vitePreload')) {
          continue;
        }

        output.code = output.code
          .replace(PRELOAD_CALL, '$1')
          .replace(PRELOAD_IMPORT, '');

        if (output.code.includes('__vitePreload')) {
          this.error(
            `${fileName} still references __vitePreload after stripping. Vite has ` +
              `changed the shape it emits; update PRELOAD_CALL/PRELOAD_IMPORT in ` +
              `scripts/vite/strip-preload-helper-plugin.ts to match.`,
          );
        }
      }
    },
  };
}

export default stripPreloadHelperPlugin;

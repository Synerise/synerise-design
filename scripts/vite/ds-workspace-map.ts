import { existsSync, readFileSync, readdirSync } from 'fs';
import { join, resolve } from 'path';

export interface WorkspaceSourcePackage {
  /** Absolute package directory, e.g. <root>/packages/components/core */
  dir: string;
  /** Absolute, extensionless src entry, e.g. <root>/packages/components/core/src/js/index */
  bareEntry: string;
}

/** Workspace parents to scan, mirroring pnpm-workspace.yaml. */
const PACKAGE_PARENTS = ['packages', 'packages/components'];

type PackageManifest = {
  name?: unknown;
  main?: unknown;
  module?: unknown;
  exports?: unknown;
};

let cache: Map<string, WorkspaceSourcePackage> | null = null;

/** 'dist/js/index.js' -> 'src/js/index'. Null when the entry does not live under dist/. */
function distEntryToSrc(entry: string): string | null {
  const rel = entry.replace(/^\.\//, '');
  if (rel !== 'dist' && !rel.startsWith('dist/')) {
    return null;
  }
  return `src${rel.slice('dist'.length)}`.replace(/\.(js|mjs|cjs|jsx)$/, '');
}

function readEntryField(manifest: PackageManifest): string | undefined {
  const dot =
    typeof manifest.exports === 'object' && manifest.exports !== null
      ? (manifest.exports as Record<string, unknown>)['.']
      : undefined;

  if (typeof dot === 'string') {
    return dot;
  }
  if (typeof dot === 'object' && dot !== null) {
    const conditions = dot as Record<string, unknown>;
    const picked = conditions.import ?? conditions.default;
    if (typeof picked === 'string') {
      return picked;
    }
  }
  if (typeof manifest.module === 'string') {
    return manifest.module;
  }
  return typeof manifest.main === 'string' ? manifest.main : undefined;
}

/**
 * Maps every workspace package that publishes from dist/ to its src entry, keyed by
 * package.json `name`. Built from the manifests rather than from directory names, so
 * packages whose directory differs from their name (packages/components/design-system ->
 * @synerise/design-system) and layouts other than src/index (core -> src/js/index) need
 * no special case, and stale dist-only directories with no manifest (packages/tokens,
 * packages/components/plain-list) are skipped.
 *
 * Cached per process: two readdir plus ~130 small reads, once.
 */
export function getDsWorkspacePackages(
  repoRoot: string,
): Map<string, WorkspaceSourcePackage> {
  if (cache) {
    return cache;
  }

  const map = new Map<string, WorkspaceSourcePackage>();

  for (const parent of PACKAGE_PARENTS) {
    const parentDir = resolve(repoRoot, parent);
    let entries;
    try {
      entries = readdirSync(parentDir, { withFileTypes: true });
    } catch {
      continue;
    }

    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name === 'node_modules') {
        continue;
      }

      const dir = join(parentDir, entry.name);
      const manifestPath = join(dir, 'package.json');
      if (!existsSync(manifestPath)) {
        continue;
      }

      let manifest: PackageManifest;
      try {
        manifest = JSON.parse(
          readFileSync(manifestPath, 'utf8'),
        ) as PackageManifest;
      } catch {
        continue;
      }

      const entryField = readEntryField(manifest);
      const srcEntry = entryField ? distEntryToSrc(entryField) : null;
      if (typeof manifest.name !== 'string' || !srcEntry) {
        continue;
      }

      map.set(manifest.name, { dir, bareEntry: join(dir, srcEntry) });
    }
  }

  cache = map;
  return map;
}

export default getDsWorkspacePackages;

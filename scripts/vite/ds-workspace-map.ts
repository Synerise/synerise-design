import { existsSync, readFileSync, readdirSync } from 'fs';
import { join, resolve } from 'path';

export interface WorkspaceSourcePackage {
  /** Absolute package directory, e.g. <root>/packages/components/core */
  dir: string;
  /** Absolute, extensionless src entry, e.g. <root>/packages/components/core/src/js/index */
  bareEntry: string;
  /**
   * Declared subpath exports other than '.', keyed with a leading slash to match the shape
   * an import specifier carries ('/testing'), mapped to their absolute extensionless src
   * entry. Wildcard patterns are excluded — they are catch-alls for dist paths, which the
   * resolver already rewrites on its own.
   */
  subpathEntries: Map<string, string>;
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

/** Unwraps an exports entry — a bare path, or the import/default arm of a condition object. */
function readExportTarget(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'object' && value !== null) {
    const conditions = value as Record<string, unknown>;
    const picked = conditions.import ?? conditions.default;
    if (typeof picked === 'string') {
      return picked;
    }
  }
  return undefined;
}

function readExportsMap(manifest: PackageManifest): Record<string, unknown> {
  return typeof manifest.exports === 'object' && manifest.exports !== null
    ? (manifest.exports as Record<string, unknown>)
    : {};
}

function readEntryField(manifest: PackageManifest): string | undefined {
  const dot = readExportTarget(readExportsMap(manifest)['.']);
  if (dot) {
    return dot;
  }
  if (typeof manifest.module === 'string') {
    return manifest.module;
  }
  return typeof manifest.main === 'string' ? manifest.main : undefined;
}

function readSubpathEntries(
  manifest: PackageManifest,
  dir: string,
): Map<string, string> {
  const entries = new Map<string, string>();

  for (const [key, value] of Object.entries(readExportsMap(manifest))) {
    if (key === '.' || !key.startsWith('./') || key.includes('*')) {
      continue;
    }
    const target = readExportTarget(value);
    const srcEntry = target ? distEntryToSrc(target) : null;
    if (srcEntry) {
      entries.set(key.slice(1), join(dir, srcEntry));
    }
  }

  return entries;
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

      map.set(manifest.name, {
        dir,
        bareEntry: join(dir, srcEntry),
        subpathEntries: readSubpathEntries(manifest, dir),
      });
    }
  }

  cache = map;
  return map;
}

export default getDsWorkspacePackages;

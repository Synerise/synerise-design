const path = require('path');
const fs = require('fs').promises;

const { smush, validateIsString } = require('./string');

const rootPath = path.resolve(__dirname, '..', '..');

const npmScope = '@synerise';
const packagePrefix = 'ds-';

const toPackageName = (str) => {
  validateIsString(str);
  return `${npmScope}/${packagePrefix}${smush(str)}`;
};

async function findPackageDirs(dir) {
  const results = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return results;
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const pkgJsonPath = path.join(full, 'package.json');
      try {
        await fs.access(pkgJsonPath);
        results.push(full);
      } catch {
        const nested = await findPackageDirs(full);
        if (nested.length) results.push(...nested);
      }
    }
  }
  return results;
}

/**
 * Returns an array of package-like objects:
 * { name, version, location, pkg }
 */
const getPackages = async () => {
  const packagesRoot = path.join(rootPath, 'packages');
  const pkgDirs = await findPackageDirs(packagesRoot);
  const packages = [];

  for (const dir of pkgDirs) {
    const pkgPath = path.join(dir, 'package.json');
    try {
      const raw = await fs.readFile(pkgPath, 'utf8');
      const pkg = JSON.parse(raw);
      packages.push({
        name: pkg.name || null,
        version: pkg.version || null,
        location: dir,
        pkg,
      });
    } catch {
      // ignore invalid/unreadable package.json
    }
  }

  return packages;
};


/** Synchronous version used by Babel config (Babel may not support async configs) */
function findPackageDirsSync(dir) {
  const results = [];
  let entries;
  try {
    entries = fsSync.readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const pkgJsonPath = path.join(full, 'package.json');
      try {
        fsSync.accessSync(pkgJsonPath);
        results.push(full);
      } catch {
        const nested = findPackageDirsSync(full);
        if (nested.length) results.push(...nested);
      }
    }
  }
  return results;
}

/** Synchronous variant returning same shape as async getPackages */
function getPackagesSync() {
  const packagesRoot = path.join(rootPath, 'packages');
  const pkgDirs = findPackageDirsSync(packagesRoot);
  const packages = [];

  for (const dir of pkgDirs) {
    const pkgPath = path.join(dir, 'package.json');
    try {
      const raw = fsSync.readFileSync(pkgPath, 'utf8');
      const pkg = JSON.parse(raw);
      packages.push({
        name: pkg.name || null,
        version: pkg.version || null,
        location: dir,
        pkg,
      });
    } catch {
      // ignore invalid/unreadable package.json
    }
  }

  return packages;
}

module.exports = {
  toPackageName,
  getPackages,
  getPackagesSync,
};

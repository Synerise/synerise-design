#!/usr/bin/env node

/**
 * Script to remove old Babel/LESS build scripts from all packages
 * These are now handled by Vite
 */

const fs = require('fs-extra');
const path = require('path');
const { glob } = require('glob');

const COMPONENTS_DIR = path.resolve(__dirname, '../packages/components');

// Scripts to remove (no longer needed with Vite)
const SCRIPTS_TO_REMOVE = ['build:css', 'build:js', 'defs'];

// Special scripts that should be kept in specific packages
const SPECIAL_KEEP = {
  '@synerise/ds-icon': ['build:svgr'], // Keep for manual execution
  '@synerise/ds-core': ['vars', 'copy'] // Keep for manual execution
};

async function main() {
  console.log('🧹 Cleaning up old build scripts...\n');

  // Find all component packages
  const packageJsonFiles = await glob('*/package.json', { cwd: COMPONENTS_DIR });

  let cleaned = 0;
  let skipped = 0;

  for (const file of packageJsonFiles) {
    const packageJsonPath = path.join(COMPONENTS_DIR, file);
    const packageJson = await fs.readJson(packageJsonPath);

    if (!packageJson.scripts) {
      skipped++;
      continue;
    }

    const packageName = packageJson.name;
    const scriptsToKeep = SPECIAL_KEEP[packageName] || [];

    let modified = false;
    const removedScripts = [];

    // Remove old build scripts
    for (const scriptName of SCRIPTS_TO_REMOVE) {
      if (packageJson.scripts[scriptName]) {
        delete packageJson.scripts[scriptName];
        removedScripts.push(scriptName);
        modified = true;
      }
    }

    if (modified) {
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
      cleaned++;

      const kept = scriptsToKeep.length > 0 ? ` (kept: ${scriptsToKeep.join(', ')})` : '';
      console.log(`✅ ${packageName} - removed: ${removedScripts.join(', ')}${kept}`);
    } else {
      skipped++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Cleaned: ${cleaned} packages`);
  console.log(`   Skipped: ${skipped} packages`);
  console.log(`\n✨ Cleanup complete!`);
}

main().catch((error) => {
  console.error('❌ Cleanup failed:', error);
  process.exit(1);
});

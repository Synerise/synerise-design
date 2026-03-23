#!/usr/bin/env node

/**
 * Script to migrate all component packages to Vite
 * - Creates vite.config.ts for packages that don't have one
 * - Updates package.json build scripts
 */

const fs = require('fs-extra');
const path = require('path');
const { glob } = require('glob');

const COMPONENTS_DIR = path.resolve(__dirname, '../packages/components');

// Standard vite.config.ts template
const VITE_CONFIG_TEMPLATE = (packageName) => `import { createViteConfig } from '../../../vite.config.base';
import { lessCompilePlugin } from '../../../scripts/vite/less-plugin';

export default createViteConfig('${packageName}', {
  plugins: [lessCompilePlugin()]
});
`;

async function main() {
  console.log('🚀 Starting Vite migration...\n');

  // Find all component packages
  const packageDirs = await glob('*/', { cwd: COMPONENTS_DIR });

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const dir of packageDirs) {
    const packagePath = path.join(COMPONENTS_DIR, dir);
    const viteConfigPath = path.join(packagePath, 'vite.config.ts');
    const packageJsonPath = path.join(packagePath, 'package.json');

    // Skip if vite.config.ts already exists
    if (await fs.pathExists(viteConfigPath)) {
      skipped++;
      continue;
    }

    // Read package.json
    if (!(await fs.pathExists(packageJsonPath))) {
      console.log(`⚠️  Skipping ${dir} - no package.json found`);
      skipped++;
      continue;
    }

    const packageJson = await fs.readJson(packageJsonPath);
    const packageName = packageJson.name;

    // Create vite.config.ts
    await fs.writeFile(viteConfigPath, VITE_CONFIG_TEMPLATE(packageName));
    created++;

    // Update package.json build scripts
    if (packageJson.scripts && packageJson.scripts.build) {
      const oldBuildScript = packageJson.scripts.build;

      // Update build scripts to use Vite
      packageJson.scripts.build = 'vite build';
      packageJson.scripts['build:watch'] = 'vite build --watch';

      // Keep old scripts for reference (commented out would be nice, but JSON doesn't support comments)
      // So we just update the active ones

      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
      updated++;

      console.log(`✅ ${packageName} - created vite.config.ts and updated package.json`);
    } else {
      console.log(`✅ ${packageName} - created vite.config.ts`);
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Created: ${created} vite configs`);
  console.log(`   Updated: ${updated} package.json files`);
  console.log(`   Skipped: ${skipped} packages`);
  console.log(`\n✨ Migration complete!`);
}

main().catch((error) => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
});

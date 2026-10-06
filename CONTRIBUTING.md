## Add new components

Step 1. To add new component run `pnpm run component:create`

Step 2. Type your component name.


If you create component with a few phrases use the kebab case (ex. `my-component`) in a second step called "Component Name".

Step 3. Run command `pnpm i` to set up your component.

Step 4. Go to your component directory and run `pnpm build`.

Step 5. Start or restart storybook app by command `pnpm storybook`

## Dependencies (knip)

[knip](https://knip.dev) checks that every `package.json` matches what its package imports. CI runs `pnpm knip:ci` in the `build_packages` job, after `pnpm build`, and fails on any finding. It runs two passes:

- `knip` checks the whole repo for unused and unlisted dependencies, plus unused files and exports in `packages/storybook` and `scripts/`.
- `knip --production --strict` checks each `@synerise/ds-*` package's runtime imports against **its own** manifest. An import that only resolves through the root `package.json` works in this repo but breaks in consuming apps, so it has to be listed in the package, usually as a peer dependency.

Both passes also read each package's built `dist/` through its `main`/`types`, so they check what is actually published. That includes imports that tsc inlines into a `.d.ts` from an inferred type, which appear nowhere in `src/`. This means a package whose published types import another package must list it in `dependencies`, not `devDependencies`. Run `pnpm build && pnpm knip` locally to match CI. Without a build, knip can report such a dependency as unused.

Unused exports are not reported for component packages. Each `src` file is built to its own `dist` file and is public through the `./dist/*` export, so `knip.config.ts` treats every non-test source file as an entry.

To silence a false positive, add it to `ignoreDependencies` (or `ignore` for files) in `knip.config.ts`, together with a comment explaining why knip cannot see the usage.

## Deployment

In order to deploy you need to checkout to a master branch and then run command:

```bash
pnpm lerna:version #Can be only run on a master branch (lerna.json)
```


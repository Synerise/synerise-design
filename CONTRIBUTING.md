## Add new components

Step 1. To add new component run `pnpm run component:create`

Step 2. Type your component name.


If you create component with a few phrases use the kebab case (ex. `my-component`) in a second step called "Component Name".

Step 3. Run command `pnpm i` to set up your component.

Step 4. Go to your component directory and run `pnpm build`.

Step 5. Start or restart storybook app by command `pnpm storybook`

## Deployment

In order to deploy you need to checkout to a master branch and then run command:

```bash
pnpm lerna:version #Can be only run on a master branch (lerna.json)
```


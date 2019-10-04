## Add new components

Step 1. To add new component run `yarn run component:create`
Step 2. Type your component name.

If you create component with a few phrases use the kebab case (ex. `my-component`) in a second step called "Component Name".

Step 3. Run command `yarn bootstrap` to set up your component.
Step 4. Go to your component directory and run `yarn build`.
Step 5. Start or restart storybook app by command `yarn storybook`

## Deployment

In order to deploy you need to checkout to a master branch and then run command:

```bash
yarn lerna:version #Can be only run on a master branch (lerna.json)
```


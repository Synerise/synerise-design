

module.exports = {
    addons:[
        '@storybook/addon-storysource',
        '@storybook/addon-knobs',
        '@storybook/addon-actions',
        // '@storybook/addon-docs',
        {
            name: '@storybook/addon-docs',
            options: {
              configureJSX: true,
              babelOptions: {},
              sourceLoaderOptions: null,
            },
        },
        '@storybook/addon-backgrounds',
        '@storybook/addon-notes/register',
        '@storybook/addon-links',
    ],
    // stories:['../stories/**/*.stories.tsx','../stories/**/*.mdx']
    stories:['../stories/**/*.stories.tsx']
}
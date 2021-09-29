

module.exports = {
    addons:[
        '@storybook/addon-storysource',
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
        '@storybook/addon-controls',
        // '@storybook/preset-create-react-app',
        '@storybook/addon-backgrounds',
        '@storybook/addon-notes/register',
        '@storybook/addon-links',
    ],
    // stories:['../stories/**/*.stories.tsx','../stories/**/*.mdx']
    stories:['../stories/**/*.stories.@(tsx|mdx)']
}
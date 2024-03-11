module.exports = {
  title: 'Design System',
  url: 'https://your-docusaurus-ds-docs.com', // Your website URL
  baseUrl: '/', // Base URL for your project */
  favicon: 'img/favicon.ico',
  plugins: [
    'docusaurus-plugin-sass',
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        // commenting out - we're currently skipping creating this file entirely
        // docs: {
          // sidebarPath: require.resolve('./sidebars.json'),
        // },
        theme: {
          customCss: require.resolve('./static/css/custom.scss'),
        }
      }
    ]
  ]
};

module.exports = {
  title: 'Design System',
  url: 'https://your-docusaurus-ds-docs.com', // Your website URL
  baseUrl: '/', // Base URL for your project */
  favicon: 'img/favicon.ico',
  plugins: [
    '@docusaurus/plugin-content-blog',
    '@docusaurus/plugin-content-pages',
    'docusaurus-plugin-sass',
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        theme: {
          customCss: require.resolve('./static/css/custom.scss'),
        }
      }
    ]
  ]
};

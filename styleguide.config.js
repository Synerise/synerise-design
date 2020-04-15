const path = require('path');

module.exports = {
  title: 'Synerise Design System',
  components: './packages/components/**/*.tsx',
  assetsDir: './docs/assets',
  styleguideDir: './docs/dist',
  pagePerSection: true,
  sections: [
    {
      name: 'Intro',
      content: 'docs/intro.md'
    },
    {
      name: 'Colors' ,
      content: 'docs/colors.md'
    },
    {
      name: 'Components',
      components: () => {
        return [
          './packages/components/avatar/src/Avatar.tsx',
          './packages/components/button/src/Button.tsx'
        ]
      }
    }
  ],
  usageMode: 'expand',
  theme: {
    color: {
      base: '#6a7580',
      light: '#949ea6',
      lightest: '#b5bdc3',
      link: '#0b68ff',
      linkHover: '#0044d9',
      focus: '#0044d9',
      border: '#dbe0e3',
      name: '#690',
      type: '#905',
      error: '#c00',
      baseBackground: '#fff',
      codeBackground: '#f5f5f5',
      sidebarBackground: '#f5f5f5',
      ribbonBackground: '#e90',
      ribbonText: '#fff',
    },
    fontSize: {
      base: 16,
      text: 16,
      small: 13,
      h1: 48,
      h2: 30,
      h3: 21,
      h4: 18,
      h5: 16,
      h6: 16,
    },
  },
  verbose: true,
  skipComponentsWithoutExample: true,
  webpackConfig: require('./config/styleguidist/webpack.config.js'),
  ignore: ['**/*.styles.tsx', '**/*.spec.tsx', '**/utils/**/*', '**/node_modules/**/*', '**/*.types.tsx', '**/*.context.tsx', '**/icon/**/*', 'packages/components/**/dist/*.js'],
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'docs/theme/components/Wrapper/Wrapper'),
    ToolbarButtonRenderer: path.join(__dirname, 'docs/theme/components/ToolbarButton/ToolbarButtonRenderer'),
    ReactComponentRenderer: path.join(__dirname, 'docs/theme/components/ReactComponent/ReactComponentRenderer'),
    SectionHeadingRenderer: path.join(__dirname, 'docs/theme/components/SectionHeading/SectionHeadingRenderer'),
    ExamplesRenderer: path.join(__dirname, 'docs/theme/components/Examples/ExamplesRenderer'),
    Props: path.join(__dirname, 'docs/theme/components/Props/PropsRenderer'),
  }
}

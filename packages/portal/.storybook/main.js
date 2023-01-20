// import webpackFinal from './webpack.config.js';
// const webpackFinal = require('./webpack.config.js'); ERR! TypeError: Cannot destructure property 'configType' of 'undefined' as it is undefined. ERR!     at module.exports (@/.storybook/webpack.config.js:1:80)
// console.info('webpackFinal', webpackFinal)

/** @type { import("@storybook/core-common").StorybookConfig } */
module.exports = {
  open: false, // fullOptions
  "core": {
    builder: "webpack5",// || require.resolve("@storybook/builder-webpack5"),
    // getBuilder:(name = config => config.core.builder) => `builder-${name}`
    // used by
    // caller: require(''),
    disableTelemetry: true,
    // crossOriginIsolated: false,
      options: {
        lazyCompilation: true,
        fsCache: true,
      },
  },
  "framework": "@storybook/react",
  "addons": [
    '@storybook/addon-knobs',
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  features: {
    storyStoreV7: false,
    // storyStoreV7: process.env.NO_STORYSTOREV7 ? false : true,
    previewCsfV3: true,
    // interactionsDebugger: true,
    babelModeV7: true,
    disableTelemetry: true,
  },
  "stories": [
    // "../stories/**/*.stories.mdx",
    // "../stories/**/*.stories.@(js|jsx|ts|tsx)"
    // "../stories/components/Badge",
    // "../stories/components/Alert",
    // "../stories/components/aademo",
  // ] || [
    "../stories/components/AccordionMenu",
    "../stories/components/ActionArea",
    "../stories/components/Alert",
    "../stories/components/AppMenu",
    "../stories/components/Autocomplete",
    "../stories/components/Avatar",
    "../stories/components/AvatarGroup",
    "../stories/components/Badge",
    "../stories/components/BroadcastBar",
    "../stories/components/Button",
    "../stories/components/ButtonCheckbox",
    "../stories/components/ButtonGroup",
    "../stories/components/ButtonStar",
    "../stories/components/Card",
    "../stories/components/CardSelect",
    "../stories/components/CardTabs",
    "../stories/components/Cascader",
    "../stories/components/Checkbox",
    "../stories/components/CheckboxTristate",
    "../stories/components/CodeSnippet",
    "../stories/components/Collector",
    "../stories/components/ColorPicker",
    "../stories/components/ColumnManager",
    "../stories/components/CompletedWithin",
    "../stories/components/Condition",
    "../stories/components/ContextSelector",
    "../stories/components/Cruds",
    "../stories/components/DatePicker",
    "../stories/components/DateRangePicker",
    "../stories/components/Description",
    "../stories/components/Divider",
    "../stories/components/Drawer",
    "../stories/components/Dropdown",
    "../stories/components/EditableList",
    "../stories/components/EmptyStates",
    "../stories/components/Factors",
    "../stories/components/FieldSet",
    "../stories/components/Fileuploader",
    "../stories/components/Filter",
    "../stories/components/Flag",
    "../stories/components/Footer",
    "../stories/components/Form",
    "../stories/components/FormatPicker",
    "../stories/components/FrontSide",
    "../stories/components/Grid",
    "../stories/components/Icon",
    "../stories/components/IconAlert",
    "../stories/components/IconPicker",
    "../stories/components/InformationCard",
    "../stories/components/InlineEdit",
    "../stories/components/InlineNote",
    "../stories/components/Input",
    "../stories/components/InputNumber",
    "../stories/components/ItemFilter",
    "../stories/components/ItemPicker",
    "../stories/components/ItemsRoll",
    "../stories/components/Layout",
    "../stories/components/List",
    "../stories/components/Loader",
    "../stories/components/Logic",
    "../stories/components/ManageableList",
    "../stories/components/Menu",
    "../stories/components/Message",
    "../stories/components/Modal",
    "../stories/components/Navbar",
    "../stories/components/Notification",
    "../stories/components/Operators",
    "../stories/components/OrderedList",
    "../stories/components/PageHeader",
    "../stories/components/Pagination",
    "../stories/components/Popconfirm",
    "../stories/components/ProgressBar",
    "../stories/components/Radio",
    "../stories/components/Result",
    "../stories/components/Scrollbar",
    "../stories/components/Search",
    "../stories/components/SearchBar",
    "../stories/components/SectionMessage",
    "../stories/components/Select",
    "../stories/components/Sidebar",
    "../stories/components/SidebarObject",
    "../stories/components/Skeleton",
    "../stories/components/Slider",
    "../stories/components/Status",
    "../stories/components/StepCard",
    "../stories/components/Stepper",
    "../stories/components/Subject",
    "../stories/components/SubtleForm",
    "../stories/components/Switch",
    "../stories/components/Table",
    "../stories/components/Tabs",
    "../stories/components/Tags",
    "../stories/components/TagsList",
    "../stories/components/TimePicker",
    "../stories/components/Toast",
    "../stories/components/ToolbarButtons",
    "../stories/components/Tooltip",
    "../stories/components/TreeMenu",
    "../stories/components/UnorderedList",
    "../stories/components/Wizard",
  ],
  // /** @type { import('webpack').Compilation } */
  // webpackFinal: require('./webpack.config.js').default,
  /* called by require22('@storybook/builder-webpack5/dist/cjs/presets/custom-webpack-preset') loadCustomWebpackConfig */
  // webpackConfig: (c) => {
  //   return c
  // },
  webpackFinal: (config /** typeof require('webpack').Compilation */, { configType }) => {
    // config.target = 'node'
    // require('./webpack.config.js')({config, mode: configType}) // already called by custom-webpack-preset
    // webpackConfig is deprecated
    config.module.rules.push({
      test: /\.(js|mjs|jsx)$/,
      resolve: {
        fullySpecified: false
      },
    });

    // config.resolve.alias['@'] = path.resolve(__dirname, '../../components');

    config.module.rules.push({
      test: /\.less$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
          },
        },
      ],
    });

    // const storiesToCsf3 = require(__dirname + '/decorated-story-to-csf3')
    // console.info('storiesToCsf3', process.cwd(), storiesToCsf3)
 
    const babelEnv = [
      "@babel/preset-env",
      {
        // "useBuiltIns": "entry",
        // "corejs": "3.22",
        // targets: 'es2019', // https://www.npmjs.com/package/babel-preset-modern-browsers
        "modules": 'amd',
      }
    ]

    /** @type { import("webpack").RuleSetRule } */
    const babelLoader = {
      test: /\.tsx?$/,
      exclude: /node_modules/, // performance?
      use: [
        {
          loader: 'babel-loader' || require('babel-loader'),
          // exclude: /node_modules/,
          options: {
            presets: [
              // babelEnv, // changes order of exports (_exports_)
              'babel-preset-react-app',
            ],
            // plugins: [storiesToCsf3],
            plugins: ['./.storybook/decorated-story-to-csf3'],
          }
        }
      ]
    }
    config.module.rules.push(babelLoader);
    return config;
  },
}

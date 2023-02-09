const path = require('path');

// const { babelPluginTransformRenameImport } = require("./import-replacements");

// const importFromDist = process.env.PACKAGES_FROM_DIST === 'true';
const importFromDist = false;

/** @type { import("@storybook/core-common").StorybookConfig } */
module.exports = {
  "core": {
    builder: "webpack5",
    disableTelemetry: true,
      options: {
        // lazyCompilation: true,
        fsCache: true,
      },
  },
  "framework": "@storybook/react",
  "addons": [
    '@storybook/addon-knobs', // addon-knobs/dist/register
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  features: {
    // storyStoreV7: process.env.NO_STORYSTOREV7 ? false : true,
    storyStoreV7: false,
    previewCsfV3: true,
    // interactionsDebugger: true,
    babelModeV7: true,
    disableTelemetry: true,
  },
  "stories": [
    // "../stories/**/*.stories.mdx",
    // "../stories/**/*.stories.@(js|jsx|ts|tsx)"
    // "../stories/components/Condition", // imports ds-condition
    // "../stories/components/Filter", // imports failing ds-condition
    // "../stories/components/Icon", // Module not found: Error: Resolving to directories is not possible with the exports field (request was ./dist/esm/icons/)
    // "../stories/components/InformationCard", // Module not found: Error: Can't resolve '@synerise/ds-icon/dist/cjs' in './node_modules/@synerise/ds-information-card/dist'
    // "../stories/components/InlineNote", // Module not found: Error: Resolving to directories is not possible with the exports field (request was ./dist/esm/icons/)
    // "../stories/components/Notification", // ModuleNotFoundError: Module not found: Error: Resolving to directories is not possible with the exports field (request was ./dist/esm/icons/)
    // "../stories/components/Radio", // ModuleNotFoundError: Module not found: Error: Can't resolve '@/radio/README.md' in '/Users/syne0152/synerise-design/packages/portal/stories/components/Radio'
    // "../stories/components/Result", // Module not found: Error: Resolving to directories is not possible with the exports field (request was ./dist/esm/icons/)
    // "../stories/components/SectionMessage", // Module not found: Error: Resolving to directories is not possible with the exports field (request was ./dist/esm/icons/)
    // "../stories/components/StepCard", // Module not found: Error: Can't resolve '@synerise/ds-completed-within' in './packages/portal/stories/components/StepCard'
    // ds-condition/dist/condstep/stepheader Module not found: Error: Resolving to directories is not possible with the exports field (request was ./)
    // "../stories/components/Switch", // ModuleNotFoundError: Module not found: Error: Can't resolve '@/radio/README.md' in '/Users/syne0152/synerise-design/packages/portal/stories/components/Switch'
    // "../stories/components/Table", // ModuleNotFoundError: Module not found: Error: Can't resolve '@synerise/ds-alert' in '/Users/syne0152/synerise-design/node_modules/@synerise/ds-column-manager/dist/ColumnManagerGroupSettings'
    // "../stories/components/Toast", // Module not found: Error: Can't resolve '@synerise/ds-icon/dist/esm/icons' in './packages/portal/stories/components/Toast'
    // "../stories/components/TreeMenu", // ModuleNotFoundError: Module not found: Error: Can't resolve '@synerise/ds-button' in '/Users/syne0152/synerise-design/packages/components/treemenu/src/AddModal'
  ] || [
    "../stories/components/EditableList",
    "../stories/components/ColumnManager",
    "../stories/components/InformationCard",
    "../stories/components/Button",
    "../stories/components/Alert",
    "../stories/components/AccordionMenu",
    "../stories/components/ActionArea",
    "../stories/components/AppMenu",
    "../stories/components/Autocomplete",
    "../stories/components/Avatar",
    "../stories/components/Badge",
    "../stories/components/AvatarGroup",
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
    "../stories/components/CompletedWithin",
    "../stories/components/Cruds",
    "../stories/components/DatePicker",
    "../stories/components/DateRangePicker",
    "../stories/components/ContextSelector",
    "../stories/components/Description",
    "../stories/components/Divider",
    "../stories/components/Drawer",
    "../stories/components/Dropdown",
    "../stories/components/EmptyStates", // Module not found: Error: Can't resolve '@synerise/ds-icon/dist/esm/icons/L' in './packages/portal/stories/components/EmptyStates'
    "../stories/components/Factors", // imports information-card which fails due to ds-icon
    "../stories/components/FieldSet",
    "../stories/components/Fileuploader",
    "../stories/components/Flag",
    "../stories/components/Footer",
    "../stories/components/Form", // TypeError: Cannot assign to read only property 'message' of object 'SyntaxError: Missing semicolon. (2:18)
    "../stories/components/FormatPicker",
    "../stories/components/FrontSide",
    "../stories/components/Grid",
    "../stories/components/IconAlert",
    "../stories/components/IconPicker",
    "../stories/components/InlineEdit",
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
    "../stories/components/Operators",
    "../stories/components/OrderedList",
    "../stories/components/PageHeader",
    "../stories/components/Pagination",
    "../stories/components/Popconfirm",
    "../stories/components/ProgressBar",
    "../stories/components/Scrollbar",
    "../stories/components/Search",
    "../stories/components/SearchBar",
    "../stories/components/Select",
    "../stories/components/Sidebar",
    "../stories/components/SidebarObject",
    "../stories/components/Skeleton",
    "../stories/components/Slider",
    "../stories/components/Status",
    "../stories/components/Stepper",
    "../stories/components/Subject",
    "../stories/components/SubtleForm",
    "../stories/components/Tabs",
    "../stories/components/Tags",
    "../stories/components/TagsList",
    "../stories/components/TimePicker",
    "../stories/components/ToolbarButtons",
    "../stories/components/Tooltip",
    "../stories/components/UnorderedList",
    "../stories/components/Wizard",
  ],
  webpackFinal: (config /** typeof require('webpack').Compilation */, { configType }) => {
    config.module.rules.push({
      test: /\.(js|mjs|jsx)$/,
      resolve: {
        fullySpecified: false
      },
    });

    config.resolve.fallback = {
      ...config.resolve.fallback,
      // 'highlight.js/lib/languages': require('path').resolve(__dirname, '../../../node_modules/highlight.js/lib/languages'),
      // '@storybook/addon-knobs/dist/register': require('path').resolve(__dirname, '../../../node_modules/highlight.js/lib/languages'),
      // 'react-select/dist/react-select.browser.esm.js': require('path').resolve(__dirname, '../../../node_modules/react-select/dist/react-select.browser.esm.js'),
      'react-select/dist/react-select.browser.esm.js': require('path').resolve(__dirname, '../../../node_modules/react-select/dist/react-select.browser.cjs.js'),
      '@synerise/ds-icon/dist/cjs': require('path').resolve(__dirname, '../../../node_modules/@synerise/ds-icon/dist/cjs'),
    }

    config.resolve.alias = {
      // ...config.resolve.alias,
      // xyz$: path.resolve(__dirname, 'path/to/file.js'),
      // 'react-select/dist/react-select.browser.esm.js': path.resolve(__dirname, '../../../node_modules/react-select/dist/react-select.browser.cjs.js'),
    }

    // config.resolve.importsFields = [];

    if (1) {
      const tmpDir = path.join(require('os').tmpdir(), '.webpack_cache');
      console.info('tempDir', tmpDir)
      config.cache = {
        type: 'filesystem',
        allowCollectingMemory: true,
        // cacheDirectory: path.resolve(__dirname, '.temp_cache'),
        // cacheDirectory: path.resolve('tmp', '.temp_cache'),
        cacheDirectory: tmpDir,
      }
    }

    // config.resolve.alias['@'] = path.resolve(__dirname, '../../components'); // ModuleNotFoundError: Module not found: Error: Can't resolve '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme' in '/Users/syne0152/synerise-design/node_modules/@synerise/ds-utils/dist/selectColorByLetter'

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

    /** @type { import("webpack").RuleSetRule } */
    const babelLoader = {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              'babel-preset-react-app',
            ],
            plugins: ['./.storybook/decorated-story-to-csf3']
              // .concat(['./.storybook/decorated-story-to-csf3'])
              // .concat(importFromDist ? [] : [babelPluginTransformRenameImport])
            ,
          }
        }
      ]
    }
    config.module.rules.push(babelLoader);
    return config;
  },
}

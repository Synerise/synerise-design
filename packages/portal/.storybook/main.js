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
    '@storybook/addon-knobs',
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
    // "../stories/components/Badge", // first simple (few dependencies) for testing
    // "../stories/components/Alert", // second simple component (also for testing/benchmarking)
    // "../stories/components/CodeSnippet", // ModuleNotFoundError: Module not found: Error: Package path ./lib/languages is not exported from package /Users/syne0152/synerise-design/node_modules/highlight.js (see exports field in ./node_modules/highlight.js/package.json)
    // "../stories/components/InformationCard", // Module not found: Error: Can't resolve '@synerise/ds-icon/dist/cjs' in './node_modules/@synerise/ds-information-card/dist'
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
    // "../stories/components/CodeSnippet", // problems with importing languages syntax...
    "../stories/components/Collector",
    "../stories/components/ColorPicker",
    "../stories/components/ColumnManager",
    "../stories/components/CompletedWithin",
    // "../stories/components/Condition", // imports ds-condition
    // "../stories/components/ContextSelector", // requires info-card
    "../stories/components/Cruds",
    "../stories/components/DatePicker",
    "../stories/components/DateRangePicker",
    "../stories/components/Description",
    "../stories/components/Divider",
    "../stories/components/Drawer",
    "../stories/components/Dropdown",
    "../stories/components/EditableList",
    // "../stories/components/EmptyStates", // Module not found: Error: Can't resolve '@synerise/ds-icon/dist/esm/icons/L' in './packages/portal/stories/components/EmptyStates'
    // "../stories/components/Factors", imports information-card which fails due to ds-icon
    "../stories/components/FieldSet",
    "../stories/components/Fileuploader",
    // "../stories/components/Filter", // imports failing ds-condition
    "../stories/components/Flag",
    "../stories/components/Footer",
    // "../stories/components/Form", // TypeError: Cannot assign to read only property 'message' of object 'SyntaxError: Missing semicolon. (2:18)
    "../stories/components/FormatPicker",
    "../stories/components/FrontSide",
    "../stories/components/Grid",
    // "../stories/components/Icon", // Module not found: Error: Resolving to directories is not possible with the exports field (request was ./dist/esm/icons/)
    "../stories/components/IconAlert",
    "../stories/components/IconPicker",
    // "../stories/components/InformationCard", // Module not found: Error: Can't resolve '@synerise/ds-icon/dist/cjs' in './node_modules/@synerise/ds-information-card/dist'
    "../stories/components/InlineEdit",
    // "../stories/components/InlineNote", // Module not found: Error: Resolving to directories is not possible with the exports field (request was ./dist/esm/icons/)
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
    // "../stories/components/Notification", // icon
    "../stories/components/Operators",
    "../stories/components/OrderedList",
    "../stories/components/PageHeader",
    "../stories/components/Pagination",
    "../stories/components/Popconfirm",
    "../stories/components/ProgressBar",
    "../stories/components/Radio",
    // "../stories/components/Result", // Module not found: Error: Resolving to directories is not possible with the exports field (request was ./dist/esm/icons/)
    "../stories/components/Scrollbar",
    "../stories/components/Search",
    "../stories/components/SearchBar",
    // "../stories/components/SectionMessage", // Module not found: Error: Resolving to directories is not possible with the exports field (request was ./dist/esm/icons/)
    "../stories/components/Select",
    "../stories/components/Sidebar",
    "../stories/components/SidebarObject",
    "../stories/components/Skeleton",
    "../stories/components/Slider",
    "../stories/components/Status",
    // "../stories/components/StepCard", // Module not found: Error: Can't resolve '@synerise/ds-completed-within' in './packages/portal/stories/components/StepCard'
    // ds-condition/dist/condstep/stepheader Module not found: Error: Resolving to directories is not possible with the exports field (request was ./)
    "../stories/components/Stepper",
    "../stories/components/Subject",
    "../stories/components/SubtleForm",
    "../stories/components/Switch",
    "../stories/components/Table",
    "../stories/components/Tabs",
    "../stories/components/Tags",
    "../stories/components/TagsList",
    "../stories/components/TimePicker",
    // "../stories/components/Toast", // Module not found: Error: Can't resolve '@synerise/ds-icon/dist/esm/icons' in './packages/portal/stories/components/Toast'
    "../stories/components/ToolbarButtons",
    "../stories/components/Tooltip",
    "../stories/components/TreeMenu",
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

    if (0) {
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

    config.resolve.alias['@'] = path.resolve(__dirname, '../../components');

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

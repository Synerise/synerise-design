export const controlFromOptionsArray = (type: string, options: readonly (string | number | undefined | null)[]) => {
  return {
    control: type,
    options: [...options],
  };
};

type tableConfigOptions = {
  summary?: string;
  detail?: string;
  category?: string;
  defaultValue?: string;
};
export const tableConfig = ({ category, summary, detail, defaultValue }: tableConfigOptions) => {
  return {
    table: {
      category,
      type: { summary, detail },
      defaultValue,
    },
  };
};

export const reactNodeAsSelect = (options, mapping) => {
  return {
    table: {
      type: {
        summary: 'ReactNode',
      },
    },
    ...controlFromOptionsArray('select', options),
    mapping,
  };
};

export const REACT_NODE_AS_STRING = {
  table: {
    type: {
      summary: 'ReactNode',
    },
  },
  control: 'text',
};

export const BOOLEAN_CONTROL = {
  control: 'boolean',
};

export const STRING_CONTROL = {
  control: 'text',
};

export const NUMBER_CONTROL = {
  control: 'number',
};

export const COLOR_CONTROL = {
  control: 'color',
};

export const COLOR_HUE_CONTROL = {
  ...controlFromOptionsArray('select', ['050', '100', '200', '300', '300', '400', '500', '600', '700', '800', '900']),
};

export const STYLE_ARG_CONTROL = {
  table: {
    category: 'Common',
    type: {
      summary: 'CSSProperties',
      detail: 'CSS for the style attribute of the outermost wrapper',
    },
  },
  control: false,
};

export const CLASSNAME_ARG_CONTROL = {
  table: {
    category: 'Common',
    type: {
      summary: 'string',
      detail: 'class name added to the outermost wrapper',
    },
  },
  control: false,
};

export const PREFIXCLS_ARG_CONTROL = {
  table: {
    category: 'Common',
    type: {
      summary: 'string',
      detail: 'prefix class name, overwrites default antd prefixes',
    },
  },
  control: false,
};

export const GETPOPUPCONTAINER_ARG_CONTROL = {
  control: false,
};

export const stringWithNoControl = (detail?: string) => {
  return {
    table: {
      type: {
        summary: 'string',
        detail: detail,
      },
    },
    control: false,
  };
};

export const THEME_PALETTE_COLOR_NAMES_CONTROL = controlFromOptionsArray('select', [
  'blue',
  'grey',
  'red',
  'green',
  'yellow',
  'pink',
  'mars',
  'orange',
  'fern',
  'cyan',
  'purple',
  'violet',
]);

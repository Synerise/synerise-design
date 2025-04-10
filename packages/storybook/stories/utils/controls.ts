type ControlType = 'object' | 'boolean' | 'check' | 'inline-check' | 'radio' | 'inline-radio' | 'select' | 'multi-select' | 'number' | 'range' | 'file' | 'color' | 'date' | 'text';

export const controlFromOptionsArray = <T extends ControlType>(type: T, options: readonly (string | number | undefined | null)[]) => {
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
} as const;

export const REACT_NODE_NO_CONTROL = {
  table: {
    type: {
      summary: 'ReactNode',
    },
  },
  control: 'false',
} as const;

export const BOOLEAN_CONTROL = {
  control: 'boolean',
} as const;

export const STRING_CONTROL = {
  control: 'text',
} as const;

export const NUMBER_CONTROL = {
  control: 'number',
} as const;

export const COLOR_CONTROL = {
  control: 'color',
} as const;

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
} as const;

export const CLASSNAME_ARG_CONTROL = {
  table: {
    category: 'Common',
    type: {
      summary: 'string',
      detail: 'class name added to the outermost wrapper',
    },
  },
  control: false,
} as const;

export const PREFIXCLS_ARG_CONTROL = {
  table: {
    category: 'Common',
    type: {
      summary: 'string',
      detail: 'prefix class name, overwrites default antd prefixes',
    },
  },
  control: false,
} as const;

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

import React, {  } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import Select from '@synerise/ds-select';
import type { SelectProps} from '@synerise/ds-select';
import Loader from '@synerise/ds-loader';
import { getPopupContainer } from '@synerise/ds-utils';
import Scrollbar from '@synerise/ds-scrollbar';
import Result from '@synerise/ds-result';


import { BOOLEAN_CONTROL, CLASSNAME_ARG_CONTROL, controlFromOptionsArray, fixedWrapper200, fixedWrapper400, GETPOPUPCONTAINER_ARG_CONTROL, NUMBER_CONTROL, PREFIXCLS_ARG_CONTROL, REACT_NODE_AS_STRING, STRING_CONTROL, STYLE_ARG_CONTROL } from '../../utils';
import { addonType, childrens, defaultRender, renderAddonComponent, values } from './data';

const { Option } = Select;


export default {
  component: Select,
  title: 'Components/Select',
  tags: ['autodocs'],
  decorators: [fixedWrapper200],
  parameters: {
    controls: {
      exclude: ['animation', 'internalProps', 'choiceTransitionName', 'direction', 'filterOption', 'inputValue']
    }
  },
  render: defaultRender,
  argTypes: {
    children: {
      ...REACT_NODE_AS_STRING,
      control: false
    },
    dropdownClassName: {
      ...STRING_CONTROL,
    },
    dropdownMatchSelectWidth: {
      ...BOOLEAN_CONTROL
    },
    dropdownStyle: {
      control: false
    },
    getPopupContainer: {
      ...GETPOPUPCONTAINER_ARG_CONTROL
    },
    clearIcon: {
      ...REACT_NODE_AS_STRING,
      control: false
    },
    description: {
      ...REACT_NODE_AS_STRING
    },
    clearTooltip: STRING_CONTROL,
    allowClear: {
      ...BOOLEAN_CONTROL
    },
    defaultValue: {
      control: 'text'
    },
    autoClearSearchValue: {
      ...BOOLEAN_CONTROL
    },
    autoFocus: {
      ...BOOLEAN_CONTROL
    },
    bordered: {
      ...BOOLEAN_CONTROL
    },
    defaultActiveFirstOption: {
      ...BOOLEAN_CONTROL
    },
    defaultOpen: {
      ...BOOLEAN_CONTROL
    },
    disabled: {
      ...BOOLEAN_CONTROL
    },
    error: {
      ...BOOLEAN_CONTROL
    },
    errorText: {
      ...REACT_NODE_AS_STRING
    },
    placeholder: {
      ...REACT_NODE_AS_STRING
    },
    prefixel: {
      ...REACT_NODE_AS_STRING
    },
    searchValue: {
      ...STRING_CONTROL
    },
    suffixel: {
      ...REACT_NODE_AS_STRING
    },
    tooltip:  {
      ...REACT_NODE_AS_STRING
    },

    id: STRING_CONTROL,
    optionFilterProp: STRING_CONTROL,
    optionLabelProp: STRING_CONTROL,
    listHeight: {
      ...STRING_CONTROL
    },
    listItemHeight: {
      ...NUMBER_CONTROL
    },
    maxTagCount: {
      ...NUMBER_CONTROL
    },
    maxTagTextLength: {
      ...NUMBER_CONTROL
    },
    maxTagPlaceholder: {
      ...REACT_NODE_AS_STRING
    },
    notFoundContent: {
      ...REACT_NODE_AS_STRING,
      control: 'object'
    },
    menuItemSelectedIcon: {
      control: false,
    },
    filterOption: {
      control: false,
    },
    grey: {
      ...BOOLEAN_CONTROL
    },
    labelInValue: {
      ...BOOLEAN_CONTROL
    },
    loading: {
      ...BOOLEAN_CONTROL
    },
    open: {
      ...BOOLEAN_CONTROL
    },
    prefixCls: PREFIXCLS_ARG_CONTROL,
    style: STYLE_ARG_CONTROL, 
    className: CLASSNAME_ARG_CONTROL,
    showArrow: {
      ...BOOLEAN_CONTROL
    },
    showSearch: {
      ...BOOLEAN_CONTROL
    },
  }
} as Meta<SelectProps>;

type Story = StoryObj<SelectProps & { disabledChildren: boolean }>;


export const Default: Story = {
  render: ({disabledChildren,...args}) => {
    const optionalDisabledChildren = disabledChildren ? values.map(opt => <Option disabled={disabledChildren} value={opt}>{opt}</Option>) : values.map(opt => <Option value={opt}>{opt}</Option>)
    return (
      <Select
        {...args}
        children={optionalDisabledChildren}
      />
    );
      },
  args: {
    mode: undefined,
    label: 'Label',
    defaultValue: values[0],
    description: 'Description',
    disabledChildren: false,
  },
};

export const MultipleMode: Story = {
  decorators: [fixedWrapper400],
  args: {
      style: {
        width: '100%',
      },
      mode: 'multiple',
      defaultValue: 'a10',
      placeholder: 'Select options',
      getPopupContainer,
      dropdownRender: menu => <Scrollbar maxHeight={256}>{menu}</Scrollbar>,
      dropdownStyle: { paddingRight: '0' },
      notFoundContent: <Result type="no-results" noSearchResults description={'No results'} />,
      listHeight: '100%',
      children: childrens.map(opt => <Option value={opt}>{opt}</Option>),
  }
}


export const NoResults: Story = {
  parameters: {
    controls: {
      include: ['notFoundContent', 'open']
    }
  },
  args: {
    open: true,
    notFoundContent: <Result type="no-results" noSearchResults description={'No results'} />,
  }
}


export const WithPrefixAndSuffix: StoryObj<SelectProps & {prefixType: string; suffixType: string, prefixText: string, suffixText: string}> = {
  render: (args) => {
    return defaultRender({
      ...args,
      prefixel: renderAddonComponent(args.prefixType, args.prefixText),
      suffixel: renderAddonComponent(args.suffixType, args.suffixText),
    })
  },
  parameters: {
    controls: {
      include: ['prefixType', 'prefixText', 'suffixType', 'suffixText']
    }
  },
  argTypes: {
    prefixType: controlFromOptionsArray('select', Object.keys(addonType)),
    suffixType: controlFromOptionsArray('select', Object.keys(addonType)),
    prefixText: {
      control: 'text'
    },
    suffixText: {
      control: 'text'
    }
  },
  args: {
      prefixText: 'Prefix',
      suffixText: 'Suffix',
      prefixType: 'label',
      suffixType: 'label',
      placeholder: 'Select options',
  }
}


export const Loading: Story = {
  parameters: {
    controls: {
      include: ['open', 'notFoundContent']
    }
  },
  args: {
    open: true,
    notFoundContent: (
      <div style={{ padding: '40px' }}>
        <Loader label="Loading..." />
      </div>
    ),
    placeholder: 'Loading Indicator',
  }
}
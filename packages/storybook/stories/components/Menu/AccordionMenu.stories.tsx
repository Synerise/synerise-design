import React, { useMemo, useState } from 'react';
import type { StoryObj, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Checkbox from '@synerise/ds-checkbox';
import Tooltip from '@synerise/ds-tooltip';
import Icon, { CheckS } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import Menu, { AntdMenuProps } from '@synerise/ds-menu';

import {
  fixedWrapper200,
  CLASSNAME_ARG_CONTROL,
  REACT_NODE_AS_STRING,
  BOOLEAN_CONTROL,
  controlFromOptionsArray,
} from '../../utils';

import { StyledInlineEditMenu } from './AccordionMenu.styles';
import {
  initialSelectedKeys,
  parentChilds,
  prefixType,
  renderPrefixIcon,
  renderSuffix,
  suffixType
} from './AccordionMenu.data';

const initialOpenKeys = ['p1-Parent 1'];

type SizeType = 'default' | 'large';

type StoryType = AntdMenuProps & {
  checkboxVisibilityTrigger: boolean;
  setDivider: boolean;
  disabled: boolean;
  ordered: boolean;
  description: string;
  size: SizeType;
  suffixel: keyof typeof suffixType;
  prefixel: keyof typeof prefixType;
};

type Story = StoryObj<StoryType>;

export default {
  title: 'Components/Menu/AccordionMenu',
  tags: ['autodocs'],
  component: Menu,
  decorators: [fixedWrapper200],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    ordered: BOOLEAN_CONTROL,
    selectedKeys: REACT_NODE_AS_STRING,
    selectable: BOOLEAN_CONTROL,
    checkboxVisibilityTrigger: BOOLEAN_CONTROL,
    setDivider: BOOLEAN_CONTROL,
    disabled: BOOLEAN_CONTROL,
    suffixel: {
      ...controlFromOptionsArray('select', Object.keys(suffixType)),
      mapping: suffixType,
    },
    prefixel: {
      ...controlFromOptionsArray('select', ['singleIcon', 'twoIcons', 'avatar', 'checkbox', 'none']),
    },
    size: {
      ...controlFromOptionsArray('select', ['default', 'large']),
    },
    dataSource: { control: false },
  },
} as Meta<typeof Menu>;

export const Default: Story = {
  args: {
    setDivider: true,
    ordered: true,
    selectable: true,
    checkboxVisibilityTrigger: true,
    disabled: false,
    description: 'description',
    size: 'large',
    suffixel: 'none',
    prefixel: 'none',
  },
  render: ({
    setDivider,
    checkboxVisibilityTrigger,
    disabled,
    ordered,
    size,
    description,
    prefixel,
    suffixel,
    ...menuArgs
  }) => {
    const [checkedKeys, setCheckedKeys] = useState(initialSelectedKeys);
    const [openKeys, setOpenKeys] = useState(initialOpenKeys);
    const [suffixElement1, setSuffixElement1] = useState(false);
    const [suffixElement2, setSuffixElement2] = useState(false);
    const [suffixElement3, setSuffixElement3] = useState(false);

    const updateCheckedKeys = (value, key) => {
      const newSelectedKeys = { ...checkedKeys, [key]: value };
      setCheckedKeys(newSelectedKeys);
    };
    const checkParentChilds = key => {
      const children = parentChilds[key];
      const checked = children.filter(child => checkedKeys[child]);
      return checked.length === children.length;
    };
    const checkAllChildren = (key, value) => {
      const children = parentChilds[key];
      const newSelectedKeys = { ...checkedKeys };
      children.forEach(child => {
        newSelectedKeys[child] = value;
      });
      setCheckedKeys(newSelectedKeys);
    };
    const checkIfParentHasChecked = key => {
      const children = parentChilds[key];
      const checked = children.filter(child => checkedKeys[child]);
      return checked.length > 0 && checked.length < children.length;
    };
    const subMenuElement1 = initValue => {
      const [value, setValue] = useState<string>(initValue);
      const key = useMemo(() => `p1-${initValue}`, [initValue]);
      const [renameElement, setRenameElement] = useState(false);
      return {
        text: renameElement ? (
          <Tooltip title={<div style={{ wordBreak: 'break-all' }}>{value}</div>}>
            <StyledInlineEditMenu
              autoFocus={renameElement}
              input={{
                name: 'name-of-input',
                value: value,
                maxLength: 120,
                placeholder: '',
                onChange: event => setValue(event.target.value),
                onBlur: () => {
                  setRenameElement(false);
                },
                onEnterPress: action('onEnterPress'),
              }}
              hideIcon={true}
            />
          </Tooltip>
        ) : (
          <Tooltip title={<div style={{ wordBreak: 'break-all' }}>{value}</div>}>{value}</Tooltip>
        ),
        key: key,
        suffixel:
          suffixElement1 === true ? (
            <Icon color={theme.palette['green-600']} component={<CheckS />} />
          ) : (
            renderSuffix(suffixel, () => setRenameElement(!renameElement))
          ),
        suffixVisibilityTrigger: suffixElement1 ? null : 'hover',
        prefixel: hover =>
          (checkboxVisibilityTrigger && hover) || checkedKeys[key] ? (
            <div style={{ padding: '0 4px' }}>
              <Checkbox
                defaultChecked={checkedKeys[key]}
                onChange={e => {
                  updateCheckedKeys(e.target.checked, key);
                }}
              />
            </div>
          ) : checkParentChilds('parent1') ? (
            <div style={{ padding: '0 4px' }}>
              <Checkbox defaultChecked={true} />
            </div>
          ) : (
            renderPrefixIcon(prefixel, checkedKeys[key], value => {
              updateCheckedKeys(value, key);
            })
          ),
        description: description,
        size: size,
        ordered: ordered,
        disabled: disabled,
      };
    };
    const subMenuElement2 = initValue => {
      const [value, setValue] = useState<string>(initValue);
      const key = useMemo(() => `p2-${initValue}`, [initValue]);
      const [renameElement, setRenameElement] = useState(false);
      return {
        text: renameElement ? (
          <Tooltip title={<div style={{ wordBreak: 'break-all' }}>{value}</div>}>
            <StyledInlineEditMenu
              autoFocus={renameElement}
              input={{
                name: 'name-of-input',
                value: value,
                maxLength: 120,
                placeholder: '',
                onChange: event => setValue(event.target.value),
                onBlur: () => {
                  setRenameElement(false);
                },
                onEnterPress: action('onEnterPress'),
              }}
              hideIcon={true}
            />
          </Tooltip>
        ) : (
          <Tooltip title={<div style={{ wordBreak: 'break-all' }}>{value}</div>}>{value}</Tooltip>
        ),
        key: key,
        suffixel:
          suffixElement2 === true ? (
            <Icon color={theme.palette['green-600']} component={<CheckS />} />
          ) : (
            renderSuffix(suffixel, () => setRenameElement(!renameElement))
          ),
        suffixVisibilityTrigger: suffixElement2 ? null : 'hover',
        prefixel: hover =>
          (checkboxVisibilityTrigger && hover) || checkedKeys[key] ? (
            <div style={{ padding: '0 4px' }}>
              <Checkbox
                defaultChecked={checkedKeys[key]}
                onChange={e => {
                  updateCheckedKeys(e.target.checked, key);
                }}
              />
            </div>
          ) : checkParentChilds('parent2') ? (
            <div style={{ padding: '0 4px' }}>
              <Checkbox defaultChecked={true} />
            </div>
          ) : (
            renderPrefixIcon(prefixel, checkedKeys[key], value => {
              updateCheckedKeys(value, key);
            })
          ),
        description: description,
        size: size,
        ordered: ordered,
        disabled: disabled ? true : false,
      };
    };
    const subMenuElement3 = initValue => {
      const [value, setValue] = useState<string>(initValue);
      const key = useMemo(() => `p3-${initValue}`, [initValue]);
      const [renameElement, setRenameElement] = useState(false);
      return {
        text: renameElement ? (
          <Tooltip title={<div style={{ wordBreak: 'break-all' }}>{value}</div>}>
            <StyledInlineEditMenu
              autoFocus={renameElement}
              input={{
                name: 'name-of-input',
                value: value,
                maxLength: 120,
                placeholder: '',
                onChange: event => setValue(event.target.value),
                onBlur: () => {
                  setRenameElement(false);
                },
                onEnterPress: action('onEnterPress'),
              }}
              hideIcon={true}
            />
          </Tooltip>
        ) : (
          <Tooltip title={<div style={{ wordBreak: 'break-all' }}>{value}</div>}>{value}</Tooltip>
        ),
        key: key,
        suffixel:
          suffixElement3 === true ? (
            <Icon color={theme.palette['green-600']} component={<CheckS />} />
          ) : (
            renderSuffix(suffixel, () => setRenameElement(!renameElement))
          ),
        suffixVisibilityTrigger: suffixElement3 ? null : 'hover',
        prefixel: hover =>
          (checkboxVisibilityTrigger && hover) || checkedKeys[key] ? (
            <div style={{ padding: '0 4px' }}>
              <Checkbox
                defaultChecked={checkedKeys[key]}
                onChange={e => {
                  updateCheckedKeys(e.target.checked, key);
                }}
              />
            </div>
          ) : checkParentChilds('parent3') ? (
            <div style={{ padding: '0 4px' }}>
              <Checkbox defaultChecked={true} />
            </div>
          ) : (
            renderPrefixIcon(prefixel, checkedKeys[key], value => {
              updateCheckedKeys(value, key);
            })
          ),
        description: description,
        size: size,
        ordered: ordered,
        disabled: disabled ? true : false,
      };
    };
    const initValue1 = 'Parent 1';
    const initValue2 = 'Parent 2';
    const initValue3 = 'Parent 3';
    const [value1, setValue1] = useState<string>(initValue1);
    const [value2, setValue2] = useState<string>(initValue2);
    const [value3, setValue3] = useState<string>(initValue3);
    const [renameElement1, setRenameElement1] = useState(false);
    const [renameElement2, setRenameElement2] = useState(false);
    const [renameElement3, setRenameElement3] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    const dataSource = [
      {
        text: renameElement1 ? (
          <Tooltip title={<div style={{ wordBreak: 'break-all' }}>{value1}</div>}>
            <StyledInlineEditMenu
              autoFocus={true}
              input={{
                name: 'name-of-input',
                value: value1,
                maxLength: 120,
                placeholder: '',
                onChange: event => setValue1(event.target.value),
                onBlur: () => {
                  setRenameElement1(false);
                },
                onEnterPress: action('onEnterPress'),
              }}
              hideIcon={true}
            />
          </Tooltip>
        ) : (
          <Tooltip title={<div style={{ wordBreak: 'break-all' }}>{value1}</div>}>{value1}</Tooltip>
        ),
        key: `p1-${initValue1}`,
        suffixel: renderSuffix(
          suffixel,
          () => setSuffixElement1(!suffixElement1),
          () => setRenameElement1(!renameElement1)
        ),
        suffixVisibilityTrigger: 'hover',
        prefixel: hover =>
          (checkboxVisibilityTrigger && hover) || checkParentChilds('parent1') || checkIfParentHasChecked('parent1') ? (
            <div style={{ padding: '0 4px' }} onClick={e => e.stopPropagation()}>
              <Checkbox
                checked={checkParentChilds('parent1')}
                onChange={e => {
                  checkAllChildren('parent1', e.target.checked);
                }}
                indeterminate={checkIfParentHasChecked('parent1')}
              />
            </div>
          ) : suffixElement1 === true ? (
            <div>
              <Icon className="ds-check-icon" color={theme.palette['green-600']} component={<CheckS />} />
            </div>
          ) : (
            renderPrefixIcon(prefixel, checkParentChilds('parent1'), value => checkAllChildren('parent1', value))
          ),
        description: description,
        size: size,
        ordered: ordered,
        disabled: disabled ? true : false,
        subMenu: [
          subMenuElement1('Child 1'),
          setDivider ? { type: `divider` } : null,
          subMenuElement1('Child 2'),
          setDivider ? { type: 'divider' } : null,
          subMenuElement1('Child 3'),
          setDivider ? { type: 'divider' } : null,
        ].filter(item => !!item),
      },
      {
        text: renameElement2 ? (
          <Tooltip title={<div style={{ wordBreak: 'break-all' }}>{value2}</div>}>
            <div
              onClick={event => {
                event.stopPropagation();
              }}
            >
              <StyledInlineEditMenu
                autoFocus={true}
                input={{
                  name: 'name-of-input',
                  value: value2,
                  maxLength: 120,
                  placeholder: '',
                  onChange: event => setValue2(event.target.value),
                  onBlur: () => {
                    setRenameElement2(false);
                  },
                  onEnterPress: action('onEnterPress'),
                }}
                hideIcon={true}
              />
            </div>
          </Tooltip>
        ) : (
          <Tooltip title={<div style={{ wordBreak: 'break-all' }}>{value2}</div>}>{value2}</Tooltip>
        ),
        key: `p2-${initValue2}`,
        suffixel: renderSuffix(
          suffixel,
          () => setSuffixElement2(!suffixElement2),
          () => setRenameElement2(!renameElement2)
        ),
        suffixVisibilityTrigger: 'hover',
        prefixel: hover =>
          (checkboxVisibilityTrigger && hover) || checkParentChilds('parent2') || checkIfParentHasChecked('parent2') ? (
            <div style={{ padding: '0 4px' }} onClick={e => e.stopPropagation()}>
              <Checkbox
                checked={checkParentChilds('parent2')}
                onChange={e => {
                  checkAllChildren('parent2', e.target.checked);
                }}
                indeterminate={checkIfParentHasChecked('parent2')}
              />
            </div>
          ) : suffixElement2 === true ? (
            <Icon className="ds-check-icon" color={theme.palette['green-600']} component={<CheckS />} />
          ) : (
            renderPrefixIcon(prefixel, checkParentChilds('parent2'), value => checkAllChildren('parent2', value))
          ),
        description: description,
        size: size,
        ordered: ordered,
        disabled: disabled ? true : false,
        subMenu: [
          subMenuElement2('Child 1'),
          setDivider ? { type: 'divider' } : null,
          subMenuElement2('Child 2'),
          setDivider ? { type: 'divider' } : null,
          subMenuElement2('Child 3'),
          setDivider ? { type: 'divider' } : null,
        ].filter(item => !!item),
      },
      {
        text: renameElement3 ? (
          <Tooltip title={<div style={{ wordBreak: 'break-all' }}>{value3}</div>}>
            <div
              onClick={event => {
                event.stopPropagation();
              }}
            >
              <StyledInlineEditMenu
                autoFocus={true}
                input={{
                  name: 'name-of-input',
                  value: value3,
                  maxLength: 120,
                  placeholder: '',
                  onChange: event => setValue3(event.target.value),
                  onBlur: () => {
                    setRenameElement3(false);
                  },
                  onEnterPress: action('onEnterPress'),
                }}
                hideIcon={true}
              />
            </div>
          </Tooltip>
        ) : (
          <Tooltip title={<div style={{ wordBreak: 'break-all' }}>{value3}</div>}>{value3}</Tooltip>
        ),
        key: `p3-${initValue3}`,
        suffixel: renderSuffix(
          suffixel,
          () => setSuffixElement3(!suffixElement3),
          () => setRenameElement3(!renameElement3)
        ),
        suffixVisibilityTrigger: 'hover',
        prefixel: (hover: boolean) =>
          (checkboxVisibilityTrigger && hover) || checkParentChilds('parent3') || checkIfParentHasChecked('parent3') ? (
            <div style={{ padding: '0 4px' }} onClick={e => e.stopPropagation()}>
              <Checkbox
                checked={checkParentChilds('parent3')}
                onChange={e => {
                  checkAllChildren('parent3', e.target.checked);
                }}
                indeterminate={checkIfParentHasChecked('parent3')}
              />
            </div>
          ) : suffixElement3 === true ? (
            <Icon className="ds-check-icon" color={theme.palette['green-600']} component={<CheckS />} />
          ) : (
            renderPrefixIcon(prefixel, checkParentChilds('parent3'), value => checkAllChildren('parent3', value))
          ),
        description: description,
        size: size,
        ordered: ordered,
        disabled: disabled ? true : false,
        open: true,
        subMenu: [
          subMenuElement3('Child 1'),
          setDivider ? { type: 'divider' } : null,
          subMenuElement3('Child 2'),
          setDivider ? { type: 'divider' } : null,
          subMenuElement3('Child 3'),
          setDivider ? { type: 'divider' } : null,
        ].filter(item => !!item),
      },
    ];

    const onClickCallback = (clickedKey: string) => {
      if (checkboxVisibilityTrigger || prefixel === prefixType.checkbox) return;
      if (selectedKeys.indexOf(clickedKey) !== -1) {
        setSelectedKeys([]);
        return;
      }
      setSelectedKeys([clickedKey]);
    };

    const itemsWithOnClick = dataSource.map(item => {
      return {
        ...item,
        onTitleClick: () => {
          onClickCallback(item.key);
        },
        subMenu: item.subMenu.map(submenuItem => ({
          ...submenuItem,
          onClick: () => {
            submenuItem && 'key' in submenuItem && onClickCallback(submenuItem.key);
          },
        })),
      };
    });
    console.log(openKeys);
    return (
      <Menu
        {...menuArgs}
        onTitleClick={eventParamas => {
          const { domEvent } = eventParamas;
          domEvent.stopPropagation();
        }}
        dataSource={itemsWithOnClick}
        ordered
        selectable
        openKeys={openKeys}
        selectedKeys={[...selectedKeys, ...Object.keys(checkedKeys).filter(key => checkedKeys[key])]}
        onOpenChange={setOpenKeys}
      />
    );
  },
};

import * as React from 'react';

import { boolean, select } from '@storybook/addon-knobs';
import { prefixType, renderPrefixIcon, renderSuffix, suffixType } from '../Menu/dataset';
import Menu from '@synerise/ds-menu';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { CheckS } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Checkbox from '@synerise/ds-checkbox/dist';
import { StyledInlineEditMenu } from '../Menu/stories.styles';
import Tooltip from '@synerise/ds-tooltip';
import { action } from '@storybook/addon-actions';

const stories = {
  default: () => {
    const disabledParent = boolean('Set parent disabled', false);
    const disabledChild = boolean('Set child disabled', false);
    const parentDescription = boolean('Set medium parent', false);
    const childDescription = boolean('Set medium child', false);
    const setCheckbox = boolean('Set visibility trigger checkbox', false);
    const [selectedKeysObj, setSelectedKeysObj] = React.useState({});
    const [suffixElement1, setSuffixElement1] = React.useState(false);
    const [suffixElement2, setSuffixElement2] = React.useState(false);
    const [suffixElement3, setSuffixElement3] = React.useState(false);
    const [checkedParent1, setCheckedParent1] = React.useState(false);
    const [checkedParent2, setCheckedParent2] = React.useState(false);
    const [checkedParent3, setCheckedParent3] = React.useState(false);

    const updateSelectedKeys = (value, key) => {
      const newSelectedKeys = { ...selectedKeysObj, [key]: value };
      setSelectedKeysObj(newSelectedKeys);
    };
    const subMenuElement1 = initValue => {
      const [value, setValue] = React.useState<string>(initValue);
      const key = React.useMemo(() => `p1-${initValue}`, [initValue]);
      const [renameElement, setRenameElement] = React.useState(false);
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
            renderSuffix(suffixKnobChild, () => setRenameElement(!renameElement))
          ),
        suffixVisibilityTrigger: 'hover',
        prefixel: hover =>
          (setCheckbox && hover) || selectedKeysObj[key] ? (
            <div style={{ padding: '0 4px' }}>
              <Checkbox
                defaultChecked={selectedKeysObj[key]}
                onChange={e => {
                  updateSelectedKeys(e.target.checked, key);
                }}
              />
            </div>
          ) : checkedParent1 === true ? (
            <div style={{ padding: '0 4px' }}>
              <Checkbox defaultChecked={true} />
            </div>
          ) : (
            renderPrefixIcon(prefixKnobChild, selectedKeysObj[key], value => {
              updateSelectedKeys(value, key);
            })
          ),
        description: childDescription ? 'description' : undefined,
        size: childDescription ? 'large' : undefined,
        disabled: disabledChild,
        ordered: orderedChildren,
      };
    };
    const subMenuElement2 = initValue => {
      const [value, setValue] = React.useState<string>(initValue);
      const key = React.useMemo(() => `p2-${initValue}`, [initValue]);
      const [renameElement, setRenameElement] = React.useState(false);
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
        key: `p2-${initValue}`,
        suffixel:
          suffixElement2 === true ? (
            <Icon color={theme.palette['green-600']} component={<CheckS />} />
          ) : (
            renderSuffix(suffixKnobChild, () => setRenameElement(!renameElement))
          ),
        suffixVisibilityTrigger: 'hover',
        prefixel: hover =>
          (setCheckbox && hover) || selectedKeysObj[key] ? (
            <div style={{ padding: '0 4px' }}>
              <Checkbox
                defaultChecked={selectedKeysObj[key]}
                onChange={e => {
                  updateSelectedKeys(e.target.checked, key);
                }}
              />
            </div>
          ) : checkedParent2 === true ? (
            <div style={{ padding: '0 4px' }}>
              <Checkbox defaultChecked={true} />
            </div>
          ) : (
            renderPrefixIcon(prefixKnobChild, selectedKeysObj[key], value => {
              updateSelectedKeys(value, key);
            })
          ),
        description: childDescription ? 'description' : undefined,
        size: childDescription ? 'large' : undefined,
        disabled: disabledChild,
        ordered: orderedChildren,
      };
    };
    const subMenuElement3 = initValue => {
      const [value, setValue] = React.useState<string>(initValue);
      const key = React.useMemo(() => `p3-${initValue}`, [initValue]);
      const [renameElement, setRenameElement] = React.useState(false);
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
        key: `p3-${initValue}`,
        suffixel:
          suffixElement3 === true ? (
            <Icon color={theme.palette['green-600']} component={<CheckS />} />
          ) : (
            renderSuffix(suffixKnobChild, () => setRenameElement(!renameElement))
          ),
        suffixVisibilityTrigger: 'hover',
        prefixel: hover =>
          (setCheckbox && hover) || selectedKeysObj[key] ? (
            <div style={{ padding: '0 4px' }}>
              <Checkbox
                defaultChecked={selectedKeysObj[key]}
                onChange={e => {
                  updateSelectedKeys(e.target.checked, key);
                }}
              />
            </div>
          ) : checkedParent3 === true ? (
            <div style={{ padding: '0 4px' }}>
              <Checkbox defaultChecked={true} />
            </div>
          ) : (
            renderPrefixIcon(prefixKnobChild, selectedKeysObj[key], value => {
              updateSelectedKeys(value, key);
            })
          ),
        description: childDescription ? 'description' : undefined,
        size: childDescription ? 'large' : undefined,
        disabled: disabledChild,
        ordered: orderedChildren,
      };
    };
    const prefixKnobParent = select(
      'Set parent prefix type',
      [prefixType.singleIcon, prefixType.avatar, prefixType.none, prefixType.checkbox],
      prefixType.none
    );
    const prefixKnobChild = select(
      'Set child prefix type',
      [prefixType.singleIcon, prefixType.avatar, prefixType.none, prefixType.checkbox],
      prefixType.none
    );
    const suffixKnobParent = select(
      'Set parent suffix type',
      [
        suffixType.none,
        suffixType.renameAndDelete,
        suffixType.switch,
        suffixType.label,
        suffixType.check,
        suffixType.dropdown,
        suffixType.select,
      ],
      suffixType.none
    );
    const suffixKnobChild = select(
      'Set child suffix type',
      [suffixType.none, suffixType.switch, suffixType.label, suffixType.check, suffixType.select, suffixType.rename],
      suffixType.none
    );
    const orderedChildren = boolean('Set children ordered', false);
    const orderedParents = boolean('Set parents ordered', false);
    const setDivider = boolean('Set divider', false);
    const initValue1 = 'Parent 1';
    const initValue2 = 'Parent 2';
    const initValue3 = 'Parent 3';
    const [value1, setValue1] = React.useState<string>(initValue1);
    const [value2, setValue2] = React.useState<string>(initValue2);
    const [value3, setValue3] = React.useState<string>(initValue3);
    const key1 = React.useMemo(() => `p1-${initValue1}`, [initValue1]);
    const key2 = React.useMemo(() => `p2-${initValue2}`, [initValue2]);
    const key3 = React.useMemo(() => `p3-${initValue3}`, [initValue3]);
    const [renameElement1, setRenameElement1] = React.useState(false);
    const [renameElement2, setRenameElement2] = React.useState(false);
    const [renameElement3, setRenameElement3] = React.useState(false);

    const props = {
      showTextTooltip: true,
      dataSource: [
        {
          text:  renameElement1 ? (
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
          suffixel: renderSuffix(suffixKnobParent, () => setSuffixElement1(!suffixElement1), () => setRenameElement1(!renameElement1)),
          suffixVisibilityTrigger: 'hover',
          prefixel: hover =>
            (setCheckbox && hover) || selectedKeysObj[key1] ? (
              <div style={{ padding: '0 4px' }}>
                <Checkbox
                  defaultChecked={selectedKeysObj[key1]}
                  onChange={e => {
                    updateSelectedKeys(e.target.checked, key1);
                  }}
                />
              </div>
            ) : suffixElement1 === true ? (
              <div>
                <Icon className="ds-check-icon" color={theme.palette['green-600']} component={<CheckS />} />
              </div>
            ) : (
              renderPrefixIcon(prefixKnobParent, checkedParent1, setCheckedParent1)
            ),
          description: parentDescription ? 'description' : undefined,
          size: parentDescription ? 'medium' : undefined,
          ordered: orderedParents,
          disabled: disabledParent,
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
          text:  renameElement2 ? (
            <Tooltip title={<div style={{ wordBreak: 'break-all' }}>{value2}</div>}>
              <div onClick={event => {event.stopPropagation()}}>
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
          suffixel: renderSuffix(suffixKnobParent, () => setSuffixElement2(!suffixElement2), () => setRenameElement2(!renameElement2)),
          suffixVisibilityTrigger: 'hover',
          prefixel: hover =>
            (setCheckbox && hover) || selectedKeysObj[key2] ? (
              <div style={{ padding: '0 4px' }}>
                <Checkbox
                  defaultChecked={selectedKeysObj[key2]}
                  onChange={e => {
                    updateSelectedKeys(e.target.checked, key2);
                  }}
                />
              </div>
            ) : suffixElement2 === true ? (
              <Icon className="ds-check-icon" color={theme.palette['green-600']} component={<CheckS />} />
            ) : (
              renderPrefixIcon(prefixKnobParent, checkedParent2, setCheckedParent2)
            ),
          description: parentDescription ? 'description' : undefined,
          size: parentDescription ? 'medium' : undefined,
          ordered: orderedParents,
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
          text:   renameElement3 ? (
            <Tooltip title={<div style={{ wordBreak: 'break-all' }}>{value3}</div>}>
              <div onClick={event => {event.stopPropagation()}}>
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
          suffixel: renderSuffix(suffixKnobParent, () => setSuffixElement3(!suffixElement3), () => setRenameElement3(!renameElement3)),
          suffixVisibilityTrigger: 'hover',
          prefixel: hover =>
            (setCheckbox && hover) || selectedKeysObj[key3] ? (
              <div style={{ padding: '0 4px' }}>
                <Checkbox
                  defaultChecked={selectedKeysObj[key3]}
                  onChange={e => {
                    updateSelectedKeys(e.target.checked, key3);
                  }}
                />
              </div>
            ) : suffixElement3 === true ? (
              <Icon className="ds-check-icon" color={theme.palette['green-600']} component={<CheckS />} />
            ) : (
              renderPrefixIcon(prefixKnobParent, checkedParent3, setCheckedParent3)
            ),
          description: parentDescription ? 'description' : undefined,
          size: parentDescription ? 'medium' : undefined,
          ordered: orderedParents,
          subMenu: [
            subMenuElement3('Child 1'),
            setDivider ? { type: 'divider' } : null,
            subMenuElement3('Child 2'),
            setDivider ? { type: 'divider' } : null,
            subMenuElement3('Child 3'),
            setDivider ? { type: 'divider' } : null,
          ].filter(item => !!item),
        },
      ],
    } as object;
    const [selectedKeys, setSelectedKeys] = React.useState([]);

    const onClickCallback = (clickedKey: string) => {
      if (selectedKeys.indexOf(clickedKey) !== -1) {
        setSelectedKeys([]);
        return;
      }
      setSelectedKeys([clickedKey]);
    };
    const itemsWithOnClick = props.dataSource.map(item => {
      let newItem = item;
      newItem.onTitleClick = () => {
        onClickCallback(item.key);
      };
      newItem.subMenu = item.subMenu.map(submenuItem => ({
        ...submenuItem,
        onClick: () => {
          onClickCallback(submenuItem.key);
        },
      }));
      return newItem;
    });
    return (
      <div style={{ width: '200px' }}>
        <Menu
          onTitleClick={eventParamas => {
            const { domEvent } = eventParamas;
            domEvent.stopPropagation();
          }}
          dataSource={itemsWithOnClick}
          selectable
          selectedKeys={selectedKeys}
          ordered
        />
      </div>
    );
  },
};

export default {
  name: 'Components/AccordionMenu',
  config: {},
  stories,
};

import * as React from 'react';


import { getDefaultProps } from '../Menu/index.stories';
import { boolean, select } from '@storybook/addon-knobs';
import { prefixType, renderPrefixIcon, renderSuffix, suffixType } from '../Menu/dataset';
import Menu from '@synerise/ds-menu';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { CheckS } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Checkbox from '@synerise/ds-checkbox/dist';
import { StyledInlineEditMenu } from '../Menu/stories.styles';
import Tooltip from '@synerise/ds-tooltip';


const stories = {
  default: () => {
    const disabledParent = boolean('Set parent disabled', false);
    const disabledChild = boolean('Set child disabled', false);
    const parentDescription = boolean('Set medium parent', false);
    const childDescription = boolean('Set medium child', false);
    const [suffixElement1, setSuffixElement1] = React.useState(false);
    const [suffixElement2, setSuffixElement2] = React.useState(false);
    const [suffixElement3, setSuffixElement3] = React.useState(false);
    const [checkedParent1, setCheckedParent1] = React.useState(false);
    const [checkedParent2, setCheckedParent2] = React.useState(false);
    const [checkedParent3, setCheckedParent3] = React.useState(false);
    const [renameElement, setRenameElement] = React.useState(false);
    const [prefixStatus,setPrefixStatus] = React.useState([false,false,false,false,false,false,false,false,false])
    const subMenuElement1 = (initValue,index) => {
      const [value, setValue] = React.useState<string>(initValue);
      return{
        text: renameElement ? (
          <Tooltip title={value}>
          <StyledInlineEditMenu
            input={{
              name: 'name-of-input',
              value: value,
              maxLength: 120,
              placeholder: '',
              onChange: event => setValue(event.target.value),
            }}
            hideIcon={true}
          />
          </Tooltip>
        ) : (
          <Tooltip title={value}>{value}</Tooltip>
        ),
        key: `p1-${initValue}`,
        suffixel:
          suffixElement1 === true ? (
            <Icon color={theme.palette['green-600']} component={<CheckS />} />
          ) : (
            renderSuffix(suffixKnobChild, () => setRenameElement(!renameElement))
          ),
        suffixVisibilityTrigger: 'hover',
        prefixel:
          checkedParent1 === true ? <Checkbox defaultChecked={true} /> : renderPrefixIcon(prefixKnobChild,prefixStatus[index],()=>{
            const values = prefixStatus.map((status, prefixIndex) =>  prefixIndex === index ? !status : status);
            setPrefixStatus(values)}),
        description: childDescription ? 'description' : undefined,
        size: childDescription ? 'large' : undefined,
        disabled: disabledChild,
        ordered: orderedChildren,
      }};
    const subMenuElement2 = (initValue,index) => {
      const [value, setValue] = React.useState<string>(initValue);
      return{
        text: renameElement ? (
          <Tooltip title={value}>
            <StyledInlineEditMenu
              input={{
                name: 'name-of-input',
                value: value,
                maxLength: 120,
                placeholder: '',
                onChange: event => setValue(event.target.value),
              }}
              hideIcon={true}
            />
          </Tooltip>
        ) : (
          <Tooltip title={value}>{value}</Tooltip>
        ),
        key: `p2-${initValue}`,
        suffixel:
          suffixElement2 === true ? (
            <Icon color={theme.palette['green-600']} component={<CheckS />} />
          ) : (
            renderSuffix(suffixKnobChild, () => setRenameElement(!renameElement))
          ),
        suffixVisibilityTrigger: 'hover',
        prefixel:
          checkedParent2 === true ? <Checkbox defaultChecked={true} /> : renderPrefixIcon(prefixKnobChild,prefixStatus[index],()=>{
            const values = prefixStatus.map((status, prefixIndex) =>  prefixIndex === index ? !status : status);
            setPrefixStatus(values)}),
        description: childDescription ? 'description' : undefined,
        size: childDescription ? 'large' : undefined,
        disabled: disabledChild,
        ordered: orderedChildren,
      }};
    const subMenuElement3 = (initValue,index) => {
      const [value, setValue] = React.useState<string>(initValue);
      return{
        text: renameElement ? (
          <Tooltip title={value}>
            <StyledInlineEditMenu
              input={{
                name: 'name-of-input',
                value: value,
                maxLength: 120,
                placeholder: '',
                onChange: event => setValue(event.target.value),
              }}
              hideIcon={true}
            />
          </Tooltip>
        ) : (
          <Tooltip title={value}>{value}</Tooltip>
        ),
        key: `p3-${initValue}`,
        suffixel:
          suffixElement3 === true ? (
            <Icon color={theme.palette['green-600']} component={<CheckS />} />
          ) : (
            renderSuffix(suffixKnobChild, () => setRenameElement(!renameElement))
          ),
        suffixVisibilityTrigger: 'hover',
        prefixel:
          checkedParent3 === true ? <Checkbox defaultChecked={true} /> : renderPrefixIcon(prefixKnobChild,prefixStatus[index],()=>{
            const values = prefixStatus.map((status, prefixIndex) =>  prefixIndex === index ? !status : status);
            setPrefixStatus(values)}),
        description: childDescription ? 'description' : undefined,
        size: childDescription ? 'large' : undefined,
        disabled: disabledChild,
        ordered: orderedChildren,
      }};
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
    const setDivider = boolean ('Set divder', false);

    const props = {
      showTextTooltip : true,
      dataSource: [
        {
          text: 'Parent 1',
          key: 'Parent 1',
          suffixel: renderSuffix(suffixKnobParent, () => setSuffixElement1(!suffixElement1)),
          suffixVisibilityTrigger: 'hover',
          prefixel:
            suffixElement1 === true ? (
              <div>
                <Icon color={theme.palette['green-600']} component={<CheckS />} />
              </div>
            ) : (
              renderPrefixIcon(prefixKnobParent, checkedParent1, setCheckedParent1)
            ),
          description: parentDescription ? 'description' : undefined,
          size: parentDescription ? 'medium' : undefined,
          ordered: orderedParents,
          disabled: disabledParent,
          subMenu: [
            subMenuElement1('Child 1',0),
            setDivider ? {type: 'divider'} : null,
            subMenuElement1('Child 2',1),
            subMenuElement1('Child 3',2),
            setDivider ? {type: 'divider'} : null,
          ].filter(item => !!item),
        },
        {
          text: 'Parent 2',
          key: 'Parent 2',
          suffixel: renderSuffix(suffixKnobParent, () => setSuffixElement2(!suffixElement2)),
          suffixVisibilityTrigger: 'hover',
          prefixel:
            suffixElement2 === true ? (
              <Icon color={theme.palette['green-600']} component={<CheckS />} />
            ) : (
              renderPrefixIcon(prefixKnobParent, checkedParent2, setCheckedParent2)
            ),
          description: parentDescription ? 'description' : undefined,
          size: parentDescription ? 'medium' : undefined,
          ordered: orderedParents,
          subMenu: [
            subMenuElement2('Child 1',3),
            subMenuElement2('Child 2',4),
            subMenuElement2('Child 3',5),
          ],
        },
        {
          text: 'Parent 3',
          key: 'Parent 3',
          suffixel: renderSuffix(suffixKnobParent, () => setSuffixElement3(!suffixElement3)),
          suffixVisibilityTrigger: 'hover',
          prefixel:
            suffixElement3 === true ? (
              <Icon color={theme.palette['green-600']} component={<CheckS />} />
            ) : (
              renderPrefixIcon(prefixKnobParent, checkedParent3, setCheckedParent3)
            ),
          description: parentDescription ? 'description' : undefined,
          size: parentDescription ? 'medium' : undefined,
          ordered: orderedParents,
          subMenu: [
            subMenuElement3('Child 1',6),
            subMenuElement3('Child 2',7),
            subMenuElement3('Child 3',8),
          ],
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
  withPreffixAndSuffix: () => {
    const defaultProps = getDefaultProps();
    const prefixKnobParent = select(
      'Set parent prefix type',
      [prefixType.singleIcon, prefixType.none],
      prefixType.none
    );
    const prefixKnobChild = select('Set child prefix type', [prefixType.singleIcon, prefixType.none], prefixType.none);
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
    const props = {
      dataSource: [
        {
          text: 'Parent 1',
          key: 'Parent 1',
          suffixel: renderSuffix(suffixKnobParent),
          suffixVisibilityTrigger: 'hover',
          prefixel: renderPrefixIcon(prefixKnobParent),
          ordered: orderedParents,
          subMenu: [
            {
              text: 'Child 1',
              key: 'p1-Child 1',
              suffixel: renderSuffix(suffixKnobChild),
              suffixVisibilityTrigger: 'hover',
              prefixel: renderPrefixIcon(prefixKnobChild),
              ordered: orderedChildren,
            },
            {
              text: 'Child 2',
              key: 'p1-Child 2',
              suffixel: renderSuffix(suffixKnobChild),
              suffixVisibilityTrigger: 'hover',
              prefixel: renderPrefixIcon(prefixKnobChild),
              ordered: orderedChildren,
            },
            {
              text: 'Child 3',
              key: 'p1-Child 3',
              suffixel: renderSuffix(suffixKnobChild),
              suffixVisibilityTrigger: 'hover',
              prefixel: renderPrefixIcon(prefixKnobChild),
              ordered: orderedChildren,
            },
          ],
        },
        {
          text: 'Parent 2',
          key: 'Parent 2',
          suffixel: renderSuffix(suffixKnobParent),
          suffixVisibilityTrigger: 'hover',
          prefixel: renderPrefixIcon(prefixKnobParent),
          ordered: orderedParents,
          subMenu: [
            {
              text: 'Child 1',
              key: 'p2-Child 1',
              suffixel: renderSuffix(suffixKnobChild),
              suffixVisibilityTrigger: 'hover',
              prefixel: renderPrefixIcon(prefixKnobChild),
              ordered: orderedChildren,
            },
            {
              text: 'Child 2',
              key: 'p2-Child 2',
              suffixel: renderSuffix(suffixKnobChild),
              suffixVisibilityTrigger: 'hover',
              prefixel: renderPrefixIcon(prefixKnobChild),
              ordered: orderedChildren,
            },
            {
              text: 'Child 3',
              key: 'p2-Child 3',
              suffixel: renderSuffix(suffixKnobChild),
              suffixVisibilityTrigger: 'hover',
              prefixel: renderPrefixIcon(prefixKnobChild),
              ordered: orderedChildren,
            },
          ],
        },
        {
          text: 'Parent 3',
          key: 'Parent 3',
          suffixel: renderSuffix(suffixKnobParent),
          suffixVisibilityTrigger: 'hover',
          prefixel: renderPrefixIcon(prefixKnobParent),
          ordered: orderedParents,
          subMenu: [
            {
              text: 'Child 1',
              key: 'p3-Child 1',
              suffixel: renderSuffix(suffixKnobChild),
              suffixVisibilityTrigger: 'hover',
              prefixel: renderPrefixIcon(prefixKnobChild),
              ordered: orderedChildren,
            },
            {
              text: 'Child 2',
              key: 'p3-Child 2',
              suffixel: renderSuffix(suffixKnobChild),
              suffixVisibilityTrigger: 'hover',
              prefixel: renderPrefixIcon(prefixKnobChild),
              ordered: orderedChildren,
            },
            {
              text: 'Child 3',
              key: 'p3-Child 3',
              suffixel: renderSuffix(suffixKnobChild),
              suffixVisibilityTrigger: 'hover',
              prefixel: renderPrefixIcon(prefixKnobChild),
              ordered: orderedChildren,
            },
          ],
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
        <Menu {...defaultProps} dataSource={itemsWithOnClick} selectable selectedKeys={selectedKeys} ordered />
      </div>
    );
  },
  typeParentAndChild: () => {
    const defaultProps = getDefaultProps();
    const orderedChildren = boolean('Set children ordered', true);
    const parentDescription = boolean('Set description with large parent', false);
    const childDescription = boolean('Set description with large child', false);
    const prefixKnobParent = select('Set parent avatar', [prefixType.avatar, prefixType.none], prefixType.none);
    const prefixKnobChild = select('Set child avatar', [prefixType.avatar, prefixType.none], prefixType.none);
    const props = {
      dataSource: [
        {
          text: 'Parent 1',
          key: 'Parent 1',
          ordered: null,
          description: parentDescription ? 'description' : undefined,
          size: parentDescription ? 'medium' : undefined,
          prefixel: renderPrefixIcon(prefixKnobParent),
          subMenu: [
            {
              text: 'Child 1',
              key: 'p1-Child 1',
              ordered: orderedChildren,
              description: childDescription ? 'description' : undefined,
              size: childDescription ? 'large' : undefined,
              prefixel: renderPrefixIcon(prefixKnobChild),
            },
            {
              text: 'Child 2',
              key: 'p1-Child 2',
              ordered: orderedChildren,
              description: childDescription ? 'description' : undefined,
              size: childDescription ? 'large' : undefined,
              prefixel: renderPrefixIcon(prefixKnobChild),
            },
            {
              text: 'Child 3',
              key: 'p1-Child 3',
              ordered: orderedChildren,
              description: childDescription ? 'description' : undefined,
              size: childDescription ? 'large' : undefined,
              prefixel: renderPrefixIcon(prefixKnobChild),
            },
          ],
        },
        {
          text: 'Parent 2',
          key: 'Parent 2',
          ordered: null,
          description: parentDescription ? 'description' : undefined,
          size: parentDescription ? 'medium' : undefined,
          prefixel: renderPrefixIcon(prefixKnobParent),
          subMenu: [
            {
              text: 'Child 1',
              key: 'p2-Child 1',
              ordered: orderedChildren,
              description: childDescription ? 'description' : undefined,
              size: childDescription ? 'large' : undefined,
              prefixel: renderPrefixIcon(prefixKnobChild),
            },
            {
              text: 'Child 2',
              key: 'p2-Child 2',
              ordered: orderedChildren,
              description: childDescription ? 'description' : undefined,
              size: childDescription ? 'large' : undefined,
              prefixel: renderPrefixIcon(prefixKnobChild),
            },
            {
              text: 'Child 3',
              key: 'p2-Child 3',
              ordered: orderedChildren,
              description: childDescription ? 'description' : undefined,
              size: childDescription ? 'large' : undefined,
              prefixel: renderPrefixIcon(prefixKnobChild),
            },
          ],
        },
        {
          text: 'Parent 3',
          key: 'Parent 3',
          ordered: null,
          description: parentDescription ? 'description' : undefined,
          size: parentDescription ? 'medium' : undefined,
          prefixel: renderPrefixIcon(prefixKnobParent),
          subMenu: [
            {
              text: 'Child 1',
              key: 'p3-Child 1',
              ordered: orderedChildren,
              description: childDescription ? 'description' : undefined,
              size: childDescription ? 'large' : undefined,
              prefixel: renderPrefixIcon(prefixKnobChild),
            },
            {
              text: 'Child 2',
              key: 'p3-Child 2',
              ordered: orderedChildren,
              description: childDescription ? 'description' : undefined,
              size: childDescription ? 'large' : undefined,
              prefixel: renderPrefixIcon(prefixKnobChild),
            },
            {
              text: 'Child 3',
              key: 'p3-Child 3',
              ordered: orderedChildren,
              description: childDescription ? 'description' : undefined,
              size: childDescription ? 'large' : undefined,
              prefixel: renderPrefixIcon(prefixKnobChild),
            },
          ],
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
        <Menu {...defaultProps} dataSource={itemsWithOnClick} selectable selectedKeys={selectedKeys} ordered />
      </div>
    );
  },
};

export default {
  name: 'Components/AccordionMenu',
  config: {},
  stories,
};

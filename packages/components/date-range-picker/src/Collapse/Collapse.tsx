import React, { Component } from 'react';
import { Collapse as CollapseWrapper } from 'react-collapse';

import AngleDownS from '@synerise/ds-icon/dist/icons/AngleDownS';
import AngleUpS from '@synerise/ds-icon/dist/icons/AngleUpS';

import Icon from '@synerise/ds-icon';
import { Flex, Box } from '@rebass/grid';
import { CollapseContainer, CollapseHeader, CollapseContent, IconWrapper } from './Collapse.styles';
import { Props, State } from './Collapse.types';

export default class Collapse extends Component<Props, State> {
  props: Props;
  state: State;

  static defaultProps = {
    hideArrow: false,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      collapsed: props.defaultCollapsed || false,
    };
  }
  handleClick = () => {
    this.setState({ collapsed: !this.state.collapsed });
    if (this.props.onCollapseChange) {
      this.props.onCollapseChange();
    }
  };
  render() {
    const {
      className,
      iconHandle,
      controlled,
      collapsed,
      optionalHeaderComponent,
      hideArrow,
      customIcon,
      children,
      header,
    } = this.props;

    const componentCollapsed = controlled ? collapsed : this.state.collapsed;

    return (
      <CollapseContainer>
        <CollapseHeader className={className} iconHandle={iconHandle} onClick={!iconHandle && this.handleClick}>
          <Flex alignItems="center" flex="100%">
            <Box flex="auto">{header}</Box>
            <Box>
              <Flex>
                {optionalHeaderComponent && <Box>{optionalHeaderComponent}</Box>}
                <Box>
                  <IconWrapper iconHandle={iconHandle} onClick={iconHandle && this.handleClick}>
                    {!hideArrow &&
                    (customIcon || <Icon component={componentCollapsed ? <AngleDownS /> : <AngleUpS />} size="24" />)}
                  </IconWrapper>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </CollapseHeader>
        <CollapseWrapper isOpened={!componentCollapsed} hasNestedCollapse>
          <CollapseContent className={className}>{children}</CollapseContent>
        </CollapseWrapper>
      </CollapseContainer>
    );
  }
}

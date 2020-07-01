import * as React from 'react';
import { Collapse as CollapseWrapper } from 'react-collapse';

import AngleDownS from '@synerise/ds-icon/dist/icons/AngleDownS';
import AngleUpS from '@synerise/ds-icon/dist/icons/AngleUpS';

import Icon from '@synerise/ds-icon';
import { Flex, Box } from '@rebass/grid';
import { CollapseContainer, CollapseHeader, CollapseContent, IconWrapper } from './Collapse.styles';
import { Props, State } from './Collapse.types';

const NOOP = (): void => {};

export default class Collapse extends React.Component<Props, State> {
  static defaultProps = {
    hideArrow: false,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      collapsed: props.defaultCollapsed || false,
    };
  }

  handleClick = (): void => {
    const { collapsed } = this.state;
    const { onCollapseChange } = this.props;
    this.setState({ collapsed: !collapsed });
    onCollapseChange && onCollapseChange();
  };

  render(): JSX.Element {
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
        <CollapseHeader
          className={String(className)}
          iconHandle={!!iconHandle}
          onClick={!iconHandle ? this.handleClick : NOOP}
        >
          <Flex alignItems="center" flex="100%">
            <Box flex="auto">{header}</Box>
            <Box>
              <Flex>
                {optionalHeaderComponent && <Box>{optionalHeaderComponent}</Box>}
                <Box>
                  <IconWrapper iconHandle={!!iconHandle} onClick={iconHandle ? this.handleClick : NOOP}>
                    {!hideArrow &&
                      (customIcon || <Icon component={componentCollapsed ? <AngleDownS /> : <AngleUpS />} size="24" />)}
                  </IconWrapper>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </CollapseHeader>

        <CollapseWrapper
          isOpened={!componentCollapsed}
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          hasNestedCollapse
        >
          <CollapseContent className={className}>{children}</CollapseContent>
        </CollapseWrapper>
      </CollapseContainer>
    );
  }
}

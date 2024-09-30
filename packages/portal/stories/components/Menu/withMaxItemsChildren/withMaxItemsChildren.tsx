import React from 'react';
import styled from 'styled-components';
import { MenuItemProps } from "@synerise/ds-menu";
import { multipleItemsChildren } from '../dataset';
import {
  decorator,
  getDefaultProps,
  getSuffixElement,
  getSuffixTrigger,
} from '../index.stories';

const StyledTooltip = styled.div`
  border: 1px solid black;
  padding: 20px;
`

const withMaxItemsChildren = () => {
  const defaultProps = getDefaultProps();
  const props = {
    children: multipleItemsChildren,
    suffixel: getSuffixElement(),
    suffixVisibilityTrigger: getSuffixTrigger(),
    selectable: false,
    visibleItemsLimit: 5,
    renderHoverTooltip: () => <StyledTooltip>a tooltip's content</StyledTooltip>,
    ...defaultProps,
    dataSource: undefined,
  } as MenuItemProps;
  return decorator(props);
};

export default withMaxItemsChildren;

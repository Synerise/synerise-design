import React from 'react';
import styled from 'styled-components';
import { MenuItemProps } from "@synerise/ds-menu";
import { multipleItems } from '../dataset';
import {
  attachKnobsToDataSource,
  decorator,
  getDefaultProps,
  getSuffixElement,
  getSuffixTrigger,
} from '../index.stories';

const StyledTooltip = styled.div`
  border: 1px solid black;
  padding: 20px;
`

const withMaxItems = () => {
  const defaultProps = getDefaultProps();
  const props = {
    dataSource: attachKnobsToDataSource(multipleItems),
    suffixel: getSuffixElement(),
    suffixVisibilityTrigger: getSuffixTrigger(),
    selectable: false,
    visibleItemsLimit: 5,
    ...defaultProps,
  } as MenuItemProps;
  return decorator(props);
};

export default withMaxItems;

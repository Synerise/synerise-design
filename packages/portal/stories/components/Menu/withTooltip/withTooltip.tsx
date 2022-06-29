import * as React from 'react';
import styled from 'styled-components';
import { MenuItemProps } from "@synerise/ds-menu";
import { simpleText } from '../dataset';
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

const withTooltip = () => {
  const defaultProps = getDefaultProps();
  const props = {
    dataSource: attachKnobsToDataSource(simpleText),
    suffixel: getSuffixElement(),
    suffixVisibilityTrigger: getSuffixTrigger(),
    selectable: false,
    renderHoverTooltip: () => <StyledTooltip>a tooltip's content</StyledTooltip>,
    ...defaultProps,
  } as MenuItemProps;
  return decorator(props);
};

export default withTooltip;

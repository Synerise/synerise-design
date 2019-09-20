import styled from 'styled-components';
import { Transition } from 'react-transition-group';

import { mediaQuery, hexToRgba } from '@synerise/ds-utils';

export const LayoutContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const LayoutHeader = styled.div`
  flex: 0;
  z-index: 1;
  border: 1px solid ${(props): string => props.theme.palette['grey-200']};
  box-shadow: 0 2px 6px ${props => hexToRgba(props.theme.palette['grey-400'], 0.12)};
`;

export const LayoutBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  ${mediaQuery.to.medium`overflow: auto;`};
  ${mediaQuery.from.medium`flex-direction: row;`};
`;

export const LayoutMain = styled.div`
  flex: 1;
  position: relative;
  ${mediaQuery.from.medium`overflow: auto;`};
`;

export const LayoutMainInner = styled.div`
  padding: 24px 12px;
  ${mediaQuery.to.medium`flex: 0 0 auto;`};
  ${mediaQuery.from.medium`padding: 24px;`};
`;

export const LayoutSidebar = styled.div`
  z-index: 1;
  overflow: auto;
  background-color: #fff;
  height: 100%;
  ${mediaQuery.to.medium`flex: 0 0 auto;`};
  ${mediaQuery.from.medium`flex: 1 1 324px; width: 324px;`};

  ${mediaQuery.from.medium`
    &.slide-enter {
      max-width: 0;
    }
    &.slide-enter.slide-enter-active {
      max-width: 324px;
      transition: max-width ${(props): string => props.transitionTime}ms;
    }
    &.slide-leave {
      max-width: 324px;
    }
    &.slide-leave.slide-leave-active {
      max-width: 0;
      transition: max-width ${(props): string => props.transitionTime}ms;
    }
  `};
`;

export const LayoutSidebarInner = styled.div`
  padding: 24px 0;
  display: flex;
  flex-flow: column;
  height: 100%;
`;

export const Transitions = styled(Transition)``;

import styled, { css } from 'styled-components';

import { SortableItemContent } from '@synerise/ds-sortable/dist/Sortable.styles';

export const placeholderCss = css`
  height: calc(100% - 24px);
  background-color: ${(props) => props.theme.palette['blue-050']};
  border: 0;
  border-left: 2px solid ${(props) => props.theme.palette['blue-600']};
  border-radius: 3px;
`;

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
  ${SortableItemContent} {
    visibility: visible;
    opacity: 1;
  }
`;

export const FilterHeader = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const FilterHeaderRightSide = styled.div`
  flex: 1;
  overflow-x: hidden;
`;

export const MatchingAndConditionsWrapper = styled.div`
  flex: 0 0 auto;
  margin-right: 24px;
  display: flex;
  align-items: baseline;
`;

export const MatchingWrapper = styled.div`
  text-wrap: nowrap;
`;

export const ConditionsLimit = styled.div`
  margin-left: 16px;
`;

export const ConditionsLimitResults = styled.span`
  font-weight: 500;
`;

export const LogicWrapper = styled.div`
  margin: 22px 0;
`;

export const ExpressionWrapper = styled.div<{
  index?: number;
  isDragged?: boolean;
}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  ${(props) =>
    (props.isDragged || props.index === -1) &&
    `
    ${LogicWrapper} {
      display: none;
    }
    `}
`;

export const AddButtonWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 24px 0 0;
  width: 100%;
  position: relative;
`;

export const FilterTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.25;
  color: ${(props) => props.theme.palette['grey-800']};
  text-align: left;
  user-select: none;
  flex: 0 0 auto;
  &:first-letter {
    text-transform: uppercase;
  }
`;

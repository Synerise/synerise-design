import styled, { css } from 'styled-components';

export const Title = styled.div<{ description?: boolean; isClickable?: boolean }>`
  display: flex;
  line-height: 16px;
  max-width: 800px;
  font-size: 16px;
  font-weight: 500;
  word-wrap: break-word;
  align-items: center;
  color: ${props => props.theme.palette['grey-800']};
  cursor: ${props => (props.isClickable ? 'pointer' : 'default')};
`;
export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const HeaderWrapper = styled.div<{ topAlign?: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  align-items: ${props => (props.topAlign ? 'flex-start' : 'center')};
`;
export const ButtonWrapper = styled.div`
  display: flex;
`;
export const ActionButton = styled.div`
  display: flex;
  padding; 8px;
`;
export const ExpanderWrapper = styled.div`
  display: flex;
`;
export const FieldSetTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Description = styled.div`
  display: flex;
  line-height: 16px;
  font-size: 13px;
  word-wrap: break-word;
`;
export const CollapsibleContent = styled.div<{ expandable?: boolean; expanded?: boolean; maxHeight?: number }>`
  position: relative;
  ${props =>
    props.expandable &&
    css`
      transition: max-height 0.7s ease-in-out;
      overflow: hidden;
      ${props.expanded
        ? `
    max-height: ${props.maxHeight || 9999}px;
    `
        : `
    max-height: 0;
    `}
    `}
`;
export const CollapsibleContentInner = styled.div``;

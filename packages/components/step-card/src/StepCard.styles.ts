import styled from 'styled-components';
import Icon from '@synerise/ds-icon';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  background-color: ${(props): string => props.theme.palette.white};
  border-radius: 3px;
  box-shadow: 0 4px 12px 0 #2329360a;
  min-width: 594px;
`;

export const CrudsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  opacity: 0;
  visibility: hidden;
`;

export const DragIcon = styled(Icon)`
  visibility: hidden;
  opacity: 0;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 22px 0;
  margin: 0 24px 0 0;
  width: 100%;
  max-width: calc(100% - 24px);
  position: relative;
  cursor: grab;
  &:hover {
    ${CrudsWrapper} {
      opacity: 1;
      visibility: visible;
    }
    ${DragIcon} {
      visibility: visible;
      opacity: 1;
    }
  }
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  > * {
    margin-right: 8px;
  }
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  > * {
    margin-left: 8px;
  }
`;

export const Body = styled.div`
  padding: 0 0 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  .ds-conditions {
    &:first-of-type {
      padding-top: 0;
    }
    &:last-of-type {
      padding-bottom: 0;
    }
  }
`;

export const Footer = styled.div`
  background-color: rgba(249, 250, 251, 0.6);
  border-top: 1px solid ${(props): string => props.theme.palette['grey-100']};
  padding: 16px 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  > * {
    margin-left: 8px;
  }
`;

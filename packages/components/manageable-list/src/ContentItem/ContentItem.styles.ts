import styled from 'styled-components';
import { macro } from '@synerise/ds-typography';
import { Tag } from '@synerise/ds-tags/dist/Tag/Tag.styles';

type ItemContainerProps = {
  opened: boolean;
};

export const DraggerWrapper = styled.div`
  display: flex;
`;

export const IconWrapper = styled.div`
  display: flex;
`;

export const ItemActions = styled.div`
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  span {
    margin: 0 0 0 8px;
  }
`;

export const ItemHeaderPrefix = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const ItemHeaderSuffix = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const ItemLabel = styled.span`
  ${macro.h300};
  color: ${({ theme }): string => theme.palette['grey-600']};
  flex: 1;
`;

export const ItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
  width: 100%;
  padding: 12px;

  ${Tag} {
    margin: 0 12px 0 0;
  }

  ${IconWrapper} {
    margin-right: 12px;
  }

  ${DraggerWrapper} {
    margin-right: 12px;
    svg {
      color: ${({ theme }): string => theme.palette['grey-400']};
      fill: ${({ theme }): string => theme.palette['grey-400']};
    }
  }

  && {
    .ant-btn {
      border-radius: 50%;
      box-sizing: border-box;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
      border: 1px solid ${({ theme }): string => theme.palette['grey-400']};
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 0 0 12px;
      transition: transform 0.2s ease;
      & > div {
        justify-content: center;
        margin: 0 !important;
        display: flex;
        align-items: center;
      }
    }
  }

  &:hover {
    ${ItemLabel} {
      color: ${({ theme }): string => theme.palette['grey-800']};
    }
    ${ItemActions} {
      display: flex;
    }
    ${DraggerWrapper} {
      svg {
        color: ${({ theme }): string => theme.palette['grey-600']};
        fill: ${({ theme }): string => theme.palette['grey-600']};
      }
    }
  }
`;

export const ContentWrapper = styled.div`
  padding: 16px 16px 24px;
`;

export const ItemContainer = styled.div<ItemContainerProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 16px;
  border-radius: 3px;
  background-color: ${({ theme }): string => theme.palette['grey-050']};

  ${ContentWrapper} {
    display: ${({ opened }): string => (opened ? 'flex' : 'none')};
  }
  ${ItemHeader} {
    .ant-btn {
      transform: ${({ opened }): string => (opened ? 'rotateZ(-180deg)' : 'rotateZ(0deg)')};
    }
  }
`;

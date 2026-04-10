import styled, { css } from 'styled-components';

import { Text, macro } from '@synerise/ds-typography';

import { type StickyData } from '../../Table.types';

export const Header = styled.div<{
  stickyData?: StickyData;
  isVirtual?: boolean;
}>`
  background: ${(props) => props.theme.palette['white']};
  padding: 20px 24px;
  ${(props) => props.isVirtual && `min-height: 73px;`}
  display: flex;
  border-radius: 3px 3px 0 0;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.palette['grey-200']};

  ${({ stickyData }) =>
    stickyData &&
    css`
      transition: top 0.3s ease-in-out;
      position: sticky;
      top: ${stickyData.isRevealed
        ? `-${stickyData.containerPaddingTop}px`
        : `-${stickyData.titleBarHeight + stickyData.containerPaddingTop}px`};
      z-index: 12;
    `}
`;

export const TitleContainer = styled.div`
  display: flex;
  max-width: 100%;
  min-width: 0;
  align-items: center;

  ${macro.small};
  color: ${(props) => props.theme.palette['grey-700']};
  padding: 0 24px 0 0;

  strong {
    font-weight: 500;
  }
`;

export const TitlePartEllipsis = styled(Text)`
  font-weight: 500;
`;

export const TitlePart = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const TitleSeparator = styled.span`
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
  width: 1px;
  height: 16px;
  margin: 1px 12px 0px 12px;
  background: ${({ theme }) => theme.palette['grey-200']};
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  > * {
    min-width: 32px;
  }

  &&& .ds-button.btn-search {
    min-width: unset;
  }
`;

export const RightSideWrapper = styled.div``;

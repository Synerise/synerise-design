import styled, { createGlobalStyle, css } from 'styled-components';

import { CardStyles } from '@synerise/ds-card';
import { DescriptionCopyable } from '@synerise/ds-description';
import DSDivider from '@synerise/ds-divider';
import { macro } from '@synerise/ds-typography';

const INFOCARD_WIDTH = 350;

export const Flex = styled.div`
  display: flex;
`;

export const Copyable = styled(DescriptionCopyable)`
  display: flex;
  align-items: center;
  height: 20px;
`;

export const Divider = styled(DSDivider)`
  && {
    margin: 8px 0;
    width: 100%;
  }
`;
export const BottomDivider = styled(DSDivider)`
  && {
    margin-left: 16px;
    margin-right: 16px;
  }
`;

export const FooterWrapper = styled(Flex)`
  background: ${(props) => props.theme.palette['grey-050']};
  border-top: solid 1px ${(props) => props.theme.palette['grey-100']};
  padding: 8px;
`;
export const ActionsMenuItems = styled.div``;

export const FlexGrow = styled.div<{ grow?: number }>`
  flex-grow: ${({ grow = 1 }) => grow};
`;

export const ActionButtonContainer = styled.div``;

export const InfoCardSlidesWrapper = styled.div``;
export const InfoCardSlide = styled.div<{ height?: number }>`
  ${(props) => props.height && `max-height: ${props.height}px;`}
`;

export const InfoCardWrapper = styled.div<{
  footerText?: string;
  asTooltip?: boolean;
  hasActionsMenu?: boolean;
  isActionsMenuVisible?: boolean;
  hasFooter?: boolean;
}>`
  margin-left: ${(props) => (props.asTooltip ? '0' : '8px')};
  width: ${INFOCARD_WIDTH}px;
  overflow: hidden;
  color: ${(props) => props.theme.palette['grey-600']};
  text-align: left;
  font-size: 13px;

  ${InfoCardSlidesWrapper} {
    width: ${(props) =>
      props.hasActionsMenu ? INFOCARD_WIDTH * 2 : INFOCARD_WIDTH}px;
    display: flex;
    transition: left 0.3s;
    position: relative;
    left: ${(props) =>
      props.isActionsMenuVisible ? `-${INFOCARD_WIDTH}px` : '0'};
  }
  ${InfoCardSlide} {
    width: ${INFOCARD_WIDTH}px;
    height: min-content;
  }

  overflow-wrap: anywhere;
  background-color: white;
  border-radius: 3px;
  box-shadow: ${(props) =>
    props.asTooltip
      ? 'unset'
      : '0 16px 32px 0 rgba(35, 41, 54, 0.1)'}; // gray-900

  ${CardStyles.Card.Container} {
    font-weight: 400;
    gap: 16px;
    ${(props) =>
      !props.hasFooter &&
      css`
        padding-bottom: 8px;
        margin-bottom: 1px;
      `}
  }

  ${CardStyles.Card.PaddingWrapper} {
    padding-top: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  ${CardStyles.Card.Header} {
    padding: 16px 16px 1px 16px;
    margin-bottom: 0;
  }
  ${CardStyles.Card.IconContainer} {
    align-self: center;
    margin-left: 10px;
    margin-right: 10px;
  }
  ${CardStyles.Card.HeaderContent} {
    margin: 0;
    gap: 2px;
  }
  ${CardStyles.Card.TitleWrapper} {
    margin: 0;
  }

  ${CardStyles.Card.Title}${CardStyles.Card.Title} {
    margin-bottom: 0;
    font-size: 14px;
  }

  ${CardStyles.Card.Description}${CardStyles.Card.Description} {
    font-size: 11px;
  }

  .ds-button {
    background: transparent;
  }
  .btn-focus,
  .btn-focus:hover {
    box-shadow: unset;
  }
`;

export const AlertWrapper = styled.div`
  padding-bottom: 8px;
  :empty {
    display: none;
  }
`;
export const NonEditableWrapper = styled.div`
  padding-bottom: 8px;
  :empty {
    display: none;
  }
`;

export const DescriptionWrapper = styled.div`
  padding: 0 16px;
`;

/**
 * This component can be used to style container with popovers/tooltips to disable arrow.
 */
export const HidePopoverArrowWrapper = styled.div`
  .ant-popover-arrow-content,
  .ant-tooltip-arrow-content {
    display: none;
  }
`;

/**
 * Should be mounted in application where.
 */
export const GlobalCSSHidePopoverArrow = createGlobalStyle`
  .ant-popover-arrow-content,.ant-tooltip-arrow-content {
    display: none;
}`;

export const ExtraInfo = styled.div`
  margin-bottom: 1px;
`;

export const InformationCardActionsWrapper = styled.div`
  padding: 8px;
`;

export const InformationCardPropertyListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px 8px;
  gap: 8px;
`;
export const InformationCardPropertyItem = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 8px;
  row-gap: 6px;
`;

export const InformationCardPropertyItemLabel = styled.span`
  ${macro.small}
`;
export const InformationCardPropertyItemValue = styled.span`
  ${macro.small}
  font-weight: 500;
`;

export const InformationCardSummaryWrapper = styled(Flex)`
  margin: 0 16px;
  padding-bottom: 8px;
  gap: 0 4px;
  flex-wrap: wrap;
`;
export const InformationCardSummaryItem = styled(Flex)`
  font-weight: 500;
  align-items: center;
  gap: 4px;
`;

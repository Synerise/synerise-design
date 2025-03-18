import styled, { css } from 'styled-components';
import { Carousel } from 'antd';
import Tag from '@synerise/ds-tag';
import { Text, Title } from '@synerise/ds-typography';

export const BannerWrapper = styled.div<{ count: number }>`
  width: 100%;
  background: ${props => props.theme.palette['grey-100']};
  position: relative;
  border-radius: 3px;
  overflow: hidden;

  .ant-carousel {
    min-width: 100%;
    flex: 1 0 100%;
  }
  .ant-carousel .slick-track {
    display: flex;
    align-items: center;
  }
`;

export const BannerCloseWrapper = styled.div`
  position: absolute;
  right: 8px;
  top: 8px;
  z-index: 10;
`;

export const BannerHeaderWrapper = styled.div<{ isExpanded: boolean }>`
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 8px 16px;
  ${props =>
    props.isExpanded &&
    css`
      border-bottom: solid 1px ${props.theme.palette['grey-300']};
    `}

  ${BannerCloseWrapper} {
    position: static;
  }
`;

export const BannerHeaderIcon = styled.div``;
export const BannerHeaderTitle = styled(Text)`
  flex-grow: 1;
`;
export const BannerHeaderToggle = styled.div``;
export const BannerDivider = styled.div`
  width: 1px;
  height: 32px;
  background: ${props => props.theme.palette['grey-300']};
`;

export const BannerSlides = styled(Carousel)<{ count?: number }>`
  min-width: 100%;
  display: flex;
`;

export const BannerSlideWrapper = styled.div``;
export const BannerSlideInner = styled.div`
  display: flex;
  flex: 1 0 100%;
  width: 100%;
`;

export const BannerSlideTitle = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  position: relative;
`;

export const BannerSlideContent = styled.div``;

export const BannerSlideContentWrapper = styled.div<{
  hasMainContent: boolean;
  type?: 'media' | 'text';
  position: 'left' | 'right' | 'main';
}>`
  display: flex;

  ${({ type }) =>
    type === 'media'
      ? css`
          flex-direction: row;
        `
      : css`
          flex-direction: column;
          gap: 8px;
          padding: 48px 40px;
        `};

  ${({ position, hasMainContent }) =>
    position === 'main'
      ? css`
          flex-grow: 1;
        `
      : css`
          flex-grow: ${hasMainContent ? '0' : '1'};
          flex-basis: 240px;
          flex-shrink: 0;
        `};
`;

export const BannerSlideTitlePrefix = styled.div``;

export const BannerSlideTitleStatus = styled(Tag)`
  margin: 0;
`;

export const BannerSlideTitleText = styled(Title)`
  margin-bottom: 0;
`;

export const BannerSlideDescription = styled.div``;
export const BannerSlideMediaWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  img,
  video {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const BannerSlideButtons = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 8px;
`;

export const BannerCounterWrapper = styled.div`
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-top: solid 1px ${props => props.theme.palette['grey-300']};
`;

export const BannerCounterDot = styled.div<{ active?: boolean }>`
  display: flex;
  width: 24px;
  height: 32px;
  cursor: pointer;
  align-items: center;
  &:after {
    content: '';
    transition: background-color 0.2s ease-in-out;
    background: ${props => (props.active ? props.theme.palette['blue-600'] : props.theme.palette['grey-300'])};
    height: 4px;
    width: 100%;
    border-radius: 2px;
    display: block;
  }
  &:hover {
    &:after {
      background: ${props => (props.active ? props.theme.palette['blue-600'] : props.theme.palette['grey-400'])};
    }
  }
`;

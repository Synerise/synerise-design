import React from 'react';
import styled from 'styled-components';
import Button from '@synerise/ds-button';
import { FixedSizeList } from 'react-window';

export const EmojiItem = styled.div<{ itemsPerRow: number }>`
  display: flex;
  width: ${props => 100 / props.itemsPerRow}%;
  align-items: center;
  justify-content: center;
`;
export const EmojiButton = styled(props => <Button {...props} type="ghost" mode="single-icon" />)`
  font-size: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export const EmptyList = styled.div`
  padding: 12px;
`;
export const EmojiCategoryWrapper = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
`;

export const VirtualList = styled(FixedSizeList)<{ listHeight: number }>`
  max-height: ${props => props.listHeight}px;
  height: auto !important;
  overflow-x: unset !important;
  overflow-y: unset !important;
`;

export const ListRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  max-width: 100%;
`;

export const Title = styled.div<{ elementSize: string }>`
  font-size: 10px;
  line-height: 1.6;
  font-weight: 500;
  text-transform: uppercase;
  color: ${props => props.theme.palette['grey-500']};
  padding: 0 12px;
  flex-basis: 100%;
  height: ${props => props.elementSize};
  line-height: ${props => props.elementSize};
`;

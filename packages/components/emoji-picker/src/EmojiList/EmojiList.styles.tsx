import React from 'react';
import styled from 'styled-components';
import Button from '@synerise/ds-button';

export const EmojiItem = styled(props => <Button {...props} type="ghost" mode="single-icon" />)`
  font-size: 18px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export const EmojiCategoryWrapper = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
`;

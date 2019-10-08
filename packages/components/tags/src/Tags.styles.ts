import styled from 'styled-components';
import Button from '@synerise/ds-button';

export const Container = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const SelectedTags = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

export const AddButton = styled(Button)`
  margin: 0 0 0 8px;
`;

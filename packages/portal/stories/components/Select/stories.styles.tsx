import styled from 'styled-components';
import { Tag } from '@synerise/ds-tags';
import Avatar from '@synerise/ds-avatar';

export const TagAddon = styled(Tag)`
  height: 32px;
  width: 32px;
  margin: 0;
  opacity: 0.7;
`;
export const Label = styled.span`
  margin: 0 12px;
  max-width: 50px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const AvatarWithMargin = styled(Avatar)`
  margin: 4px;
`;
export const IconWrapper = styled.div`
  margin: 4px;
`;

import styled from 'styled-components';

import { SelectedTags, TagsWrapper } from '@synerise/ds-tags/dist/Tags.styles';
import { AddTagButton } from '@synerise/ds-tags/dist/components/AddTags/AddTags.styles';

export const TagsGroupWrapper = styled.div<{
  isDisabled?: boolean;
  isEmpty?: boolean;
}>`
  ${TagsWrapper} {
    margin-bottom: 0;
  }
  ${SelectedTags} {
    flex-flow: nowrap;
  }
  ${(props) =>
    props.isDisabled
      ? `
        opacity: 0.4;
        pointer-events: none;
    `
      : `
        ${AddTagButton}${AddTagButton}${AddTagButton} svg {
            transition: none;
        }
        ${AddTagButton} {
            visibility: hidden;
        }
        tr:hover &, 
        .virtual-table-row:hover & {
            ${AddTagButton} {
                visibility: visible;
            }
        }
    `}
`;
